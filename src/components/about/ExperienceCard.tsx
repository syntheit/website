import { SkillTags } from "./SkillTags";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
  isCurrent?: boolean;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  technologies,
  isCurrent = false,
}: ExperienceCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="font-medium text-primary">{company}</p>
          <p className="text-muted-foreground">{period}</p>
        </div>
        {isCurrent && (
          <span className="px-3 py-1 text-sm font-medium text-green-600 rounded-full bg-green-500/10">
            Current
          </span>
        )}
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>
      {technologies && (
        <div className="mt-3">
          <SkillTags skills={technologies} />
        </div>
      )}
    </div>
  );
}
