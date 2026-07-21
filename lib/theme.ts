// Shared theme-toggle behaviour used by both the ThemeToggle button and the
// keyboard `[T]` shortcut in the shell, so the circle-reveal transition lives in
// one place. Origin defaults to the viewport centre when no button rect is given
// (e.g. a keypress with the toggle scrolled out of view).

import { flushSync } from "react-dom";
import {
  prefersReducedMotion,
  supportsViewTransitions,
  type ViewTransitionDocument,
} from "@/lib/view-transitions";

export function toggleTheme(
  setTheme: (theme: string) => void,
  origin?: { x: number; y: number },
): void {
  const current = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  const next = current === "dark" ? "light" : "dark";
  const apply = () => setTheme(next);

  // No View Transitions or reduced motion: swap instantly.
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    apply();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const root = document.documentElement;
  // Marks this transition as a theme change so globals.css swaps the default
  // tab wipe for the clip-path reveal animated below.
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
}
