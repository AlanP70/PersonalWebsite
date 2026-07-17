import { links } from "@/lib/data/links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="section-container-wide flex flex-col items-center gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p className="flex items-center gap-3">
          <span>&copy; {new Date().getFullYear()} Alan Pipko</span>
          <span
            aria-hidden="true"
            className="font-mono text-[0.7rem] tracking-widest text-foreground/15 select-none"
          >
            ↑↑↓↓←→←→BA
          </span>
        </p>
        <p>
          Built with Next.js, Tailwind CSS &amp; shadcn/ui &middot;{" "}
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
