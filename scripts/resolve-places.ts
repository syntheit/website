/**
 * Resolve Google Maps Takeout CSVs into a structured places dataset.
 *
 * Input:  /tmp/takeout/Takeout/Saved/*.csv
 * Output: public/data/world/places.json (one entry per unique place)
 *         public/data/world/lists.json (list metadata + place IDs per list)
 *         scripts/.cache/places-cache.json (per-FTID resolved data; resumable)
 *         scripts/.cache/places-failed.json (FTIDs we couldn't resolve)
 *
 * Run inside `nix develop` (PUPPETEER_EXECUTABLE_PATH must be set):
 *   npx tsx scripts/resolve-places.ts
 *
 * Re-runs use the cache and only resolve new entries.
 */

import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import puppeteer, { type Browser, type Page } from "puppeteer";

// ── Config ──────────────────────────────────────────────────────────────

const TAKEOUT_DIR = "/tmp/takeout/Takeout/Saved";
const CACHE_DIR = "scripts/.cache";
const CACHE_FILE = join(CACHE_DIR, "places-cache.json");
const FAILED_FILE = join(CACHE_DIR, "places-failed.json");
const OUT_DIR = "public/data/world";
const OUT_PLACES = join(OUT_DIR, "_raw-places.json");
const OUT_LISTS = join(OUT_DIR, "_raw-lists.json");

const CONCURRENCY = 4;
const PAGE_TIMEOUT_MS = 30_000;
const URL_WAIT_TIMEOUT_MS = 15_000;
const PER_REQUEST_DELAY_MIN = 200;
const PER_REQUEST_DELAY_MAX = 800;

// ── Types ───────────────────────────────────────────────────────────────

interface CsvRow {
  listName: string;   // derived from filename, e.g. "Restaurants" or "Cafes to go to"
  title: string;
  note: string;
  url: string;
}

interface ParsedRow extends CsvRow {
  ftid?: string;      // "0x...:0x..." if extractable
  searchQuery?: string; // if url is /maps/search/ form
}

interface ResolvedPlace {
  ftid: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  countryHint?: string;
  resolvedAt: string;
}

interface FailedEntry {
  url: string;
  title: string;
  reason: string;
  attemptedAt: string;
}

interface FinalPlace {
  id: string;                  // ftid-derived: "p_<part1>_<part2>" or fallback
  ftid: string;
  name: string;                // canonical from Google
  title: string;               // original from CSV (may differ)
  lat: number;
  lng: number;
  address?: string;
  countryHint?: string;        // last segment of address
  googleMapsUrl: string;       // original input URL
  listIds: string[];           // which lists this place is in
  takeoutNotes: string[];      // any non-empty Note column values (typically empty)
}

// ── CSV parsing ─────────────────────────────────────────────────────────

function parseCsv(content: string): { title: string; note: string; url: string }[] {
  // Google Takeout CSV: header row "Title,Note,URL,Tags,Comment", then rows.
  // Standard CSV quoting: fields with commas are wrapped in "...", embedded " is "".
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (inQuotes) {
      if (c === '"') {
        if (content[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        // skip
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length < 2) return [];
  // Skip header (row 0) and any blank rows.
  return rows
    .slice(1)
    .filter((r) => r[0] && r[0].trim().length > 0)
    .map((r) => ({
      title: (r[0] ?? "").trim(),
      note: (r[1] ?? "").trim(),
      url: (r[2] ?? "").trim(),
    }));
}

function extractFtid(url: string): string | undefined {
  // Match the !1s<hex>:<hex> segment
  const m = url.match(/!1s(0x[0-9a-f]+:0x[0-9a-f]+)/i);
  return m?.[1];
}

function extractSearchQuery(url: string): string | undefined {
  if (!url.includes("/maps/search/")) return undefined;
  const m = url.match(/[?&]q=([^&]+)/);
  if (m?.[1]) return decodeURIComponent(m[1]);
  // search URL with name in path: /maps/search/<query>
  const pathM = url.match(/\/maps\/search\/([^/?]+)/);
  if (pathM?.[1]) return decodeURIComponent(pathM[1]).replace(/\+/g, " ");
  return undefined;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function listIdFromFilename(filename: string): string {
  const noExt = filename.replace(/\.csv$/i, "");
  return slugify(noExt);
}

// ── Resolver ────────────────────────────────────────────────────────────

async function resolveOne(
  page: Page,
  url: string,
): Promise<{ ok: true; data: Omit<ResolvedPlace, "ftid" | "resolvedAt"> } | { ok: false; reason: string }> {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: PAGE_TIMEOUT_MS });

    // Wait for canonical URL with @lat,lng. Some places redirect within ms,
    // others take a second or two. If never redirects, fall through.
    try {
      await page.waitForFunction(
        () => /@-?\d+\.\d+,-?\d+\.\d+/.test(location.href),
        { timeout: URL_WAIT_TIMEOUT_MS },
      );
    } catch {
      // continue; might still extract via meta
    }

    const finalUrl = page.url();
    const coordMatch = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    const lat = coordMatch?.[1] ? parseFloat(coordMatch[1]) : undefined;
    const lng = coordMatch?.[2] ? parseFloat(coordMatch[2]) : undefined;

    const meta = await page.evaluate(() => {
      const out: { name?: string; address?: string } = {};
      const title = document.querySelector("h1.DUwDvf, h1");
      if (title?.textContent) out.name = title.textContent.trim();
      const addrEl = document.querySelector('button[data-item-id="address"]');
      if (addrEl) {
        const aria = addrEl.getAttribute("aria-label") ?? "";
        out.address = aria.replace(/^Address:\s*/i, "").trim();
      }
      return out;
    });

    // Detection rules:
    // - If we extracted a name AND coords look non-default, it resolved.
    // - The default fallback URL has "/place//@..." (empty name segment).
    const isFallbackUrl = /\/place\/\/@/.test(finalUrl);
    if (isFallbackUrl) {
      return { ok: false, reason: "fallback-default-location" };
    }
    if (!meta.name) {
      return { ok: false, reason: "no-name-extracted" };
    }
    if (lat === undefined || lng === undefined) {
      return { ok: false, reason: "no-coords" };
    }

    const countryHint = meta.address
      ? meta.address.split(",").map((s) => s.trim()).pop()
      : undefined;

    return {
      ok: true,
      data: {
        name: meta.name,
        lat,
        lng,
        address: meta.address,
        countryHint,
      },
    };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

async function setupPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const t = req.resourceType();
    if (t === "image" || t === "font" || t === "media" || t === "stylesheet") {
      req.abort();
    } else {
      req.continue();
    }
  });
  return page;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  // 1. Read all CSVs
  const files = (await readdir(TAKEOUT_DIR)).filter((f) => f.endsWith(".csv"));
  console.log(`Found ${files.length} CSV files in ${TAKEOUT_DIR}`);

  const allRows: ParsedRow[] = [];
  for (const filename of files) {
    const listName = filename.replace(/\.csv$/i, "");
    const content = await readFile(join(TAKEOUT_DIR, filename), "utf-8");
    const rows = parseCsv(content);
    for (const r of rows) {
      if (!r.url) continue;
      const ftid = extractFtid(r.url);
      const searchQuery = ftid ? undefined : extractSearchQuery(r.url);
      allRows.push({
        listName,
        title: r.title,
        note: r.note,
        url: r.url,
        ftid,
        searchQuery,
      });
    }
  }
  console.log(`Parsed ${allRows.length} total rows across ${files.length} lists`);

  // 2. Group by FTID (or fall back to URL for non-FTID entries)
  const byKey = new Map<string, { rows: ParsedRow[]; key: string; isFtid: boolean }>();
  for (const row of allRows) {
    const key = row.ftid ?? `search:${row.url}`;
    const isFtid = !!row.ftid;
    const entry = byKey.get(key);
    if (entry) {
      entry.rows.push(row);
    } else {
      byKey.set(key, { rows: [row], key, isFtid });
    }
  }
  console.log(`Unique places (by FTID/URL): ${byKey.size}`);
  const withoutFtid = [...byKey.values()].filter((e) => !e.isFtid).length;
  console.log(`  - with FTID: ${byKey.size - withoutFtid}`);
  console.log(`  - search-URL only: ${withoutFtid}`);

  // 3. Load existing cache
  await mkdir(CACHE_DIR, { recursive: true });
  await mkdir(OUT_DIR, { recursive: true });

  const cache: Map<string, ResolvedPlace> = new Map();
  if (existsSync(CACHE_FILE)) {
    const raw = JSON.parse(await readFile(CACHE_FILE, "utf-8")) as Record<string, ResolvedPlace>;
    for (const [k, v] of Object.entries(raw)) cache.set(k, v);
    console.log(`Loaded ${cache.size} cached entries from ${CACHE_FILE}`);
  }

  const failed: Map<string, FailedEntry> = new Map();
  if (existsSync(FAILED_FILE)) {
    const raw = JSON.parse(await readFile(FAILED_FILE, "utf-8")) as Record<string, FailedEntry>;
    for (const [k, v] of Object.entries(raw)) failed.set(k, v);
    console.log(`Loaded ${failed.size} previously-failed entries`);
  }

  // 4. Determine work to do
  const toResolve = [...byKey.values()].filter((e) => !cache.has(e.key) && !failed.has(e.key));
  console.log(`\nNeed to resolve: ${toResolve.length} places`);
  if (toResolve.length === 0) {
    console.log("All places cached. Skipping browser launch.");
  }

  // 5. Resolve with concurrency
  if (toResolve.length > 0) {
    console.log(`Launching browser with ${CONCURRENCY} concurrent pages...`);
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const pages: Page[] = [];
    for (let i = 0; i < CONCURRENCY; i++) {
      pages.push(await setupPage(browser));
    }

    let cursor = 0;
    let done = 0;
    let okCount = 0;
    let failCount = 0;
    const startTime = Date.now();
    const total = toResolve.length;

    // Periodic cache flush
    const flushCache = async () => {
      const obj: Record<string, ResolvedPlace> = {};
      for (const [k, v] of cache) obj[k] = v;
      await writeFile(CACHE_FILE, JSON.stringify(obj, null, 2));
      const failObj: Record<string, FailedEntry> = {};
      for (const [k, v] of failed) failObj[k] = v;
      await writeFile(FAILED_FILE, JSON.stringify(failObj, null, 2));
    };

    const worker = async (page: Page) => {
      while (cursor < total) {
        const idx = cursor++;
        const entry = toResolve[idx];
        if (!entry) break;
        const firstRow = entry.rows[0]!;
        const result = await resolveOne(page, firstRow.url);

        if (result.ok) {
          cache.set(entry.key, {
            ftid: entry.isFtid ? entry.key : `search:${firstRow.url}`,
            ...result.data,
            resolvedAt: new Date().toISOString(),
          });
          okCount++;
        } else {
          failed.set(entry.key, {
            url: firstRow.url,
            title: firstRow.title,
            reason: result.reason,
            attemptedAt: new Date().toISOString(),
          });
          failCount++;
        }

        done++;
        if (done % 25 === 0 || done === total) {
          const elapsed = (Date.now() - startTime) / 1000;
          const rate = done / elapsed;
          const eta = (total - done) / rate;
          console.log(
            `  [${done}/${total}] ok=${okCount} fail=${failCount} ` +
              `rate=${rate.toFixed(2)}/s eta=${(eta / 60).toFixed(1)}min`,
          );
          await flushCache();
        }

        // tiny jitter to be polite
        const delay =
          PER_REQUEST_DELAY_MIN +
          Math.random() * (PER_REQUEST_DELAY_MAX - PER_REQUEST_DELAY_MIN);
        await sleep(delay);
      }
    };

    await Promise.all(pages.map((p) => worker(p)));
    await flushCache();
    await browser.close();
    console.log(`\nResolution pass complete: ${okCount} ok, ${failCount} failed`);
  }

  // 6. Build final dataset from cache + parsed rows
  console.log("\nBuilding final dataset...");
  const places: FinalPlace[] = [];
  const placeById = new Map<string, FinalPlace>();

  for (const entry of byKey.values()) {
    const resolved = cache.get(entry.key);
    if (!resolved) continue;
    const firstRow = entry.rows[0]!;
    const listIds = [...new Set(entry.rows.map((r) => listIdFromFilename(r.listName + ".csv")))];
    const takeoutNotes = entry.rows.map((r) => r.note).filter((n) => n && n.length > 0);

    // FTID-keyed places get a stable, content-derived id. Non-FTID entries (the
    // search-URL fallback group) used to use just the slugified title, which
    // collided whenever two saved pins shared a name (e.g. multiple "Marcador"
    // pin-drops). Include a short hash of the URL so each entry is unique.
    let idBase: string;
    if (entry.isFtid) {
      idBase = `p_${entry.key.replace(/:/g, "_").replace(/0x/g, "")}`;
    } else {
      const slug = slugify(firstRow.title).slice(0, 24) || "place";
      const hash = createHash("sha1").update(firstRow.url).digest("hex").slice(0, 8);
      idBase = `p_${slug}_${hash}`;
    }

    const place: FinalPlace = {
      id: idBase,
      ftid: resolved.ftid,
      name: resolved.name,
      title: firstRow.title,
      lat: resolved.lat,
      lng: resolved.lng,
      address: resolved.address,
      countryHint: resolved.countryHint,
      googleMapsUrl: firstRow.url,
      listIds,
      takeoutNotes,
    };
    places.push(place);
    placeById.set(place.id, place);
  }
  console.log(`Built ${places.length} unique places`);

  // 7. Build list metadata + reverse index
  const allListIds = [...new Set(files.map((f) => listIdFromFilename(f)))];
  const lists = allListIds.map((id) => {
    const placeIds = places.filter((p) => p.listIds.includes(id)).map((p) => p.id);
    const filename = files.find((f) => listIdFromFilename(f) === id);
    return {
      id,
      label: filename ? filename.replace(/\.csv$/i, "") : id,
      placeCount: placeIds.length,
      placeIds,
    };
  });

  // 8. Write outputs
  await writeFile(OUT_PLACES, JSON.stringify(places, null, 2));
  await writeFile(OUT_LISTS, JSON.stringify(lists, null, 2));
  console.log(`Wrote ${OUT_PLACES} (${places.length} places)`);
  console.log(`Wrote ${OUT_LISTS} (${lists.length} lists)`);

  // 9. Summary
  console.log("\n=== Summary ===");
  console.log(`Total CSV rows:     ${allRows.length}`);
  console.log(`Unique places:      ${byKey.size}`);
  console.log(`Resolved:           ${cache.size}`);
  console.log(`Failed:             ${failed.size}`);
  console.log(`Coverage:           ${((cache.size / byKey.size) * 100).toFixed(1)}%`);

  // List the failures so they're visible
  if (failed.size > 0) {
    console.log("\nFailed entries (top 20):");
    const failArr = [...failed.values()].slice(0, 20);
    for (const f of failArr) {
      console.log(`  - "${f.title}" (${f.reason})`);
    }
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
