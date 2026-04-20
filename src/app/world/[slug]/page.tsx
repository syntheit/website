import { locations } from "@/data/world-data";
import { LocationDetail } from "@/components/world/LocationDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  return {
    title: `${location.name} — World — Daniel Miller`,
    description: `Notes, places, and local knowledge for ${location.name}.`,
  };
}

export default async function WorldSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();
  return <LocationDetail location={location} />;
}
