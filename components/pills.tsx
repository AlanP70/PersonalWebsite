// Monospace tech-tag pills — the site's technical register applied to the real
// stacks in lib/data. Small, consistent, monochrome.
export function TechPills({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item}>
          <span className="inline-flex items-center rounded border border-border px-1.5 py-0.5 font-mono text-[0.7rem] leading-none text-muted-foreground">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Status badges — only rendered where genuinely true (internship, live, open
// source, …). Slightly heavier than a tech pill so the state reads first.
export function StatusBadges({
  items,
  className,
}: {
  items?: string[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <span className={`flex flex-wrap gap-1.5 ${className ?? ""}`}>
      {items.map((label) => (
        <span
          key={label}
          className="inline-flex items-center rounded-full border border-foreground/25 bg-foreground/[0.06] px-2 py-0.5 font-mono text-[0.65rem] font-medium tracking-wider text-foreground/80 uppercase"
        >
          {label}
        </span>
      ))}
    </span>
  );
}
