"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";
import { ABOUT_DATA } from "@/app/metadata/about";
import {
  HeroSection,
  QuickInfoSection,
  StorySection,
  SkillsSection,
  ExperienceSection,
  InfrastructureSection,
  QuotesSection,
  CTASection,
} from "@/components/about";


export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />


      {/* Main Content */}
      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto space-y-12 max-w-4xl">
          {/* Hero Section */}
          <HeroSection
            name={ABOUT_DATA.hero.name}
            description={ABOUT_DATA.hero.description}
          />

          {/* Quick Info Cards */}
          <QuickInfoSection
            locations={ABOUT_DATA.locations}
            languages={ABOUT_DATA.languages}
            interests={ABOUT_DATA.interestsList}
          />

          {/* Story Section */}
          <StorySection paragraphs={ABOUT_DATA.story} />

          {/* Skills & Interests */}
          <SkillsSection
            skills={ABOUT_DATA.skills}
            interests={ABOUT_DATA.interests}
          />

          {/* Education & Experience */}
          <ExperienceSection experience={ABOUT_DATA.experience} />

          {/* Server Infrastructure */}
          <InfrastructureSection
            hardware={ABOUT_DATA.infrastructure.hardware}
            services={ABOUT_DATA.infrastructure.services}
            description={ABOUT_DATA.infrastructure.description}
          />

          {/* Favorite Quotes */}
          <QuotesSection quotes={ABOUT_DATA.quotes} />

          {/* CTA Section */}
          <CTASection
            title={ABOUT_DATA.cta.title}
            description={ABOUT_DATA.cta.description}
            buttonText={ABOUT_DATA.cta.buttonText}
            buttonLink={ABOUT_DATA.cta.buttonLink}
          />
        </div>
      </div>
    </main>
  );
}
