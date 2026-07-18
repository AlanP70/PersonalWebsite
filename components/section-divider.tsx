// A retro ASCII dither rule (in the spirit of edem.ca's block dividers): one
// clipped monospace line of shade blocks, muted so it reads as texture, not
// content. Decorative and hidden from assistive tech.
const RULE = "░".repeat(240);

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden font-mono text-[0.6rem] leading-none whitespace-nowrap text-muted-foreground/25 select-none ${className ?? "my-10"}`}
    >
      {RULE}
    </div>
  );
}
