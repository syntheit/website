import { Button } from "@/components/ui/button";
import { FiGithub } from "react-icons/fi";

export function ProjectCTA() {
  return (
    <div className="text-center space-y-6 bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-foreground">Let&apos;s Build Something Amazing</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        I&apos;m always interested in new opportunities, exciting projects, and collaborations. 
        Let&apos;s discuss how we can work together to create something meaningful.
      </p>
      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          size="lg"
          asChild
        >
          <a href="https://github.com/syntheit" target="_blank" rel="noopener noreferrer">
            <FiGithub className="h-4 w-4 mr-2" />
            View GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
