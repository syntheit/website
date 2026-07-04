/**
 * Shared types + merge logic for the per-place curation overlay.
 *
 * Used by both the build-time enrich pipeline (scripts/enrich-places.ts) and
 * the admin UI's in-memory preview (AdminPlacesBrowser). Keeping a single
 * implementation prevents the admin view from drifting away from what the
 * public site will render after the next enrich pass.
 */

import type { Place, PlaceStatus } from "@/types/world";

export interface PlaceOverride {
  note?: string;
  rating?: number;
  lastVisited?: string;
  customName?: string;
  /**
   * Replaces the auto-derived categories array entirely when present.
   * Places can have multiple categories (Google Maps style — a place can be
   * both a bar and a restaurant). First entry is treated as primary for
   * map-pin coloring.
   */
  customCategories?: string[];
  statusOverride?: PlaceStatus;
  extraTags?: string[];
  suppressedTags?: string[];
  /** List IDs this place is in beyond what Takeout said. */
  addedLists?: string[];
  /** List IDs to exclude this place from (overrides Takeout membership). */
  removedLists?: string[];
  publicByDefault?: boolean;
  hidden?: boolean;
  internalNote?: string;
  updatedAt?: string;
}

export type OverridesMap = Record<string, PlaceOverride>;

export const STATUS_VALUES = [
  "visited",
  "want-to-go",
  "favorite",
] as const satisfies readonly PlaceStatus[];

/**
 * Project an override on top of an auto-derived Place. Returns the merged
 * shape ready for rendering. Does NOT filter out `hidden` — the caller
 * decides whether to drop hidden places (the public site does, the admin
 * doesn't).
 */
/**
 * Compute the addedLists/removedLists delta between a place's raw (Takeout)
 * list membership and its current desired membership. Result fields are
 * undefined when empty so they don't pollute the stored override.
 */
export function computeListDelta(
  rawListIds: string[],
  currentListIds: string[],
): Pick<PlaceOverride, "addedLists" | "removedLists"> {
  const rawSet = new Set(rawListIds);
  const currSet = new Set(currentListIds);
  const addedLists = [...currSet].filter((l) => !rawSet.has(l));
  const removedLists = [...rawSet].filter((l) => !currSet.has(l));
  return {
    addedLists: addedLists.length > 0 ? addedLists : undefined,
    removedLists: removedLists.length > 0 ? removedLists : undefined,
  };
}

export function applyOverride(place: Place, ov: PlaceOverride | undefined): Place {
  if (!ov) return place;
  const baseTags = place.tags.filter((t) => !ov.suppressedTags?.includes(t));
  const tags = Array.from(new Set([...baseTags, ...(ov.extraTags ?? [])]));
  const categories =
    ov.customCategories && ov.customCategories.length > 0
      ? ov.customCategories
      : place.categories;
  const baseListIds = place.listIds.filter(
    (l) => !ov.removedLists?.includes(l),
  );
  const listIds = Array.from(new Set([...baseListIds, ...(ov.addedLists ?? [])]));
  return {
    ...place,
    name: ov.customName ?? place.name,
    category: categories[0] ?? place.category,
    categories,
    status: ov.statusOverride ?? place.status,
    tags,
    listIds,
    publicByDefault: ov.publicByDefault ?? place.publicByDefault,
    note: ov.note ?? place.note,
    rating: ov.rating ?? place.rating,
    lastVisited: ov.lastVisited ?? place.lastVisited,
    internalNote: ov.internalNote,
    updatedAt: ov.updatedAt,
  };
}
