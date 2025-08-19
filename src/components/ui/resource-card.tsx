import { Button } from "@/components/ui/button";
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

  // Clean URL for display (remove protocol, www, and trailing slash)
  const getDisplayUrl = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  };

  // Copy URL to clipboard
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
      className={`group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${className}`}
    >
      <div className="flex h-full flex-col p-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {resource.title}
            </h3>
            {resource.featured && (
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        </div>

        {/* Category */}
        {resource.category && (
          <div className="flex items-center gap-2 pt-2">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {resource.category}
            </span>
          </div>
        )}

        {/* Spacer to push link section to bottom */}
        <div className="flex-1" />

        {/* Link section - always at bottom */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full transition-colors"
            asChild
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between"
            >
              <span className="truncate font-mono text-xs text-muted-foreground text-left">
                {getDisplayUrl(resource.url)}
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await copyToClipboard(resource.url);
                  }}
                  className="rounded p-1 transition-colors hover:bg-muted"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
              </div>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
