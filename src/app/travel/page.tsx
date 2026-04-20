"use client";

import { Navbar } from "@/components/ui/navbar";
import { ContactModal } from "@/components/ui/contact-modal";
import { useState } from "react";

import { visitedCountries, nextYearCountries, followingYearCountries } from "@/app/metadata/countries";
import { TravelFacts } from "@/components/travel/TravelFacts";
import { WorldMap } from "@/components/travel/WorldMap";
import { CountryList } from "@/components/travel/CountryList";
import { FutureAdventures } from "@/components/travel/FutureAdventures";

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

export default function TravelPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Navbar />

        {/* Page Header */}
        <div className="text-center px-8 pt-16 pb-12">
          <h1 className="font-serif text-[52px] font-black leading-[1.1] mb-4">
            Travel <span className="text-[#D4581A] italic">Adventures</span>
          </h1>
          <p className="text-[16px] text-[#7A5C42] leading-[1.7] max-w-[560px] mx-auto">
            I seek to put myself in environments that are different from what I&apos;m used to. The world is a big place, and I&apos;m trying to see as much of it as I can.
          </p>
        </div>

        {/* Travel Fast Facts */}
        <div className="px-8 md:px-14 pb-16">
          <TravelFacts />
        </div>

        {/* Stripe Divider */}
        <StripeDivider />

        {/* My Travel Map */}
        <section className="px-8 md:px-14 py-16">
          <WorldMap />
        </section>

        {/* Stripe Divider (reversed) */}
        <StripeDivider reversed />

        {/* Countries by Continent */}
        <section className="px-8 md:px-14 py-16">
          <div className="text-center mb-10">
            <h2 className="font-serif text-[32px] font-extrabold tracking-tight mb-3">
              Countries by Continent
            </h2>
            <p className="text-[14px] text-[#7A5C42] max-w-2xl mx-auto leading-[1.7]">
              A detailed breakdown of countries I&apos;ve visited and plan to visit, organized by continent.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <CountryList
              title="Countries Visited"
              countries={visitedCountries}
              color="#3B2314"
              count={visitedCountries.length}
            />
            <CountryList
              title="Near Future"
              countries={nextYearCountries}
              color="#D4581A"
              count={nextYearCountries.length}
            />
            <CountryList
              title="At Some Point"
              countries={followingYearCountries}
              color="#E8C95A"
              count={followingYearCountries.length}
            />
          </div>
        </section>

        {/* Stripe Divider */}
        <StripeDivider />

        {/* Future Adventures */}
        <section className="px-8 md:px-14 py-16">
          <FutureAdventures />
        </section>

        {/* Final Stripe Divider (reversed) */}
        <StripeDivider reversed />

        {/* Footer */}
        <footer className="px-8 md:px-14 pt-12 pb-10 flex justify-between items-end">
          <div>
            <div className="font-serif text-lg font-extrabold text-[#3B2314]">
              Daniel Miller
            </div>
            <div className="text-[13px] text-[#7A5C42] mt-[6px]">
              Buenos Aires, Argentina
            </div>
          </div>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/daniel-m-miller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/syntheit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:daniel@matv.io"
              className="text-[13px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              Email
            </a>
          </div>
        </footer>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
