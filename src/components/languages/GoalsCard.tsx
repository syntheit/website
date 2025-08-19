import { CheckCircle, Star } from "lucide-react";

interface GoalsCardProps {
  title: string;
  goals: string[];
  useStarIcon?: boolean;
}

export function GoalsCard({
  title,
  goals,
  useStarIcon = false,
}: GoalsCardProps) {
  const Icon = useStarIcon ? Star : CheckCircle;

  return (
    <div className="bg-card border-border space-y-4 rounded-2xl border p-6">
      <h3 className="text-foreground text-xl font-semibold">{title}</h3>
      <ul className="space-y-2">
        {goals.map((goal, index) => (
          <li
            key={index}
            className="text-muted-foreground flex items-start gap-2"
          >
            <Icon className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{goal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
