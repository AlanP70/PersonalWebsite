import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";

export function Projects() {
  return (
    <section aria-label="Projects" className="section-container py-14 sm:py-16">
      <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
        Projects
      </h2>
      <ul className="divide-y divide-border">
        {projects.map((project) => (
          <li key={project.title} className="py-5 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading font-semibold text-foreground">
                {project.title}
              </h3>
              {project.link && (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {project.link.label}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-2 text-xs text-muted-foreground/70">
              {project.tags.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
