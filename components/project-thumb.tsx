import type { ReactNode } from "react";
import { publicFileExists } from "@/lib/public-file";

// FNV-1a: a tiny, stable string hash so each project's generated glyph is
// deterministic from its title (same title -> same pattern, every build).
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// A small visual anchor for a project. Uses a real screenshot when one is
// supplied under /public; otherwise draws a deterministic, symmetric monochrome
// glyph seeded from the title — distinct per project, never a blank card.
export function ProjectThumb({ title, image }: { title: string; image?: string }) {
  const frame =
    "relative flex size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-foreground/[0.03] sm:size-20";

  if (image && publicFileExists(image)) {
    return (
      <span className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail; a
            plain grayscale <img> keeps the palette without next/image config. */}
        <img
          src={`/${image.replace(/^\//, "")}`}
          alt=""
          className="h-full w-full object-cover grayscale"
        />
      </span>
    );
  }

  const h = hash(title);
  const cells: ReactNode[] = [];
  // A 5x5 grid mirrored across the vertical axis (like an identicon). The three
  // left columns are seeded from the hash bits; the right two mirror them.
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 5; y++) {
      if (((h >> (x * 5 + y)) & 1) === 0) continue;
      const strong = ((h >> (x + y)) & 1) === 1;
      const opacity = strong ? 0.72 : 0.34;
      cells.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} opacity={opacity} />,
      );
      if (x < 2) {
        cells.push(
          <rect
            key={`m-${x}-${y}`}
            x={4 - x}
            y={y}
            width={1}
            height={1}
            opacity={opacity}
          />,
        );
      }
    }
  }

  return (
    <span className={`${frame} text-foreground`}>
      <svg
        viewBox="0 0 5 5"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        fill="currentColor"
        className="h-full w-full p-2.5"
      >
        {cells}
      </svg>
    </span>
  );
}
