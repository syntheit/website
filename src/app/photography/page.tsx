import { Navbar } from "@/components/ui/navbar";
import { RandomPhotoButton } from "@/components/ui/random-photo-button";
import { getPhotos } from "@/lib/photos";
import Image from "next/image";
import Link from "next/link";

// ISR — page rebuilds at most once an hour even when the Pexels collection
// changes. Run a fresh build to pick up changes sooner.
export const revalidate = 3600;

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

export default async function PhotographyPage() {
  const photos = await getPhotos();

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
          href="https://www.pexels.com/@daniel-miller-2106839"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 border-[1.5px] border-foreground rounded-full text-foreground text-[13px] font-medium hover:bg-foreground hover:text-card transition-all duration-200"
        >
          View all on Pexels
        </Link>
        <RandomPhotoButton photos={photos} />
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
          {photos.map((photo) => (
            <a
              key={photo.id}
              href={photo.pexels_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-inside-avoid mb-4 rounded-xl overflow-hidden relative group bg-card"
            >
              <Image
                src={photo.image_url}
                alt={photo.description?.trim() ? photo.description : photo.location ?? `Pexels photo ${photo.id}`}
                width={photo.width}
                height={photo.height}
                className="w-full block h-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[rgba(59,35,20,0.55)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] pointer-events-none" />
              <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]">
                <span className="text-xs text-white font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
                  {photo.location ?? "View on Pexels →"}
                </span>
                {photo.location && (
                  <span className="text-[11px] text-white/85 font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.45)] whitespace-nowrap">
                    View on Pexels →
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

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

      <StripeDivider reversed />
    </main>
  );
}
