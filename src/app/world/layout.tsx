import { Navbar } from "@/components/ui/navbar";
import { WorldSidebar } from "@/components/world/WorldSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World — Daniel Miller",
  description:
    "A personal atlas organized by country — places, notes, and local knowledge from around the world.",
};

export default function WorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col h-screen bg-background overflow-hidden">
      {/* Full-height sidebar background so the color extends behind the nav */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[280px] bg-[#E0CBA8] border-r border-[rgba(59,35,20,0.1)]" />
      <Navbar className="relative" />
      <div className="flex flex-1 overflow-hidden relative">
        <WorldSidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
