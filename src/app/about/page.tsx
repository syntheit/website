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
  QuotesSection,
} from "@/components/about";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <HeroSection name={ABOUT_DATA.hero.name} meta={ABOUT_DATA.hero.meta} />

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

          <QuotesSection quotes={ABOUT_DATA.quotes} />

          <StripeDivider />
        </div>
      </div>
    </main>
  );
}
