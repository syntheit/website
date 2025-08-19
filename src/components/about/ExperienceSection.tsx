import { ExperienceCard } from "./ExperienceCard";

interface ExperienceSectionProps {
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    technologies?: string[];
    isCurrent?: boolean;
  }>;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-foreground text-3xl font-bold">
        Education & Experience
      </h2>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
    </div>
  );
}
