import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { ProjectThumb } from "@/components/project-thumb";
import { SectionHeading } from "@/components/section-heading";
import { TechPills, StatusBadges } from "@/components/pills";

export function Projects() {
  return (
    <section aria-label="Projects" className="section-container py-14 sm:py-16">
      <SectionHeading>Projects</SectionHeading>
      <ul className="divide-y divide-border">
        {projects.map((project) => (
          <li key={project.title} className="flex gap-4 py-5 first:pt-0">
            <ProjectThumb title={project.title} image={project.image} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading font-semibold text-foreground">
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-accent-amber"
                  >
                    {project.link.label}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
              <StatusBadges items={project.badges} className="mt-2" />
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {project.description}
              </p>
              <TechPills items={project.tags} className="mt-3" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
