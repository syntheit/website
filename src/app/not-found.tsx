"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Home, Search, MapPin } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 px-4 pb-12 sm:px-8 md:px-12">
        <div className="mx-auto space-y-12 max-w-4xl">
          {/* Hero Section */}
          <div className="space-y-8 text-center">
            <div className="space-y-6">
              <h1 className="text-6xl font-black sm:text-7xl md:text-8xl text-foreground">
                4<span className="text-primary">0</span>4
              </h1>
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl text-foreground">
                Page Not Found
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl text-muted-foreground">
                Looks like you&apos;ve wandered off the beaten path. The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 space-y-3 rounded-2xl border border-border bg-card">
              <div className="flex gap-3 items-center">
                <Home className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Go Home</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Return to the main page and explore from there.
              </p>
              <Button className="w-full" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            <div className="p-6 space-y-3 rounded-2xl border border-border bg-card">
              <div className="flex gap-3 items-center">
                <Search className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Explore Site</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Check out some of my favorite pages and projects.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/about">About Me</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/projects">Projects</Link>
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-3 rounded-2xl border border-border bg-card">
              <div className="flex gap-3 items-center">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Navigation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the navigation menu to find what you&apos;re looking for.
              </p>
              <div className="flex flex-wrap gap-1">
                {[
                  "About",
                  "Photography", 
                  "Projects",
                  "Travel",
                  "Minigames",
                  "Resources",
                  "Languages"
                ].map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fun Section */}
          <div className="p-8 space-y-6 text-center bg-gradient-to-br rounded-3xl from-primary/5 to-accent/10">
            <h2 className="text-2xl font-bold text-foreground">
              While You&apos;re Here...
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Since you&apos;ve made it this far, why not check out some of my work? 
              I promise it&apos;s more interesting than this 404 page.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href="/photography">View Photography</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/minigames">Play Games</Link>
              </Button>
            </div>
          </div>

          {/* Error Details */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="mb-4 font-semibold text-foreground">Technical Details</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between items-center">
                <span>Error Code:</span>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  404 Not Found
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span className="px-2 py-1 text-xs text-orange-600 rounded-full bg-orange-500/10">
                  Page Missing
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Solution:</span>
                <span className="px-2 py-1 text-xs text-green-600 rounded-full bg-green-500/10">
                  Navigate Away
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 