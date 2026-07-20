"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/data/places";

/*
  Full-screen photo viewer. Opened from the Photography grid with the clicked
  index; parent owns the index so the grid and viewer stay in sync.

  Accessibility: role="dialog" + aria-modal, focus moved into the dialog on open
  and restored to the trigger on close, Tab trapped within the controls, Escape
  closes, ArrowLeft/Right navigate. Body scroll is locked while open. The fade
  is a CSS animation, which the site-wide reduced-motion rule collapses to an
  instant swap.
*/
export function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = photos.length;
  const photo = photos[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % count),
    [index, count, onNavigate],
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
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
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
  }, [onClose, goPrev, goNext]);

  const navButton =
    "absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ? `Photo: ${photo.caption}` : "Photo viewer"}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200 focus:outline-none sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:top-5 sm:right-5"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
            className={`${navButton} left-2 sm:left-4`}
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
            className={`${navButton} right-2 sm:right-4`}
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </>
      )}

      <figure
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center gap-3"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- full-size
            viewer; natural dimensions are unknown and next/image needs sizing. */}
        <img
          src={photo.src}
          alt={photo.caption ?? "Photograph"}
          className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        {photo.caption && (
          <figcaption className="max-w-2xl text-center text-sm text-white/80">
            {photo.caption}
          </figcaption>
        )}
        {count > 1 && (
          <p className="font-mono text-xs text-white/40">
            {index + 1} / {count}
          </p>
        )}
      </figure>
    </div>
  );
}
