import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  The signature HUD surface: an angular panel with clipped/beveled corners and a
  hairline crimson (or steel) border that traces the clip. Built once here and
  reused across every section. See `.hud-panel*` in app/globals.css.
*/
type HudPanelProps = ComponentPropsWithoutRef<"div"> & {
  /** Border tone. `crimson` (default) or the cooler `steel` for secondary UI. */
  tone?: "crimson" | "steel";
  /** Adds hover/active edge-sharpen + glow (nav slots, project cards). */
  interactive?: boolean;
  /** Renders the active-state edge/glow (drives `[data-active]`). */
  active?: boolean;
  /** Bevel size, e.g. "10px" | "16px". Defaults to the CSS 12px. */
  bevel?: string;
};

export function HudPanel({
  tone = "crimson",
  interactive = false,
  active = false,
  bevel,
  className,
  style,
  children,
  ...rest
}: HudPanelProps) {
  return (
    <div
      className={cn(
        "hud-panel",
        tone === "steel" && "hud-panel--steel",
        interactive && "hud-panel--interactive",
        className,
      )}
      data-active={active || undefined}
      style={bevel ? { ...style, ["--bevel" as string]: bevel } : style}
      {...rest}
    >
      {children}
    </div>
  );
}

/*
  Bracket-corner frame: four thin crimson L-marks framing key panels and images
  (the reference site's portrait frame). Decorative corners are aria-hidden.
*/
export function HudFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <span aria-hidden="true" className="hud-corner hud-corner--tl" />
      <span aria-hidden="true" className="hud-corner hud-corner--tr" />
      <span aria-hidden="true" className="hud-corner hud-corner--bl" />
      <span aria-hidden="true" className="hud-corner hud-corner--br" />
    </div>
  );
}
