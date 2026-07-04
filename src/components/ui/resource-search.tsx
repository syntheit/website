"use client";

import { Search, X } from "lucide-react";

interface ResourceSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ResourceSearch({
  searchQuery,
  onSearchChange,
}: ResourceSearchProps) {
  return (
    <div className="flex-1 min-w-0 basis-full sm:basis-0 relative">
      <Search className="absolute left-4 top-1/2 w-4 h-4 transform -translate-y-1/2 text-[#7A5C42] opacity-50" />
      <input
        type="text"
        placeholder="Search all resources..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-[#F5EBD9] border-[1.5px] border-[rgba(59,35,20,0.08)] rounded-xl py-3 pl-11 pr-10 text-[14px] text-[#3B2314] placeholder:text-[#7A5C42] focus:outline-none focus:border-[#D4581A] transition-colors"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A5C42] hover:text-[#3B2314] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
