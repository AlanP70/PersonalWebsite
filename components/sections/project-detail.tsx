"use client";

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { HudPanel } from "@/components/hud/panel";
import { HudLink } from "@/components/hud/link";
import { TechPills, StatusBadges } from "@/components/pills";
import { coverStatus, cleanDescription } from "@/components/sections/project-view";
import { cn } from "@/lib/utils";

/*
  Project dossier: the full record for one project, opened from a card in the
  Projects gallery. The cover is truncated on the card (line-clamp) — this
  modal is where the whole description, tags, badges and outbound link live.

  Accessibility mirrors the photo Lightbox: role="dialog" + aria-modal, focus
  moved into the dialog on open and restored to the trigger on close, Tab
  trapped within, Escape closes, ArrowLeft/Right step through the catalog. Body
  scroll is locked while open. The site shell's global key handler already bows
  out whenever a modal dialog is present, so tab-switching keys stay dormant.
*/
export function ProjectDetail({
  project,
  index,
  position,
  total,
  cover,
  onClose,
  onNavigate,
}: {
  project: Project;
  /** Catalog FILE number (1-based), matching the card's cover band. */
  index: number;
  /** Position in the flat catalog (0-based), for prev/next + the counter. */
  position: number;
  total: number;
  cover: ReactNode;
  onClose: () => void;
  onNavigate: (nextPosition: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const status = coverStatus(project);

  const goPrev = useCallback(
    () => onNavigate((position - 1 + total) % total),
    [position, total, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((position + 1) % total),
    [position, total, onNavigate],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft" && total > 1) {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight" && total > 1) {
        event.preventDefault();
        goNext();
      } else if (event.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, goPrev, goNext, total]);

  const navButton =
    "inline-flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-background/85 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:p-8"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="my-auto w-full max-w-2xl focus:outline-none"
      >
        <HudPanel bevel="16px" className="flex flex-col">
          {/* Dossier header band — FILE index + live status, mirroring the card
              cover band, with the close control on the right. */}
          <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="hud-label">
                File {String(index).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "project-status",
                  `project-status--${status.tone}`,
                )}
              >
                <span className="project-status__dot" />
                {status.label}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className={navButton}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Cover — the same node the card renders, scaled up in a 16/10 frame. */}
          <div className="project-cover relative mx-5 mt-3 aspect-[16/10] overflow-hidden sm:mx-6">
            {cover}
            <span aria-hidden="true" className="project-scan" />
          </div>

          <div className="flex flex-col p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2
                id={titleId}
                className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                {project.title}
              </h2>
              <StatusBadges items={project.badges} />
            </div>

            {/* The full record — no line-clamp here. */}
            <p className="mt-3 text-sm text-foreground/85 sm:text-base">
              {cleanDescription(project.description)}
            </p>

            <TechPills items={project.tags} className="mt-4" />

            {project.link && (
              <div className="mt-5">
                <HudLink href={project.link.href} external arrow="up-right">
                  {project.link.label}
                </HudLink>
              </div>
            )}
          </div>

          {/* Footer: step through the catalog without leaving the dossier. */}
          {total > 1 && (
            <div className="flex items-center justify-between gap-3 border-t border-[var(--hud-line-steel)] px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className={navButton}
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <span className="font-mono text-[0.7rem] tracking-wider text-muted-foreground tabular-nums">
                {String(position + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className={navButton}
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </HudPanel>
      </div>
    </div>
  );
}
