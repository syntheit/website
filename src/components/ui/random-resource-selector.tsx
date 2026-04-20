"use client";

import { useState } from "react";
import type { Resource } from "@/components/ui/resource-card";
import { ResourceCard } from "@/components/ui/resource-card";

interface RandomResourceSelectorProps {
  allResources: Resource[];
}

export function RandomResourceSelector({ allResources }: RandomResourceSelectorProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [randomResource, setRandomResource] = useState<Resource | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasRolledOnce, setHasRolledOnce] = useState(false);

  const rollRandomResource = () => {
    setIsRolling(true);
    setShowResult(false);
    setRandomResource(null);

    const randomIndex = Math.floor(Math.random() * allResources.length);
    const selectedResource = allResources[randomIndex];

    const animationDuration = Math.random() * 2000 + 1000;

    setTimeout(() => {
      if (selectedResource) {
        setRandomResource(selectedResource);
        setIsRolling(false);
        setShowResult(true);
        setHasRolledOnce(true);
      }
    }, animationDuration);
  };

  return (
    <>
      <button
        onClick={rollRandomResource}
        disabled={isRolling}
        className="cursor-pointer shrink-0 bg-[#D4581A] text-white rounded-full px-6 py-3 text-[13px] font-semibold hover:bg-[#b84915] transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap sm:w-auto w-full"
      >
        {isRolling
          ? "Rolling..."
          : hasRolledOnce
            ? "Roll Again"
            : "I'm Feeling Lucky"}
      </button>

      {showResult && randomResource && (
        <div className="w-full mt-4 duration-500 animate-in slide-in-from-bottom-4">
          <div className="mx-auto max-w-md">
            <ResourceCard resource={randomResource} />
          </div>
        </div>
      )}
    </>
  );
}
