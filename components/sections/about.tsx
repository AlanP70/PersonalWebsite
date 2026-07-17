import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { links } from "@/lib/data/links";
import { skillGroups, certifications } from "@/lib/data/skills";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "me.jpg"));

const interests = ["Piano", "Tennis", "Basketball", "Chess", "Photography (Nikon D5500)"];
const languages = ["EN", "FR", "RU"];

const socials = [
  { label: "GitHub", href: links.github, external: true },
  { label: "LinkedIn", href: links.linkedin, external: true },
  { label: "Resume", href: links.resume, download: true },
  { label: "Email", href: `mailto:${links.email}` },
];

export function About() {
  return (
    <section aria-label="About" className="section-container py-14 sm:py-16">
      {hasPhoto && (
        <Image
          src="/me.jpg"
          alt="Alan Pipko"
          width={72}
          height={72}
          className="mb-6 rounded-full border border-border object-cover"
        />
      )}
      <h1
        title="↑ ↑ ↓ ↓ ← → ← → B A"
        className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Alan Pipko
      </h1>
      <p className="mt-4 max-w-xl text-base text-foreground/90 sm:text-lg">
        Computer Science student &amp; software developer — real-time systems, ML
        tooling, and automation.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Based in the Greater Toronto Area
      </p>

      <nav
        aria-label="Social links"
        className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground"
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
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {social.label}
            </a>
          </span>
        ))}
      </nav>

      <hr className="my-10 border-border" />

      <div className="space-y-4 text-foreground/90">
        <p>
          CS student (cybersecurity emphasis) at the University of Guelph &middot;
          3.8 GPA &middot; graduating April 2030.
        </p>
        <p>
          I build full-stack web apps, ML / computer-vision tooling, and business
          automation.
        </p>
        <p className="text-muted-foreground">
          Outside of code, I split my time between the piano, the tennis and
          basketball court, chess, and photography with my Nikon D5500.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-2 sm:flex-row sm:gap-6"
          >
            <p className="w-28 shrink-0 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {group.category}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge
                    variant="outline"
                    className="border-border px-3 py-1 text-sm font-normal text-foreground/90"
                  >
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Languages
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Languages spoken">
            {languages.map((lang) => (
              <li key={lang}>
                <Badge variant="secondary">{lang}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Interests
          </p>
          <ul className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <li key={interest}>
                <Badge variant="outline" className="border-border">
                  {interest}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="my-10 border-border" />

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold">Certifications</h2>
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
