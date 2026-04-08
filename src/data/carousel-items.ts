import type { CarouselItem } from "@/components/ui/carousel";
import {
  Languages,
  Plane,
  BookOpen,
  Code,
  MapPin,
  Globe,
  FileText
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
    id: "travel-checklist",
    title: "Travel Checklist App",
    description: "A simple, elegant travel checklist app I built to help travelers stay organized. Never forget essential items again.",
    href: "https://travel-checklist.matv.io",
    external: true,
    category: "App",
    icon: Plane,
  },
  {
    id: "projects",
    title: "Projects & Work",
    description: "Explore my software engineering projects, from full-stack applications to innovative tools and solutions.",
    href: "/projects",
    category: "Development",
    icon: Code,
  },
  {
    id: "travel-blog",
    title: "Travel Adventures",
    description: "Stories and experiences from my travels around the world. From backpacking through Europe to exploring South America.",
    href: "/travel",
    category: "Travel",
    icon: MapPin,
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