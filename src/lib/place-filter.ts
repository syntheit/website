import type { Place, PlaceFilter } from "@/types/world";

/**
 * Apply a PlaceFilter to a list of places. Single source of truth for the
 * filter shape so the chip counts, the list, and the map all agree.
 */
export function filterPlaces(places: Place[], filter: PlaceFilter): Place[] {
  const q = filter.search?.toLowerCase().trim();
  const bb = filter.bbox;
  return places.filter((p) => {
    if (filter.status && p.status !== filter.status) return false;
    if (filter.country && p.country !== filter.country) return false;
    if (filter.category && !p.categories.includes(filter.category)) return false;
    if (
      bb &&
      (p.lat < bb.minLat ||
        p.lat > bb.maxLat ||
        p.lng < bb.minLng ||
        p.lng > bb.maxLng)
    ) {
      return false;
    }
    if (q) {
      const hay = `${p.name} ${p.address ?? ""} ${p.note ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/** Counts per category for a set of places (a place contributes to each of its categories). */
export function categoryCounts(places: Place[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of places) {
    for (const c of p.categories) {
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
  }
  return counts;
}

/** Counts per country for a set of places. */
export function countryCounts(places: Place[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of places) {
    counts.set(p.country, (counts.get(p.country) ?? 0) + 1);
  }
  return counts;
}
