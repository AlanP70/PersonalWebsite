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

/*
  A project's cover image, sized to fill a parent aspect box (the card supplies
  `relative` + an aspect ratio). Uses a real screenshot when one is present
  under /public — rendered in full colour, since desaturating UI screenshots
  costs too much legibility — otherwise draws a deterministic, symmetric
  monochrome glyph seeded from the title, so an unsupplied image reads as an
  intentional pattern rather than a broken card.

  Any hover motion (scale / brightness) lives on the parent card via `group-*`,
  so this component stays a plain server component with no client JS.
*/
export function ProjectCover({
  title,
  image,
  className,
  sizes = "grid",
}: {
  title: string;
  image?: string;
  className?: string;
  /** `featured` renders a larger glyph than the denser `grid` cards. */
  sizes?: "featured" | "grid";
}) {
  const base = `h-full w-full ${className ?? ""}`;

  if (image && publicFileExists(image)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- gallery cover; a plain grayscale <img> keeps the palette without next/image config.
      <img
        src={`/${image.replace(/^\//, "")}`}
        alt=""
        loading="lazy"
        className={`${base} object-cover transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      />
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
      const opacity = strong ? 0.6 : 0.28;
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

  const pad = sizes === "featured" ? "p-[22%]" : "p-[18%]";
  return (
    <span
      className={`${base} flex items-center justify-center bg-foreground/[0.03] text-foreground transition duration-500 ease-out group-hover:brightness-110 motion-reduce:transition-none`}
    >
      <svg
        viewBox="0 0 5 5"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        fill="currentColor"
        className={`h-full w-full ${pad}`}
      >
        {cells}
      </svg>
    </span>
  );
}
