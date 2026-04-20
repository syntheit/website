import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-1 justify-center items-center px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* 404 */}
          <h1 className="font-serif font-black text-[120px] leading-none tracking-tight">
            <span className="text-foreground">4</span>
            <span className="text-primary">0</span>
            <span className="text-foreground">4</span>
          </h1>

          {/* Subtitle */}
          <h2 className="font-serif text-[32px] font-extrabold text-foreground">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-base text-muted-foreground max-w-md">
            This page doesn&apos;t exist. Maybe it moved, maybe it never did.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full bg-foreground text-primary-foreground font-medium text-sm transition-opacity hover:opacity-90"
            >
              Go Home
            </Link>
            <Link
              href="/about"
              className="px-6 py-2.5 rounded-full border-[1.5px] border-foreground text-foreground font-medium text-sm transition-opacity hover:opacity-70"
            >
              View About
            </Link>
          </div>

          {/* Stripe */}
          <div className="flex gap-[3px] h-[6px] w-[400px] max-w-full mt-4">
            <div className="flex-1 rounded-full bg-[#3B2314]" />
            <div className="flex-1 rounded-full bg-[#D4581A]" />
            <div className="flex-1 rounded-full bg-[#E8941A]" />
            <div className="flex-1 rounded-full bg-[#E8C95A]" />
          </div>
        </div>
      </div>
    </main>
  );
}
