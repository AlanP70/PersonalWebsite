"use client";

import { useSyncExternalStore } from "react";
import { getProtocolActive, subscribeProtocol } from "./protocol";

// Detection lives in KonamiEasterEgg (outside the shell); this reads the shared
// activation flag so the header readout can acknowledge it. SSR snapshot is
// always false — no hydration mismatch, and it can only flip via a client key
// sequence anyway.
function useProtocolActive() {
  return useSyncExternalStore(
    subscribeProtocol,
    getProtocolActive,
    () => false,
  );
}

// A HUD readout tucked into the centre of the top bar: a steel/muted "SYSTEM
// NOTE" label over a value line that nudges toward the hidden sequence, then
// switches to acknowledge activation. Non-interactive by design — the sequence
// is typed, not clicked — so it stays out of the tab order and adds no
// unnecessary control. Never spells the arrow sequence out.
export function SystemNote() {
  const active = useProtocolActive();
  return (
    <div
      aria-live="polite"
      className="pointer-events-none flex select-none flex-col items-center text-center"
    >
      <span className="hud-label !text-[0.75rem] text-steel/70">System note</span>
      <span
        className={
          active
            ? "font-mono text-[0.75rem] leading-none tracking-widest text-crimson uppercase"
            : "font-mono text-[0.75rem] leading-none tracking-widest text-muted-foreground uppercase"
        }
      >
        {active ? "Protocol active" : "Try the Konami code"}
      </span>
    </div>
  );
}
