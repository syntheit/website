import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import type { Project } from "@/app/metadata/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "regular";
}

export function ProjectCard({ project, variant = "regular" }: ProjectCardProps) {
  const isFeatured = variant === "featured";
  
  return (
    <div className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
      {/* Project Header */}
      <div className={`${isFeatured ? 'flex items-start justify-between' : ''} mb-4`}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isFeatured && (
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                Featured
              </span>
            )}
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              {project.category}
            </span>
          </div>
          <h3 className={`${isFeatured ? 'text-xl' : ''} font-semibold text-foreground mb-2`}>
            {project.title}
          </h3>
          <p className={`${isFeatured ? '' : 'text-sm'} text-muted-foreground`}>
            {project.description}
          </p>
        </div>
      </div>
      
      {/* Technologies */}
      <div className={`flex flex-wrap gap-${isFeatured ? '2' : '1'} mb-4`}>
        {isFeatured ? (
          project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {tech}
            </span>
          ))
        ) : (
          <>
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </>
        )}
      </div>
      
      {/* Project Footer */}
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-${isFeatured ? '4' : '1'} text-sm text-muted-foreground`}>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {project.year}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {project.github && (
            <Button 
              size="sm" 
              variant={isFeatured ? "outline" : "ghost"} 
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FiGithub className={`${isFeatured ? 'h-4 w-4' : 'h-3 w-3'}`} />
                {isFeatured && "Code"}
              </a>
            </Button>
          )}
          {project.live && (
            <Button 
              size="sm" 
              variant={isFeatured ? "default" : "ghost"} 
              asChild
            >
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className={`${isFeatured ? 'h-4 w-4 mr-2' : 'h-3 w-3'}`} />
                {isFeatured && "Live"}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
