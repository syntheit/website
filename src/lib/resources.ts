import resourcesJson from "../../public/data/resources/resources-enriched.json";
import type { Location } from "@/data/world-data";

export interface EnrichedResource {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  countries: string[];
  cities: string[];
  topics: string[];
  quality: "high" | "medium" | "low";
  confidence: "high" | "medium" | "low";
  enrichedAt: string;
}

export const ALL_RESOURCES: EnrichedResource[] = resourcesJson as EnrichedResource[];

// Slug variants Claude produced that don't match world-data.ts canonical
// slugs — keep the canonical form on the right. Add more here if the audit
// surfaces them.
const SLUG_ALIASES: Record<string, string> = {
  "new-york": "new-york-city",
  chicago: "chicagoland",
  "washington-dc": "dc",
  "czech-republic": "czechia",
};

function canonSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

const QUALITY_ORDER = { high: 0, medium: 1, low: 2 } as const;

function byQualityThenTitle(a: EnrichedResource, b: EnrichedResource): number {
  const q = QUALITY_ORDER[a.quality] - QUALITY_ORDER[b.quality];
  if (q !== 0) return q;
  return a.title.localeCompare(b.title);
}

export function resourcesForCountry(country: string): EnrichedResource[] {
  const slug = canonSlug(country);
  return ALL_RESOURCES.filter((r) =>
    r.countries.some((c) => canonSlug(c) === slug),
  ).sort(byQualityThenTitle);
}

export function resourcesForCity(city: string): EnrichedResource[] {
  const slug = canonSlug(city);
  return ALL_RESOURCES.filter((r) =>
    r.cities.some((c) => canonSlug(c) === slug),
  ).sort(byQualityThenTitle);
}

export function resourcesForLocation(location: Location): EnrichedResource[] {
  if (location.type === "country") return resourcesForCountry(location.slug);
  // Cities and regions both match against cities[] — regions (e.g. Chicagoland)
  // pick up their underlying city slug via SLUG_ALIASES.
  return resourcesForCity(location.slug);
}
