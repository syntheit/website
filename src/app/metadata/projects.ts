export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Health Tracker",
    description: "A full-stack workout and fitness tracker that enables users to log workouts, track weight and running progress, and view personalized statistics through a web interface.",
    category: "web",
    technologies: ["React.js", "Next.js", "Docker", "TypeScript", "tRPC", "Tailwind"],
    github: "https://github.com/syntheit/health-tracker",
    live: null,
    featured: true,
    year: "2025",
  },
  {
    id: 2,
    title: "Travel Checklist",
    description: "A modern, offline-first travel checklist app with PWA support. Easily manage, edit, and share your packing lists with a beautiful, responsive interface.",
    category: "web",
    technologies: ["React.js", "TypeScript", "Next.js", "Tailwind"],
    github: "https://github.com/syntheit/travel-checklist",
    live: "https://travel-checklist.matv.io",
    featured: true,
    year: "2025",
  },
  {
    id: 3,
    title: "ColorGuessr",
    description: "A fun color guessing game where you try to guess the hex/RGB value of a color just by looking at it.",
    category: "web",
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind", "SCSS"],
    github: "https://github.com/syntheit/colorguessr",
    live: "https://colorguessr.matv.io",
    featured: false,
    year: "2022",
  },
  {
    id: 4,
    title: "Self-Managed Server Environment",
    description: "Actively administer a range of self-hosted services through industry-standard platforms.",
    category: "infrastructure",
    technologies: ["NixOS", "Docker", "Cloudflare", "Go", "bash"],
    github: null,
    live: null,
    featured: false,
    year: "2019",
  },
  {
    id: 5,
    title: "Personal Website",
    description: "Modern, responsive personal website with many components",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    github: "https://github.com/syntheit/2025-website",
    live: "https://matv.io",
    featured: false,
    year: "2025",
  },
  {
    id: 6,
    title: "Scripts Collection",
    description: "A collection of useful scripts I've written to automate tasks. Includes batch renaming, power management, SSH switching, and secure DNS toggling utilities.",
    category: "tools",
    technologies: ["Shell", "bash", "Linux", "Fedora"],
    github: "https://github.com/syntheit/scripts",
    live: null,
    featured: false,
    year: "2025",
  },
]; 