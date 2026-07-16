import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/ui/timeline";
import { experience } from "@/lib/data/experience";

export function Experience() {
  const data = experience.map((entry) => ({
    title: entry.dates,
    content: (
      <div className="glass-panel p-6">
        <h3 className="font-heading text-lg font-semibold">{entry.role}</h3>
        <p className="text-sm text-muted-foreground">
          {entry.org} &middot; {entry.type}
        </p>
        <p className="mt-3 text-sm text-foreground/90">{entry.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="experience" aria-label="Experience" className="py-24">
      <div className="section-container">
        <h2 className="mb-12 font-heading text-3xl font-bold sm:text-4xl">
          <span className="mr-3 text-muted-foreground/50">01</span>
          Experience
        </h2>
      </div>
      <Timeline data={data} />
    </section>
  );
}
