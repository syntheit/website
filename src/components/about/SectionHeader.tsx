import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  size?: "lg" | "xl";
}

export function SectionHeader({
  icon,
  title,
  size = "xl",
}: SectionHeaderProps) {
  const sizeClasses = {
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="text-primary h-6 w-6">{icon}</div>
      <h2 className={`${sizeClasses[size]} text-foreground font-bold`}>
        {title}
      </h2>
    </div>
  );
}
