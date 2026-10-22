"use client";

import { Navbar } from "@/components/ui/navbar";
import { ABOUT_DATA } from "@/app/metadata/about";
import {
  HeroSection,
  StripeDivider,
  RetrospendShowcase,
  ProjectsSection,
  ExperienceSection,
  WhatImInto,
  NixInfraSection,
  QuotesSection,
} from "@/components/about";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <HeroSection intro={ABOUT_DATA.hero.intro} />

          <StripeDivider />

          <RetrospendShowcase
            description={ABOUT_DATA.retrospend.description}
            differentiators={ABOUT_DATA.retrospend.differentiators}
            links={ABOUT_DATA.retrospend.links}
          />

          <StripeDivider />

          <ProjectsSection projects={ABOUT_DATA.projects} />

          <StripeDivider />

          <ExperienceSection
            experience={ABOUT_DATA.experience}
            education={ABOUT_DATA.education}
          />

          <StripeDivider />

          <NixInfraSection
            intro={ABOUT_DATA.nixInfra.intro}
            machines={ABOUT_DATA.nixInfra.machines}
          />

          <StripeDivider />

          <WhatImInto physical={ABOUT_DATA.whatImInto.physical} />

          <StripeDivider />

          <QuotesSection quotes={ABOUT_DATA.quotes} />

          <StripeDivider />
        </div>
      </div>
    </main>
  );
}
