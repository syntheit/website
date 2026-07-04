/**
 * Auto-derive a Location for any country/city slug that has tagged places or
 * resources, even if it isn't in the hand-curated `locations` array in
 * src/data/world-data.ts.
 *
 * Lets /world/[slug] cover every country in the dataset instead of just the
 * ~50 hardcoded ones.
 */

import type { Location, MapViewport } from "@/data/world-data";
import { locations } from "@/data/world-data";
import {
  ALL_PLACES,
  WORLD_INDEX,
  countryLabel,
} from "@/lib/world-places";
import { ALL_RESOURCES } from "@/lib/resources";

const LOCATION_BY_SLUG = new Map(locations.map((l) => [l.slug, l]));

// Places whose country resolution failed land in the "unknown" bucket. It's
// meaningful in the admin, but it isn't a destination — keep it out of the
// sidebar, static params, and location pages. (FilterChips and the admin
// browser exclude it separately.)
const HIDDEN_COUNTRY_SLUGS = new Set(["unknown"]);

// All country slugs that have either places or resources tagged. Used by
// generateStaticParams so every reachable country has a static page.
export function allKnownCountrySlugs(): string[] {
  const set = new Set<string>();
  for (const slug of Object.keys(WORLD_INDEX.byCountry)) set.add(slug);
  for (const r of ALL_RESOURCES) for (const c of r.countries) set.add(c);
  for (const l of locations) if (l.type === "country") set.add(l.slug);
  return [...set].filter((s) => !HIDDEN_COUNTRY_SLUGS.has(s));
}

export interface SidebarCountry {
  slug: string;
  name: string;
  placeCount: number;
  resourceCount: number;
}

/**
 * Auto-discoverable countries for the sidebar — every country with tagged
 * data that isn't already in the hand-curated tree. Threshold drops the
 * single-resource long tail (often Claude-over-tagged historical articles).
 */
export function autoGenCountriesForSidebar(): SidebarCountry[] {
  const curated = new Set(
    locations.filter((l) => l.type === "country").map((l) => l.slug),
  );
  const places = WORLD_INDEX.byCountry;
  const resCounts: Record<string, number> = {};
  for (const r of ALL_RESOURCES) {
    for (const c of r.countries) resCounts[c] = (resCounts[c] ?? 0) + 1;
  }
  const slugs = new Set<string>([
    ...Object.keys(places),
    ...Object.keys(resCounts),
  ]);
  const out: SidebarCountry[] = [];
  for (const slug of slugs) {
    if (curated.has(slug)) continue;
    if (HIDDEN_COUNTRY_SLUGS.has(slug)) continue;
    const placeCount = places[slug] ?? 0;
    const resourceCount = resCounts[slug] ?? 0;
    if (placeCount === 0 && resourceCount < 2) continue;
    out.push({
      slug,
      name: countryLabel(slug),
      placeCount,
      resourceCount,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

// Compute a sensible viewport from the bounding box of places in a country.
// Zoom heuristic: smaller bbox → tighter zoom. Pads a touch so the markers
// aren't flush against the edge.
function viewportFromCountryPlaces(country: string): MapViewport | null {
  const places = ALL_PLACES.filter((p) => p.country === country);
  if (places.length === 0) return null;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const p of places) {
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  }
  const lat = (minLat + maxLat) / 2;
  const lng = (minLng + maxLng) / 2;
  const span = Math.max(maxLat - minLat, (maxLng - minLng) * 0.7);
  let zoom: number;
  if (span < 0.5) zoom = 10;
  else if (span < 2) zoom = 8;
  else if (span < 6) zoom = 6;
  else if (span < 15) zoom = 4;
  else zoom = 3;
  return { lat, lng, zoom };
}

/**
 * Resolve a slug to a Location. Hand-curated entries win. Otherwise we derive
 * a minimal Location from the dataset. Returns null if nothing is tagged with
 * the slug (→ 404).
 */
export function deriveLocation(slug: string): Location | null {
  const handCurated = LOCATION_BY_SLUG.get(slug);
  if (handCurated) return handCurated;
  if (HIDDEN_COUNTRY_SLUGS.has(slug)) return null;

  const placeCount = WORLD_INDEX.byCountry[slug] ?? 0;
  const hasResources = ALL_RESOURCES.some((r) => r.countries.includes(slug));
  if (placeCount === 0 && !hasResources) return null;

  const viewport: MapViewport =
    viewportFromCountryPlaces(slug) ?? { lat: 0, lng: 0, zoom: 2 };

  return {
    slug,
    name: countryLabel(slug),
    type: "country",
    region: "Other",
    status: placeCount > 0 ? "visited" : "want-to-visit",
    placeCount,
    meta: {},
    viewport,
    availableCategories: [],
    availableLists: [],
    notes: [],
  };
}
