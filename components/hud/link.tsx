import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Shared "jump" link in the HUD register: a mono, muted label that warms to the
  crimson accent on hover, with a trailing arrow that nudges in its travel
  direction. `right` for in-page jumps (e.g. #projects); `up-right` for outbound
  links. Consolidates the project cards' action link and the About "all projects"
  link, which were the same pattern hand-rolled twice.

  Normal anchor semantics are preserved — `external` adds `target=_blank` +
  `rel=noopener`, `download` triggers a download — and the arrow is aria-hidden
  decoration.
*/
export function HudLink({
  href,
  children,
  arrow = "right",
  external = false,
  download = false,
  className,
}: {
  href: string;
  children: ReactNode;
  arrow?: "right" | "up-right";
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className={cn(
        "group/hudlink inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-accent-amber",
        className,
      )}
    >
      {children}
      <Arrow
        className={cn(
          "size-3.5 transition-transform",
          arrow === "up-right"
            ? "group-hover/hudlink:translate-x-0.5 group-hover/hudlink:-translate-y-0.5"
            : "group-hover/hudlink:translate-x-0.5",
        )}
        aria-hidden="true"
      />
    </a>
  );
}
