import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GithubIcon } from "@/components/icons";
import { links } from "@/lib/data/links";

export function Hero() {
  return (
    <section id="main" aria-label="Introduction">
      <AuroraBackground className="min-h-[90vh] items-start justify-center">
        <div className="section-container flex flex-col items-start gap-6 py-24">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Software Developer &middot; Class of 2030
          </p>
          <h1 className="glow-text font-heading text-5xl font-bold tracking-tight sm:text-7xl">
            Alan Pipko
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Computer Science student & software developer — real-time systems,
            ML tooling, and automation.
          </p>
          <p className="text-sm text-muted-foreground">
            University of Guelph &middot; Trilingual (EN / FR / RU)
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button render={<a href="#projects" />} size="lg">
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button render={<a href={links.resume} download />} size="lg" variant="outline">
              <Download className="size-4" aria-hidden="true" />
              Resume
            </Button>
            <Button
              render={<a href={links.github} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              variant="ghost"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              GitHub
            </Button>
            <Button render={<a href="#contact" />} size="lg" variant="ghost">
              <Mail className="size-4" aria-hidden="true" />
              Contact
            </Button>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
