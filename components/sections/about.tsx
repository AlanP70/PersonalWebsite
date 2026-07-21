import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Greeting } from "@/components/sections/greeting";
import { SectionDivider } from "@/components/section-divider";
import { TechPills } from "@/components/pills";
import { ProjectCover } from "@/components/project-cover";
import { links } from "@/lib/data/links";
import { projects } from "@/lib/data/projects";
import { skillGroups, certifications } from "@/lib/data/skills";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "Portrait.jpg"));

// Easy to edit: the status line and the intro sentence.
const status = "Currently interning at Vibraint AI";
const intro =
  "CS student at Guelph. Recently I've been building live desktop data tools, training computer vision models, and writing Python automation for repetitive business work.";

const interests = ["Piano", "Tennis", "Basketball", "Chess", "Photography"];
const languages = ["EN", "FR", "RU"];

const socials = [
  { label: "GitHub", href: links.github, external: true },
  { label: "LinkedIn", href: links.linkedin, external: true },
  { label: "Resume", href: links.resume, download: true },
  { label: "Email", href: `mailto:${links.email}` },
];

// Reusable monospace sub-label for the About body (skills, languages, …).
const metaLabel =
  "font-mono text-xs tracking-wider text-muted-foreground uppercase";

export function About() {
  return (
    <section
      aria-label="About"
      className="section-container py-14 sm:py-16"
    >
      {/* Hero lives in the same reading column as the body, so the prompt,
          name, intro, divider and body text all share one left edge. Text and
          a modest portrait sit side by side as a cohesive unit. */}
      <div className="hero-reveal grid grid-cols-1 gap-8 sm:grid-cols-[1fr_11rem] sm:items-center sm:gap-10">
        {/* Text column: prompt -> greeting -> name -> intro -> status -> socials. */}
        <div className="flex flex-col">
          <p className="hero-reveal__item font-mono text-xs tracking-wider text-muted-foreground">
            <span className="text-muted-foreground/60">$</span> whoami
          </p>
          <div className="hero-reveal__item mt-5">
            <Greeting />
          </div>
          <h1
            title="↑ ↑ ↓ ↓ ← → ← → B A"
            className="hero-reveal__item mt-2 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Alan Pipko
          </h1>
          <p className="hero-reveal__item mt-4 max-w-md text-base text-foreground/85 sm:text-lg">
            {intro}
            <span aria-hidden="true" className="term-cursor" />
          </p>
          <p className="hero-reveal__item mt-5 flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            <span aria-hidden="true" className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full rounded-full bg-accent-amber/30" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-amber" />
            </span>
            {status}
          </p>
          <nav
            aria-label="Social links"
            className="hero-reveal__item mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground"
          >
            {socials.map((social, i) => (
              <span key={social.label} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                <a
                  href={social.href}
                  {...(social.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  {...(social.download ? { download: true } : {})}
                  className="underline-offset-4 transition-colors hover:text-accent-amber hover:underline"
                >
                  {social.label}
                </a>
              </span>
            ))}
          </nav>
        </div>

        {/* A modest portrait that balances the text. Drop public/Portrait.jpg to
            fill it; until then an intentional monochrome placeholder holds the frame. */}
        <div className="hero-reveal__item">
          <div className="about-portrait relative aspect-[4/5] w-36 overflow-hidden rounded-xl border border-foreground/15 bg-gradient-to-br from-foreground/[0.09] via-foreground/[0.035] to-transparent sm:w-full">
            {hasPhoto ? (
              <Image
                src="/Portrait.jpg"
                alt="Alan Pipko"
                fill
                sizes="(max-width: 640px) 9rem, 11rem"
                className="object-cover"
                priority
              />
            ) : (
              <div className="about-portrait__ph flex h-full w-full items-center justify-center">
                <span
                  aria-hidden="true"
                  className="font-heading text-4xl font-bold tracking-tighter text-foreground/20 select-none"
                >
                  AP
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <SectionDivider />

      <div className="space-y-4 text-foreground/90">
        <p>
          Graduating April 2030. Based in the Greater Toronto Area.
        </p>
        <p className="text-muted-foreground">
          Outside of code, I split my time between the piano, the tennis and
          basketball court, chess, and photography.
        </p>
      </div>

      {/* Featured work — a compact teaser so a visitor landing here immediately
          sees real projects, with a path into the Projects tab (the tab system
          deep-links on the #projects hash). */}
      <div className="mt-10">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className={metaLabel}>Featured work</p>
          <a
            href="#projects"
            className="font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-accent-amber hover:underline"
          >
            all {projects.length} projects →
          </a>
        </div>
        <ul className="grid grid-cols-3 gap-3">
          {projects
            .filter((project) => project.image)
            .slice(0, 3)
            .map((project) => (
              <li key={project.title}>
                <a
                  href="#projects"
                  aria-label={`${project.title} — see in Projects`}
                  className="group block focus-visible:outline-none"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-border bg-panel/50 group-focus-visible:ring-2 group-focus-visible:ring-ring">
                    <ProjectCover title={project.title} image={project.image} />
                  </span>
                  <span className="mt-1.5 block truncate font-mono text-[0.7rem] text-muted-foreground transition-colors group-hover:text-foreground">
                    {project.title}
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-10 space-y-6">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-2 sm:flex-row sm:gap-6"
          >
            <p className={`w-28 shrink-0 pt-0.5 ${metaLabel}`}>
              {group.category}
            </p>
            <TechPills items={group.items} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className={`mb-2 ${metaLabel}`}>Languages</p>
          <TechPills items={languages} />
        </div>
        <div>
          <p className={`mb-2 ${metaLabel}`}>Interests</p>
          <TechPills items={interests} />
        </div>
      </div>

      <SectionDivider />

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold">
          Certifications
        </h2>
        <ul className="space-y-2">
          {certifications.map((cert) => (
            <li key={cert.name} className="text-sm text-muted-foreground">
              {cert.name}{" "}
              <span className="text-muted-foreground/60">— {cert.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
