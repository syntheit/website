"use client";

import { Button } from "@/components/ui/button";
import { ResourceCard, type Resource } from "@/components/ui/resource-card";
import { Search } from "lucide-react";

interface ResourceGridProps {
  resources: Resource[];
  displayedCount: number;
  onLoadMore: () => void;
  searchQuery: string;
  activeTabName: string;
}

export function ResourceGrid({ 
  resources, 
  displayedCount, 
  onLoadMore, 
  searchQuery, 
  activeTabName 
}: ResourceGridProps) {
  const displayedResources = resources.slice(0, displayedCount);
  const hasMoreResources = displayedCount < resources.length;

  if (resources.length === 0) {
    return (
      <div className="py-12 space-y-4 text-center">
        <div className="flex justify-center items-center mx-auto w-16 h-16 rounded-full bg-muted">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">No resources found</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? `No resources match "${searchQuery}" in ${activeTabName}. Try a different search term.`
              : "No resources available in this category."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">
          {searchQuery 
            ? `Search Results for "${searchQuery}"`
            : activeTabName
          }
        </h2>
        <div className="text-sm text-muted-foreground">
          {resources.length} resource{resources.length !== 1 ? 's' : ''}
          {searchQuery && ` in ${activeTabName}`}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedResources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>
      
      {/* Load More Button */}
      {hasMoreResources && (
        <div className="flex justify-center pt-6">
          <Button 
            variant="outline" 
            size="lg"
            onClick={onLoadMore}
            className="px-8 py-4"
          >
            Load More ({resources.length - displayedCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
