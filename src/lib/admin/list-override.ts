/**
 * Types + shared logic for the list-curation layer.
 *
 * Two kinds of lists exist:
 *  - Auto lists (from Takeout CSVs): membership comes from Google Maps,
 *    metadata can be edited via ListOverride.
 *  - Custom lists (admin-created): metadata is canonical, no placeIds — a
 *    place is "in" a custom list by virtue of having the list's id in its
 *    PlaceOverride.addedLists.
 */

import type { List } from "@/types/world";
import { slugify } from "@/lib/utils";

/** Status values lists can have (no "unknown"; that's for places, not lists). */
export type ListStatus = NonNullable<List["status"]>;

export interface ListOverride {
  label?: string;
  category?: string;
  status?: ListStatus;
  tags?: string[];
  scope?: string;
  hidden?: boolean;
  updatedAt?: string;
}

export interface CustomList {
  id: string;
  label: string;
  category?: string;
  status?: ListStatus;
  tags?: string[];
  scope?: string;
  createdAt: string;
  updatedAt: string;
}

export type ListOverridesMap = Record<string, ListOverride>;
export type CustomListsMap = Record<string, CustomList>;

export const CUSTOM_LIST_PREFIX = "custom_";

export function isCustomListId(id: string): boolean {
  return id.startsWith(CUSTOM_LIST_PREFIX);
}

export function customListIdFromLabel(label: string): string {
  const slug = slugify(label).slice(0, 48) || "list";
  return `${CUSTOM_LIST_PREFIX}${slug}`;
}

/**
 * Project a list-override on top of a base list. Used by both the admin UI
 * (for instant preview after edits) and the enrich pipeline (for the public
 * site build). Single source of truth — keeps the two in lockstep.
 */
export function applyListOverride(base: List, ov: ListOverride | undefined): List {
  if (!ov) return base;
  return {
    ...base,
    label: ov.label ?? base.label,
    category: ov.category ?? base.category,
    status: ov.status ?? base.status,
    tags: ov.tags ?? base.tags,
    scope: ov.scope ?? base.scope,
  };
}
