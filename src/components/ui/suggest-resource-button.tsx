"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./button";
import { ResourceSuggestionModal } from "./resource-suggestion-modal";

interface SuggestResourceButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function SuggestResourceButton({ 
  variant = "outline", 
  size = "default", 
  className,
  children 
}: SuggestResourceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        <Plus className="w-4 h-4" />
        {children ?? "Suggest Resource"}
      </Button>

      <ResourceSuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 