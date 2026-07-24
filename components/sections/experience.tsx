import { experience } from "@/lib/data/experience";
import { SectionHeading } from "@/components/section-heading";
import { TechPills } from "@/components/pills";
import { RecordList, RecordRow } from "@/components/record-row";

export function Experience() {
  return (
    <section aria-label="Experience" className="section-container py-14 sm:py-16">
      <SectionHeading>Experience</SectionHeading>
      <RecordList>
        {experience.map((entry, i) => (
          <RecordRow
            key={`${entry.org}-${entry.role}`}
            index={i + 1}
            logo={entry.logo}
            org={entry.org}
            href={entry.href}
            title={entry.role}
            dates={entry.dates}
            badges={[entry.type]}
          >
            <p className="mt-2 text-sm text-foreground/80">
              {entry.description}
            </p>
            <TechPills items={entry.tags} className="mt-3" />
          </RecordRow>
        ))}
      </RecordList>
    </section>
  );
}
