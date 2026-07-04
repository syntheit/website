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
      // TODO: Rewrite. This is one of your most impressive things and the description says nothing.
      // Your actual setup: 6 machines (harbor server, conduit VPS, raven Pixel phone server, 2 desktops, Mac).
      // WireGuard tunnels, Headscale mesh networking, ZFS multi-pool storage, restic offsite backups,
      // Prometheus/Grafana monitoring, Gatus status page, 20+ containerized services, Cloudflare tunnels.
      // All declaratively managed with NixOS flakes. Running since 2019, evolved from basic Docker to full fleet.
      // 1-2 sentences that make someone go "wait, you run all that yourself?"
      description:
        "",
      tech: ["NixOS", "Docker", "Cloudflare", "ZFS", "WireGuard", "Go"],
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
      // TODO: Rewrite this. You're underselling yourself massively.
      // Talk about: solo-architecting the 575 M4 Mac Mini NixOS fleet deployment (provisioning, NixOS VMs inside macOS, Headscale mesh networking, health monitoring, phased rollout).
      // Mention: owning entire apps end-to-end, making all architectural decisions independently.
      // Mention the 3D printing idea that saved ~$30K vs the $31K commercial mounting solution.
      // Tone: factual, not braggy. "I own X, I built Y, I architected Z" — let the work speak.
      // This is your best resume line. Make it count.
      description:
        "",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Go", "tRPC", "Prisma", "Docker", "NixOS"],
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
      // TODO: Rewrite. You were 17-18 at this job — that alone is notable.
      // What did you actually build with Angular/Python/Docker? A cybersecurity platform? Internal tools?
      // Even "Built internal tooling for a cybersecurity startup at 17" is better than what's here.
      // 1-2 sentences, specific. What was the product? What was your contribution?
      description:
        "",
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
    // TODO: Decide how you want to frame this. Options:
    // Option A (direct): "Left after 2.5 years to move to Buenos Aires. No regrets."
    // Option B (neutral): "Studied CS & Economics for 2.5 years before leaving to build in Buenos Aires."
    // Option C (just the facts): "Computer Science and Economics, 2.5 years"
    // Being direct about leaving seems more on-brand for you than "coursework towards" which sounds evasive.
    description:
      "",
  },

  whatImInto: {
    physical: [
      "I train 6 days a week. Running is the big one — I'm doing 30-50km a week, completed my first marathon in Curitiba in 2025 (4:35), and training for a sub-4:00 at the Buenos Aires marathon in September. After that, a 65K ultra. Long-term goal: Marathon des Sables.",
      "I rock climb weekly and bike everywhere — no car, ~100km a month just getting around. I cook everything from scratch, no processed food.",
    ],
    hardware: [
      { label: "CPU", value: "Intel i5-13600K" },
      { label: "RAM", value: "64GB DDR4 3600MHz" },
      { label: "GPU", value: "GTX 1660 Ti" },
      { label: "Boot/OS", value: "2x4TB NVMe (ZFS Mirror)" },
      { label: "Data", value: "8x18TB HDD (ZFS)" },
      { label: "VPS", value: "RackNerd (conduit)" },
      { label: "ARM Server", value: "Pixel 6 Pro (raven)" },
    ],
    services: {
      "File & Media": ["Nextcloud", "Immich", "Jellyfin", "Syncthing", "Seafile", "Paperless-ngx"],
      Productivity: ["Bitwarden", "Linkding", "Memos", "Retrospend", "Radicale", "Docmost", "Karakeep"],
      Monitoring: ["Prometheus", "Grafana", "Gatus", "Scrutiny"],
      Networking: ["Headscale", "WireGuard", "Cloudflare Tunnels"],
      "AI & Gaming": ["Ollama", "Pelican (Minecraft/Factorio)"],
      OS: ["NixOS"],
    },
    // TODO: Consider rewriting this to mention the multi-machine setup:
    // harbor (main server), conduit (VPS gateway), raven (Pixel phone running NixOS via pKVM),
    // plus desktops and a Mac — all managed declaratively with Nix flakes.
    // The Pixel phone server is a great conversation starter.
    infraDescription:
      "I run my own infrastructure across multiple machines — a home server, a VPS gateway, and even a cracked-screen Pixel phone converted into an ARM server. Everything from file sync to media streaming to game servers to LLM inference runs on my own hardware, all declaratively managed with NixOS.",
  },

  nixInfra: {
    // TODO: Write 2-3 sentences introducing your infrastructure philosophy.
    // Why Nix? Why self-host everything? Why do you run 6 machines?
    // The angle: you treat your personal infrastructure the way companies treat production systems —
    // declarative, reproducible, monitored, backed up — but it's all yours, on your terms.
    // Mention: everything managed from a single git repo, Nix flakes, 6000+ lines of config.
    // Tone: matter-of-fact enthusiasm. You're not bragging — you genuinely enjoy this.
    intro:
      "",

    machines: [
      {
        name: "harbor",
        role: "Server",
        icon: "server",
        arch: "x86_64-linux",
        // TODO: Write a one-liner that captures what harbor is. Something like:
        // "The workhorse — runs 20+ services from media streaming to LLM inference, all on ZFS."
        highlight:
          "",
        details: [
          "Intel i5-13600K, 64GB RAM, GTX 1660 Ti",
          "8 ZFS pools with automated snapshots (hourly/daily/monthly)",
          "20+ Docker containers: Jellyfin, Immich, Nextcloud, Bitwarden, Grafana, Ollama, game servers",
          "Restic encrypted offsite backups daily at 3am with database-aware pre-hooks",
          "NVIDIA GPU-accelerated transcoding for Jellyfin + CUDA ML for Immich photo recognition",
        ],
        tech: ["NixOS", "ZFS", "Docker", "NVIDIA", "Prometheus", "Grafana"],
      },
      {
        name: "conduit",
        role: "VPS Gateway",
        icon: "globe",
        arch: "x86_64-linux",
        // TODO: Write a one-liner. Something like:
        // "RackNerd VPS in NYC — reverse proxy, WireGuard endpoint, Headscale coordination server."
        highlight:
          "",
        details: [
          "RackNerd VPS with static IP, BBR congestion control tuned for BA↔NYC",
          "WireGuard tunnel to harbor for secure service exposure",
          "Headscale in systemd-nspawn container — self-hosted Tailscale coordination",
          "Caddy reverse proxy with auto TLS for *.matv.io subdomains",
          "NAT port forwarding for Minecraft/Factorio game traffic to harbor",
        ],
        tech: ["NixOS", "WireGuard", "Headscale", "Caddy", "systemd-nspawn"],
      },
      {
        name: "raven",
        role: "Phone Server",
        icon: "smartphone",
        arch: "aarch64-linux",
        // TODO: Write a one-liner. This is the crowd-pleaser — lean into it. Something like:
        // "A cracked-screen Pixel 6 Pro running NixOS via pKVM. Yes, it hosts this website."
        highlight:
          "",
        details: [
          "Pixel 6 Pro (Tensor GS101) — cracked screen, repurposed as headless server",
          "LineageOS → pKVM hypervisor → NixOS VM → Docker containers",
          "Hosts matv.io via Cloudflare tunnel + Gatus status monitoring",
          "Custom raven-status tool: battery health, CPU thermals (BIG/MID/LITTLE), live mode",
          "~3-5% virtualization overhead, pKVM solved GKI ABI compatibility issues",
        ],
        tech: ["NixOS", "pKVM", "Docker", "Cloudflare", "aarch64"],
      },
      {
        name: "swift",
        role: "Mac Workstation",
        icon: "monitor",
        arch: "aarch64-darwin",
        // TODO: Write a one-liner. Something like:
        // "Apple Silicon Mac with nix-darwin, tiling WM, and 90+ disabled telemetry daemons."
        highlight:
          "",
        details: [
          "nix-darwin with Nix flakes — fully declarative macOS configuration",
          "Yabai tiling window manager + skhd hotkey daemon",
          "90+ macOS telemetry/analytics daemons disabled via launchd",
          "Custom Swift apps: audio EQ, window overview, menubar extras",
          "60+ Homebrew casks managed declaratively through nix-homebrew",
        ],
        tech: ["nix-darwin", "Yabai", "skhd", "Swift", "Karabiner"],
      },
      {
        name: "mantle / ledger",
        role: "Desktops",
        icon: "cpu",
        arch: "x86_64-linux",
        // TODO: Write a one-liner. Something like:
        // "NixOS desktops with Hyprland, a custom tmux dashboard, and hardware-level device control."
        highlight:
          "",
        details: [
          "Hyprland tiling Wayland compositor — zero-gap, minimal animations",
          "Custom tmux dashboard: ASCII clock, btop, exchange rates, weather, server health",
          "USB device control: toggle mic/camera at hardware level via sysfs",
          "Screenshot arsenal: area/window/monitor capture, annotation, video recording",
          "Fingerprint auth, TLP battery management, BTRFS snapshots (ledger)",
        ],
        tech: ["NixOS", "Hyprland", "Wayland", "tmux", "PipeWire"],
      },
    ],

    customTools: [
      {
        name: "Argus",
        description:
          "Declarative container update manager that replaces Watchtower. Per-container update policies with pre-update database backups and rollback support.",
        // TODO: One line on why you built it. Something like:
        // "Watchtower was too dumb — it would update containers without backing up their databases first."
        context:
          "",
      },
      {
        name: "Foyer",
        description:
          "Custom server dashboard showing service links, health status, and Jellyfin library stats. Runs on harbor, conduit, and raven.",
        context:
          "",
      },
      {
        name: "raven-status",
        description:
          "Hardware monitor for the Pixel server — battery health, voltage, cycle count, CPU thermals per cluster (BIG/MID/LITTLE), GPU/TPU temps. Live refresh mode.",
        context:
          "",
      },
      {
        name: "Dashboard TUI",
        description:
          "tmux-based system dashboard combining ASCII clock, btop, ARS/BRL exchange rates, weather, server health, and wallpaper info. Scroll wheel adjusts volume, hotkeys toggle mic/camera.",
        context:
          "",
      },
      {
        name: "usb-toggle",
        description:
          "Toggle USB devices (mic, camera) at the hardware level via /sys/bus/usb/*/authorized. Devices deauthorized on plug-in by default.",
        context:
          "",
      },
      {
        name: "macOS Panels",
        description:
          "Suite of custom Swift apps for macOS: volume, brightness, bluetooth, wifi, and search panels. Replaces macOS system HUD with minimal overlays.",
        context:
          "",
      },
    ],

    // TODO: Write 2-3 sentences about the networking. Hit these beats:
    // WireGuard tunnel from harbor in [location] to conduit VPS in NYC, tuned with BBR for BA↔NYC latency.
    // Headscale (self-hosted Tailscale) coordinates the whole fleet + gives coworkers SSH access for the Malli Mac Mini fleet.
    // Cloudflare tunnels on conduit and raven for secure internet exposure without opening ports.
    // All of this so you can access everything from anywhere via Tailscale, and expose select services publicly.
    networkingDescription:
      "",

    // TODO: Write a closing thought. The angle:
    // Everything in one git repo. `nixos-rebuild switch` and a machine is configured.
    // sops-nix for secrets. Restic for backups. If a machine dies, you rebuild it from the repo.
    // This isn't a hobby — it's how you actually run your digital life.
    // Maybe mention the line count (6000+) or that it spans macOS + Linux + Android.
    philosophy:
      "",
  },

  music: {
    // TODO: Write 2-3 sentences about what music means to you.
    // From the_construct: "emotional honesty through atmosphere rather than force. Fleeting beauty, impermanence, mono no aware."
    // You have 11K songs and 200 playlists — music isn't background noise for you.
    // Mention: you actively de-anglicize your listening — French pop, Argentine rock, Brazilian music.
    // Tone: personal, not a music review. Why do you listen to what you listen to?
    intro:
      "",

    stats: {
      songs: "11K",
      playlists: "~200",
    },

    soulTier: {
      // TODO: Write 1-2 sentences about why these artists hit different.
      // Françoise Hardy, Fishmans (Long Season), Jumo — the "mono no aware" tier.
      // What is it about this sound? The fleeting beauty, impermanence, atmosphere.
      description:
        "",
      artists: ["Françoise Hardy", "Fishmans", "Jumo"],
    },

    genres: [
      {
        name: "French Pop",
        artists: [
          "Vendredi sur Mer",
          "Videoclub",
          "Alice et Moi",
          "La Femme",
          "Claire Laffut",
          "Angèle",
          "Clou",
          "Alexia Gredy",
          "Vanille",
          "Valmont",
        ],
        color: "#3B2314",
      },
      {
        name: "EDM / Electronic",
        artists: [
          "No Mana",
          "Lemaitre",
          "Tim Legend",
          "Ark Patrol",
          "Uppermost",
          "Manila Killa",
          "Sysdemes",
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
        // TODO: Add more if you want — these came from Quintino Cinalli's recommendations.
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

    // TODO: Add your actual Spotify playlist URLs here. Pick 3-6 of your best/most representative playlists.
    // Ideas: a French playlist, your soul/atmospheric playlist, an Argentine rock one, an EDM one, a running playlist.
    // If you don't want to link playlists yet, set this to an empty array [].
    playlists: [
      // {
      //   name: "French Rotation",
      //   description: "Vendredi sur Mer, Videoclub, La Femme — the core of my French listening.",
      //   url: "https://open.spotify.com/playlist/...",
      // },
      // {
      //   name: "Mono no Aware",
      //   description: "The atmospheric tier. Françoise Hardy, Fishmans, Jumo. Fleeting beauty.",
      //   url: "https://open.spotify.com/playlist/...",
      // },
      // {
      //   name: "Running",
      //   description: "What gets me through 30-50km weeks.",
      //   url: "https://open.spotify.com/playlist/...",
      // },
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
