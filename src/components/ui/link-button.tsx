import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  icon: LucideIcon | IconType;
  text: string;
  iconBgColor?: string;
  textColor?: string;
  className?: string;
  external?: boolean;
}

export function LinkButton({
  href,
  icon: Icon,
  text,
  iconBgColor = "bg-primary/10",
  textColor = "text-foreground",
  className,
  external = false
}: LinkButtonProps) {
  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 sm:gap-3 h-10 sm:h-12 w-full sm:w-36 rounded-xl sm:rounded-2xl border border-input bg-background shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer",
        className
      )}
      {...linkProps}
    >
      <div className={cn("w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ml-2 sm:ml-3", iconBgColor)}>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
      </div>
      <span className={cn("text-xs sm:text-sm font-medium", textColor)}>
        {text}
      </span>
    </a>
  );
} 