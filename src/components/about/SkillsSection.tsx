import { Code, Camera, Mountain, Languages, Plane } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SkillTags } from "./SkillTags";
import Link from "next/link";

interface SkillsSectionProps {
  skills: {
    programmingLanguages: string[];
    librariesFrameworks: string[];
    toolsPlatforms: string[];
  };
  interests: Array<{
    icon: string;
    title: string;
    description: string;
    link?: string;
    linkText?: string;
  }>;
}

const iconMap = {
  Code,
  Camera,
  Mountain,
  Languages,
  Plane,
};

export function SkillsSection({ skills, interests }: SkillsSectionProps) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      {/* Technical Skills */}
      <div className="space-y-6">
        <SectionHeader icon={<Code />} title="Technical Skills" size="lg" />
        <div className="space-y-4">
          <div>
            <h3 className="text-foreground mb-2 font-semibold">
              Programming Languages
            </h3>
            <SkillTags skills={skills.programmingLanguages} />
          </div>
          <div>
            <h3 className="text-foreground mb-2 font-semibold">
              Libraries & Frameworks
            </h3>
            <SkillTags skills={skills.librariesFrameworks} />
          </div>
          <div>
            <h3 className="text-foreground mb-2 font-semibold">
              Tools & Platforms
            </h3>
            <SkillTags skills={skills.toolsPlatforms} />
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-6">
        <SectionHeader
          icon={<Camera />}
          title="Interests & Hobbies"
          size="lg"
        />
        <div className="space-y-4">
          {interests.map((interest) => {
            const IconComponent =
              iconMap[interest.icon as keyof typeof iconMap];
            return (
              <div key={interest.title} className="flex items-start gap-3">
                <span className="mt-0.5">
                  <IconComponent className="text-primary h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-foreground font-semibold">
                    {interest.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {interest.description}
                    {interest.link && (
                      <>
                        {" "}
                        <Link
                          href={interest.link}
                          className="text-primary underline"
                        >
                          {interest.linkText}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
