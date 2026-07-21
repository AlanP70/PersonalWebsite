"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import type { ComponentType, KeyboardEvent, ReactNode } from "react";
import { useTheme } from "next-themes";
import { Mail, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { FooterHint } from "@/components/easter-egg/footer-hint";
import { links } from "@/lib/data/links";
import { toggleTheme } from "@/lib/theme";
import { withViewTransition } from "@/lib/view-transitions";
import { cn } from "@/lib/utils";

export type TabDef = {
  id: string;
  label: string;
  panel: ReactNode;
  /** Optional circled count badge — only where real data backs it. */
  count?: number;
};

/** Honest readouts for the bottom-right progress cluster (real counts only). */
export type Readout = { label: string; value: string };

// Real identity readouts for the top bar (all drawn from lib/data / About copy).
const IDENTITY = {
  name: "Alan Pipko",
  role: "Software Developer",
  location: "Toronto, ON",
};

// Social links, rendered as a compact icon row in the top identity bar.
type CommsLink = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  external?: boolean;
  download?: boolean;
};
const COMMS: CommsLink[] = [
  { label: "GitHub", href: links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${links.email}`, Icon: Mail },
  { label: "Resume", href: links.resume, Icon: FileText, download: true },
];

// Bottom-strip keycap hints. Every one is wired to a real shortcut below so the
// row never lies. Bracketed keyboard prompts only — never platform glyphs.
const PROMPTS: { keys: string; label: string }[] = [
  { keys: "←→", label: "Navigate" },
  { keys: "Enter", label: "Open" },
  { keys: "Esc", label: "Back" },
  { keys: "T", label: "Theme" },
];

/* ── Live clock (module-backed store so getSnapshot is cached — no
   setState-in-effect, and a stable SSR snapshot avoids hydration mismatch). ── */
let clockValue = "--:--:--";
const clockListeners = new Set<() => void>();
let clockTimer: ReturnType<typeof setInterval> | null = null;

function formatNow() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function clockSubscribe(callback: () => void) {
  clockListeners.add(callback);
  if (!clockTimer) {
    clockValue = formatNow();
    clockTimer = setInterval(() => {
      clockValue = formatNow();
      clockListeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    clockListeners.delete(callback);
    if (clockListeners.size === 0 && clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };
}

function useClock() {
  return useSyncExternalStore(clockSubscribe, () => clockValue, () => "--:--:--");
}

export function SiteShell({
  tabs,
  readouts = [],
}: {
  tabs: TabDef[];
  readouts?: Readout[];
}) {
  const [active, setActive] = useState(tabs[0].id);
  // Bumped on every activation so the active panel's reveal wrapper remounts
  // and its CSS stagger replays (a `hidden` toggle alone wouldn't re-trigger).
  const [revealNonce, setRevealNonce] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const clock = useClock();
  const { setTheme } = useTheme();

  // Read the current tab inside the global key handler without re-subscribing.
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Deep-linking + back/forward: keep the active tab in sync with the URL hash.
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (tabs.some((t) => t.id === id)) {
        setActive(id);
        setRevealNonce((n) => n + 1);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [tabs]);

  const selectTab = useCallback((id: string) => {
    // The View Transition wipes the old panel out; flushSync commits the swap
    // synchronously so the API captures the new panel (whose items start
    // hidden), letting the CSS stagger reveal them once the wipe lands.
    withViewTransition(() => {
      flushSync(() => {
        setActive(id);
        setRevealNonce((n) => n + 1);
      });
      // replaceState (not a hash assignment) so switching tabs never scrolls.
      window.history.replaceState(null, "", `#${id}`);
    });
  }, []);

  // Roving tablist arrows (when a tab itself has focus).
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    selectTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  // Global shortcuts backing the bottom prompt strip: [←→] cycles tabs from
  // anywhere, [Esc] returns to the first section, [T] toggles the theme.
  // ([Enter] "Open" is native — it activates the focused control/link.)
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.isContentEditable ||
          /^(input|textarea|select)$/i.test(t.tagName))
      ) {
        return;
      }
      // A modal (terminal / lightbox) owns its own keys while open.
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      if (e.defaultPrevented) return;

      if (e.key === "t" || e.key === "T") {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        const btn =
          document.querySelector<HTMLElement>("[data-theme-toggle]");
        const rect = btn?.getBoundingClientRect();
        toggleTheme(
          setTheme,
          rect
            ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
            : undefined,
        );
        return;
      }

      if (e.key === "Escape") {
        selectTab(tabs[0].id);
        return;
      }

      // Arrow nav — but if a tab already has focus, its roving handler moves.
      if (
        (document.activeElement as HTMLElement | null)?.getAttribute("role") ===
        "tab"
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const idx = tabs.findIndex((tab) => tab.id === activeRef.current);
        const last = tabs.length - 1;
        const nextIdx =
          e.key === "ArrowRight"
            ? idx === last
              ? 0
              : idx + 1
            : idx === 0
              ? last
              : idx - 1;
        selectTab(tabs[nextIdx].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tabs, selectTab, setTheme]);

  return (
    <div className="hud-shell">
      {/* Top chrome: identity bar + the horizontal tab strip. */}
      <div className="hud-header">
        <header className="hud-topbar">
          <div className="flex items-center justify-between gap-4 px-4 py-2 sm:px-6">
            <button
              type="button"
              onClick={() => selectTab(tabs[0].id)}
              className="group flex flex-col items-start text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-heading text-base leading-none font-bold tracking-wide text-foreground uppercase transition-colors group-hover:text-crimson sm:text-lg">
                {IDENTITY.name}
              </span>
              <span className="mt-1 font-mono text-[0.6rem] leading-none tracking-widest text-steel uppercase">
                {IDENTITY.role}
              </span>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <nav
                aria-label="Social links"
                className="hidden items-center gap-0.5 sm:flex"
              >
                {COMMS.map(({ label, href, Icon, external, download }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(download ? { download: true } : {})}
                    className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </nav>
              <span
                aria-hidden="true"
                className="hidden h-6 w-px bg-border sm:block"
              />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Primary nav: a single roving-tabindex tablist as a horizontal tab
            strip with a magenta→crimson gradient along its top edge. */}
        <nav aria-label="Primary" className="hud-tabbar">
          <div role="tablist" aria-label="Sections" className="hud-tablist">
            {tabs.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <div key={tab.id} className="flex items-stretch">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="flex items-center font-mono text-[0.6rem] text-steel/40 select-none"
                    >
                      ◇
                    </span>
                  )}
                  <button
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectTab(tab.id)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cn(
                      "group relative flex items-center gap-1.5 px-3 py-2.5 font-heading text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-4 sm:text-sm",
                      selected
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>{tab.label}</span>
                    {typeof tab.count === "number" && (
                      <span
                        className={cn(
                          "inline-flex h-4 min-w-4 items-center justify-center rounded-full border px-1 font-mono text-[0.55rem] leading-none transition-colors",
                          selected
                            ? "border-steel/70 text-steel"
                            : "border-steel/40 text-steel/70",
                        )}
                      >
                        {tab.count}
                      </span>
                    )}
                    {selected && (
                      <span
                        aria-hidden="true"
                        style={{ background: "var(--accent-gradient)" }}
                        className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5"
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Central content — one panel per section, keeping the tab semantics,
          reveal stagger and hidden-toggle from the original shell. */}
      <main id="main" className="hud-content">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={!selected}
              tabIndex={0}
              className="focus-visible:outline-none"
            >
              {/* Remounting via a changing key on activation replays the CSS
                  stagger; idle panels keep a stable key so they don't thrash. */}
              <div
                key={selected ? `reveal-${revealNonce}` : "idle"}
                className={selected ? "tab-reveal" : undefined}
              >
                {tab.panel}
              </div>
            </div>
          );
        })}
      </main>

      {/* Bottom button-prompt strip — real keycap shortcuts, live clock +
          location, and an honest progress/counts cluster on the right. */}
      <footer className="hud-prompt">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-6">
          {/* Keycap prompts — hidden on touch (no keyboard) via CSS. */}
          <div className="hud-keycaps flex flex-wrap items-center gap-x-3 gap-y-1">
            {PROMPTS.map(({ keys, label }, i) => (
              <span key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-steel/30 select-none"
                  >
                    ◇
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <span className="hud-key">{keys}</span>
                  <span className="font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase">
                    {label}
                  </span>
                </span>
              </span>
            ))}
          </div>

          {/* Clock + location. */}
          <div className="flex items-center gap-3 font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase">
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-crimson"
              />
              <span aria-label={`Local time ${clock}`}>{clock}</span>
            </span>
            <span aria-hidden="true" className="text-steel/40">
              ◇
            </span>
            <span>{IDENTITY.location}</span>
          </div>

          {/* Progress / counts cluster (bottom-right). Honest readouts only. */}
          {readouts.length > 0 && (
            <dl className="flex items-center gap-4">
              {readouts.map((r) => (
                <div key={r.label} className="flex flex-col items-end gap-0.5">
                  <dt className="font-mono text-[0.5rem] leading-none tracking-widest text-muted-foreground/70 uppercase">
                    {r.label}
                  </dt>
                  <dd className="font-heading text-sm leading-none font-bold text-steel">
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Easter-egg discoverability line (touch taps it to open; desktop uses
            the Konami sequence). Kept subtle. */}
        <div className="flex justify-center px-4 pb-1.5 text-center text-[0.6rem]">
          <FooterHint />
        </div>
      </footer>
    </div>
  );
}
