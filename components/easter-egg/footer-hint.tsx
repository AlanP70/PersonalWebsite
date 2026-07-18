"use client";

import { useSyncExternalStore } from "react";
import { OPEN_TERMINAL_EVENT } from "./konami";

// Touch devices have no arrow keys, so the footer hint doubles as the mobile
// way in. We detect a coarse pointer with useSyncExternalStore (same shape as
// the reduced-motion hook in terminal.tsx) to stay clear of setState-in-effect.
const COARSE_QUERY = "(pointer: coarse)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(COARSE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePointerCoarse() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(COARSE_QUERY).matches,
    () => false,
  );
}

// Names the Konami code so the right people recognize it, but never spells out
// the arrow sequence or how to enter it.
const NUDGE = "🎮 There's a hidden game on this site if you know the Konami code";

export function FooterHint() {
  const isTouch = usePointerCoarse();

  // Touch: a deliberate tap target that opens the terminal (phones can't type
  // the sequence). Desktop stays hands-off — the key sequence is the only way
  // in, so here the hint is inert text.
  if (isTouch) {
    return (
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_TERMINAL_EVENT))}
        title="you know what to do"
        aria-label="Open the hidden game"
        className="rounded-md px-3 py-1.5 text-muted-foreground/80 transition-colors select-none hover:text-foreground/80 active:text-foreground"
      >
        {NUDGE}
      </button>
    );
  }

  return (
    <p
      title="you know what to do"
      className="text-muted-foreground/70 select-none"
    >
      {NUDGE}
    </p>
  );
}
