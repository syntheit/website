import { draftCopy } from "@/lib/utils";

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  title: string;
  kicker: string;
  description: string;
  links: ProjectLink[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
        Projects
      </h2>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] bg-card p-8 transition-all hover:border-primary hover:shadow-[0_12px_32px_rgba(59,35,20,0.1)]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-primary">
              {project.kicker}
            </span>

            <h3 className="mt-2 font-serif text-[22px] font-bold">
              {project.title}
            </h3>

            {draftCopy(project.description) && (
              <p className="mt-3 max-w-[680px] text-[14px] leading-[1.75] text-muted-foreground">
                {project.description}
              </p>
            )}

            {project.links.length > 0 && (
              <div className="mt-5 flex gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
