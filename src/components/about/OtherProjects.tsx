import { draftCopy } from "@/lib/utils";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  github: string | null;
  live: string | null;
}

interface OtherProjectsProps {
  projects: Project[];
}

export function OtherProjects({ projects }: OtherProjectsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-[32px] font-extrabold tracking-tight">
          Other Projects
        </h2>
        <span className="font-mono text-[13px] text-muted-foreground">
          {projects.length} projects
        </span>
      </div>

      <div className="grid gap-[22px] md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group rounded-2xl border-[1.5px] border-[rgba(59,35,20,0.08)] bg-card p-7 transition-all hover:-translate-y-[3px] hover:border-primary hover:shadow-[0_12px_32px_rgba(59,35,20,0.1)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-block rounded bg-[rgba(212,88,26,0.08)] px-[10px] py-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary">
                {project.category}
              </span>
              <span className="text-[13px] text-muted-foreground">
                {project.year}
              </span>
            </div>

            <h3 className="mb-[6px] font-serif text-[17px] font-bold">
              {project.title}
            </h3>
            {draftCopy(project.description) && (
              <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            )}

            <div className="mb-4 flex flex-wrap gap-[6px]">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary/10 px-2 py-[3px] text-[11px] text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
                >
                  Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-foreground transition-colors hover:text-primary"
                >
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
