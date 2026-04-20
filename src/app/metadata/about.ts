export const ABOUT_DATA = {
  hero: {
    name: "Daniel",
    meta: [
      { label: "Location", value: "Buenos Aires" },
      { label: "Originally", value: "Chicago, IL" },
      { label: "Languages", value: "6 and counting" },
      { label: "Focus", value: "Full-stack dev" },
    ],
  },

  retrospend: {
    description:
      "A self-hostable, open-source personal finance app with built-in bill splitting. Multi-currency support with 100+ fiat currencies, crypto, and parallel market rates. Track expenses, manage budgets, split bills, and monitor your net worth — all in one place.",
    differentiators: [
      {
        label: "Person-centric splitting",
        value:
          "One balance per person across all projects, not scattered group debts",
      },
      {
        label: "Multi-currency",
        value:
          "100+ currencies including parallel/black market rates (Argentina's blue dollar)",
      },
      {
        label: "Self-hostable",
        value:
          "GPL-3.0, run it on your own server, own your financial data",
      },
      {
        label: "AI bank import",
        value:
          "Parse bank statements (CSV, PDF, XLSX) with auto-categorization",
      },
    ],
    tech: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Go", "Docker", "shadcn/ui"],
    links: {
      app: "https://retrospend.app",
      github: "https://github.com/syntheit/retrospend",
    },
  },

  projects: [
    {
      title: "Travel Checklist",
      category: "web",
      description: "Offline-first travel checklist app with PWA support.",
      tech: ["React.js", "TypeScript", "Next.js", "Tailwind"],
      year: "2025",
      github: "https://github.com/syntheit/travel-checklist",
      live: "https://travel-checklist.matv.io",
    },
    {
      title: "Exchange Rates",
      category: "tools",
      description:
        "Go script fetching exchange rates from multiple APIs, including parallel rates.",
      tech: ["Go", "Nix", "Shell"],
      year: "2025",
      github: "https://github.com/syntheit/exchange-rates",
      live: null,
    },
    {
      title: "NixOS Desktop Configuration",
      category: "infrastructure",
      description:
        "Minimalist desktop environment using Hyprland with custom waybar.",
      tech: ["Nix", "NixOS", "Linux"],
      year: "2023",
      github: "https://github.com/syntheit/nixos",
      live: null,
    },
    {
      title: "Health Tracker",
      category: "web",
      description:
        "Full-stack workout and fitness tracker for logging workouts and viewing stats.",
      tech: ["React.js", "Next.js", "Docker"],
      year: "2025",
      github: "https://github.com/syntheit/health-tracker",
      live: null,
    },
    {
      title: "ColorGuessr",
      category: "web",
      description:
        "Color guessing game — guess the hex/RGB of a color by looking at it.",
      tech: ["React.js", "Next.js", "TypeScript"],
      year: "2022",
      github: "https://github.com/syntheit/colorguessr",
      live: "https://colorguessr.matv.io",
    },
    {
      title: "Self-Managed Server Environment",
      category: "infrastructure",
      description: "Self-hosted services through NixOS and Docker.",
      tech: ["NixOS", "Docker", "Cloudflare"],
      year: "2019",
      github: null,
      live: null,
    },
  ],

  experience: [
    {
      title: "Full-stack Developer",
      company: "New Reach",
      period: "Dec 2025 - Present",
      description:
        "Develop and enhance features for web applications with a focus on user interface design and user experience.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "Full-stack Developer",
      company: "Rensselaer Union",
      period: "Jul 2024 - Mar 2025",
      description:
        "Enhanced software widely used by Rensselaer clubs and staff. Contributed valuable input on feature development and user communication.",
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind",
        "tRPC",
        "Prisma",
      ],
    },
    {
      title: "CFM Process Engineering Intern",
      company: "Global Foundries",
      period: "May 2023 - Aug 2023 & Jun 2024 - Aug 2024",
      description:
        "Designed, built, and deployed a full-stack application to enable data management and configurability for wafer quality metrics.",
      technologies: [
        "React.js",
        "Next.js",
        "Python",
        "tRPC",
        "Postgres",
        "Docker",
        "Prisma",
        "SQL",
        "Linux",
        "TypeScript",
        "Tailwind",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "UncommonX",
      period: "Jul 2021 - Aug 2022",
      description:
        "Developed and maintained software solutions using modern web technologies.",
      technologies: [
        "Angular",
        "TypeScript",
        "PrimeNG",
        "Docker",
        "Python",
        "bash",
        "Linux",
      ],
    },
  ],

  education: {
    title: "Computer Science & Economics",
    institution: "Rensselaer Polytechnic Institute (RPI)",
    period: "Aug 2022 - Dec 2024",
    description:
      "Coursework towards Bachelor of Science in Computer Science and Economics",
  },

  whatImInto: {
    physical: [
      "I train 6 days a week. Running is the big one — I'm doing 30-50km a week, completed my first marathon in Curitiba in 2025, and training for a sub-4:00 at the Buenos Aires marathon in September. After that, a 65K ultra. Long-term goal: Marathon des Sables.",
      "I rock climb weekly and bike everywhere — no car, ~100km a month just getting around. I cook everything from scratch, no processed food.",
    ],
    hardware: [
      { label: "CPU", value: "Intel i5-13600K" },
      { label: "RAM", value: "64GB DDR4 3600MHz" },
      { label: "GPU", value: "GTX 1660 Ti" },
      { label: "Boot/OS", value: "2x4TB NVMe (ZFS Mirror)" },
      { label: "Data", value: "8x18TB HDD (ZFS)" },
    ],
    services: {
      "File & Media": ["Nextcloud", "Immich", "Jellyfin", "Syncthing"],
      Productivity: ["Bitwarden", "Linkding", "Memos", "Retrospend"],
      OS: ["NixOS"],
    },
    infraDescription:
      "I run my own infrastructure. Everything from file sync to media streaming to password management runs on my own hardware. NixOS makes the whole thing declarative and reproducible.",
  },

  quotes: [
    {
      text: "Every action you take is a vote for the type of person you wish to become.",
      author: "Atomic Habits",
    },
    {
      text: "You're under no obligation to be the same person you were 5 minutes ago.",
      author: "Alan Watts",
    },
    {
      text: "Most of what slows things down is taking too long to make decisions",
      author: "Jeff Bezos",
    },
    {
      text: "People do not seem to realize that their opinion of the world is also a confession of their character",
      author: "Ralph Waldo Emerson",
    },
    {
      text: "We must all suffer one of two pains: the pain of discipline or the pain of regret",
      author: "Jim Rohn",
    },
    {
      text: "Of all men's miseries the bitterest is this: to know so much and to have control over nothing.",
      author: "Herodotus",
    },
    {
      text: "The mass of men lead lives of quiet desperation",
      author: "Henry David Thoreau",
    },
  ],
};
