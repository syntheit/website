export const ABOUT_DATA = {
  hero: {
    name: "Daniel",
    description:
      "A programmer, entrepreneur, and perpetual learner building businesses in Argentina while pursuing marathons, languages, and the next adventure.",
  },

  locations: [
    { label: "Currently", value: "Buenos Aires, AR" },
    { label: "University", value: "Troy, NY" },
    { label: "Originally", value: "Chicago, IL" },
  ],

  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "B1" },
    { name: "French", level: "B2" },
    { name: "Ukrainian", level: "A2" },
    { name: "Russian", level: "A2" },
  ],

  interestsList: [
    "Fitness",
    "Running",
    "Rock Climbing",
    "Hiking",
    "Urban Exploration",
    "Photography",
    "Music",
    "Books",
    "Languages",
    "History",
    "Economics",
    "Geopolitics",
    "Roadtrips",
    "Travel",
    "Open Source",
  ],

  story: [
    "I'm an open-minded individual always looking for something new to explore—whether that's a country, a language, or an idea worth building. I like to move fast, stay curious, and immerse myself deeply in whatever I'm doing.",
    "I work as a programmer and am in the early stages of building businesses here in Argentina. My days are a mix of coding, learning, meeting interesting people, and making things happen.",
    "Outside of work, I run (I'm aiming for a marathon by the end of the year), take photos wherever I go, and keep chipping away at new languages. I'm always chasing the next challenge, and I plan to keep it that way.",
  ],

  skills: {
    programmingLanguages: [
      "TypeScript",
      "JavaScript",
      "C/C++",
      "Java",
      "Python",
      "SQL",
      "HTML/CSS",
    ],
    librariesFrameworks: [
      "React.js",
      "Angular",
      "Next.js",
      "Node.js",
      "Express.js",
      "tRPC",
      "Prisma",
      "Tailwind",
    ],
    toolsPlatforms: [
      "Docker",
      "NixOS",
      "Firebase",
      "Git",
      "Algolia",
      "Jira",
      "Linux",
      "Postgres",
    ],
  },

  interests: [
    {
      icon: "Code",
      title: "Fitness & Health",
      description:
        "My health is my top priority. I'm an avid gym-goer and run regularly, hoping to complete a marathon before the end of the year. I also enjoy cooking healthy, simple meals.",
    },
    {
      icon: "Mountain",
      title: "Rock Climbing",
      description:
        "I see rock climbing as physical puzzle solving—it's the perfect intersection of mental and physical challenge.",
    },
    {
      icon: "Languages",
      title: "Languages",
      description:
        "I've spoken foreign languages since I was a kid and continue to learn new ones to this day.",
      link: "/languages",
      linkText: "Read more about my language learning journey here.",
    },
    {
      icon: "Plane",
      title: "Travel",
      description: "I love exploring unique places and going on roadtrips.",
    },
  ],

  experience: [
    {
      title: "Lead Developer",
      company: "GerminaAI",
      period: "Jun 2025 - Present",
      description:
        "Designing and developing a mobile-first platform to connect small investors with global startups.",
      technologies: ["React.js", "tRPC", "Postgres", "Docker", "TypeScript", "DevOps"],
      isCurrent: true,
    },
    {
      title: "Full-stack Developer",
      company: "Rensselaer Union",
      period: "Jul 2024 - Mar 2025",
      description:
        "Enhanced software widely used by Rensselaer clubs and staff. Contributed valuable input on feature development and user communication.",
      technologies: ["React.js", "Next.js", "TypeScript", "Tailwind", "tRPC", "Prisma"],
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
      technologies: ["Angular", "TypeScript", "PrimeNG", "Docker", "Python", "bash", "Linux"],
    },
    {
      title: "Computer Science & Economics",
      company: "Rensselaer Polytechnic Institute (RPI)",
      period: "Aug 2022 - Dec 2024",
      description:
        "Coursework towards Bachelor of Science in Computer Science and Economics",
    },
  ],

  infrastructure: {
    hardware: {
      system: [
        { label: "CPU:", value: "Intel i5-13600K" },
        { label: "RAM:", value: "64GB DDR4 3600MHz" },
        { label: "GPU:", value: "GTX 1660 Ti" },
      ],
      storage: [
        { label: "Boot/OS:", value: "2x4TB NVMe (ZFS Mirror)" },
        { label: "Data:", value: "8x18TB HDD (ZFS)" },
      ],
    },
    services: {
      fileMedia: ["Nextcloud", "Immich", "Jellyfin", "Syncthing", "Tube Archivist"],
      productivitySecurity: ["Bitwarden", "Linkding", "Memos"],
      operatingSystem: "NixOS",
    },
    description: [
      "I run a comprehensive self-hosted infrastructure that gives me full control over my data and digital life. From file synchronization and media streaming to password management and note-taking, everything runs on my own hardware.",
      "The setup uses ZFS for reliable storage with mirrored NVMe drives for the operating system and a large storage pool for media and data. NixOS provides a declarative approach to system configuration, making the entire infrastructure reproducible and maintainable.",
    ],
  },

  cta: {
    title: "Let's Work Together",
    description:
      "I'm always interested in new opportunities and exciting projects. Let's discuss how we can create something amazing together.",
    buttonText: "View Projects",
    buttonLink: "/projects",
  },
};
