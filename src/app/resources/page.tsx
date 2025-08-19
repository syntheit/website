"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { SuggestResourceButton } from "@/components/ui/suggest-resource-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RandomResourceSelector } from "@/components/ui/random-resource-selector";
import { ResourceTabs } from "@/components/ui/resource-tabs";
import { ResourceSearch } from "@/components/ui/resource-search";
import { ResourceGrid } from "@/components/ui/resource-grid";
import { ResourceHero } from "@/components/ui/resource-hero";
import { useResources } from "@/hooks/use-resources";

export default function ResourcesPage() {
  const {
    activeTab,
    displayedCount,
    searchQuery,
    searchResults,
    tabsWithCounts,
    getAllResources,
    handleSearchChange,
    handleLoadMore,
    handleTabChange,
  } = useResources();

  const activeTabName = tabsWithCounts.find(t => t.id === activeTab)?.name ?? activeTab;

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="px-4 pb-6 sm:px-8 md:px-12">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto space-y-12 max-w-7xl">
          {/* Hero Section */}
          <ResourceHero />

          {/* Random Resource Selector */}
          <RandomResourceSelector allResources={getAllResources()} />

          {/* Tabs */}
          <ResourceTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabsWithCounts={tabsWithCounts}
          />

          {/* Search Bar */}
          <ResourceSearch 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            searchResultsCount={searchResults.length}
            activeTabName={activeTabName}
          />

          {/* Resources Grid */}
          <ResourceGrid 
            resources={searchResults}
            displayedCount={displayedCount}
            onLoadMore={handleLoadMore}
            searchQuery={searchQuery}
            activeTabName={activeTabName}
          />

          {/* Footer Note */}
          <div className="p-8 space-y-4 text-center bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
            <h3 className="text-xl font-bold text-foreground">More Resources Coming Soon!</h3>
            <p className="mx-auto max-w-md text-muted-foreground">
              I&apos;m constantly discovering new and interesting websites. This collection will grow over time as I find more cool stuff to share.
            </p>
            <div className="flex gap-4 justify-center">
              <SuggestResourceButton 
                variant="outline"
                size="lg"
                className="px-8 py-4"
              >
                Suggest a Resource
              </SuggestResourceButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 