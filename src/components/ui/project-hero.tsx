import { Code } from "lucide-react";

export function ProjectHero() {
  return (
    <div className="text-center space-y-6">
      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-accent/30 rounded-full flex items-center justify-center border border-border/30">
        <Code className="h-12 w-12 text-primary" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-foreground">
          <span className="text-primary">Projects</span> & Apps
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A showcase of my software engineering projects and applications. 
          From full-stack web apps to infrastructure projects, each represents my passion for creating meaningful solutions.
        </p>
      </div>
    </div>
  );
}
