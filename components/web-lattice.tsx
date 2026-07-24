"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/*
  Cursor-reactive hexagonal HUD lattice — a nod to Insomniac's Spider-Man
  interface. A single fixed, full-viewport canvas that replaces the static CSS
  honeycomb (`.site-texture`) while it's active: a crisp honeycomb of thin
  strands over the near-black base. Strands rest at a faint cool steel; within
  INFLUENCE px of the cursor they brighten and warm toward crimson, falling off
  smoothly with distance. The honeycomb geometry is built once per resize.

  Gated on `(pointer: fine)` + `prefers-reduced-motion: no-preference`. On touch
  or reduced-motion this renders nothing and the CSS `.site-texture` honeycomb
  stays. The film grain (`.site-texture::before`) always stays on top.
*/

const HEX_RADIUS = 46; // circumradius of each flat-top honeycomb cell (px)
const NODE_RADIUS = 0.9;
const INFLUENCE = 210; // cursor influence radius (px)

// Lattice colours: resting cool cyan, cursor-warmed toward the magenta→crimson
// accent, and the alpha envelope. Values mirror the dark palette in globals.css.
// (`steel` is the cool readout accent, cyan; `crimson` is the warm end.)
const PALETTE = {
  steel: [99, 211, 234],
  crimson: [255, 47, 158],
  rest: 0.09,
  peak: 0.5,
  node: 0.2,
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

    // Build a crisp flat-top honeycomb: step across a grid of hex centres and
    // emit each cell's six corners + edges. Shared vertices/edges are deduped by
    // their rounded coordinates so neighbouring cells reuse the same strands
    // (keeping the edge count near one net rather than six-per-cell).
    const buildLattice = () => {
      nodes = [];
      edges = [];
      const nodeMap = new Map<string, Node>();
      const edgeSet = new Set<string>();
      const colStep = HEX_RADIUS * 1.5;
      const rowStep = HEX_RADIUS * Math.sqrt(3);
      const cols = Math.ceil(width / colStep) + 2;
      const rows = Math.ceil(height / rowStep) + 2;

      const keyOf = (x: number, y: number) =>
        `${Math.round(x)},${Math.round(y)}`;
      const nodeAt = (x: number, y: number) => {
        const k = keyOf(x, y);
        let n = nodeMap.get(k);
        if (!n) {
          n = { x, y };
          nodeMap.set(k, n);
          nodes.push(n);
        }
        return n;
      };
      const linkNodes = (a: Node, b: Node) => {
        const ka = keyOf(a.x, a.y);
        const kb = keyOf(b.x, b.y);
        const ek = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
        if (edgeSet.has(ek)) return;
        edgeSet.add(ek);
        edges.push({ a, b, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 });
      };

      // Odd columns drop half a row so the flat-top cells interlock.
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          const cx = c * colStep;
          const cy = r * rowStep + (c & 1 ? rowStep / 2 : 0);
          let prev: Node | null = null;
          let first: Node | null = null;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const corner = nodeAt(
              cx + HEX_RADIUS * Math.cos(angle),
              cy + HEX_RADIUS * Math.sin(angle),
            );
            if (i === 0) first = corner;
            if (prev) linkNodes(prev, corner);
            prev = corner;
          }
          if (prev && first) linkNodes(prev, first);
        }
      }
    };

    const draw = () => {
      frame = 0;
      const { steel, crimson, rest, peak, node: nodeAlpha } = PALETTE;
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
      root.classList.remove("lattice-active");
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="hud-lattice" />;
}
