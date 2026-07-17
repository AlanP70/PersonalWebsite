"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export type TabDef = { id: string; label: string; panel: ReactNode };

export function SiteShell({ tabs }: { tabs: TabDef[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep-linking + back/forward: keep the active tab in sync with the URL hash.
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (tabs.some((t) => t.id === id)) setActive(id);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [tabs]);

  const selectTab = useCallback((id: string) => {
    setActive(id);
    // replaceState (not a hash assignment) so switching tabs never scrolls.
    window.history.replaceState(null, "", `#${id}`);
  }, []);

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="section-container-wide flex items-center justify-between gap-4 py-3">
          <button
            type="button"
            onClick={() => selectTab(tabs[0].id)}
            className="font-heading text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Alan Pipko
          </button>
          <ThemeToggle />
        </div>
        <div className="section-container-wide">
          <div
            role="tablist"
            aria-label="Sections"
            className="-mx-1 flex gap-1 overflow-x-auto pb-2"
          >
            {tabs.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
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
                    "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== active}
            tabIndex={0}
            className="focus-visible:outline-none"
          >
            {tab.panel}
          </div>
        ))}
      </main>
    </>
  );
}
