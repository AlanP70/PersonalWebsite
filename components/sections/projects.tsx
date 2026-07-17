import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/data/projects";

export function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" aria-label="Projects" className="py-24">
      <FadeIn>
        <div className="section-container-wide">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              <span className="mr-3 text-muted-foreground/50">02</span>
              Projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              All projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
