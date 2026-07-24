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
// source, …). The shared `.hud-badge` chip (chamfered corners + steel hairline)
// keeps these state labels in the same angular register as the HUD panels,
// rather than the old rounded pill.
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
        <span key={label} className="hud-badge">
          {label}
        </span>
      ))}
    </span>
  );
}
