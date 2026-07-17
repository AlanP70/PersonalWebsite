"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { photos } from "@/lib/data/places";

const SCROLL_SPEED = 0.4; // px per animation frame — slow, continuous drift
const RESUME_DELAY = 1200; // ms after the user lets go before auto-scroll resumes
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// The server can't know the client's motion preference, so it — and the
// client's first hydration pass, which React requires to match it exactly —
// both assume reduced motion. Once mounted, useSyncExternalStore swaps in
// the real value and the strip upgrades to the looping version.
function getServerSnapshot() {
  return true;
}

export function Places() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const loop = !prefersReducedMotion;
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const positionRef = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!loop) return;
    const track = trackRef.current;
    if (!track) return;

    positionRef.current = track.scrollLeft;

    let frame: number;
    const tick = () => {
      if (!pausedRef.current) {
        const halfWidth = track.scrollWidth / 2;
        positionRef.current += SCROLL_SPEED;
        if (positionRef.current >= halfWidth) {
          positionRef.current -= halfWidth;
        }
        // Assigned as an absolute value (not `+=`) so we're never trusting a
        // sub-pixel read-back from the DOM — the accumulator in positionRef
        // is the single source of truth for our own position.
        track.scrollLeft = positionRef.current;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loop]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  if (photos.length === 0) return null;

  const pause = () => {
    pausedRef.current = true;
  };
  const resumeNow = () => {
    pausedRef.current = false;
  };
  const resumeSoon = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  const strip = loop ? [...photos, ...photos] : photos;

  return (
    <section id="places" aria-label="Photography" className="py-24">
      <FadeIn>
        <div className="section-container">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            <span className="mr-3 text-muted-foreground/50">04</span>
            Photography
          </h2>
          <p className="mt-2 mb-10 text-sm text-muted-foreground">
            My favourite photos as a beginner photographer.
          </p>
        </div>

        {/* The visual strip below duplicates photos for a seamless loop and
            is hidden from assistive tech; this list is the real content. */}
        {loop && (
          <ul className="sr-only">
            {photos.map((photo) => (
              <li key={photo.src}>{photo.caption ?? "Photograph"}</li>
            ))}
          </ul>
        )}

        <div
          ref={trackRef}
          aria-hidden={loop ? true : undefined}
          onMouseEnter={pause}
          onMouseLeave={resumeNow}
          onWheel={() => {
            pause();
            resumeSoon();
          }}
          onTouchStart={pause}
          onTouchEnd={resumeSoon}
          onPointerDown={pause}
          onPointerUp={resumeSoon}
          className={`flex items-center gap-6 overflow-x-auto px-6 pb-2 sm:px-8 [scroll-behavior:auto] [scrollbar-width:thin] ${
            loop ? "" : "snap-x snap-mandatory"
          }`}
        >
          {strip.map((photo, index) => (
            <figure
              key={`${photo.src}-${index}`}
              className={`shrink-0 ${loop ? "" : "snap-start"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- natural
                  dimensions aren't known ahead of time, so capping max-height
                  and max-width (both auto otherwise) is what keeps every
                  aspect ratio uncropped; next/image needs width/height or a
                  fill parent. */}
              <img
                src={photo.src}
                alt={photo.caption ?? "Photograph"}
                // The duplicated tail copy (index >= photos.length) can lazy
                // load — it's not visible until the loop has scrolled a full
                // cycle. The first copy must load eagerly: an unsized lazy
                // image has no layout width yet, so `track.scrollWidth` can
                // stay equal to `clientWidth` and the auto-scroll effect has
                // nothing to scroll through.
                loading={index < photos.length ? "eager" : "lazy"}
                className="h-auto max-h-[26rem] w-auto max-w-[85vw] rounded-lg border border-white/10 sm:max-w-[34rem]"
              />
              {photo.caption && (
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
