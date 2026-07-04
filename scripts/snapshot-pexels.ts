#!/usr/bin/env tsx
/**
 * Refresh public/data/photos.json from the configured Pexels Collection.
 *
 * Runs in two modes:
 *
 *   - Permissive (default):  for `prebuild`. Missing env or transient
 *                            Pexels failures with an existing snapshot
 *                            on disk → log and exit 0 (don't break the
 *                            build).
 *   - Strict (`--strict`):   for manual `pnpm sync-photos`. Any
 *                            unexpected condition exits non-zero.
 *
 * Always exits non-zero — even in permissive mode — if the Pexels
 * Collection returns zero photos or if no snapshot exists to fall back
 * on. A blank gallery in production is worse than a failed build.
 *
 * The snapshot is the same JSON shape the `Photo` type expects, so the
 * site reads it directly with no transform.
 */

import { config as loadEnv } from "dotenv";
import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchPexelsCollection } from "../src/lib/photos";

loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const OUT_PATH = join(REPO_ROOT, "public", "data", "photos.json");
const TMP_PATH = `${OUT_PATH}.tmp`;

const STRICT = process.argv.includes("--strict");

function log(...args: unknown[]) {
  console.log("[snapshot-pexels]", ...args);
}
function warn(...args: unknown[]) {
  console.warn("[snapshot-pexels]", ...args);
}
function err(...args: unknown[]) {
  console.error("[snapshot-pexels]", ...args);
}

/** Fail in strict mode, log and continue in permissive mode. */
function softFail(message: string): void {
  if (STRICT) {
    err(message);
    process.exit(1);
  }
  warn(message, "(permissive — skipping)");
}

/** Always fail, regardless of mode. Used for conditions that mean we
 * have no good output to ship. */
function hardFail(message: string): never {
  err(message);
  process.exit(1);
}

async function readExisting(path: string): Promise<string | null> {
  try {
    return await fs.readFile(path, "utf8");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

async function writeAtomic(path: string, contents: string): Promise<void> {
  await fs.writeFile(TMP_PATH, contents, "utf8");
  await fs.rename(TMP_PATH, path);
}

async function main(): Promise<void> {
  const collectionId = process.env.PEXELS_COLLECTION_ID;
  const apiKey = process.env.PEXELS_API_KEY;

  if (!collectionId || !apiKey) {
    softFail(
      "PEXELS_API_KEY / PEXELS_COLLECTION_ID not set — cannot refresh snapshot.",
    );
    return;
  }

  log(`fetching collection ${collectionId}…`);

  // Kick off the read of the existing snapshot in parallel with the API
  // call — we need it either way (for comparison or as evidence we have
  // a fallback to ride on).
  const [fetchResult, existing] = await Promise.all([
    fetchPexelsCollection(collectionId, apiKey).then(
      (photos) => ({ ok: true as const, photos }),
      (e: unknown) => ({
        ok: false as const,
        message: e instanceof Error ? e.message : String(e),
      }),
    ),
    readExisting(OUT_PATH),
  ]);

  if (!fetchResult.ok) {
    if (existing === null) {
      hardFail(
        `Pexels fetch failed and no existing snapshot at ${OUT_PATH}: ${fetchResult.message}`,
      );
    }
    softFail(`Pexels fetch failed: ${fetchResult.message}`);
    return;
  }

  const photos = fetchResult.photos;

  if (photos.length === 0) {
    // A zero-photo response almost always means a misconfigured
    // collection ID or a transient API hiccup — never something we want
    // to commit. Fail loudly in both modes.
    hardFail(
      `Pexels collection ${collectionId} returned 0 photos. Refusing to overwrite snapshot.`,
    );
  }

  const next = `${JSON.stringify(photos, null, 2)}\n`;

  if (existing === next) {
    log(`snapshot unchanged (${photos.length} photos).`);
    return;
  }

  const prevCount = existing ? (JSON.parse(existing) as unknown[]).length : 0;
  await writeAtomic(OUT_PATH, next);
  log(
    `wrote ${photos.length} photos to public/data/photos.json` +
      (existing ? ` (was ${prevCount}).` : "."),
  );
}

main().catch((e) => {
  err(e instanceof Error ? e.stack ?? e.message : e);
  process.exit(1);
});
