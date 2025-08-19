import { MapPin, GraduationCap, Plane } from "lucide-react";
import { InfoCard } from "./InfoCard";
import { SkillTags } from "./SkillTags";

interface QuickInfoSectionProps {
  locations: Array<{ label: string; value: string }>;
  languages: Array<{ name: string; level: string }>;
  interests: string[];
}

export function QuickInfoSection({
  locations,
  languages,
  interests,
}: QuickInfoSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <InfoCard icon={<MapPin />} title="Location">
        {locations.map((location) => (
          <div
            key={location.label}
            className="flex items-center justify-between"
          >
            <span className="text-muted-foreground text-sm">
              {location.label}
            </span>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
              {location.value}
            </span>
          </div>
        ))}
      </InfoCard>

      <InfoCard icon={<GraduationCap />} title="Languages">
        {languages.map((language) => (
          <div
            key={language.name}
            className="flex items-center justify-between"
          >
            <span className="text-muted-foreground text-sm">
              {language.name}
            </span>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
              {language.level}
            </span>
          </div>
        ))}
      </InfoCard>

      <InfoCard icon={<Plane />} title="Interests">
        <div className="flex flex-wrap gap-1">
          <SkillTags skills={interests} size="sm" />
        </div>
        <p className="text-muted-foreground/70 text-xs">
          Always exploring new places, ideas, and technologies
        </p>
      </InfoCard>
    </div>
  );
}
