"use client";

import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

export type Resource = {
  title: string;
  description: string;
  url: string;
  category?: string;
  featured?: boolean;
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className = "" }: ResourceCardProps) {
  const [copied, setCopied] = useState(false);

  const getDisplayUrl = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div
      className={`group bg-[#F5EBD9] rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(59,35,20,0.1)] hover:border-[#D4581A] transition-all ${className}`}
    >
      <div className="flex h-full flex-col p-7">
        {/* Title */}
        <h3 className="font-serif text-[17px] font-bold mb-[6px]">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#7A5C42] leading-[1.6]">
          {resource.description}
        </p>

        {/* Category tag */}
        {resource.category && (
          <div className="mt-3">
            <span className="inline-block text-[11px] uppercase tracking-[1.5px] text-[#D4581A] font-semibold px-2 py-[3px] bg-[rgba(212,88,26,0.08)] rounded">
              {resource.category}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* URL bar */}
        <div className="mt-4 pt-3 border-t border-[rgba(59,35,20,0.08)] flex items-center justify-between gap-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-[12px] text-[#7A5C42] hover:text-[#D4581A] transition-colors"
          >
            {getDisplayUrl(resource.url)}
          </a>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => copyToClipboard(resource.url)}
              className="cursor-pointer p-1 text-[#7A5C42] hover:text-[#D4581A] transition-colors rounded"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-[#7A5C42] hover:text-[#D4581A] transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
