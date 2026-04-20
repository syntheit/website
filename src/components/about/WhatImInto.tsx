interface WhatImIntoProps {
  physical: string[];
  hardware: Array<{ label: string; value: string }>;
  services: Record<string, string[]>;
  infraDescription: string;
}

export function WhatImInto({
  physical,
  hardware,
  services,
  infraDescription,
}: WhatImIntoProps) {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
        What I&apos;m Into
      </h2>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left: Physical stuff */}
        <div className="space-y-4">
          {physical.map((paragraph, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.75] text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right: Server & infrastructure */}
        <div className="space-y-6">
          {/* Hardware table */}
          <div className="space-y-3">
            {hardware.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-[14px]"
              >
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Services as tag pills */}
          <div className="space-y-3">
            {Object.entries(services).map(([category, items]) => (
              <div key={category}>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground">
                  {category}
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[14px] leading-[1.75] text-muted-foreground">
            {infraDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
