import { User, Camera, Globe, BookOpen, Languages } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const siteConfig = {
  title: "Daniel Miller",
  navItems: [
    { href: "/about", label: "About", icon: User },
    { href: "/world", label: "World", icon: Globe },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/languages", label: "Languages", icon: Languages },
    { href: "/photography", label: "Photography", icon: Camera },
  ] as NavItem[],
} as const; 