import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { links } from "@/lib/data/links";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-24">
      <div className="section-container">
        <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl">
          <span className="mr-3 text-muted-foreground/50">05</span>
          Let&apos;s talk
        </h2>
        <p className="mb-8 max-w-xl text-muted-foreground">
          Open to SWE internship opportunities — reach out anytime.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${links.email}`}
            className="glass-panel flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
          >
            <Mail className="size-4" aria-hidden="true" />
            {links.email}
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
          >
            <GithubIcon className="size-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
          >
            <LinkedinIcon className="size-4" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
