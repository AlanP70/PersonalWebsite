"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Snake } from "./snake";

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

const BOOT_LINES = [
  "> authenticating…",
  "> access granted",
  "Welcome, visitor. Type 'help' for a list of commands.",
];

const HELP_LINES = [
  "available commands:",
  "  help    — show this list",
  "  snake   — launch the hidden snake game (alias: play)",
  "  whoami  — who is this guy",
  "  clear   — clear the screen",
  "  exit    — close the terminal (or press Esc)",
];

const WHOAMI =
  "alan pipko — cs student · builder of real-time systems, ml tooling & automations. probably debugging something right now.";

type Mode = "terminal" | "snake";

export function Terminal({ onClose }: { onClose: () => void }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lines, setLines] = useState<string[]>([]);
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<Mode>("terminal");

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Boot sequence. Every setState fires inside a timeout (never synchronously
  // in the effect body), and reduced-motion users get the lines immediately.
  useEffect(() => {
    const timers: number[] = [];
    if (prefersReducedMotion) {
      timers.push(
        window.setTimeout(() => {
          setLines(BOOT_LINES);
          setBooted(true);
        }, 0),
      );
    } else {
      BOOT_LINES.forEach((line, i) => {
        timers.push(
          window.setTimeout(
            () => {
              setLines((prev) => [...prev, line]);
              if (i === BOOT_LINES.length - 1) setBooted(true);
            },
            (i + 1) * 450,
          ),
        );
      });
    }
    return () => timers.forEach((t) => clearTimeout(t));
  }, [prefersReducedMotion]);

  // Lock background scroll while open; remember and restore focus on close.
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, []);

  // Focus the prompt once booted and whenever we return from the game.
  useEffect(() => {
    if (booted && mode === "terminal") inputRef.current?.focus();
  }, [booted, mode]);

  // Keep the log pinned to the newest line.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines, booted]);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      setLines((prev) => [...prev, `> ${raw}`]);
      switch (cmd) {
        case "":
          break;
        case "help":
          setLines((prev) => [...prev, ...HELP_LINES]);
          break;
        case "snake":
        case "play":
          setMode("snake");
          break;
        case "whoami":
          setLines((prev) => [...prev, WHOAMI]);
          break;
        case "clear":
          setLines(() => []);
          break;
        case "exit":
          onClose();
          break;
        default:
          setLines((prev) => [
            ...prev,
            `command not found: ${cmd}. type 'help'.`,
          ]);
      }
    },
    [onClose],
  );

  const onDialogKeyDown = (event: ReactKeyboardEvent) => {
    // Single focusable region — swallow Tab so focus can't leave the overlay.
    if (event.key === "Tab") {
      event.preventDefault();
      return;
    }
    // In snake mode the game owns Escape (Esc → prompt); here Esc closes.
    if (mode === "terminal" && event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  const onInputKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(value);
      setValue("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close terminal"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Hidden terminal"
        onKeyDown={onDialogKeyDown}
        className="relative flex h-[28rem] max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-white/15 bg-[#0a0a0a] font-mono text-sm text-zinc-200 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-xs text-zinc-500">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </span>
          <span className="ml-1">
            guest@alanpipko — {mode === "snake" ? "snake" : "bash"}
          </span>
          <button
            type="button"
            onClick={() => (mode === "snake" ? setMode("terminal") : onClose())}
            className="ml-auto rounded px-1.5 py-0.5 text-[0.7rem] text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
          >
            {mode === "snake" ? "exit game" : "esc"}
          </button>
        </div>

        {mode === "snake" ? (
          <Snake onExit={() => setMode("terminal")} />
        ) : (
          <div
            ref={logRef}
            className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed"
          >
            {lines.map((line, i) => (
              <div key={i} className="break-words whitespace-pre-wrap">
                {line}
              </div>
            ))}
            {booted && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400/80" aria-hidden="true">
                  {">"}
                </span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={onInputKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  aria-label="Terminal command input"
                  className="flex-1 bg-transparent text-zinc-100 caret-emerald-400 outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
