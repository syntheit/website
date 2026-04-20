import type { CarouselItem } from "@/components/ui/carousel";
import {
  Languages,
  BookOpen,
  Code,
  Palette,
  Globe,
  FileText,
  DollarSign
} from "lucide-react";

export const carouselItems: CarouselItem[] = [
  {
    id: "languages",
    title: "Language Learning Resources",
    description: "Discover my curated collection of language learning tools, apps, and techniques that have helped me become proficient in multiple languages.",
    href: "/languages",
    category: "Learning",
    icon: Languages,
  },
  {
    id: "retrospend",
    title: "Retrospend",
    description: "A personal finance and expense tracker application that helps manage expenses, track wealth, and handle multi-currency transactions with exchange rate integration.",
    href: "https://retrospend.app",
    external: true,
    category: "Finance",
    icon: DollarSign,
  },
  {
    id: "projects",
    title: "Projects & Work",
    description: "Explore my software engineering projects, from full-stack applications to innovative tools and solutions.",
    href: "/about",
    category: "Development",
    icon: Code,
  },
  {
    id: "world",
    title: "World Atlas",
    description: "A personal atlas organized by country — places, notes, and local knowledge from around the world.",
    href: "/world",
    category: "World",
    icon: Globe,
  },
  {
    id: "resources",
    title: "Curated Resources",
    description: "A carefully selected collection of tools, books, and resources that have been invaluable in my personal and professional growth.",
    href: "/resources",
    category: "Resources",
    icon: BookOpen,
  },
  {
    id: "photography-portfolio",
    title: "Photography Portfolio",
    description: "A showcase of my photography work, featuring landscapes, street photography, and moments captured around the world.",
    href: "/photography",
    category: "Art",
    icon: Palette,
  },
  {
    id: "about",
    title: "About Me",
    description: "Learn more about my background, interests, and what drives me as a software engineer and creative professional.",
    href: "/about",
    category: "Personal",
    icon: Globe,
  },
  {
    id: "resume",
    title: "Resume & Experience",
    description: "My professional background, skills, and experience in software engineering and product development.",
    href: "/Daniel Miller Resume.pdf",
    external: true,
    category: "Professional",
    icon: FileText,
  },
]; 