import type { Place, List, WorldIndex } from "@/types/world";

// These imports are processed at build time. Next.js will tree-shake the JSON
// once and ship the parsed object to the client bundle. For 1912 places (~1 MB
// raw, ~250 KB gzipped) this is fine. If it grows, we can split per-country.
import placesJson from "../../public/data/world/places.json";
import listsJson from "../../public/data/world/lists.json";
import indexJson from "../../public/data/world/index.json";

export const ALL_PLACES = placesJson as Place[];
export const ALL_LISTS = listsJson as List[];
export const WORLD_INDEX = indexJson as WorldIndex;

// Build runtime lookup maps once.
const placeById = new Map(ALL_PLACES.map((p) => [p.id, p]));
const placesByCountry = new Map<string, Place[]>();
for (const p of ALL_PLACES) {
  const arr = placesByCountry.get(p.country) ?? [];
  arr.push(p);
  placesByCountry.set(p.country, arr);
}

export function getPlace(id: string): Place | undefined {
  return placeById.get(id);
}

export function getPlacesByCountry(country: string): Place[] {
  return placesByCountry.get(country) ?? [];
}

export function publicPlaces(): Place[] {
  return ALL_PLACES.filter((p) => p.publicByDefault);
}

export interface Bbox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

/**
 * Derive an approximate bounding box from a Mapbox/MapLibre viewport (center +
 * zoom). Used by city/region location pages so we can filter places by geography
 * when there's no explicit per-place "scope" tag.
 *
 * pad shrinks as zoom grows: zoom 10 (regional) ~0.5° each side, zoom 12 (city)
 * ~0.125°, zoom 14 (neighborhood) ~0.03°.
 */
export function bboxFromViewport(v: { lat: number; lng: number; zoom: number }): Bbox {
  const pad = Math.max(0.02, 0.5 / Math.pow(2, v.zoom - 10));
  return {
    minLat: v.lat - pad,
    maxLat: v.lat + pad,
    minLng: v.lng - pad,
    maxLng: v.lng + pad,
  };
}

export function placesInBbox(places: Place[], bbox: Bbox): Place[] {
  return places.filter(
    (p) =>
      p.lat >= bbox.minLat &&
      p.lat <= bbox.maxLat &&
      p.lng >= bbox.minLng &&
      p.lng <= bbox.maxLng,
  );
}

export function countPlacesInBbox(bbox: Bbox): number {
  let n = 0;
  for (const p of ALL_PLACES) {
    if (
      p.lat >= bbox.minLat &&
      p.lat <= bbox.maxLat &&
      p.lng >= bbox.minLng &&
      p.lng <= bbox.maxLng
    ) {
      n++;
    }
  }
  return n;
}

// Friendly labels for slugs. For categories, status, countries.
export const CATEGORY_LABELS: Record<string, string> = {
  restaurants: "Restaurants",
  cafes: "Cafes",
  bars: "Bars",
  museums: "Museums",
  clubs: "Clubs",
  "cultural-centers": "Cultural Centers",
  libraries: "Libraries",
  hikes: "Hikes",
  stores: "Stores",
  "photo-spots": "Photo Spots",
};

export const STATUS_LABELS: Record<string, string> = {
  visited: "Visited",
  "want-to-go": "Want to Go",
  favorite: "Favorites",
  unknown: "—",
};

export const COUNTRY_LABELS: Record<string, string> = {
  argentina: "Argentina",
  brazil: "Brazil",
  "united-states": "United States",
  uruguay: "Uruguay",
  paraguay: "Paraguay",
  bolivia: "Bolivia",
  chile: "Chile",
  colombia: "Colombia",
  peru: "Peru",
  ecuador: "Ecuador",
  "el-salvador": "El Salvador",
  mexico: "Mexico",
  canada: "Canada",
  jamaica: "Jamaica",
  hungary: "Hungary",
  belgium: "Belgium",
  poland: "Poland",
  czechia: "Czechia",
  slovakia: "Slovakia",
  austria: "Austria",
  germany: "Germany",
  moldova: "Moldova",
  france: "France",
  "united-kingdom": "United Kingdom",
  netherlands: "Netherlands",
  switzerland: "Switzerland",
  sweden: "Sweden",
  norway: "Norway",
  romania: "Romania",
  "north-macedonia": "North Macedonia",
  turkey: "Turkey",
  china: "China",
  japan: "Japan",
  thailand: "Thailand",
  india: "India",
  russia: "Russia",
  kazakhstan: "Kazakhstan",
  kyrgyzstan: "Kyrgyzstan",
  tajikistan: "Tajikistan",
  uzbekistan: "Uzbekistan",
  armenia: "Armenia",
  yemen: "Yemen",
  iraq: "Iraq",
  iran: "Iran",
  pakistan: "Pakistan",
  australia: "Australia",
  "south-africa": "South Africa",
  kenya: "Kenya",
  madagascar: "Madagascar",
  uganda: "Uganda",
  georgia: "Georgia",
  morocco: "Morocco",
  indonesia: "Indonesia",
  italy: "Italy",
  spain: "Spain",
  portugal: "Portugal",
  greece: "Greece",
  vietnam: "Vietnam",
  "south-korea": "South Korea",
};

export function countryLabel(slug: string): string {
  return COUNTRY_LABELS[slug] ?? slug;
}

export function categoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug;
}
