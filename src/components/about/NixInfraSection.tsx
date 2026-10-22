import { draftCopy } from "@/lib/utils";

interface Machine {
  name: string;
  arch: string;
  role: string;
}

interface NixInfraSectionProps {
  intro: string;
  machines: Machine[];
}

export function NixInfraSection({ intro, machines }: NixInfraSectionProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
          Infrastructure &amp; Nix
        </h2>
        {draftCopy(intro) && (
          <p className="max-w-[680px] text-[15px] leading-[1.75] text-muted-foreground">
            {intro}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {machines.map((machine) => (
          <div
            key={machine.name}
            className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <div className="flex shrink-0 items-baseline gap-2 sm:w-[220px]">
              <span className="font-mono text-[14px] font-bold text-foreground">
                {machine.name}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {machine.arch}
              </span>
            </div>
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              {machine.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
