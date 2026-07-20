import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data/projects";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import { TechPills, StatusBadges } from "@/components/pills";

// Strip authoring placeholders like "[add metric — …]" so the public gallery
// never shows a to-do note; the real copy is otherwise untouched.
function cleanDescription(text: string): string {
  return text.replace(/\s*\[[^\]]*\]/g, "").trim();
}

function ActionLink({ link }: { link: NonNullable<Project["link"]> }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-accent-amber"
    >
      {link.label}
      <ArrowUpRight
        className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

// The cover, wrapped in a link to the project when one exists so the whole
// image is clickable; otherwise a plain, non-interactive frame.
function CoverFrame({ project, featured }: { project: Project; featured?: boolean }) {
  const cover = (
    <ProjectCover
      title={project.title}
      image={project.image}
      sizes={featured ? "featured" : "grid"}
    />
  );
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
      {project.link ? (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${project.link.label}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          {cover}
        </a>
      ) : (
        cover
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-panel/50">
      <CoverFrame project={project} featured />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <StatusBadges items={project.badges} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {cleanDescription(project.description)}
        </p>
        <TechPills items={project.tags} className="mt-4" />
        {project.link && (
          <div className="mt-4">
            <ActionLink link={project.link} />
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-panel/50">
      <CoverFrame project={project} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-sm font-semibold text-foreground">
            {project.title}
          </h3>
          {project.link && <ActionLink link={project.link} />}
        </div>
        <StatusBadges items={project.badges} className="mt-2" />
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {cleanDescription(project.description)}
        </p>
        <TechPills items={project.tags} className="mt-3" />
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      aria-label="Projects"
      className="section-container-gallery py-14 sm:py-16"
    >
      <SectionHeading>Projects</SectionHeading>

      {/* Featured tier — a 2-up row of large cards. */}
      {featured.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <FeaturedCard key={project.title} project={project} />
          ))}
        </div>
      )}

      {/* Everything else — a denser 3-up grid, breaking the single column. */}
      {rest.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
