import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HudPanel } from "@/components/hud/panel";

// Next auto-injects `<meta name="robots" content="noindex">` for 404 responses;
// this just gives the tab an in-world title. The page renders inside the root
// layout, so the background stack (photo → scrim → WebLattice → grain) and the
// display/mono fonts are already in place — this only draws the panel on top.
export const metadata: Metadata = {
  title: "Signal Lost — 404",
  description: "The route you're looking for doesn't exist in this system.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-1 items-center justify-center px-5 py-16 sm:px-6">
      <HudPanel
        bevel="16px"
        className="w-full max-w-md px-6 py-10 text-center sm:px-10 sm:py-12"
      >
        {/* Diagnostic kicker — marker + mono label, matching the section kickers. */}
        <p className="flex items-center justify-center gap-2.5">
          <span aria-hidden="true" className="hud-marker" />
          <span className="hud-label">
            Diagnostic
            <span aria-hidden="true" className="mx-2 text-steel/50">
              {"//"}
            </span>
            Unmatched Route
          </span>
        </p>

        {/* Error hero. The visible 404 + heading read together as the page's h1. */}
        <h1 className="mt-6">
          <span className="block font-heading text-6xl leading-none font-bold tracking-tight text-crimson tabular-nums sm:text-7xl">
            404
          </span>
          <span className="mt-2 block font-heading text-2xl leading-none font-bold tracking-tight text-foreground uppercase sm:text-3xl">
            Signal Lost
          </span>
        </h1>

        {/* Machine-code readout line, in the steel register. */}
        <p className="mt-4 font-mono text-[0.7rem] tracking-wider text-steel/80 uppercase">
          ERR_ROUTE_NOT_FOUND
        </p>

        <p className="mx-auto mt-5 max-w-sm text-sm text-muted-foreground sm:text-base">
          The route you&rsquo;re looking for doesn&rsquo;t exist in this system.
          Re-establish the connection and jump back to a known signal.
        </p>

        {/* Real focusable link back to the About/home tab, styled as an
            interactive HUD action so it warms to crimson on hover/focus. */}
        <Link
          href="/#about"
          className="group mt-8 inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <HudPanel
            interactive
            bevel="8px"
            className="flex items-center gap-2 px-5 py-2.5"
          >
            <ArrowLeft
              className="size-4 text-crimson transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Return to base
            </span>
          </HudPanel>
        </Link>
      </HudPanel>
    </main>
  );
}
