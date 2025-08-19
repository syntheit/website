"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EmailButtonProps {
  email: string;
  text: string;
  iconBgColor?: string;
  textColor?: string;
  className?: string;
}

export function EmailButton({
  email,
  text,
  iconBgColor = "bg-green-500/10",
  textColor = "text-foreground",
  className
}: EmailButtonProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="relative">
      {/* Copy message */}
      {showCopied && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary-foreground text-primary text-xs px-2 py-1 rounded-md shadow-lg z-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
          Copied!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-foreground"></div>
        </div>
      )}
      
      {/* Button */}
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-3 h-12 w-36 rounded-2xl border border-input bg-background shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
          className
        )}
      >
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center ml-3", iconBgColor)}>
          <Mail className="h-4 w-4 text-primary" />
        </div>
        <span className={cn("text-sm font-medium", textColor)}>
          {text}
        </span>
      </button>
    </div>
  );
} 