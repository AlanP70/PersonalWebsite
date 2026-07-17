"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "./terminal";

// ↑ ↑ ↓ ↓ ← → ← → B A
const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

// Module-level guard so the console note prints exactly once, even with
// React StrictMode's double-invoked effects in development.
let consolePrinted = false;

export function KonamiEasterEgg() {
  const [open, setOpen] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    if (consolePrinted) return;
    consolePrinted = true;
    const style =
      "color:#a1a1aa;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px";
    console.log(
      "%c👀 You opened the console — you clearly know your way around.",
      style,
    );
    console.log(
      "%cYou know the code, right?  ↑ ↑ ↓ ↓ ← → ← → B A",
      `${style};opacity:0.8`,
    );
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Already open, or the user is typing into a field — don't track.
      if (open) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          /^(input|textarea|select)$/i.test(target.tagName))
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === SEQUENCE[progressRef.current]) {
        progressRef.current += 1;
        if (progressRef.current === SEQUENCE.length) {
          progressRef.current = 0;
          setOpen(true);
        }
      } else {
        // Reset — but allow the wrong key to be a fresh first step.
        progressRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!open) return null;
  return <Terminal onClose={() => setOpen(false)} />;
}
