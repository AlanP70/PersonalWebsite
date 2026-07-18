"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const GREETINGS = ["Hi.", "Bonjour.", "Привет."];
const INTERVAL_MS = 2500;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

// Cycles a muted trilingual greeting (EN / FR / RU) above the name. Under
// reduced motion it doesn't cycle -- all three show statically instead.
export function Greeting() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % GREETINGS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const className =
    "text-sm font-medium tracking-wide text-muted-foreground sm:text-base";

  if (prefersReducedMotion) {
    return <p className={className}>{GREETINGS.join("  ")}</p>;
  }

  return (
    <p className={className}>
      {/* Full greeting for assistive tech; the visible word cycles silently. */}
      <span className="sr-only">{GREETINGS.join(" ")}</span>
      <span key={index} aria-hidden="true" className="greeting-swap inline-block">
        {GREETINGS[index]}
      </span>
    </p>
  );
}
