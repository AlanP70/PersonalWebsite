import { education } from "@/lib/data/education";
import { SectionHeading } from "@/components/section-heading";
import { TechPills } from "@/components/pills";
import { RecordList, RecordRow } from "@/components/record-row";

export function Education() {
  return (
    <section aria-label="Education" className="section-container py-14 sm:py-16">
      <SectionHeading>Education</SectionHeading>
      <RecordList>
        {education.map((entry, i) => {
          const inProgress = /expected/i.test(entry.dates);
          return (
            <RecordRow
              key={`${entry.school}-${entry.credential}`}
              index={i + 1}
              logo={entry.logo}
              org={entry.school}
              href={entry.href}
              title={entry.credential}
              dates={entry.dates}
              badges={inProgress ? ["In progress"] : undefined}
            >
              {entry.courses.length > 0 && (
                <>
                  <p className="hud-label mt-3">Relevant coursework</p>
                  <TechPills items={entry.courses} className="mt-2" />
                </>
              )}
            </RecordRow>
          );
        })}
      </RecordList>
    </section>
  );
}
