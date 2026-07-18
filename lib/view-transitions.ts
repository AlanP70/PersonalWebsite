// Thin, typed wrappers around the browser View Transitions API. Both the tab
// crossfade and the theme circle-reveal go through here so the feature-detect
// and reduced-motion guard live in one place.

export type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

export type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
};

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function supportsViewTransitions(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof (document as ViewTransitionDocument).startViewTransition === "function"
  );
}

// Run `update` inside a View Transition when it's supported and the visitor
// hasn't asked for reduced motion. Otherwise apply it immediately -- the clean,
// instant fallback with no breakage.
export function withViewTransition(update: () => void): void {
  if (prefersReducedMotion() || !supportsViewTransitions()) {
    update();
    return;
  }
  (document as ViewTransitionDocument).startViewTransition!(update);
}
