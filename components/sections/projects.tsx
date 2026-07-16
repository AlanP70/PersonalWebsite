import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { projects } from "@/lib/data/projects";

const Header = () => (
  <div
    className="flex h-full min-h-[6rem] w-full flex-1 rounded-lg"
    style={{
      background:
        "radial-gradient(80% 100% at 0% 0%, rgba(59,130,246,0.16) 0%, rgba(11,18,32,0) 70%)",
    }}
  />
);

export function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="py-24">
      <div className="section-container">
        <h2 className="mb-12 font-heading text-3xl font-bold sm:text-4xl">
          <span className="mr-3 text-muted-foreground/50">02</span>
          Projects
        </h2>
        <BentoGrid>
          {projects.map((project) => (
            <BentoGridItem
              key={project.title}
              className={project.featured ? "sm:col-span-2" : ""}
              header={<Header />}
              title={project.title}
              description={
                <div className="flex flex-col gap-3">
                  <p>{project.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="secondary">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {project.link.label}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
