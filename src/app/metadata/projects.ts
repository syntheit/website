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
    id: 8,
    title: "Exchange Rates",
    description: "A Go script that fetches exchange rates daily from multiple APIs, including informal/alternative rates, and provides them in JSON format for easy consumption.",
    category: "tools",
    technologies: ["Go", "Nix", "Shell"],
    github: "https://github.com/syntheit/exchange-rates",
    live: null,
    featured: false,
    year: "2025",
  },
  {
    id: 9,
    title: "NixOS Desktop Configuration",
    description: "A minimalist, productivity-focused desktop environment using Hyprland as the window manager with custom waybar configuration.",
    category: "infrastructure",
    technologies: ["Nix", "NixOS", "Linux"],
    github: "https://github.com/syntheit/nixos",
    live: null,
    featured: false,
    year: "2023",
  },
  {
    id: 1,
    title: "Health Tracker",
    description: "A full-stack workout and fitness tracker that enables users to log workouts, track weight and running progress, and view personalized statistics through a web interface.",
    category: "web",
    technologies: ["React.js", "Next.js", "Docker", "TypeScript", "tRPC", "Tailwind"],
    github: "https://github.com/syntheit/health-tracker",
    live: null,
    featured: false,
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
    // TODO: Same rewrite as in about.ts — 6 machines, WireGuard mesh, ZFS, 20+ services, declarative NixOS.
    // Make it match whatever you write in about.ts, or make this one slightly more technical since it's the projects page.
    description:
      "[Rewrite: 6-machine fleet, WireGuard/Headscale mesh, ZFS storage, 20+ self-hosted services, Prometheus/Grafana monitoring, restic backups — all declarative NixOS]",
    category: "infrastructure",
    technologies: ["NixOS", "Docker", "Cloudflare", "ZFS", "WireGuard", "Go"],
    github: null,
    live: null,
    featured: false,
    year: "2019",
  },
  {
    id: 10,
    title: "Pixel Phone NixOS Server",
    // TODO: Write a description. This is one of the most interesting projects you have.
    // A cracked-screen Pixel 6 Pro converted into a headless NixOS ARM server.
    // Architecture: LineageOS → pKVM → NixOS VM → Docker containers.
    // Runs your website via Cloudflare tunnel, SSH access, ~3-5% overhead.
    // pKVM + NixOS solved GKI ABI compatibility issues that stopped most people.
    // Tone: matter-of-fact but let the novelty speak for itself.
    description:
      "[Write: cracked Pixel 6 Pro → pKVM → NixOS VM → Docker. Runs your website. See TODO above]",
    category: "infrastructure",
    technologies: ["NixOS", "Docker", "Cloudflare", "Linux", "pKVM"],
    github: null,
    live: "https://matv.io",
    featured: false,
    year: "2026",
  },
  {
    id: 11,
    title: "Malli AI",
    // TODO: Write a description. Multi-agent AI assistant platform for the Owners Club / New Reach community.
    // Handles inbound messages via iMessage, Twilio SMS, and WhatsApp.
    // Agent orchestration, identity management, campaign execution, knowledge graphs.
    // This is work you built — decide if you want to list it publicly or keep it private (it's a work project).
    // If you include it, focus on what you architected: the multi-agent system, the message routing, the knowledge graph.
    description:
      "[Write: multi-agent AI platform, iMessage/SMS/WhatsApp routing, knowledge graphs, agent orchestration — or remove if too work-specific]",
    category: "ai",
    technologies: ["Python", "FastAPI", "Docker", "SQLite", "Twilio"],
    github: null,
    live: null,
    featured: false,
    year: "2026",
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
  {
    id: 7,
    title: "Retrospend",
    description: "Self-hostable, open-source personal finance app with bill splitting. 100+ currencies including parallel market rates (Argentina's blue dollar), person-centric debt tracking, AI-powered bank statement importing, and budgeting — all in one place.",
    category: "web",
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "tRPC", "Go", "Prisma", "Docker"],
    github: "https://github.com/syntheit/retrospend",
    live: "https://retrospend.app",
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
]; 