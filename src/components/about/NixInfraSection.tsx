import { Server, Monitor, Smartphone, Globe, Cpu } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  server: Server,
  monitor: Monitor,
  smartphone: Smartphone,
  globe: Globe,
  cpu: Cpu,
};

interface Machine {
  name: string;
  role: string;
  icon: string;
  arch: string;
  highlight: string;
  details: string[];
  tech: string[];
}

interface CustomTool {
  name: string;
  description: string;
  context: string;
}

interface NixInfraSectionProps {
  intro: string;
  machines: Machine[];
  customTools: CustomTool[];
  networkingDescription: string;
  philosophy: string;
}

function MachineCard({ machine }: { machine: Machine }) {
  const Icon = iconMap[machine.icon] ?? Server;
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Icon className="text-primary h-5 w-5" />
          <div>
            <h4 className="font-serif text-lg font-bold text-foreground">
              {machine.name}
            </h4>
            <p className="text-[12px] font-mono text-muted-foreground">
              {machine.arch}
            </p>
          </div>
        </div>
        <span className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold px-[10px] py-1 bg-primary/8 rounded">
          {machine.role}
        </span>
      </div>

      <p className="text-[14px] font-medium text-foreground leading-[1.6]">
        {machine.highlight}
      </p>

      <ul className="space-y-1.5">
        {machine.details.map((detail, i) => (
          <li
            key={i}
            className="text-[13px] text-muted-foreground leading-[1.6] flex gap-2"
          >
            <span className="text-primary/40 mt-[2px] shrink-0">&#8226;</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-[6px] pt-1">
        {machine.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: CustomTool }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-5 space-y-2">
      <h4 className="font-mono text-[14px] font-bold text-foreground">
        {tool.name}
      </h4>
      <p className="text-[13px] text-muted-foreground leading-[1.6]">
        {tool.description}
      </p>
      <p className="text-[12px] text-muted-foreground/60 italic">
        {tool.context}
      </p>
    </div>
  );
}

export function NixInfraSection({
  intro,
  machines,
  customTools,
  networkingDescription,
  philosophy,
}: NixInfraSectionProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
          Infrastructure &amp; Nix
        </h2>
        <p className="text-[15px] leading-[1.75] text-muted-foreground max-w-[680px]">
          {intro}
        </p>
      </div>

      {/* Machine Fleet */}
      <div className="space-y-4">
        <h3 className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold">
          The Fleet
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {machines.map((machine) => (
            <MachineCard key={machine.name} machine={machine} />
          ))}
        </div>
      </div>

      {/* Networking */}
      <div className="space-y-3">
        <h3 className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold">
          Networking
        </h3>
        <p className="text-[14px] leading-[1.75] text-muted-foreground max-w-[680px]">
          {networkingDescription}
        </p>
      </div>

      {/* Custom Tools */}
      <div className="space-y-4">
        <h3 className="text-[11px] uppercase tracking-[1.5px] text-primary font-semibold">
          Custom Tools
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="rounded-2xl border border-border bg-card/40 p-6">
        <p className="text-[14px] leading-[1.75] text-muted-foreground">
          {philosophy}
        </p>
      </div>
    </div>
  );
}
