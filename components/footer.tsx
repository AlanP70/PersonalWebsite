import { links } from "@/lib/data/links";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="section-container flex flex-col items-center gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Alan Pipko</p>
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
