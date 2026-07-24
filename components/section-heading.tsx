import type { ReactNode } from "react";

// Section header in the HUD register: a crimson diamond marker anchors the
// title, and a steel hairline rail runs off to the panel edge — a mission-
// computer section label, replacing the old terminal-style `$` prompt. An
// optional `sub` renders the section's intro line in one consistent slot, so
// sections no longer hand-roll a subtitle paragraph with ad-hoc negative
// margins under the heading.
export function SectionHeading({
  children,
  sub,
}: {
  children: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="hud-marker" />
        <h2 className="font-heading text-2xl font-bold tracking-tight whitespace-nowrap sm:text-3xl">
          {children}
        </h2>
        <span aria-hidden="true" className="hud-heading-rule" />
      </div>
      {sub && (
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">{sub}</p>
      )}
    </div>
  );
}
