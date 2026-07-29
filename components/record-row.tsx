import type { ReactNode } from "react";
import { OrgLogo } from "@/components/org-logo";
import { StatusBadges } from "@/components/pills";

/*
  One shared record system for Experience and Education, so both tabs read as
  different record types inside the same operator file system — not separate
  page components. Each record keeps identical chrome (catalog index + framed ID
  chip on the left, a title/org readout and a timestamped date on the right, a
  state badge), and hands its type-specific body in as children. Steel hairlines
  chain the records into one continuous log (see `.record-row` in globals.css).
*/
export function RecordList({ children }: { children: ReactNode }) {
  return <ol>{children}</ol>;
}

export function RecordRow({
  index,
  logo,
  org,
  href,
  title,
  dates,
  badges,
  children,
}: {
  /** 1-based catalog number, shown under the ID chip. */
  index: number;
  logo?: string;
  org: string;
  href?: string;
  title: string;
  dates: string;
  badges?: string[];
  children?: ReactNode;
}) {
  return (
    <li className="record-row flex gap-3.5 py-5 first:pt-0 sm:gap-4">
      {/* ID column: framed org chip + catalog index. */}
      <div className="flex flex-col items-center gap-1.5">
        <OrgLogo src={logo} name={org} />
        <span className="hud-label text-[0.55rem] leading-none">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-heading font-semibold text-foreground">
            {title}{" "}
            <span className="font-normal text-muted-foreground">
              &middot;{" "}
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 transition-colors hover:text-accent-amber hover:underline"
                >
                  {org}
                </a>
              ) : (
                org
              )}
            </span>
          </p>
          {/* Date as a timestamped readout — a small steel tick precedes it. */}
          <p className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-steel/60"
            />
            {dates}
          </p>
        </div>
        {badges && badges.length > 0 && (
          <StatusBadges items={badges} className="mt-2" />
        )}
        {children}
      </div>
    </li>
  );
}
