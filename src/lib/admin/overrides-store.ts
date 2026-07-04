/**
 * Server-side store for the per-place curation overlay edited via /admin.
 * Atomic writes (tmp + rename). Single-writer assumed (one admin user).
 *
 * Path: $WORLD_DATA_DIR if set (mounted volume on the harbor deploy), else
 * `public/data/world/`. Reads prefer `overrides.json`; falls back to legacy
 * `notes.json` if only that file exists. Writes always land in `overrides.json`.
 */

import { readFile, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import type { PlaceOverride, OverridesMap } from "./override";
import type {
  ListOverride,
  ListOverridesMap,
  CustomList,
  CustomListsMap,
} from "./list-override";

export type { PlaceOverride, OverridesMap, ListOverride, CustomList };

const dataDir =
  process.env.WORLD_DATA_DIR ?? join(process.cwd(), "public", "data", "world");

// `false` here is fine because false-isn't-set-by-pruning — callers that want
// to clear `hidden` send a literal false and we map it to the unset state.
const FALSY_BOOL_STRIP = Object.freeze({ hidden: false } as const);

/**
 * Read a JSON file, returning null on missing. Try/catch on ENOENT instead
 * of existsSync-then-read avoids TOCTOU races. Exported so the build-time
 * enrich script can use the same primitive.
 */
export async function readJson(
  path: string,
): Promise<Record<string, unknown> | null> {
  try {
    return JSON.parse(await readFile(path, "utf-8")) as Record<string, unknown>;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

export async function readOverrides(): Promise<OverridesMap> {
  const raw =
    (await readJson(join(dataDir, "overrides.json"))) ??
    (await readJson(join(dataDir, "notes.json")));
  if (!raw) return {};
  const out: OverridesMap = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith("_")) continue; // legacy schema-doc keys
    out[k] = v as PlaceOverride;
  }
  return out;
}

async function writeJsonAtomic(filename: string, data: unknown): Promise<void> {
  const path = join(dataDir, filename);
  const tmp = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmp, JSON.stringify(data, null, 2));
  await rename(tmp, path);
}

// tmp+rename is atomic against torn files, not against interleaved
// read-modify-write cycles: two overlapping PATCHes would each write back a
// map missing the other's change. Serialize every mutation behind a single
// in-process chain — sufficient for the single-admin, single-process deploy.
let mutationChain: Promise<unknown> = Promise.resolve();
function serialized<T>(fn: () => Promise<T>): Promise<T> {
  const run = mutationChain.then(fn, fn);
  mutationChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function writeOverridesAtomic(next: OverridesMap): Promise<void> {
  await writeJsonAtomic("overrides.json", next);
}

const TRIM_KEYS = [
  "note",
  "lastVisited",
  "customName",
  "internalNote",
] as const satisfies readonly (keyof PlaceOverride)[];

function pruneOverride(ov: PlaceOverride): PlaceOverride | null {
  const out: PlaceOverride = {};
  for (const k of TRIM_KEYS) {
    const v = ov[k];
    if (typeof v === "string" && v.trim() !== "")
      (out[k] as unknown) = v.trim();
  }
  if (typeof ov.rating === "number") out.rating = ov.rating;
  if (ov.statusOverride) out.statusOverride = ov.statusOverride;
  const cleanArr = (arr: string[] | undefined) =>
    arr ? [...new Set(arr.map((t) => t.trim()).filter(Boolean))] : undefined;
  const cats = cleanArr(ov.customCategories);
  if (cats && cats.length > 0) out.customCategories = cats;
  const extra = cleanArr(ov.extraTags);
  if (extra && extra.length > 0) out.extraTags = extra;
  const supp = cleanArr(ov.suppressedTags);
  if (supp && supp.length > 0) out.suppressedTags = supp;
  const added = cleanArr(ov.addedLists);
  if (added && added.length > 0) out.addedLists = added;
  const removed = cleanArr(ov.removedLists);
  if (removed && removed.length > 0) out.removedLists = removed;
  if (typeof ov.publicByDefault === "boolean")
    out.publicByDefault = ov.publicByDefault;
  if (ov.hidden) out.hidden = true;
  if (Object.keys(out).length === 0) return null;
  out.updatedAt = new Date().toISOString();
  return out;
}

function essentiallyEqual(
  a: PlaceOverride | null | undefined,
  b: PlaceOverride | null | undefined,
): boolean {
  // Compare ignoring `updatedAt` — that's the metadata we'd bump on every
  // touch, and we want to avoid writes when nothing else changed.
  const stripped = (x: PlaceOverride | null | undefined) => {
    if (x === null || x === undefined) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { updatedAt, ...rest } = x;
    return JSON.stringify(rest, Object.keys(rest).sort());
  };
  return stripped(a) === stripped(b);
}

/**
 * Shallow-merge a patch into the existing override. Booleans are merged
 * literally (so sending `hidden: false` clears the flag). String fields with
 * `undefined` are left untouched; pass `""` to clear them. Short-circuits
 * when the resulting override is structurally identical to the existing one
 * (avoids no-op disk writes + spurious cache invalidations).
 */
export async function patchOverride(
  placeId: string,
  patch: Partial<PlaceOverride>,
): Promise<PlaceOverride | null> {
  return serialized(async () => {
    const all = await readOverrides();
    const existing = all[placeId];
    const merged: PlaceOverride = { ...(existing ?? {}), ...patch };
    for (const [key, falsyValue] of Object.entries(FALSY_BOOL_STRIP)) {
      if (patch[key as keyof PlaceOverride] === falsyValue) {
        delete (merged as Record<string, unknown>)[key];
      }
    }
    const pruned = pruneOverride(merged);
    if (essentiallyEqual(pruned, existing)) {
      return existing ?? null;
    }
    if (pruned === null) {
      delete all[placeId];
    } else {
      all[placeId] = pruned;
    }
    await writeOverridesAtomic(all);
    return pruned;
  });
}

// ── List metadata overrides (for auto lists from Takeout) ──────────────

export async function readListOverrides(): Promise<ListOverridesMap> {
  const raw = await readJson(join(dataDir, "list-overrides.json"));
  if (!raw) return {};
  return raw as ListOverridesMap;
}

function pruneListOverride(ov: ListOverride): ListOverride | null {
  const out: ListOverride = {};
  if (ov.label?.trim()) out.label = ov.label.trim();
  if (ov.category?.trim()) out.category = ov.category.trim();
  if (ov.status) out.status = ov.status;
  if (ov.scope?.trim()) out.scope = ov.scope.trim();
  if (ov.tags && ov.tags.length > 0) {
    const t = [...new Set(ov.tags.map((s) => s.trim()).filter(Boolean))];
    if (t.length > 0) out.tags = t;
  }
  if (ov.hidden) out.hidden = true;
  if (Object.keys(out).length === 0) return null;
  out.updatedAt = new Date().toISOString();
  return out;
}

export async function patchListOverride(
  listId: string,
  patch: Partial<ListOverride>,
): Promise<ListOverride | null> {
  return serialized(async () => {
    const all = await readListOverrides();
    const merged: ListOverride = { ...all[listId], ...patch };
    if (patch.hidden === false) delete merged.hidden;
    const pruned = pruneListOverride(merged);
    if (pruned === null) delete all[listId];
    else all[listId] = pruned;
    await writeJsonAtomic("list-overrides.json", all);
    return pruned;
  });
}

// ── Custom lists (admin-created, not from Takeout) ─────────────────────

export async function readCustomLists(): Promise<CustomListsMap> {
  const raw = await readJson(join(dataDir, "custom-lists.json"));
  if (!raw) return {};
  return raw as CustomListsMap;
}

async function writeCustomLists(next: CustomListsMap): Promise<void> {
  await writeJsonAtomic("custom-lists.json", next);
}

export async function upsertCustomList(list: CustomList): Promise<CustomList> {
  return serialized(async () => {
    const all = await readCustomLists();
    all[list.id] = list;
    await writeCustomLists(all);
    return list;
  });
}

export async function deleteCustomList(id: string): Promise<boolean> {
  return serialized(async () => {
    const all = await readCustomLists();
    if (!(id in all)) return false;
    delete all[id];
    await writeCustomLists(all);
    return true;
  });
}
