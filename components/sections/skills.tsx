import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-24">
      <FadeIn>
        <div className="section-container">
          <h2 className="mb-10 font-heading text-3xl font-bold sm:text-4xl">
            <span className="mr-3 text-muted-foreground/50">03</span>
            Skills
          </h2>
          <div className="space-y-6">
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
                        className="border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-normal text-foreground/90"
                      >
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
