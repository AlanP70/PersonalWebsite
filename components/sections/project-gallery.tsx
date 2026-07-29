"use client";

import { useState, type ReactNode } from "react";
import { Maximize2 } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { TechPills, StatusBadges } from "@/components/pills";
import { ProjectDetail } from "@/components/sections/project-detail";
import { coverStatus, cleanDescription } from "@/components/sections/project-view";
import { cn } from "@/lib/utils";

/*
  Client shell for the Projects gallery. Covers are pre-rendered on the server
  (ProjectCover reads /public) and handed in as nodes; this component owns the
  interaction: every card is a button that opens the ProjectDetail dossier,
  where the full — un-truncated — description lives. The same cover node is
  reused inside the open dossier.
*/
export type GalleryItem = {
  project: Project;
  /** Catalog FILE number (1-based) — stable regardless of tier. */
  index: number;
  cover: ReactNode;
};

// A card cover with its mission-file band (system index + status). Purely
// decorative overlays are aria-hidden; the whole card is the accessible button.
function CardCover({ item }: { item: GalleryItem }) {
  const status = coverStatus(item.project);
  return (
    <div className="project-cover relative aspect-[16/10] overflow-hidden">
      {item.cover}
      <span aria-hidden="true" className="project-scan" />
      <div aria-hidden="true" className="project-band">
        <span className="project-band__id">
          FILE {String(item.index).padStart(2, "0")}
        </span>
        <span className={cn("project-status", `project-status--${status.tone}`)}>
          <span className="project-status__dot" />
          {status.label}
        </span>
      </div>
    </div>
  );
}

function Card({
  item,
  featured,
  onOpen,
}: {
  item: GalleryItem;
  featured?: boolean;
  onOpen: () => void;
}) {
  const { project } = item;
  return (
    <article className="group hud-panel hud-panel--interactive flex flex-col overflow-hidden">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Open details for ${project.title}`}
        className="flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <CardCover item={item} />
        <span aria-hidden="true" className="hud-divider" />
        {/* Both tiers stack full-width on a phone, so the dense tier gets the
            same 20px inset there and only tightens once it's in a grid. */}
        <div
          className={cn(
            "flex flex-1 flex-col",
            featured ? "p-5 sm:p-6" : "p-5 sm:p-4",
          )}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3
              className={cn(
                "font-heading font-semibold tracking-tight text-foreground",
                featured ? "text-xl sm:text-2xl" : "text-sm",
              )}
            >
              {project.title}
            </h3>
            <StatusBadges items={project.badges} />
          </div>
          <p
            className={cn(
              "mt-2 text-sm text-muted-foreground",
              featured ? "line-clamp-3 sm:text-base" : "line-clamp-3",
            )}
          >
            {cleanDescription(project.description)}
          </p>
          <TechPills items={project.tags} className="mt-3" />
          {/* Read-more affordance, since the copy above is clamped. */}
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-wider text-steel/80 uppercase transition-colors group-hover:text-crimson">
            <Maximize2 className="size-3" aria-hidden="true" />
            Open file
          </span>
        </div>
      </button>
    </article>
  );
}

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [openPosition, setOpenPosition] = useState<number | null>(null);
  const featured = items.filter((i) => i.project.featured);
  const rest = items.filter((i) => !i.project.featured);

  return (
    <>
      {/* Featured tier — a 2-up row of large cards. */}
      {featured.length > 0 && (
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {featured.map((item) => (
            <Card
              key={item.project.title}
              item={item}
              featured
              onOpen={() => setOpenPosition(items.indexOf(item))}
            />
          ))}
        </div>
      )}

      {/* Everything else — a denser 3-up grid, breaking the single column. */}
      {rest.length > 0 && (
        <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <Card
              key={item.project.title}
              item={item}
              onOpen={() => setOpenPosition(items.indexOf(item))}
            />
          ))}
        </div>
      )}

      {openPosition !== null && (
        <ProjectDetail
          project={items[openPosition].project}
          index={items[openPosition].index}
          position={openPosition}
          total={items.length}
          cover={items[openPosition].cover}
          onClose={() => setOpenPosition(null)}
          onNavigate={setOpenPosition}
        />
      )}
    </>
  );
}
