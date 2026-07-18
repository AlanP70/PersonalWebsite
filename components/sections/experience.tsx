import { experience } from "@/lib/data/experience";
import { OrgLogo } from "@/components/org-logo";
import { SectionHeading } from "@/components/section-heading";
import { TechPills, StatusBadges } from "@/components/pills";

export function Experience() {
  return (
    <section aria-label="Experience" className="section-container py-14 sm:py-16">
      <SectionHeading>Experience</SectionHeading>
      <ul className="divide-y divide-border">
        {experience.map((entry) => (
          <li
            key={`${entry.org}-${entry.role}`}
            className="flex gap-4 py-5 first:pt-0"
          >
            <OrgLogo src={entry.logo} name={entry.org} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-heading font-semibold text-foreground">
                  {entry.role}{" "}
                  <span className="font-normal text-muted-foreground">
                    &middot;{" "}
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        {entry.org}
                      </a>
                    ) : (
                      entry.org
                    )}
                  </span>
                </p>
                <p className="shrink-0 font-mono text-xs text-muted-foreground">
                  {entry.dates}
                </p>
              </div>
              <StatusBadges items={[entry.type]} className="mt-2" />
              <p className="mt-2 text-sm text-foreground/80">
                {entry.description}
              </p>
              <TechPills items={entry.tags} className="mt-3" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
