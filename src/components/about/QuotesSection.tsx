import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface QuotesSectionProps {
  quotes: Array<{ text: string; author: string | null }>;
}

export function QuotesSection({ quotes }: QuotesSectionProps) {
  return (
    <div className="space-y-8">
      <SectionHeader icon={<Quote />} title="Favorite Quotes" />
      <div className="grid gap-4 md:grid-cols-2">
        {quotes.map((quote) => (
          <div
            key={quote.text}
            className="border-border bg-card rounded-2xl border p-6 space-y-3"
          >
            <p className="text-foreground text-sm italic leading-relaxed">
              &ldquo;{quote.text}&rdquo;
            </p>
            {quote.author && (
              <p className="text-muted-foreground text-xs">
                &mdash; {quote.author}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
