"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/*
  Cursor-reactive geometric web-lattice background. A single fixed, full-viewport
  canvas that replaces the static CSS mesh (`.site-texture`) while it's active —
  an irregular net of thin strands over the near-black base. Strands rest at a
  faint cool steel; within INFLUENCE px of the cursor they brighten and warm
  toward crimson, falling off smoothly with distance. The geometry (node jitter +
  short-range links) is built once per resize.

  Gated on `(pointer: fine)` + `prefers-reduced-motion: no-preference`. On touch
  or reduced-motion this renders nothing and the CSS `.site-texture` mesh stays.
  The film grain (`.site-texture::before`) always stays on top.
*/

const SPACING = 88; // nominal node pitch (px)
const JITTER = 0.42; // fraction of SPACING each node is randomly nudged
const LINK_DIST = SPACING * 1.55; // max length of a strand between two nodes
const NODE_RADIUS = 1.1;
const INFLUENCE = 210; // cursor influence radius (px)

// Per-theme colours: resting cool cyan, cursor-warmed toward the magenta→crimson
// accent, and the alpha envelope. Values mirror the palette in globals.css.
// (`steel` is the cool readout accent, now cyan; `crimson` is the warm end.)
const THEME = {
  dark: {
    steel: [99, 211, 234],
    crimson: [255, 47, 158],
    rest: 0.09,
    peak: 0.5,
    node: 0.2,
  },
  light: {
    steel: [14, 116, 144],
    crimson: [200, 18, 63],
    rest: 0.13,
    peak: 0.46,
    node: 0.24,
  },
} as const;

const POINTER_FINE = "(pointer: fine)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type Node = { x: number; y: number };
type Edge = { a: Node; b: Node; mx: number; my: number };

// Re-runs when either media query changes (a mouse is attached, or reduced
// motion is toggled).
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

export function WebLattice() {
  // useSyncExternalStore (rather than setState-in-effect) keeps this lint-clean.
  // The server snapshot is false, so SSR renders nothing and the static CSS mesh
  // shows until the client confirms eligibility.
  const active = useSyncExternalStore(
    subscribeEligibility,
    isEligible,
    () => false,
  );

  if (!active) return null;
  return <LatticeCanvas />;
}

function LatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    // The canvas now owns the background; hide the static mesh (grain stays).
    root.classList.add("lattice-active");

    let width = 0;
    let height = 0;
    let frame = 0;
    let edges: Edge[] = [];
    let nodes: Node[] = [];
    const pointer = { x: 0, y: 0, inside: false };

    const theme = () =>
      root.classList.contains("dark") ? THEME.dark : THEME.light;

    // Build a jittered node field, then link nodes that fall within LINK_DIST of
    // each other (scanning only the neighbouring columns/rows keeps it cheap).
    const buildLattice = () => {
      nodes = [];
      const grid: Node[][] = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        for (let r = 0; r < rows; r++) {
          const node: Node = {
            x: (c - 1) * SPACING + (Math.random() - 0.5) * 2 * JITTER * SPACING,
            y: (r - 1) * SPACING + (Math.random() - 0.5) * 2 * JITTER * SPACING,
          };
          grid[c][r] = node;
          nodes.push(node);
        }
      }
      edges = [];
      const maxSq = LINK_DIST * LINK_DIST;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const a = grid[c][r];
          // Only look right / down / down-right / down-left to avoid duplicates.
          const candidates = [
            grid[c + 1]?.[r],
            grid[c]?.[r + 1],
            grid[c + 1]?.[r + 1],
            grid[c - 1]?.[r + 1],
          ];
          for (const b of candidates) {
            if (!b) continue;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (dx * dx + dy * dy <= maxSq) {
              edges.push({ a, b, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 });
            }
          }
        }
      }
    };

    const draw = () => {
      frame = 0;
      const { steel, crimson, rest, peak, node: nodeAlpha } = theme();
      ctx.clearRect(0, 0, width, height);
      const glow = pointer.inside;

      // Strands.
      ctx.lineWidth = 1;
      for (const edge of edges) {
        let t = 0;
        if (glow) {
          const dist = Math.hypot(edge.mx - pointer.x, edge.my - pointer.y);
          if (dist < INFLUENCE) {
            const k = 1 - dist / INFLUENCE;
            t = k * k; // ease-out falloff
          }
        }
        const alpha = rest + (peak - rest) * t;
        const rr = Math.round(steel[0] + (crimson[0] - steel[0]) * t);
        const gg = Math.round(steel[1] + (crimson[1] - steel[1]) * t);
        const bb = Math.round(steel[2] + (crimson[2] - steel[2]) * t);
        ctx.strokeStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(edge.a.x, edge.a.y);
        ctx.lineTo(edge.b.x, edge.b.y);
        ctx.stroke();
      }

      // Nodes — small dots, warming near the cursor like the strands.
      for (const n of nodes) {
        let t = 0;
        if (glow) {
          const dist = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (dist < INFLUENCE) {
            const k = 1 - dist / INFLUENCE;
            t = k * k;
          }
        }
        const alpha = nodeAlpha + (peak - nodeAlpha) * t;
        const rr = Math.round(steel[0] + (crimson[0] - steel[0]) * t);
        const gg = Math.round(steel[1] + (crimson[1] - steel[1]) * t);
        const bb = Math.round(steel[2] + (crimson[2] - steel[2]) * t);
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
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
      buildLattice();
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
      root.classList.remove("lattice-active");
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="hud-lattice" />;
}
