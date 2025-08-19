import type { Project } from "@/app/metadata/projects";

export function calculateProjectStats(projects: Project[]) {
  const totalProjects = projects.length;
  const webApps = projects.filter(p => p.category === "web").length;
  const liveProjects = projects.filter(p => p.live !== null).length;
  
  // Get unique technologies across all projects
  const allTechnologies = projects.flatMap(p => p.technologies);
  const uniqueTechnologies = new Set(allTechnologies);
  
  return {
    totalProjects,
    webApps,
    liveProjects,
    technologiesUsed: uniqueTechnologies.size
  };
}
