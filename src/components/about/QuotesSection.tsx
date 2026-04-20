interface Quote {
  text: string;
  author: string;
}

interface QuotesSectionProps {
  quotes: Quote[];
}

export function QuotesSection({ quotes }: QuotesSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
        Quotes
      </h2>

      <div className="space-y-6">
        {quotes.map((quote, i) => (
          <div key={i}>
            <p className="font-serif text-[16px] font-normal italic leading-relaxed text-foreground">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-1 text-[13px] text-primary">— {quote.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
