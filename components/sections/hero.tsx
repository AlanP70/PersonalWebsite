import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { links } from "@/lib/data/links";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "me.jpg"));

export function Hero() {
  return (
    <section id="main" aria-label="Introduction" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(6,11,24,0) 70%)",
        }}
      />
      <div className="section-container flex flex-col items-start gap-5 py-24 sm:py-28">
        {hasPhoto && (
          <Image
            src="/me.jpg"
            alt="Alan Pipko"
            width={80}
            height={80}
            className="rounded-full border border-white/10 object-cover"
          />
        )}
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Alan Pipko
        </h1>
        <nav
          aria-label="Social links"
          className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <span aria-hidden="true">/</span>
          <a href={links.resume} download className="transition-colors hover:text-foreground">
            Resume
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={`mailto:${links.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
        </nav>
        <p className="max-w-lg text-base text-foreground/90 sm:text-lg">
          Computer Science student &amp; software developer — real-time
          systems, ML tooling, and automation.
        </p>
        <p className="text-sm text-muted-foreground">Based in [my city]</p>
      </div>
    </section>
  );
}
