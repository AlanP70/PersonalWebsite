import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { FadeIn } from "@/components/ui/fade-in";
import { links } from "@/lib/data/links";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-24">
      <FadeIn>
        <div className="section-container">
          <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl">
            <span className="mr-3 text-muted-foreground/50">06</span>
            Let&apos;s talk
          </h2>
          <p className="mb-6 max-w-xl text-muted-foreground">
            Open to SWE internship opportunities — reach out anytime.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 font-medium text-foreground/90 transition-colors hover:text-primary"
            >
              <Mail className="size-4" aria-hidden="true" />
              {links.email}
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-foreground/90 transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-foreground/90 transition-colors hover:text-primary"
            >
              <LinkedinIcon className="size-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
