"use client";

import { Button } from "@/components/ui/button";
import { ResourceCard, type Resource } from "@/components/ui/resource-card";
import { Dice6 } from "lucide-react";
import { useState } from "react";

interface RandomResourceSelectorProps {
  allResources: Resource[];
}

export function RandomResourceSelector({ allResources }: RandomResourceSelectorProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [randomResource, setRandomResource] = useState<Resource | null>(null);
  const [showRandomResult, setShowRandomResult] = useState(false);
  const [hasRolledOnce, setHasRolledOnce] = useState(false);

  const rollRandomResource = () => {
    setIsRolling(true);
    setShowRandomResult(false);
    setRandomResource(null);
    
    const randomIndex = Math.floor(Math.random() * allResources.length);
    const selectedResource = allResources[randomIndex];
    
    // Random animation duration between 1-3 seconds
    const animationDuration = Math.random() * 2000 + 1000; // 1000-3000ms
    
    setTimeout(() => {
      if (selectedResource) {
        setRandomResource(selectedResource);
        setIsRolling(false);
        setShowRandomResult(true);
        setHasRolledOnce(true);
      }
    }, animationDuration);
  };

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-foreground">Feeling Lucky?</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Roll the dice to discover a random resource from my entire collection!
        </p>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={rollRandomResource}
          disabled={isRolling}
          size="lg"
          className="gap-3 px-10 py-6 text-lg font-semibold"
        >
          <Dice6 className={`h-6 w-6 ${isRolling ? 'animate-spin' : ''}`} />
          {isRolling ? 'Rolling...' : hasRolledOnce ? 'Roll Again' : 'Roll for Random Resource'}
        </Button>
      </div>

      {/* Random Resource Result */}
      {showRandomResult && randomResource && (
        <div className="mt-8 duration-500 animate-in slide-in-from-bottom-4">
          <div className="mx-auto max-w-md">
            <ResourceCard resource={randomResource} />
          </div>
        </div>
      )}
    </div>
  );
}
