import { links } from "@/lib/data/links";
import { FooterHint } from "@/components/easter-egg/footer-hint";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="section-container-wide flex flex-col items-center gap-4 py-8 text-sm text-muted-foreground">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Alan Pipko</p>
          <p>
            Built with Next.js, Tailwind CSS &amp; shadcn/ui &middot;{" "}
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-accent-amber"
            >
              source
            </a>
          </p>
        </div>
        <FooterHint />
      </div>
    </footer>
  );
}
