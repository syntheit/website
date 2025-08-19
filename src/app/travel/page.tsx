"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { ContactModal } from "@/components/ui/contact-modal";
import { ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";

import { visitedCountries, nextYearCountries, followingYearCountries } from "@/app/metadata/countries";
import { TravelFacts } from "@/components/travel/TravelFacts";
import { WorldMap } from "@/components/travel/WorldMap";
import { CountryList } from "@/components/travel/CountryList";
import { FutureAdventures } from "@/components/travel/FutureAdventures";
import { ContactCTA } from "@/components/travel/ContactCTA";

export default function TravelPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="px-4 pb-6 sm:px-8 md:px-12">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto space-y-12 max-w-7xl">
          <div className="space-y-6 text-center">
            <div className="flex justify-center items-center mx-auto w-32 h-32 bg-gradient-to-br rounded-full border from-primary/20 to-accent/30 border-border/30">
              <Globe className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black md:text-5xl text-foreground">
                <span className="text-primary">Travel</span> Adventures
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                I seek to put myself in environments that are different from what I&apos;m used to. The world is a big place, and I&apos;m trying to see as much of it as I can.
              </p>
            </div>
          </div>

          <TravelFacts />

          <WorldMap />

          <div className="space-y-8">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-foreground">Countries by Continent</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                A detailed breakdown of countries I&apos;ve visited and plan to visit, organized by continent.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <CountryList 
                title="Countries Visited"
                countries={visitedCountries}
                color="#2a5b46"
                count={visitedCountries.length}
              />
              <CountryList 
                title="Within Next Year"
                countries={nextYearCountries}
                color="hsl(142, 76%, 65%)"
                count={nextYearCountries.length}
              />
              <CountryList 
                title="Following Year"
                countries={followingYearCountries}
                color="hsl(210, 83%, 65%)"
                count={followingYearCountries.length}
              />
            </div>
          </div>

          <FutureAdventures />

          <ContactCTA onContactClick={() => setIsContactModalOpen(true)} />
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  );
} 