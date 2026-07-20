import { education } from "@/lib/data/education";
import { OrgLogo } from "@/components/org-logo";
import { SectionHeading } from "@/components/section-heading";
import { TechPills, StatusBadges } from "@/components/pills";

export function Education() {
  return (
    <section aria-label="Education" className="section-container py-14 sm:py-16">
      <SectionHeading>Education</SectionHeading>
      <ul className="divide-y divide-border">
        {education.map((entry) => {
          const inProgress = /expected/i.test(entry.dates);
          return (
            <li
              key={`${entry.school}-${entry.credential}`}
              className="flex gap-4 py-5 first:pt-0"
            >
              <OrgLogo src={entry.logo} name={entry.school} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-heading font-semibold text-foreground">
                    {entry.credential}{" "}
                    <span className="font-normal text-muted-foreground">
                      &middot;{" "}
                      {entry.href ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 transition-colors hover:text-accent-amber hover:underline"
                        >
                          {entry.school}
                        </a>
                      ) : (
                        entry.school
                      )}
                    </span>
                  </p>
                  <p className="shrink-0 font-mono text-xs text-muted-foreground">
                    {entry.dates}
                  </p>
                </div>
                {inProgress && (
                  <StatusBadges items={["In progress"]} className="mt-2" />
                )}
                {entry.courses.length > 0 && (
                  <>
                    <p className="mt-2 text-sm text-foreground/80">
                      Relevant coursework
                    </p>
                    <TechPills items={entry.courses} className="mt-2" />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
