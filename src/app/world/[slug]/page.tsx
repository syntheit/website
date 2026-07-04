import { LocationDetail } from "@/components/world/LocationDetail";
import { resourcesForLocation } from "@/lib/resources";
import { allKnownCountrySlugs, deriveLocation } from "@/lib/derive-location";
import { locations } from "@/data/world-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // Hand-curated locations + every country with tagged places or resources.
  const seen = new Set<string>();
  for (const l of locations) seen.add(l.slug);
  for (const s of allKnownCountrySlugs()) seen.add(s);
  return [...seen].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = deriveLocation(slug);
  if (!location) return {};
  return {
    title: `${location.name} — World — Daniel Miller`,
    description: `Notes, places, and local knowledge for ${location.name}.`,
  };
}

export default async function WorldSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const location = deriveLocation(slug);
  if (!location) notFound();
  const resources = resourcesForLocation(location);
  return <LocationDetail location={location} resources={resources} />;
}
