"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import type { MouseEvent } from "react";
import {
  prefersReducedMotion,
  supportsViewTransitions,
  type ViewTransitionDocument,
} from "@/lib/view-transitions";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    // resolvedTheme is defined by the time a click can happen; fall back to the
    // class next-themes writes on <html> just in case.
    const current =
      resolvedTheme ??
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    const apply = () => setTheme(next);

    // No View Transitions or reduced motion: swap instantly.
    if (prefersReducedMotion() || !supportsViewTransitions()) {
      apply();
      return;
    }

    // Circle expands from the centre of the toggle button.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    // Marks this transition as a theme change so globals.css swaps the default
    // crossfade for the clip-path reveal animated below.
    root.classList.add("theme-vt");
    const transition = (document as ViewTransitionDocument).startViewTransition!(
      () => flushSync(apply),
    );

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 360,
            easing: "cubic-bezier(0.2, 0.6, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        // Ignore: an aborted/unsupported transition just falls back to the
        // instant class swap next-themes already applied.
      });
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Both icons render; CSS shows the right one for the active theme so
          there is no hydration mismatch and no flash. */}
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
