"use client";

import { Navbar } from "@/components/ui/navbar";
import { RandomResourceSelector } from "@/components/ui/random-resource-selector";
import { ResourceTabs } from "@/components/ui/resource-tabs";
import { ResourceSearch } from "@/components/ui/resource-search";
import { ResourceGrid } from "@/components/ui/resource-grid";
import { ResourceHero } from "@/components/ui/resource-hero";
import { useResources } from "@/hooks/use-resources";

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

  const activeTabName =
    tabsWithCounts.find((t) => t.id === activeTab)?.name ?? activeTab;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Navbar />

        {/* Page Header */}
        <ResourceHero />

        {/* Filter Pills */}
        <div className="px-8 md:px-14 pb-8">
          <ResourceTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabsWithCounts={tabsWithCounts}
          />
        </div>

        {/* Search + Random Row */}
        <div className="px-8 md:px-14 pb-8">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-3 items-stretch sm:items-center">
            <ResourceSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <RandomResourceSelector allResources={getAllResources()} />
          </div>
        </div>

        {/* Stripe Divider */}
        <StripeDivider />

        {/* Resource Grid */}
        <section className="px-8 md:px-14 py-16">
          <ResourceGrid
            resources={searchResults}
            displayedCount={displayedCount}
            onLoadMore={handleLoadMore}
            searchQuery={searchQuery}
            activeTabName={activeTabName}
            onTopicClick={(t) => handleSearchChange(t)}
          />
        </section>

        {/* Stripe Divider (reversed) */}
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
    </main>
  );
}
