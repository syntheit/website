"use client";

import { ResourceCard, type Resource } from "@/components/ui/resource-card";
import { Search } from "lucide-react";

interface ResourceGridProps {
  resources: Resource[];
  displayedCount: number;
  onLoadMore: () => void;
  searchQuery: string;
  activeTabName: string;
  onTopicClick?: (topic: string) => void;
}

export function ResourceGrid({
  resources,
  displayedCount,
  onLoadMore,
  searchQuery,
  activeTabName,
  onTopicClick,
}: ResourceGridProps) {
  const displayedResources = resources.slice(0, displayedCount);
  const hasMoreResources = displayedCount < resources.length;

  if (resources.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-[rgba(59,35,20,0.06)] mb-4">
          <Search className="w-8 h-8 text-[#7A5C42]" />
        </div>
        <h3 className="font-serif text-lg font-bold mb-1">No resources found</h3>
        <p className="text-[14px] text-[#7A5C42]">
          {searchQuery
            ? `No resources match "${searchQuery}" in ${activeTabName}. Try a different search term.`
            : "No resources available in this category."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Resource count */}
      <div className="flex justify-end mb-4">
        <span className="font-mono text-[13px] text-[#7A5C42]">
          {resources.length} resource{resources.length !== 1 ? "s" : ""}
          {searchQuery && ` in ${activeTabName}`}
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-[22px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedResources.map((resource, index) => (
          <ResourceCard
            key={resource.id ?? index}
            resource={resource}
            onTopicClick={onTopicClick}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMoreResources && (
        <div className="flex justify-center pt-10">
          <button
            onClick={onLoadMore}
            className="cursor-pointer px-8 py-3 border-[1.5px] border-[#3B2314] rounded-full text-[#3B2314] text-[13px] font-medium hover:bg-[#3B2314] hover:text-[#F5EBD9] transition-all"
          >
            Load More ({resources.length - displayedCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
