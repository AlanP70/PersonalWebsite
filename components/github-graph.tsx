import { links } from "@/lib/data/links";

// Live GitHub contribution graph for AlanP70. ghchart.rshah.org renders the
// real, current contribution calendar as an SVG; .github-graph desaturates it
// and adapts it to the theme (see globals.css) so it stays monochrome. Wrapped
// in a horizontal-scroll container so the wide grid never overflows on mobile.
export function GithubGraph() {
  return (
    <div>
      <p className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        $ git log --graph
      </p>
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-x-auto rounded-lg border border-border bg-foreground/[0.02] p-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- live external
            SVG from ghchart; next/image can't optimize a remote SVG and a plain
            <img> lets the .github-graph filter handle the monochrome treatment. */}
        <img
          src="https://ghchart.rshah.org/AlanP70"
          alt="Alan Pipko's GitHub contribution graph over the past year"
          loading="lazy"
          className="github-graph h-auto w-full min-w-[38rem]"
        />
      </a>
    </div>
  );
}
