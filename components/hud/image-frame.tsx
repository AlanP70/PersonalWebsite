import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  ── Shared HUD image frame ───────────────────────────────────────────────────
  One chassis for every framed image on the site (About featured covers,
  Photography tiles), so both read as catalog entries in the same operator file
  system rather than bespoke cards. It supplies only the presentation layer: the
  chamfered corners (matching `.hud-panel` / `.org-chip`), a steel hairline
  border tracing the clip, a subtle IMG NN catalog label integrated over the
  image, and the crimson hover/focus edge treatment.

  It deliberately does NOT own section content — a tile's real caption stays with
  its section (e.g. Photography's `<figcaption>`). The image (a `next/image`, a
  plain `<img>`, or a generated `ProjectCover`) is passed in as `children` and
  fills the frame.

  Overlays are decorative and pointer-events-none, so they never intercept the
  clicks or focus of an interactive ancestor. Drive the hover/focus edge by
  putting Tailwind's `group` on that ancestor (the linking `<a>` / `<button>` or
  its wrapper) — see `.hud-image-*` in app/globals.css.
*/
export function HudImageFrame({
  /** 1-based catalog number → a subtle "IMG 01" label. Omit to hide it. */
  id,
  /** Sharpens the edge to crimson + lifts a glow when the group is engaged. */
  interactive = false,
  /** Chamfer size, e.g. "8px" | "12px". Defaults to the CSS 10px. */
  bevel,
  className,
  children,
}: {
  id?: number;
  interactive?: boolean;
  bevel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "hud-image-frame",
        interactive && "hud-image-frame--interactive",
        className,
      )}
      style={bevel ? { ["--bevel" as string]: bevel } : undefined}
    >
      {children}

      {typeof id === "number" && (
        <div aria-hidden="true" className="hud-image-band">
          <span className="hud-image-band__id">
            IMG {String(id).padStart(2, "0")}
          </span>
          <span className="hud-image-tick" />
        </div>
      )}
    </div>
  );
}
