import { BookOpen, Headphones, MessageSquare } from "lucide-react";

export interface Language {
  name: string;
  nativeName: string;
  level: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Beginner" | "Learning";
  delfLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  years: number;
  description: string;
  flag: string;
  proficiency: number;
  goals: string[];
  resources: Resource[];
}

export interface Resource {
  name: string;
  type: "Book" | "App" | "Video" | "Podcast" | "Website" | "Course";
  url?: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface LanguageLearningResource {
  name: string;
  description: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  action_text: string;
}

// Function to calculate proficiency percentage based on DELF level
export const getDelfProficiency = (delfLevel?: string): number => {
  if (!delfLevel) return 0;
  
  const delfLevels = {
    "A1": 1,
    "A2": 2,
    "B1": 3,
    "B2": 4,
    "C1": 5,
    "C2": 6
  };
  
  const level = delfLevels[delfLevel as keyof typeof delfLevels];
  if (!level) return 0;
  
  // Each level represents 16.67% (100/6)
  return Math.round(level * 16.67);
};

export const languages: Language[] = [
  {
    name: "English",
    nativeName: "English",
    level: "Native",
    years: 22,
    description: "My native language used daily for work, communication, and media consumption.",
    flag: "🇺🇸",
    proficiency: 100,
    goals: [],
    resources: []
  },
  {
    name: "Spanish",
    nativeName: "Español",
    level: "Advanced",
    delfLevel: "B2",
    years: 1,
    description: "I'm currently living in Argentina, learning rapidly. I can hold conversations, read literature, and work professionally.",
    flag: "🇦🇷",
    proficiency: getDelfProficiency("B2"),
    goals: ["Reach C1 level", "Improve pronunciation"],
    resources: [
      {
        name: "Duolingo Spanish",
        type: "App",
        url: "https://www.duolingo.com/course/es/en/Learn-Spanish",
        description: "Daily practice and vocabulary building",
        icon: BookOpen
      },
      {
        name: "SpanishPod101",
        type: "Podcast",
        url: "https://www.spanishpod101.com/",
        description: "Audio lessons for all levels",
        icon: Headphones
      }
    ]
  },
  {
    name: "French",
    nativeName: "Français",
    level: "Intermediate",
    delfLevel: "B2",
    years: 9,
    description: "I started in middle school, passed B2 exam senior year. I can handle conversations and read texts.",
    flag: "🇫🇷",
    proficiency: getDelfProficiency("B2"),
    goals: ["Reach C1 level", "Advance speaking skills"],
    resources: [
      {
        name: "Babbel French",
        type: "App",
        url: "https://www.babbel.com/learn-french",
        description: "Structured lessons with native speakers",
        icon: BookOpen
      },
      {
        name: "Coffee Break French",
        type: "Podcast",
        description: "Bite-sized French lessons",
        icon: Headphones
      }
    ]
  },
  {
    name: "Ukrainian",
    nativeName: "Українська",
    level: "Beginner",
    delfLevel: "A2",
    years: 21,
    description: "I have Ukrainian family background, known since childhood. I'm familiar at intuitive level, need advancement.",
    flag: "🇺🇦",
    proficiency: getDelfProficiency("A2"),
    goals: ["Learn noun tenses and more vocab", "Read more"],
    resources: [
      {
        name: "Duolingo Ukrainian",
        type: "App",
        url: "https://www.duolingo.com/course/uk/en/Learn-Ukrainian",
        description: "Free Ukrainian course for English speakers",
        icon: BookOpen
      },
      {
        name: "Ukrainian Lessons",
        type: "Podcast",
        url: "https://ukrainianlessons.com/",
        description: "Comprehensive Ukrainian learning podcast",
        icon: Headphones
      }
    ]
  },
  {
    name: "Russian",
    nativeName: "Русский",
    level: "Beginner",
    delfLevel: "B1",
    years: 0.75,
    description: "I have Ukrainian family background, known since childhood. My Ukrainian knowledge aids learning, I'm familiar with vocabulary.",
    flag: "🇷🇺",
    proficiency: getDelfProficiency("B1"),
    goals: ["Learn more vocab and verbs", "Read more"],
    resources: [
      {
        name: "Duolingo Russian",
        type: "App",
        url: "https://www.duolingo.com/course/ru/en/Learn-Russian",
        description: "Free Russian course for English speakers",
        icon: BookOpen
      },
      {
        name: "Russian Made Easy",
        type: "Podcast",
        description: "Step-by-step Russian learning podcast",
        icon: Headphones
      }
    ]
  },
  {
    name: "Portuguese",
    nativeName: "Português",
    level: "Beginner",
    delfLevel: "B1",
    years: 0.5,
    description: "I love traveling to Brazil and the Brazilian Portuguese accent. My Spanish similarity provides learning advantage.",
    flag: "🇧🇷",
    proficiency: getDelfProficiency("B1"),
    goals: ["Reach B2 by end of 2025", "Learn more Brazilian slang"],
    resources: [
      {
        name: "Duolingo Portuguese",
        type: "App",
        url: "https://www.duolingo.com/course/pt/en/Learn-Portuguese",
        description: "Free Portuguese course for English speakers",
        icon: BookOpen
      },
      {
        name: "PortuguesePod101",
        type: "Podcast",
        url: "https://www.portuguesepod101.com/",
        description: "Audio lessons for Portuguese learners",
        icon: Headphones
      }
    ]
  }
];

export const languageLearningResources: LanguageLearningResource[] = [
  {
    name: "Steve Kaufmann",
    description: "Steve Kaufmann's language philosophy is pragmatic and smart. He describes how to not fall into the modern-day pitfalls of language learning and how to integrate your target language into your life.",
    url: "https://www.youtube.com/@Thelinguist",
    icon: MessageSquare,
    action_text: "Visit Channel"
  },
  {
    name: "Preply",
    description: "Connect with professional language tutors for personalized one-on-one lessons. Find native speakers and certified teachers for any language at flexible times.",
    url: "https://preply.com/",
    icon: MessageSquare,
    action_text: "Find Tutors"
  }
];

export const learningStrategy = {
  corePrinciples: [
    "Integrate target language wherever possible",
    "Make friends who are native speakers and talk to them in your target language",
    "Enjoy it - find joy in the process. If you're not enjoying it, you're doing something wrong",
    "Don't set aside much time - it's a long-term game requiring consistent exposure, not countless hours",
    "Start speaking as soon as you can - go to meetups, use HelloTalk, Chatroulette, Discord servers",
    "Don't worry about grammar, just gain input. You'll learn grammar over time",
    "Don't let 'I'm bad at languages' be a self-fulfilling prophecy"
  ],
  comprehensibleInput: [
    "Mostly understandable: language you mostly understand, even with a few new words",
    "Grasp the gist: follow meaning through context, gradually absorbing new elements",
    "Just above your level: challenging but achievable, like lifting weights slightly above current strength",
    "Aim for 85-90% comprehension"
  ],
  llmStrategies: [
    "Generate comprehensible input at your level",
    "Create content that interests you - don't force yourself to read things you don't want to",
    "Ask unlimited questions - LLMs are infinitely patient",
    "Get feedback on your writing with good prompts",
    "Create news summaries and translations",
    "Use NotebookLM and Gemini to make podcasts",
    "Switch your phone language to target language",
    "Create cloze tests, articles with new vocab, quizzes, grammar games",
    "Correct phrasing to sound more natural, fix grammar, suggest vocabulary",
    "Roleplay scenarios you'd be in for context practice",
    "Write daily journals and receive corrections",
    "Make your daily LLM use in your target language"
  ]
};

export const futureGoals = {
  shortTerm: [
    "Reach fluency in Spanish",
    "Master Cyrillic alphabet (Ukrainian/Russian)",
    "Be able to understand a Brazilian Portuguese movie or TV show"
  ],
  longTerm: [
    "Reach at least B2/C1 in all of the languages I currently know",
    "Learn another language or two within the Romance or Slavic family (Italian, Catalan, Polish)",
    "Begin learning Chinese"
  ]
};
