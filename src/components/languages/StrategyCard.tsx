import { CheckCircle, type LucideIcon } from "lucide-react";

interface StrategyCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  columns?: 1 | 2;
}

export function StrategyCard({
  title,
  icon: Icon,
  items,
  columns = 1,
}: StrategyCardProps) {
  return (
    <div className="bg-card border-border space-y-4 rounded-2xl border p-6">
      <div className="flex items-center gap-3">
        <Icon className="text-primary h-6 w-6" />
        <h3 className="text-foreground text-xl font-semibold">{title}</h3>
      </div>
      <ul className={columns === 2 ? "grid gap-3 md:grid-cols-2" : "space-y-2"}>
        {items.map((item, index) => (
          <li
            key={index}
            className="text-muted-foreground flex items-start gap-2 text-sm"
          >
            <CheckCircle className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
