import { projects, type Project } from "@/lib/data/projects";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import { HudLink } from "@/components/hud/link";
import { TechPills, StatusBadges } from "@/components/pills";
import { cn } from "@/lib/utils";

// Strip authoring placeholders like "[add metric — …]" so the public gallery
// never shows a to-do note; the real copy is otherwise untouched.
function cleanDescription(text: string): string {
  return text.replace(/\s*\[[^\]]*\]/g, "").trim();
}

// Honest live-status readout for the cover band: a real "Live" badge lights the
// crimson pulse; any public link reads "Online"; neither means it's "Private".
type CoverStatus = { label: string; tone: "live" | "online" | "idle" };
function coverStatus(project: Project): CoverStatus {
  if (project.badges?.includes("Live")) return { label: "Live", tone: "live" };
  if (project.link) return { label: "Online", tone: "online" };
  return { label: "Private", tone: "idle" };
}

// The cover, wrapped in a link to the project when one exists so the whole
// image is clickable; otherwise a plain, non-interactive frame. A mission-file
// band (system index + status readout) and a hover scan-line float over it —
// both aria-hidden and pointer-events-none, so clicks pass through to the link.
function CoverFrame({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const cover = (
    <ProjectCover
      title={project.title}
      image={project.image}
      sizes={featured ? "featured" : "grid"}
    />
  );
  const status = coverStatus(project);
  return (
    <div className="project-cover relative aspect-[16/10] overflow-hidden">
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
      <span aria-hidden="true" className="project-scan" />
      <div aria-hidden="true" className="project-band">
        <span className="project-band__id">
          FILE {String(index).padStart(2, "0")}
        </span>
        <span className={cn("project-status", `project-status--${status.tone}`)}>
          <span className="project-status__dot" />
          {status.label}
        </span>
      </div>
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group hud-panel hud-panel--interactive flex flex-col overflow-hidden">
      <CoverFrame project={project} index={index} featured />
      <div aria-hidden="true" className="hud-divider" />
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
            <HudLink href={project.link.href} external arrow="up-right">
              {project.link.label}
            </HudLink>
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group hud-panel hud-panel--interactive flex flex-col overflow-hidden">
      <CoverFrame project={project} index={index} />
      <div aria-hidden="true" className="hud-divider" />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-sm font-semibold text-foreground">
            {project.title}
          </h3>
          {project.link && (
            <HudLink href={project.link.href} external arrow="up-right">
              {project.link.label}
            </HudLink>
          )}
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
  // Stable catalog number per project (position in the source list), so each
  // card's FILE index reads the same regardless of which tier renders it.
  const numberOf = (p: Project) => projects.indexOf(p) + 1;

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
            <FeaturedCard
              key={project.title}
              project={project}
              index={numberOf(project)}
            />
          ))}
        </div>
      )}

      {/* Everything else — a denser 3-up grid, breaking the single column. */}
      {rest.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={numberOf(project)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
