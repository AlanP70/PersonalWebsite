// The HUD system's slash divider (a steel hairline capped by a skewed crimson
// mark), reused as the in-section rule — replacing the old ASCII dither line so
// section breaks read in the same mission-computer register as everything else.
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`hud-divider ${className ?? "my-10"}`} />
  );
}
