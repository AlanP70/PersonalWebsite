"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Circle expands from the centre of the toggle button.
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme(setTheme, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-theme-toggle
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
