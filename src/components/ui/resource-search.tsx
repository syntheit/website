"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface ResourceSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResultsCount: number;
  activeTabName: string;
}

export function ResourceSearch({ 
  searchQuery, 
  onSearchChange, 
  searchResultsCount, 
  activeTabName 
}: ResourceSearchProps) {
  return (
    <div className="mx-auto space-y-4 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search all resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 pl-10 h-12 text-base"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 w-4 h-4 transition-colors transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="text-sm text-center text-muted-foreground">
          Found {searchResultsCount} result{searchResultsCount !== 1 ? 's' : ''} in {activeTabName}
        </div>
      )}
    </div>
  );
}
