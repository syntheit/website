interface RetrospendShowcaseProps {
  description: string;
  differentiators: Array<{ label: string; value: string }>;
  tech: string[];
  links: { app: string; github: string };
}

export function RetrospendShowcase({
  description,
  differentiators,
  tech,
  links,
}: RetrospendShowcaseProps) {
  // Dev-only until real screenshots exist — prod collapses to one column
  // instead of shipping a "coming soon" box.
  const showScreenshotPlaceholder = process.env.NODE_ENV !== "production";
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-[36px] font-extrabold tracking-tight">
          Retrospend
        </h2>
        <p className="text-[15px] text-muted-foreground">
          The Financial Multitool
        </p>
      </div>

      <div
        className={
          showScreenshotPlaceholder
            ? "grid gap-10 lg:grid-cols-[1fr_380px]"
            : "grid gap-10"
        }
      >
        {/* Left: text */}
        <div className="space-y-6">
          <p className="text-[15px] leading-[1.75] text-muted-foreground">
            {description}
          </p>

          <div className="space-y-4">
            {differentiators.map((d) => (
              <div key={d.label}>
                <span className="text-[14px] font-bold text-foreground">
                  {d.label}
                </span>
                <span className="text-[14px] text-muted-foreground">
                  {" "}
                  — {d.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={links.app}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-[1.5px] border-[#3B2314] bg-[#3B2314] px-5 py-[9px] text-[13px] font-medium text-[#F5EBD9] transition-all hover:bg-transparent hover:text-[#3B2314]"
            >
              View App
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-[1.5px] border-[#3B2314] px-5 py-[9px] text-[13px] font-medium text-[#3B2314] transition-all hover:bg-[#3B2314] hover:text-[#F5EBD9]"
            >
              GitHub
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: screenshot placeholder (dev-only) */}
        {showScreenshotPlaceholder && (
          <div className="flex items-start justify-center">
            <div className="flex h-[300px] w-full items-center justify-center rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] bg-card">
              <p className="text-[14px] italic text-muted-foreground">
                Screenshots coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
