import { draftCopy } from "@/lib/utils";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface Education {
  title: string;
  institution: string;
  period: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
  education: Education;
}

export function ExperienceSection({
  experience,
  education,
}: ExperienceSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
        Experience
      </h2>

      <div className="space-y-5">
        {experience.map((exp, i) => (
          <div
            key={i}
            className="rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] bg-card p-6"
          >
            <h3 className="font-serif text-[18px] font-bold">{exp.title}</h3>
            <p className="mt-1 text-[14px] font-medium text-primary">
              {exp.company}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {exp.period}
            </p>
            {draftCopy(exp.description) && (
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            )}
            {exp.technologies && (
              <div className="mt-3 flex flex-wrap gap-[6px]">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary/10 px-2 py-[3px] text-[11px] text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Education */}
        <div className="rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] bg-card p-6">
          <h3 className="font-serif text-[18px] font-bold">
            {education.title}
          </h3>
          <p className="mt-1 text-[14px] font-medium text-primary">
            {education.institution}
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {education.period}
          </p>
          {draftCopy(education.description) && (
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              {education.description}
            </p>
          )}
        </div>
      </div>

      <a
        href="/Daniel Miller Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-[14px] font-semibold text-primary transition-colors hover:text-primary/80"
      >
        Download resume (PDF) →
      </a>
    </div>
  );
}
