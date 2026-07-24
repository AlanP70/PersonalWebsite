"use client";

import { useState, useSyncExternalStore } from "react";
import { Disc3, Play, X } from "lucide-react";
import { HudPanel } from "@/components/hud/panel";
import { cn } from "@/lib/utils";

const PLAYLIST_ID = "0XW2GmWvMF351k8nnsJ6aP";
const PLAYLIST_NAME = "Web Swinging";
// theme=0 → Spotify's dark compact embed, which sits inside the dark HUD. We
// deliberately omit `autoplay` from the iframe's `allow` list: playback only
// starts when the visitor presses play inside the real embed.
const EMBED_SRC = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;

/* Reduced-motion gate (mirrors the useSyncExternalStore hook in terminal.tsx),
   so the expand/collapse is instant — no slide — for those who ask for it. */
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

// A persistent docked "audio module": a collapsed HUD mini-bar fixed in the
// bottom-right corner (clearing the button-prompt strip), which expands upward
// into a popover holding the official, licensed Spotify embed. Mounted once at
// the shell level so it rides across every tab; its open/closed state and the
// single iframe instance live in React state, so switching tabs never resets
// playback. The iframe is mounted lazily on first expand — until then the
// collapsed bar is just lightweight markup and touches nothing at page load.
export function NowPlayingWidget() {
  const [expanded, setExpanded] = useState(false);
  // Latches true on the first expand and stays true, keeping the one embed
  // instance alive (and playing) across collapses and tab switches.
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();

  const toggle = () => {
    setExpanded((prev) => {
      const next = !prev;
      if (next) setMounted(true);
      return next;
    });
  };

  return (
    <div className="fixed right-3 bottom-[6.5rem] z-40 sm:right-6 sm:bottom-[5.5rem]">
      {/* Expanded popover — anchored above the collapsed bar, growing upward.
          Kept in the DOM (not unmounted) so the embed keeps playing while
          collapsed; visibility rides on opacity so the transition can run, and
          `inert` pulls the hidden iframe out of the tab order + a11y tree. */}
      <div
        id="now-playing-panel"
        aria-hidden={!expanded}
        inert={!expanded ? true : undefined}
        className={cn(
          "absolute right-0 bottom-full mb-2 w-[320px] max-w-[calc(100vw-1.5rem)] origin-bottom-right",
          !reduced && "transition-all duration-200 ease-out",
          expanded
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0",
        )}
      >
        <HudPanel tone="steel" className="overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-1.5">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="hud-marker" />
              <p className="hud-label">Now Playing</p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse player"
              className="inline-flex size-6 items-center justify-center text-muted-foreground transition-colors hover:text-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="px-2 pb-2">
            {mounted ? (
              <iframe
                title="Themed Spotify playlist"
                src={EMBED_SRC}
                width="100%"
                height={152}
                loading="lazy"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="block w-full rounded-[12px]"
                style={{ border: 0 }}
              />
            ) : (
              // Placeholder holds the panel's height before the first expand so
              // the popover doesn't jump; no iframe = no network at page load.
              <div className="h-[152px] w-full rounded-[12px] bg-foreground/[0.04]" />
            )}
          </div>
        </HudPanel>
      </div>

      {/* Collapsed mini-bar — the always-visible trigger. The hud-panel
          treatment is applied straight to the <button> (rather than wrapping a
          div in a button) to keep semantics clean. */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls="now-playing-panel"
        aria-label={`Now Playing: ${PLAYLIST_NAME}. ${expanded ? "Collapse" : "Expand"} player`}
        className="hud-panel hud-panel--steel hud-panel--interactive group flex items-center gap-2.5 py-1.5 pr-3 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-[4px] bg-foreground/[0.05] text-steel">
          <Disc3 className="size-5" aria-hidden="true" />
        </span>
        {/* Label + playlist name — hidden on phones so the collapsed puck stays
            small and unobtrusive there; the aria-label still carries both. */}
        <span className="hidden min-w-0 flex-col items-start text-left sm:flex">
          <span className="hud-label">Now Playing</span>
          <span className="max-w-[8rem] truncate font-mono text-xs text-foreground">
            {PLAYLIST_NAME}
          </span>
        </span>
        <Play
          className="size-3.5 shrink-0 fill-current text-steel transition-colors group-hover:text-crimson"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
