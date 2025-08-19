import { User, Camera, Code, Plane, Gamepad2, BookOpen, Languages } from "lucide-react";
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
    { href: "/photography", label: "Photography", icon: Camera },
    { href: "/projects", label: "Projects & Apps", icon: Code },
    { href: "/travel", label: "Travel", icon: Plane },
    { href: "/minigames", label: "Minigames", icon: Gamepad2 },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/languages", label: "Languages", icon: Languages },
  ] as NavItem[],
} as const; 