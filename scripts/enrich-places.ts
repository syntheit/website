/**
 * Take the raw resolved places.json + lists.json and produce the enriched dataset
 * the site actually uses:
 *   - canonical country slug (fixed via address whitelist + lat/lng fallback)
 *   - category (from list mapping)
 *   - status (from list mapping, with conflict resolution)
 *   - tags (union)
 *   - publicByDefault (AND across all list memberships)
 *   - drop entries from drop-listed sources (Images, Saved for later)
 *
 * Reads:  public/data/world/places.json (raw), public/data/world/lists.json (raw)
 * Writes: public/data/world/places.json (enriched, overwritten),
 *         public/data/world/lists.json   (filtered to non-empty),
 *         public/data/world/index.json   (per-country place index for the UI)
 *
 * Run: npx tsx scripts/enrich-places.ts
 */

import { readFile, writeFile } from "fs/promises";
import { LIST_MAPPING, STATUS_RANK, CATEGORY_SPECIFICITY, type ListMeta } from "./list-mapping";

// Single source of truth for the override schema + merge logic.
import type { PlaceOverride } from "../src/lib/admin/override.ts";
import type {
  ListOverride,
  CustomList,
} from "../src/lib/admin/list-override.ts";

async function readJsonFile<T>(path: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(path, "utf-8")) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

/**
 * Apply an override on top of the auto-derived enrich shape. Same projection
 * rules as src/lib/admin/override.ts#applyOverride but typed against
 * EnrichedPlace (which carries pipeline-only fields like `scopes`).
 */
function applyOverrideToEnriched(
  base: EnrichedPlace,
  ov: PlaceOverride | undefined,
): EnrichedPlace {
  if (!ov) return base;
  const baseTags = base.tags.filter((t) => !ov.suppressedTags?.includes(t));
  const tags = Array.from(new Set([...baseTags, ...(ov.extraTags ?? [])]));
  const categories =
    ov.customCategories && ov.customCategories.length > 0
      ? ov.customCategories
      : base.categories;
  const baseListIds = base.listIds.filter(
    (l) => !ov.removedLists?.includes(l),
  );
  const listIds = Array.from(
    new Set([...baseListIds, ...(ov.addedLists ?? [])]),
  );
  return {
    ...base,
    name: ov.customName ?? base.name,
    category: categories[0] ?? base.category,
    categories,
    status: ov.statusOverride ?? base.status,
    tags,
    listIds,
    publicByDefault: ov.publicByDefault ?? base.publicByDefault,
    note: ov.note,
    rating: ov.rating,
    lastVisited: ov.lastVisited,
    internalNote: ov.internalNote,
    updatedAt: ov.updatedAt,
  };
}

// ── Types ───────────────────────────────────────────────────────────────

interface RawPlace {
  id: string;
  ftid: string;
  name: string;
  title: string;
  lat: number;
  lng: number;
  address?: string;
  countryHint?: string;
  googleMapsUrl: string;
  listIds: string[];
  takeoutNotes: string[];
}

interface RawList {
  id: string;
  label: string;
  placeCount: number;
  placeIds: string[];
}

interface EnrichedPlace {
  id: string;
  ftid: string;
  name: string;
  title: string;
  lat: number;
  lng: number;
  address?: string;
  country: string;             // slug, e.g. "argentina" or "unknown"
  category?: string;            // primary category (most specific)
  categories: string[];         // all categories this place's lists confer
  status: "visited" | "want-to-go" | "favorite" | "unknown";
  tags: string[];
  scope?: string;               // primary scope slug for UI grouping
  scopes: string[];             // all scopes referenced by lists
  googleMapsUrl: string;
  listIds: string[];
  takeoutNotes: string[];
  publicByDefault: boolean;
  note?: string;               // hand-written blurb (from overrides)
  rating?: number;             // 1-5 (from overrides)
  lastVisited?: string;        // YYYY-MM (from overrides)
  internalNote?: string;       // admin-only, never read by public render
  updatedAt?: string;          // ISO timestamp of last admin edit
}

// ── Country derivation ──────────────────────────────────────────────────

// Map of country-name-as-it-appears-in-address → slug we use internally.
// Multiple keys allowed for aliases (USA / United States).
const COUNTRY_NAME_TO_SLUG: Record<string, string> = {
  "Argentina": "argentina",
  "Brazil": "brazil",
  "Brasil": "brazil",
  "Uruguay": "uruguay",
  "Paraguay": "paraguay",
  "Bolivia": "bolivia",
  "Chile": "chile",
  "Colombia": "colombia",
  "Peru": "peru",
  "Perú": "peru",
  "Ecuador": "ecuador",
  "El Salvador": "el-salvador",
  "Mexico": "mexico",
  "México": "mexico",
  "Canada": "canada",
  "USA": "united-states",
  "United States": "united-states",
  "Hungary": "hungary",
  "Magyarország": "hungary",
  "Belgium": "belgium",
  "België": "belgium",
  "Belgique": "belgium",
  "Poland": "poland",
  "Polska": "poland",
  "Czechia": "czechia",
  "Česko": "czechia",
  "Czech Republic": "czechia",
  "Slovakia": "slovakia",
  "Slovensko": "slovakia",
  "Austria": "austria",
  "Österreich": "austria",
  "Germany": "germany",
  "Deutschland": "germany",
  "Moldova": "moldova",
  "France": "france",
  "United Kingdom": "united-kingdom",
  "UK": "united-kingdom",
  "England": "united-kingdom",
  "Scotland": "united-kingdom",
  "Wales": "united-kingdom",
  "Northern Ireland": "united-kingdom",
  "Netherlands": "netherlands",
  "Nederland": "netherlands",
  "Switzerland": "switzerland",
  "Schweiz": "switzerland",
  "Suisse": "switzerland",
  "Sweden": "sweden",
  "Sverige": "sweden",
  "Norway": "norway",
  "Norge": "norway",
  "Romania": "romania",
  "România": "romania",
  "North Macedonia": "north-macedonia",
  "Turkey": "turkey",
  "Türkiye": "turkey",
  "China": "china",
  "Japan": "japan",
  "Thailand": "thailand",
  "India": "india",
  "Russia": "russia",
  "Россия": "russia",
  "Kazakhstan": "kazakhstan",
  "Kyrgyzstan": "kyrgyzstan",
  "Tajikistan": "tajikistan",
  "Uzbekistan": "uzbekistan",
  "Armenia": "armenia",
  "Yemen": "yemen",
  "Iraq": "iraq",
  "Iran": "iran",
  "Pakistan": "pakistan",
  "Australia": "australia",
  "South Africa": "south-africa",
  "Kenya": "kenya",
  "Madagascar": "madagascar",
  "Uganda": "uganda",
  "Jamaica": "jamaica",
  "Georgia": "georgia",
  "Morocco": "morocco",
  "Maroc": "morocco",
  "Indonesia": "indonesia",
  "Italy": "italy",
  "Italia": "italy",
  "Spain": "spain",
  "España": "spain",
  "Portugal": "portugal",
  "Greece": "greece",
  "Ελλάδα": "greece",
  "Vietnam": "vietnam",
  "Việt Nam": "vietnam",
  "South Korea": "south-korea",
  "Republic of Korea": "south-korea",
  "Korea": "south-korea",
};

// Rough lat/lng bounding boxes [lon_min, lat_min, lon_max, lat_max] for the
// countries Daniel has data in. Used only when address derivation fails.
// Note: overlapping bboxes (e.g. Argentina/Chile border) are resolved by the
// order — more specific/smaller countries listed first.
const COUNTRY_BBOXES: [string, number, number, number, number][] = [
  // Small countries first
  ["el-salvador", -90.2, 13.1, -87.7, 14.5],
  ["jamaica", -78.4, 17.7, -76.2, 18.6],
  ["north-macedonia", 20.5, 40.9, 23.0, 42.4],
  ["armenia", 43.4, 38.8, 46.6, 41.3],
  ["moldova", 26.6, 45.5, 30.2, 48.5],
  ["belgium", 2.5, 49.5, 6.4, 51.5],
  ["netherlands", 3.4, 50.8, 7.2, 53.6],
  ["switzerland", 5.9, 45.8, 10.5, 47.8],
  ["czechia", 12.1, 48.5, 18.9, 51.1],
  ["slovakia", 16.8, 47.7, 22.6, 49.6],
  ["austria", 9.5, 46.4, 17.2, 49.0],
  ["hungary", 16.1, 45.7, 22.9, 48.6],
  ["romania", 20.3, 43.6, 29.7, 48.3],
  ["georgia", 40.0, 41.0, 46.8, 43.6],
  ["uruguay", -58.5, -35.0, -53.0, -30.0],
  ["paraguay", -62.7, -27.6, -54.3, -19.3],
  ["uganda", 29.6, -1.5, 35.0, 4.2],
  ["kenya", 33.9, -4.7, 41.9, 5.5],
  ["tajikistan", 67.4, 36.7, 75.2, 41.0],
  ["kyrgyzstan", 69.3, 39.2, 80.3, 43.2],
  ["united-kingdom", -8.6, 49.9, 1.8, 60.9],
  // Mid-size
  ["france", -5.1, 41.3, 9.6, 51.1],
  ["germany", 5.9, 47.3, 15.0, 55.1],
  ["poland", 14.1, 49.0, 24.1, 54.9],
  ["sweden", 11.0, 55.3, 24.2, 69.1],
  ["norway", 4.6, 58.0, 31.1, 71.2],
  ["yemen", 42.6, 12.1, 53.1, 19.0],
  ["iraq", 38.8, 29.1, 48.6, 37.4],
  ["thailand", 97.3, 5.6, 105.6, 20.5],
  ["japan", 122.9, 24.0, 145.8, 45.5],
  ["uzbekistan", 56.0, 37.2, 73.1, 45.6],
  ["madagascar", 43.2, -25.6, 50.5, -11.9],
  ["pakistan", 60.9, 23.7, 77.0, 37.1],
  ["iran", 44.0, 25.1, 63.3, 39.8],
  ["turkey", 25.7, 35.8, 44.8, 42.1],
  ["mexico", -118.4, 14.5, -86.7, 32.7],
  ["colombia", -79.0, -4.3, -66.9, 12.5],
  ["ecuador", -92.0, -5.0, -75.2, 1.5],
  ["peru", -81.4, -18.4, -68.7, -0.04],
  ["bolivia", -69.7, -22.9, -57.5, -9.7],
  ["chile", -75.7, -56.0, -66.4, -17.5],
  ["south-africa", 16.5, -34.8, 32.9, -22.1],
  ["kazakhstan", 46.5, 40.6, 87.3, 55.4],
  // Large
  ["argentina", -73.5, -55.0, -53.5, -21.5],
  ["india", 68.1, 6.7, 97.4, 35.5],
  ["brazil", -74.0, -34.0, -34.5, 5.5],
  ["australia", 113.3, -43.6, 153.6, -10.7],
  ["china", 73.5, 18.2, 134.8, 53.6],
  ["united-states", -125.0, 24.0, -67.0, 49.5],
  ["united-states", -160.0, 19.0, -154.0, 22.5], // Hawaii
  ["united-states", -170.0, 51.0, -130.0, 71.0], // Alaska
  ["canada", -141.0, 41.7, -52.6, 83.0],
  ["russia", 19.6, 41.2, 180.0, 81.9],
  // Additional bboxes for countries not in scope lists but in data
  ["morocco", -13.2, 21.4, -1.0, 36.0],
  ["indonesia", 95.0, -11.0, 141.0, 6.0],
  ["italy", 6.6, 35.5, 18.5, 47.1],
  ["spain", -9.3, 36.0, 4.3, 43.8],
  ["portugal", -9.5, 36.9, -6.2, 42.2],
  ["greece", 19.4, 34.8, 28.2, 41.7],
  ["vietnam", 102.1, 8.4, 109.5, 23.4],
  ["south-korea", 124.6, 33.1, 131.9, 38.6],
];

function countryFromAddress(address: string): string | undefined {
  // 1. Try US-style address: "..., ST 12345" or "..., ST 12345-1234"
  if (/\b[A-Z]{2}\s+\d{5}(-\d{4})?\b/.test(address)) {
    return "united-states";
  }
  // 2. Longest country-name match. Search the whole address (not just the last
  //    segment) because some Google addresses put country mid-string.
  let best: { slug: string; len: number } | null = null;
  for (const [name, slug] of Object.entries(COUNTRY_NAME_TO_SLUG)) {
    // Match country name as a whole token (word boundaries) for non-symbol names.
    // For names with non-Latin or special chars, fall back to plain includes.
    const isAscii = /^[A-Za-z ]+$/.test(name);
    const found = isAscii
      ? new RegExp(`(?:^|[,\\s])${name}(?:[,\\s]|$)`).test(address)
      : address.includes(name);
    if (found && (!best || name.length > best.len)) {
      best = { slug, len: name.length };
    }
  }
  return best?.slug;
}

function countryFromCoords(lat: number, lng: number): string | undefined {
  for (const [slug, lonMin, latMin, lonMax, latMax] of COUNTRY_BBOXES) {
    if (lng >= lonMin && lng <= lonMax && lat >= latMin && lat <= latMax) {
      return slug;
    }
  }
  return undefined;
}

function deriveCountry(p: RawPlace): string {
  if (p.address) {
    const fromAddr = countryFromAddress(p.address);
    if (fromAddr) return fromAddr;
  }
  const fromCoords = countryFromCoords(p.lat, p.lng);
  if (fromCoords) return fromCoords;
  return "unknown";
}

// ── List → semantic resolution ──────────────────────────────────────────

function aggregateFromLists(listIds: string[]): {
  category?: string;
  categories: string[];
  status?: "visited" | "want-to-go" | "favorite";
  tags: string[];
  scopes: string[];
  publicByDefault: boolean;
  primaryScope?: string;
  drop: boolean;
} {
  const tags = new Set<string>();
  const scopes = new Set<string>();
  const categories = new Set<string>();
  let category: string | undefined;
  let categoryRank = -1;
  let status: ListMeta["status"] | undefined;
  let statusRank = -1;
  let publicByDefault = true;
  let primaryScope: string | undefined;
  let drop = false;

  for (const lid of listIds) {
    const meta = LIST_MAPPING[lid];
    if (!meta) continue;
    if (meta.drop) drop = true;

    // Category — track all + pick most specific as primary.
    if (meta.category) {
      categories.add(meta.category);
      const rank = CATEGORY_SPECIFICITY[meta.category] ?? 5;
      if (rank > categoryRank) {
        category = meta.category;
        categoryRank = rank;
      }
    }

    // Status — most committed wins (visited > favorite > want-to-go).
    if (meta.status) {
      const rank = STATUS_RANK[meta.status];
      if (rank > statusRank) {
        status = meta.status;
        statusRank = rank;
      }
    }

    // Tags — union
    for (const t of meta.tags ?? []) tags.add(t);

    // Scope — first explicit scope wins as primary; all collected.
    if (meta.scope) {
      scopes.add(meta.scope);
      if (!primaryScope) primaryScope = meta.scope;
    }

    // Public — AND
    if (meta.publicByDefault === false) publicByDefault = false;
  }

  return {
    category,
    categories: [...categories],
    status,
    tags: [...tags],
    scopes: [...scopes],
    publicByDefault,
    primaryScope,
    drop,
  };
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  // All inputs read in parallel.
  const [places, lists, overridesRaw, overridesLegacyRaw, listOverridesRaw, customListsRaw] =
    await Promise.all([
      readJsonFile<RawPlace[]>("public/data/world/_raw-places.json"),
      readJsonFile<RawList[]>("public/data/world/_raw-lists.json"),
      readJsonFile<Record<string, unknown>>("public/data/world/overrides.json"),
      readJsonFile<Record<string, unknown>>("public/data/world/notes.json"),
      readJsonFile<Record<string, ListOverride>>(
        "public/data/world/list-overrides.json",
      ),
      readJsonFile<Record<string, CustomList>>(
        "public/data/world/custom-lists.json",
      ),
    ]);
  if (!places || !lists) {
    throw new Error("Missing _raw-places.json or _raw-lists.json. Run resolve-places first.");
  }

  const overridesSrc = overridesRaw ?? overridesLegacyRaw ?? {};
  const overrides = Object.fromEntries(
    Object.entries(overridesSrc).filter(([k]) => !k.startsWith("_")),
  ) as Record<string, PlaceOverride>;
  const listOverrides = listOverridesRaw ?? {};
  const customLists = customListsRaw ?? {};

  console.log(
    `Reading ${places.length} places from ${lists.length} lists, ` +
      `${Object.keys(overrides).length} place overrides, ` +
      `${Object.keys(listOverrides).length} list overrides, ` +
      `${Object.keys(customLists).length} custom lists`,
  );

  // 1. Sanity-check list mapping coverage
  const mappedIds = new Set(Object.keys(LIST_MAPPING));
  const rawIds = new Set(lists.map((l) => l.id));
  const unmapped = [...rawIds].filter((id) => !mappedIds.has(id));
  const extraMapped = [...mappedIds].filter((id) => !rawIds.has(id));
  if (unmapped.length > 0) {
    console.log(`\n⚠ Unmapped list IDs (will be ignored):\n  ${unmapped.join("\n  ")}`);
  }
  if (extraMapped.length > 0) {
    console.log(`\n⚠ Mapping entries with no source list:\n  ${extraMapped.join("\n  ")}`);
  }

  const enriched: EnrichedPlace[] = [];
  const droppedCount = { byList: 0, byOverride: 0 };

  for (const p of places) {
    const agg = aggregateFromLists(p.listIds);
    if (agg.drop) {
      droppedCount.byList++;
      continue;
    }
    const ov = overrides[p.id];
    if (ov?.hidden) {
      droppedCount.byOverride++;
      continue;
    }

    const base: EnrichedPlace = {
      id: p.id,
      ftid: p.ftid,
      name: p.name,
      title: p.title,
      lat: p.lat,
      lng: p.lng,
      address: p.address,
      country: deriveCountry(p),
      category: agg.category,
      categories: agg.categories,
      status: agg.status ?? "unknown",
      tags: agg.tags,
      scope: agg.primaryScope,
      scopes: agg.scopes,
      googleMapsUrl: p.googleMapsUrl,
      listIds: p.listIds,
      takeoutNotes: p.takeoutNotes,
      publicByDefault: agg.publicByDefault,
    };
    enriched.push(applyOverrideToEnriched(base, ov));
  }

  console.log(
    `\nEnrichment: ${enriched.length} kept, ` +
      `${droppedCount.byList} dropped (list-flagged), ` +
      `${droppedCount.byOverride} dropped (override.hidden)`,
  );

  // Private places (publicByDefault: false) never leave this machine. The
  // output JSON is committed to a public repo and served verbatim from
  // /public, so filter them out before anything below derives from it —
  // stats, index, and list memberships all flow from this array.
  const privateCount = enriched.filter((p) => !p.publicByDefault).length;
  const published = enriched.filter((p) => p.publicByDefault);

  // 3. Stats
  const byCountry = new Map<string, number>();
  for (const p of published) byCountry.set(p.country, (byCountry.get(p.country) ?? 0) + 1);
  const byCategory = new Map<string | undefined, number>();
  for (const p of published) byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1);
  const byStatus = new Map<string, number>();
  for (const p of published) byStatus.set(p.status, (byStatus.get(p.status) ?? 0) + 1);

  console.log("\n=== Country distribution (after fix) ===");
  const countrySorted = [...byCountry.entries()].sort((a, b) => b[1] - a[1]);
  for (const [c, n] of countrySorted) {
    console.log(`  ${String(n).padStart(4)}  ${c}`);
  }

  console.log("\n=== Category distribution ===");
  const catSorted = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);
  for (const [c, n] of catSorted) {
    console.log(`  ${String(n).padStart(4)}  ${c ?? "(uncategorized)"}`);
  }

  console.log("\n=== Status distribution ===");
  for (const [s, n] of byStatus) {
    console.log(`  ${String(n).padStart(4)}  ${s}`);
  }

  console.log(`\nPrivate places excluded from output: ${privateCount}`);

  // 4. Build per-country index for fast UI loading
  const byCountryIdx: Record<string, string[]> = {};
  for (const p of published) {
    const arr = byCountryIdx[p.country] ?? [];
    arr.push(p.id);
    byCountryIdx[p.country] = arr;
  }

  const memberPlaceIds = new Map<string, string[]>();
  for (const p of published) {
    for (const lid of p.listIds) {
      const arr = memberPlaceIds.get(lid) ?? [];
      arr.push(p.id);
      memberPlaceIds.set(lid, arr);
    }
  }

  const autoListsMerged = lists
    .map((l) => {
      const meta = LIST_MAPPING[l.id];
      if (meta?.drop) return null;
      const ov = listOverrides[l.id];
      if (ov?.hidden) return null;
      const placeIds = memberPlaceIds.get(l.id) ?? [];
      if (placeIds.length === 0) return null;
      return {
        id: l.id,
        label: ov?.label ?? meta?.label ?? l.label,
        category: ov?.category ?? meta?.category,
        status: ov?.status ?? meta?.status,
        scope: ov?.scope ?? meta?.scope,
        tags: ov?.tags,
        custom: false,
        placeCount: placeIds.length,
        placeIds,
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  const customListsMerged = Object.values(customLists).map((cl) => {
    const placeIds = memberPlaceIds.get(cl.id) ?? [];
    return {
      id: cl.id,
      label: cl.label,
      category: cl.category,
      status: cl.status,
      scope: cl.scope,
      tags: cl.tags,
      custom: true,
      placeCount: placeIds.length,
      placeIds,
    };
  });

  const enrichedLists = [...autoListsMerged, ...customListsMerged];

  console.log(`\nLists kept: ${enrichedLists.length} / ${lists.length}`);

  // 6. Write outputs
  await writeFile("public/data/world/places.json", JSON.stringify(published, null, 2));
  await writeFile("public/data/world/lists.json", JSON.stringify(enrichedLists, null, 2));
  await writeFile(
    "public/data/world/index.json",
    JSON.stringify(
      {
        totalPlaces: published.length,
        privateCount,
        byCountry: Object.fromEntries(
          countrySorted.map(([k, v]) => [k, v]),
        ),
        byCategory: Object.fromEntries(
          catSorted.map(([k, v]) => [k ?? "_uncategorized", v]),
        ),
        byStatus: Object.fromEntries(byStatus),
        countryToPlaceIds: byCountryIdx,
      },
      null,
      2,
    ),
  );

  console.log("\nWrote:");
  console.log("  public/data/world/places.json (enriched)");
  console.log("  public/data/world/lists.json  (filtered + labeled)");
  console.log("  public/data/world/index.json  (country/category index)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
