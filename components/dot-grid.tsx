"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/*
  Cursor-reactive dot-grid background. A single fixed, full-viewport canvas that
  replaces the static CSS dot-grid (`.site-texture`) while it's active — dots
  within INFLUENCE px of the cursor brighten and grow slightly, falling off
  smoothly with distance. Everything else rests at the same faint value the CSS
  grid used, so at rest it reads identically to before. Monochrome only: the hue
  never changes, only alpha and radius.

  Gated on `(pointer: fine)` + `prefers-reduced-motion: no-preference`. On touch
  or reduced-motion this renders nothing and the CSS `.site-texture` grid stays.
  The film grain (`.site-texture::before`) always stays on top.
*/

const SPACING = 30; // matches the CSS dot-grid pitch (background-size: 30px)
const BASE_RADIUS = 1; // resting dot radius, matching the CSS 1px gradient
const HOVER_RADIUS = 1.9; // dot radius directly under the cursor
const INFLUENCE = 170; // cursor influence radius (px)

// Resting / peak dot alpha per theme. Rest values mirror the CSS grid
// (~4% black on light, ~3.5% white on dark); peak stays subtle.
const THEME = {
  dark: { channel: 255, rest: 0.035, peak: 0.2 },
  light: { channel: 0, rest: 0.045, peak: 0.16 },
} as const;

const POINTER_FINE = "(pointer: fine)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

// Re-runs when either media query changes (e.g. a mouse is attached, or the
// user toggles reduced motion).
function subscribeEligibility(callback: () => void) {
  const pointer = window.matchMedia(POINTER_FINE);
  const motion = window.matchMedia(MOTION_OK);
  pointer.addEventListener("change", callback);
  motion.addEventListener("change", callback);
  return () => {
    pointer.removeEventListener("change", callback);
    motion.removeEventListener("change", callback);
  };
}

function isEligible() {
  return (
    window.matchMedia(POINTER_FINE).matches &&
    window.matchMedia(MOTION_OK).matches
  );
}

export function DotGrid() {
  // useSyncExternalStore (rather than setState-in-effect) keeps this lint-clean
  // and mirrors the reduced-motion pattern in components/sections/greeting.tsx.
  // The server snapshot is false, so SSR renders nothing and the static CSS
  // dot-grid shows until the client confirms eligibility.
  const active = useSyncExternalStore(
    subscribeEligibility,
    isEligible,
    () => false,
  );

  if (!active) return null;
  return <DotGridCanvas />;
}

function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    // The canvas now owns the dot layer; hide the CSS grid (its grain stays).
    root.classList.add("dotgrid-active");

    let width = 0;
    let height = 0;
    let frame = 0;
    const pointer = { x: 0, y: 0, inside: false };

    const theme = () =>
      root.classList.contains("dark") ? THEME.dark : THEME.light;

    const draw = () => {
      frame = 0;
      const { channel, rest, peak } = theme();
      ctx.clearRect(0, 0, width, height);
      const glow = pointer.inside;
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          let alpha = rest;
          let r = BASE_RADIUS;
          if (glow) {
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist < INFLUENCE) {
              // Ease-out falloff: 1 at the cursor, 0 at the edge of INFLUENCE.
              const t = 1 - dist / INFLUENCE;
              const e = t * t;
              alpha = rest + (peak - rest) * e;
              r = BASE_RADIUS + (HOVER_RADIUS - BASE_RADIUS) * e;
            }
          }
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${channel},${channel},${channel},${alpha})`;
          ctx.fill();
        }
      }
    };

    // Coalesce redraws to a single rAF; no standing loop — draws only happen in
    // response to pointer movement (or resize / theme / leave).
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      schedule();
    };

    // Pointer left the viewport / window lost focus: settle back to rest once.
    const onLeave = () => {
      if (!pointer.inside) return;
      pointer.inside = false;
      schedule();
    };

    const onVisibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    // Redraw resting colours when the theme toggles while the pointer is idle.
    const themeObserver = new MutationObserver(() => draw());
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      root.classList.remove("dotgrid-active");
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="site-dotgrid" />;
}
