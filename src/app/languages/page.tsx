"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { ContactModal } from "@/components/ui/contact-modal";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Star,
  ExternalLink,
  MessageSquare,
  Target,
} from "lucide-react";
import Link from "next/link";
import { LanguageCard } from "@/components/languages/LanguageCard";
import { StrategyCard } from "@/components/languages/StrategyCard";
import { GoalsCard } from "@/components/languages/GoalsCard";
import {
  languages,
  learningStrategy,
  futureGoals,
  languageLearningResources,
} from "@/data/languages";

export default function LanguagesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="bg-background flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="px-4 pb-6 sm:px-8 md:px-12">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Hero Section */}
          <div className="space-y-6 text-center">
            <div className="mb-6 flex flex-wrap justify-center gap-3 text-4xl sm:gap-4 sm:text-6xl">
              {languages.map((lang) => (
                <span
                  key={lang.name}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {lang.flag}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="text-foreground text-4xl font-black md:text-5xl">
                Language <span className="text-primary">Journey</span>
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
                Exploring the world through languages. From native fluency to
                beginner curiosity, here&apos;s my ongoing journey of linguistic
                discovery and cultural connection.
              </p>
            </div>
          </div>

          {/* Language Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {languages.map((language) => (
              <LanguageCard key={language.name} language={language} />
            ))}
          </div>

          {/* Learning Strategy */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Brain className="text-primary h-8 w-8" />
              <h2 className="text-foreground text-3xl font-bold">
                Learning Strategy
              </h2>
            </div>

            <StrategyCard
              title="Core Principles"
              icon={Star}
              items={learningStrategy.corePrinciples}
              columns={2}
            />
            <StrategyCard
              title="Comprehensible Input"
              icon={Target}
              items={learningStrategy.comprehensibleInput}
              columns={1}
            />
            <StrategyCard
              title="LLM Strategies"
              icon={MessageSquare}
              items={learningStrategy.llmStrategies}
              columns={2}
            />
          </div>

          {/* General Language Learning Resources */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <BookOpen className="text-primary h-8 w-8" />
              <h2 className="text-foreground text-3xl font-bold">
                Language Learning Resources
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {languageLearningResources.map(
                ({ name, description, url, icon: Icon, action_text }) => (
                  <div
                    key={name}
                    className="bg-card border-border space-y-4 rounded-2xl border p-6"
                  >
                    <div className="bg-muted/50 hover:bg-muted flex items-start gap-3 rounded-xl p-3 transition-colors">
                      <Icon className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-foreground text-sm font-medium">
                          {name}
                        </h4>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {description}
                        </p>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-2 inline-flex items-center gap-1 text-xs hover:underline"
                          >
                            {action_text} <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Future Goals */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Target className="text-primary h-8 w-8" />
              <h2 className="text-foreground text-3xl font-bold">
                Future Language Goals
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <GoalsCard
                title="Short-term (6 months)"
                goals={futureGoals.shortTerm}
              />
              <GoalsCard
                title="Long-term (1-2 years)"
                goals={futureGoals.longTerm}
                useStarIcon={true}
              />
            </div>
          </div>

          <div className="from-primary/5 to-accent/10 space-y-6 rounded-3xl bg-gradient-to-br p-8 text-center">
            <h2 className="text-foreground text-2xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground mx-auto max-w-md">
              Looking for language exchange partners or want to discuss learning
              strategies? I&apos;m always interested in connecting with fellow
              language learners.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsContactModalOpen(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
