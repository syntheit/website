import "server-only";

import { unstable_cache } from "next/cache";
import type { Place } from "@/types/world";
import { ALL_PLACES } from "./world-places";
import { applyOverride } from "./admin/override";
import { readOverrides } from "./admin/overrides-store";

/**
 * Runtime public place list: the build-time BASE facts (places.json) merged
 * with the admin curation/override layer read fresh from disk. This is what
 * makes admin edits show live without re-running the enrich script — the
 * admin's `revalidateTag("world-data")` busts the cache below.
 *
 * Dropped from the result:
 *   - places with `publicByDefault === false` (private; the base JSON already
 *     excludes these, but an override could flip a public place private)
 *   - places an override marks `hidden`
 *
 * Server-only: `readOverrides` touches the filesystem, and the merged list can
 * carry admin-set fields (contacts, internalNote is not exposed but the source
 * override is) — this must never reach the client bundle.
 */
export const getPublicPlaces = unstable_cache(
  async (): Promise<Place[]> => {
    const overrides = await readOverrides();
    const out: Place[] = [];
    for (const place of ALL_PLACES) {
      const ov = overrides[place.id];
      if (ov?.hidden) continue;
      const merged = applyOverride(place, ov);
      if (merged.publicByDefault === false) continue;
      // internalNote is admin-only and must never reach the client bundle —
      // applyOverride copies it through from the override, so strip it here
      // (mirrors the enrich script's sanitize step).
      const { internalNote: _drop, ...publicPlace } = merged;
      void _drop;
      out.push(publicPlace);
    }
    return out;
  },
  ["world-public-places"],
  { tags: ["world-data"] },
);

export async function getPublicPlace(id: string): Promise<Place | undefined> {
  const places = await getPublicPlaces();
  return places.find((p) => p.id === id);
}
