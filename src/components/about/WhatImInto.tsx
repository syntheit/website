import { draftCopy } from "@/lib/utils";

interface WhatImIntoProps {
  physical: string[];
}

export function WhatImInto({ physical }: WhatImIntoProps) {
  const paragraphs = physical.filter((p) => draftCopy(p));

  if (paragraphs.length === 0) return null;

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
        Training
      </h2>

      <div className="max-w-[680px] space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-[15px] leading-[1.75] text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
