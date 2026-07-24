import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Greeting } from "@/components/sections/greeting";
import { SectionDivider } from "@/components/section-divider";
import { TechPills } from "@/components/pills";
import { ProjectCover } from "@/components/project-cover";
import { HudImageFrame } from "@/components/hud/image-frame";
import { HudLink } from "@/components/hud/link";
import { links } from "@/lib/data/links";
import { projects } from "@/lib/data/projects";
import { skillGroups, certifications } from "@/lib/data/skills";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "Portrait.jpg"));

// Easy to edit: the status line and the intro sentence.
const status = "Currently interning at Vibraint AI";
const intro =
  "I'm Alan, a second-year Computer Science student at Guelph. Recently, I've been building real-time data visualization systems, training computer vision models, and writing Python automations to simplify repetitive business tasks.";

const interests = ["Piano", "Tennis", "Basketball", "Chess", "Hiking", "Photography"];
const languages = ["EN", "FR", "RU"];

const socials = [
  { label: "GitHub", href: links.github, external: true },
  { label: "LinkedIn", href: links.linkedin, external: true },
  { label: "Resume", href: links.resume, download: true },
  { label: "Email", href: `mailto:${links.email}` },
];

export function About() {
  return (
    <section
      aria-label="About"
      className="section-container py-14 sm:py-16"
    >
      {/* Operator profile hero: an identity readout, mission brief, and a spec
          block sit beside a chamfered ID portrait — the same HUD register as the
          rest of the site, framed as an operator dossier. */}
      <div className="hero-reveal grid grid-cols-1 gap-8 sm:grid-cols-[1fr_11rem] sm:items-center sm:gap-10">
        {/* Identity column: kicker -> greeting -> name -> designation -> brief ->
            spec readouts -> comms. */}
        <div className="flex flex-col">
          {/* Kicker — replaces the old `$ whoami` shell prompt. */}
          <p className="hero-reveal__item flex items-center gap-2.5">
            <span aria-hidden="true" className="hud-marker" />
            <span className="hud-label">Operator Profile</span>
          </p>
          <div className="hero-reveal__item mt-4">
            <Greeting />
          </div>
          <h1
            title="↑ ↑ ↓ ↓ ← → ← → B A"
            className="hero-reveal__item mt-1 font-heading text-4xl font-bold tracking-tight text-foreground uppercase sm:text-5xl"
          >
            Alan Pipko
          </h1>
          {/* Designation readout. */}
          <p className="hero-reveal__item mt-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Software Developer
            <span aria-hidden="true" className="mx-2 text-steel/50">
              {"//"}
            </span>
            CS @ University of Guelph
          </p>
          {/* Mission brief. */}
          <p className="hero-reveal__item mt-5 max-w-md text-base text-foreground/85 sm:text-lg">
            {intro}
          </p>
          {/* Operator spec readouts — label/value pairs in the HUD register. */}
          <dl className="hero-reveal__item mt-6 flex flex-col gap-2.5">
            <div className="flex items-baseline gap-3">
              <dt className="hud-label w-20 shrink-0">Status</dt>
              <dd className="flex items-center gap-2.5 text-sm text-foreground/90">
                <span
                  aria-hidden="true"
                  className="relative flex size-2 shrink-0 translate-y-px"
                >
                  <span className="absolute inline-flex size-full rounded-full bg-accent-amber/30" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-amber" />
                </span>
                {status}
              </dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="hud-label w-20 shrink-0">Location</dt>
              <dd className="text-sm text-foreground/90">Greater Toronto Area, ON</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="hud-label w-20 shrink-0">Focus</dt>
              <dd className="text-sm text-foreground/90">
                Cybersecurity · Automation · Live Data Visualization
              </dd>
            </div>
          </dl>
          {/* Comms channels. */}
          <nav
            aria-label="Social links"
            className="hero-reveal__item mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-muted-foreground"
          >
            <span className="hud-label mr-1">Comms</span>
            {socials.map((social, i) => (
              <span key={social.label} className="inline-flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-steel/40">
                    /
                  </span>
                )}
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

        {/* Operator ID portrait — a chamfered HUD frame matching the project
            covers. Drop public/Portrait.jpg to fill it; until then an intentional
            monochrome placeholder holds the frame. */}
        <div className="hero-reveal__item">
          <div className="about-portrait hud-panel relative aspect-[4/5] w-36 overflow-hidden sm:w-full">
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
              <div className="about-portrait__ph flex h-full w-full items-center justify-center bg-gradient-to-br from-foreground/[0.06] to-transparent">
                <span
                  aria-hidden="true"
                  className="font-heading text-4xl font-bold tracking-tighter text-foreground/20 select-none"
                >
                  AP
                </span>
              </div>
            )}
          </div>
          <p className="hud-label mt-2 text-center sm:text-left">Operator ID</p>
        </div>
      </div>

      <SectionDivider />

      <div className="space-y-4 text-foreground/90">
        <p>
          Graduating April 2030. Based in the Greater Toronto Area.
        </p>
        <p className="text-muted-foreground">
          In my free time, I really like travelling, hiking, and taking photos during my trips. I also love playing tennis and basketball, as well as going to the gym.
        </p>
      </div>

      {/* Featured work — a compact teaser so a visitor landing here immediately
          sees real projects, with a path into the Projects tab (the tab system
          deep-links on the #projects hash). */}
      <div className="mt-10">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className="hud-label">Featured work</p>
          <HudLink href="#projects">all {projects.length} projects</HudLink>
        </div>
        <ul className="grid grid-cols-3 gap-3">
          {projects
            .filter((project) => project.image)
            .slice(0, 3)
            .map((project, i) => (
              <li key={project.title}>
                <a
                  href="#projects"
                  aria-label={`${project.title} — see in Projects`}
                  className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <HudImageFrame
                    id={i + 1}
                    interactive
                    bevel="8px"
                    className="aspect-[16/10] w-full"
                  >
                    <ProjectCover title={project.title} image={project.image} />
                  </HudImageFrame>
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
            <p className="hud-label w-28 shrink-0 pt-0.5">
              {group.category}
            </p>
            <TechPills items={group.items} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="hud-label mb-2">Languages</p>
          <TechPills items={languages} />
        </div>
        <div>
          <p className="hud-label mb-2">Interests</p>
          <TechPills items={interests} />
        </div>
      </div>

      <SectionDivider />

      <div>
        {/* Marker + label, matching the hero "Operator Profile" kicker and the
            other About sub-section labels — so this stops reading as a lone
            generic heading. Stays an <h2> for document structure. */}
        <div className="mb-4 flex items-center gap-2.5">
          <span aria-hidden="true" className="hud-marker" />
          <h2 className="hud-label">Certifications</h2>
        </div>
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
