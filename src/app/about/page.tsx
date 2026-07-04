"use client";

import { Navbar } from "@/components/ui/navbar";
import { ABOUT_DATA } from "@/app/metadata/about";
import {
  HeroSection,
  StripeDivider,
  RetrospendShowcase,
  OtherProjects,
  ExperienceSection,
  WhatImInto,
  NixInfraSection,
  MusicSection,
  QuotesSection,
} from "@/components/about";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <HeroSection meta={ABOUT_DATA.hero.meta} />

          <StripeDivider />

          <RetrospendShowcase
            description={ABOUT_DATA.retrospend.description}
            differentiators={ABOUT_DATA.retrospend.differentiators}
            tech={ABOUT_DATA.retrospend.tech}
            links={ABOUT_DATA.retrospend.links}
          />

          <StripeDivider />

          <OtherProjects projects={ABOUT_DATA.projects} />

          <StripeDivider />

          <ExperienceSection
            experience={ABOUT_DATA.experience}
            education={ABOUT_DATA.education}
          />

          <StripeDivider />

          <WhatImInto
            physical={ABOUT_DATA.whatImInto.physical}
            hardware={ABOUT_DATA.whatImInto.hardware}
            services={ABOUT_DATA.whatImInto.services}
            infraDescription={ABOUT_DATA.whatImInto.infraDescription}
          />

          <StripeDivider />

          <NixInfraSection
            intro={ABOUT_DATA.nixInfra.intro}
            machines={ABOUT_DATA.nixInfra.machines}
            customTools={ABOUT_DATA.nixInfra.customTools}
            networkingDescription={ABOUT_DATA.nixInfra.networkingDescription}
            philosophy={ABOUT_DATA.nixInfra.philosophy}
          />

          <StripeDivider />

          <MusicSection
            intro={ABOUT_DATA.music.intro}
            genres={ABOUT_DATA.music.genres}
            soulTier={ABOUT_DATA.music.soulTier}
            playlists={ABOUT_DATA.music.playlists}
            spotifyUrl={ABOUT_DATA.music.spotifyUrl}
            stats={ABOUT_DATA.music.stats}
          />

          <StripeDivider />

          <QuotesSection quotes={ABOUT_DATA.quotes} />

          <StripeDivider />
        </div>
      </div>
    </main>
  );
}
