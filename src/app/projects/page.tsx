"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { ProjectCard } from "@/components/ui/project-card";
import { StatsCard } from "@/components/ui/stats-card";
import { ProjectHero } from "@/components/ui/project-hero";
import { ProjectCTA } from "@/components/ui/project-cta";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projects } from "../metadata/projects";
import { calculateProjectStats } from "@/lib/project-utils";


export default function ProjectsPage() {
  const stats = calculateProjectStats(projects);
  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="px-4 sm:px-8 md:px-12 pb-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 md:px-12 pb-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <ProjectHero />

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <StatsCard value={stats.totalProjects} label="Projects Built" />
            <StatsCard value={stats.webApps} label="Web Applications" />
            <StatsCard value={stats.liveProjects} label="Live Projects" />
            <StatsCard value={`${stats.technologiesUsed}+`} label="Technologies Used" />
          </div>

          {/* Featured Projects */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="featured" />
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                More Projects
              </h3>
              <div className="text-sm text-muted-foreground">
                {regularProjects.length} projects
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="regular" />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <ProjectCTA />
        </div>
      </div>
    </main>
  );
} 