import type { ReactNode } from "react";

// Section title with a terminal-flavored monospace `$` prompt prefix — the
// technical register that runs through the site, applied to the real heading.
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
      <span aria-hidden="true" className="mr-2.5 font-mono font-normal text-muted-foreground/60">
        $
      </span>
      {children}
    </h2>
  );
}
