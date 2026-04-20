"use client";

import { Navbar } from "@/components/ui/navbar";
import { photos } from "@/data/photos";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface PexelsPhoto {
  pexels_url: string;
}

const gear = {
  cameras: [
    { name: "Nikon D800", detail: "36.3MP Full-Frame", tag: "Primary" },
    { name: "Google Pixel 9 Pro XL", detail: "50MP Mobile", tag: "Mobile" },
  ],
  lenses: [
    { name: "Nikon 24-120mm f/4G", detail: "ED VR Zoom", tag: "Versatile" },
    { name: "Nikon AF-S 50mm f/1.8G", detail: "Fast Prime", tag: "Portrait" },
  ],
  software: [
    { name: "Adobe Lightroom", detail: "Color & Exposure", tag: "Editing" },
  ],
};

const STRIPE_COLORS = ["#3B2314", "#D4581A", "#E8941A", "#E8C95A", "#F5EBD9"];

function StripeDivider({ reversed = false }: { reversed?: boolean }) {
  const colors = reversed ? [...STRIPE_COLORS].reverse() : STRIPE_COLORS;
  return (
    <div className="flex h-6 w-full">
      {colors.map((color, i) => (
        <div key={i} className="flex-1" style={{ background: color }} />
      ))}
    </div>
  );
}

function GearGroup({
  title,
  items,
}: {
  title: string;
  items: { name: string; detail: string; tag: string }[];
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold pb-2.5 border-b-2 border-foreground mb-3">
        {title}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex justify-between items-start py-2.5 ${
            i < items.length - 1 ? "border-b border-[rgba(59,35,20,0.08)]" : ""
          }`}
        >
          <div>
            <div className="font-serif text-[15px] font-semibold">{item.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{item.detail}</div>
          </div>
          <div className="font-mono text-[11px] text-primary whitespace-nowrap pt-0.5">
            {item.tag}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PhotographyPage() {
  const pexelsPhotosRef = useRef<PexelsPhoto[] | null>(null);

  const handleRandomPhoto = async () => {
    try {
      if (!pexelsPhotosRef.current) {
        const response = await fetch("/data/photos.json");
        pexelsPhotosRef.current = (await response.json()) as PexelsPhoto[];
      }
      const allPhotos = pexelsPhotosRef.current;
      if (!allPhotos || allPhotos.length === 0) return;
      const random = allPhotos[Math.floor(Math.random() * allPhotos.length)];
      if (random?.pexels_url) {
        window.open(random.pexels_url, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to load random photo:", error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="text-center pt-16 px-4 sm:px-8 md:px-14 pb-6">
        <h1 className="font-serif text-4xl sm:text-[52px] font-black leading-[1.1] mb-4">
          Photography <span className="italic text-primary">Portfolio</span>
        </h1>
        <p className="text-base text-muted-foreground leading-[1.7] max-w-[520px] mx-auto">
          Capturing moments, stories, and the beauty of the world through my lens.
          From Buenos Aires streets to Patagonian landscapes.
        </p>
      </div>

      {/* Links Row */}
      <div className="flex justify-center items-center gap-3 px-4 sm:px-8 md:px-14 pt-6 pb-12">
        <Link
          href="https://www.pexels.com/@daniel-miller-2106839/highlights/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 border-[1.5px] border-foreground rounded-full text-foreground text-[13px] font-medium hover:bg-foreground hover:text-card transition-all duration-200"
        >
          View all on Pexels
        </Link>
        <button
          onClick={handleRandomPhoto}
          className="cursor-pointer px-5 py-2.5 bg-primary text-white border-[1.5px] border-primary rounded-full text-[13px] font-medium hover:bg-[#b84a15] hover:border-[#b84a15] transition-all duration-200"
        >
          Random Photo
        </button>
      </div>

      {/* Photo Gallery */}
      <section className="px-4 sm:px-8 md:px-14 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-[32px] font-extrabold">Selected Work</h2>
          <span className="font-mono text-xs text-muted-foreground">
            {photos.length} photos
          </span>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative group cursor-pointer bg-card"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full block"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[rgba(59,35,20,0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] pointer-events-none" />
              {/* Location label */}
              <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]">
                <span className="text-xs text-white font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
                  {photo.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stripe Divider */}
      <StripeDivider />

      {/* Gear Section */}
      <section className="px-4 sm:px-8 md:px-14 py-16">
        <h2 className="font-serif text-[32px] font-extrabold mb-3">My Gear</h2>
        <p className="text-[15px] text-muted-foreground mb-9 max-w-[500px]">
          Great photos can be taken with any camera. These are the tools I use.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GearGroup title="Cameras" items={gear.cameras} />
          <GearGroup title="Lenses" items={gear.lenses} />
          <GearGroup title="Software" items={gear.software} />
        </div>
      </section>

      {/* Stripe Divider (reversed) */}
      <StripeDivider reversed />
    </main>
  );
}
