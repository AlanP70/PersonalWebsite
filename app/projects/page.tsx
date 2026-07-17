import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects — Alan Pipko",
  description:
    "Projects by Alan Pipko — real-time systems, ML tooling, and automation.",
};

export default function ProjectsPage() {
  return (
    <section aria-label="All projects" className="py-24">
      <div className="section-container-wide">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Home
        </Link>
        <h1 className="mb-10 font-heading text-3xl font-bold sm:text-4xl">
          Projects
        </h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
