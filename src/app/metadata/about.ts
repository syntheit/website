// Copy note: descriptions below were drafted from the_construct — Daniel
// edits before final. Facts (fleet size, machine specs, dates) are real.

export const ABOUT_DATA = {
  hero: {
    name: "Daniel",
    // Intro is Daniel's to write: ~30-60s read. Arc = Chicago + half-Ukrainian
    // roots -> computers young + languages -> moving to BA and staying -> a
    // philosophy line -> 22 and still figuring it out.
    intro:
      "[Write: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intro paragraph — Chicago + half-Ukrainian family, computers since a kid, languages, how I ended up in Buenos Aires and why I stayed, a philosophy line, and that I'm 22 and still figuring it out.]",
  },

  retrospend: {
    description:
      "A self-hostable, open-source personal finance app with built-in bill splitting. Multi-currency support with 100+ fiat currencies, crypto, and parallel market rates. Track expenses, manage budgets, split bills, and monitor your net worth, all in one place.",
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
    links: {
      app: "https://retrospend.app",
      github: "https://github.com/syntheit/retrospend",
    },
  },

  // Two full-width feature cards. Descriptions are Daniel's to write.
  // Facts (kicker, links) are real; the prose is placeholder.
  projects: [
    {
      title: "NixOS on a OnePlus 6T",
      kicker: "Mobile Linux",
      description:
        "[Write: Lorem ipsum — fajita. Mobile NixOS on a custom SDM845 kernel, moved from Phosh to GNOME Shell Mobile, got the cameras autofocusing, hand-wrote the ALSA audio profiles, bridged the Qualcomm sensor DSP, hit upstream bugs. Plus the suite of GTK4 mobile apps I build for it (terminal, email, telegram, youtube, stocks) and running Claude Code on the phone itself.]",
      links: [{ label: "GitHub", href: "https://github.com/syntheit/nixos" }],
    },
    {
      title: "Mac Mini Fleet",
      kicker: "Infrastructure · New Reach",
      description:
        "[Write: Lorem ipsum — malli. Built the infrastructure for ~575 M4 / M4 Pro Mac Minis: zero-touch provisioning from factory to production in ~30 minutes, 22 automated bootstrap steps, my own Go control plane (deus) with phased rollouts and rollback. Architected and deployed solo.]",
      links: [{ label: "Overview", href: "https://malli-overview.matv.io/" }],
    },
  ],

  experience: [
    {
      title: "Software Engineer",
      company: "New Reach",
      period: "Dec 2025 - Present",
      // Slimmed to role + company — the Mac Mini fleet build lives in Projects.
      description:
        "[Write: short — what New Reach is and what I do here day to day. Keep it brief; the Mac Mini fleet build is covered up in Projects.]",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Go", "tRPC", "Prisma", "Docker", "NixOS"],
    },
    {
      title: "Full-stack Developer",
      company: "Rensselaer Union",
      period: "Jul 2024 - Mar 2025",
      description:
        "Maintained and extended the software Rensselaer's clubs and student union staff run on day to day.",
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
        "First dev job, at 17: built internal tooling for a Chicago cybersecurity company while finishing high school.",
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
    description: "",
  },

  whatImInto: {
    // Reframe: not a running-goals brag sheet. The whole training life — gym
    // most days, climbing, cycling as transport, running that ramps for a race
    // (30-50km/wk is a marathon block, not always). Through-line: training so
    // I'm still doing this at 80, not to hit a number. Daniel's to write.
    physical: [
      "[Write: Lorem ipsum — training as a whole: gym most days, rock climbing, cycling everywhere as transport, running that ramps up for a race. Honest that 30-50km/week is a marathon-block number, not year-round.]",
      "[Write: Lorem ipsum — the why: I train so I'm still active at 80, not to hit a number.]",
    ],
  },

  nixInfra: {
    // Intro is Daniel's to write (his nix philosophy / why he runs it). The
    // fleet list is factual and accurate — kept as plain text, not placeholder.
    // Removed: the fake Headscale networking blurb and the custom-tools grid.
    intro:
      "[Write: Lorem ipsum — my nix setup and why I run it: everything (Linux, macOS, a phone) declared in one git repo, rebuildable from scratch. What I actually get out of doing it this way.]",

    machines: [
      {
        name: "harbor",
        arch: "x86_64-linux",
        role: "Home server. 20+ services on ZFS: Jellyfin, Immich, containers, VMs.",
      },
      {
        name: "conduit",
        arch: "x86_64-linux",
        role: "VPS gateway. Caddy reverse proxy and public entrypoint for *.matv.io.",
      },
      {
        name: "raven",
        arch: "aarch64-linux",
        role: "Pixel 6 Pro running NixOS in a VM. Hosts a status dashboard.",
      },
      {
        name: "fajita",
        arch: "aarch64-linux",
        role: "OnePlus 6T running Mobile NixOS (deep dive up in Projects).",
      },
      {
        name: "vista",
        arch: "x86_64-linux",
        role: "2019 T2 MacBook Pro repurposed as a headless server.",
      },
      {
        name: "swift",
        arch: "aarch64-darwin",
        role: "MacBook, managed declaratively with nix-darwin.",
      },
      {
        name: "mini",
        arch: "aarch64-darwin",
        role: "Mac mini, aarch64 build box for harbor.",
      },
      {
        name: "mantle / ledger",
        arch: "x86_64-linux",
        role: "NixOS desktop and ThinkPad, Hyprland.",
      },
    ],
  },

  music: {
    intro:
      "I listen to a lot of music. My library is 13,000+ tracks across 231 playlists, and a lot of it is niche: French pop, Turkish psychedelic, Argentine rock, and a lot of different electronic. Some of the artists I keep coming back to:",
    stats: {
      songs: "13K",
      playlists: "231",
    },
    genres: [
      {
        name: "French Pop",
        artists: [
          "Vendredi sur Mer",
          "Videoclub",
          "Valmont",
          "Alice et Moi",
          "La Femme",
          "Claire Laffut",
          "Angèle",
          "Clou",
          "Alexia Gredy",
          "Vanille",
        ],
        color: "#3B2314",
      },
      {
        name: "Electronic",
        artists: [
          "deadmau5",
          "No Mana",
          "Sysdemes",
          "Lemaitre",
          "ODESZA",
          "Tim Legend",
          "Ark Patrol",
          "Uppermost",
          "Manila Killa",
        ],
        color: "#D4581A",
      },
      {
        name: "70s Rock",
        artists: [
          "CCR",
          "ELO",
          "Doobie Brothers",
          "ZZ Top",
          "Blue Öyster Cult",
        ],
        color: "#E8941A",
      },
      {
        name: "Argentine Rock",
        artists: ["Charly García", "Spinetta", "Litto Nebbia"],
        color: "#E8C95A",
      },
      {
        name: "Jazz",
        artists: ["Miles Davis", "Pat Metheny", "Weather Report"],
        color: "#7A5C42",
      },
      {
        name: "Trance-Pop / Club",
        artists: ["The Dare", "Charli XCX", "Magdalena Bay"],
        color: "#D4581A",
      },
    ],
    spotifyUrl: "https://open.spotify.com/user/312k3mbad43po7ghp67ralyw2j6q",
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
