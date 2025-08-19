import type { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function InfoCard({ icon, title, children }: InfoCardProps) {
  return (
    <div className="border-border bg-card space-y-3 rounded-2xl border p-6">
      <div className="flex items-center gap-3">
        <div className="text-primary h-5 w-5">{icon}</div>
        <h3 className="text-foreground font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
