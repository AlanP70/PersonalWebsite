import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { skills } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-24">
      <div className="section-container">
        <h2 className="mb-12 font-heading text-3xl font-bold sm:text-4xl">
          <span className="mr-3 text-muted-foreground/50">03</span>
          Skills
        </h2>
      </div>

      {/* Screen-reader list — the marquee below duplicates content visually
          for the infinite-scroll effect, so it's hidden from assistive tech. */}
      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <Marquee pauseOnHover className="[--duration:35s]">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-foreground/90"
            >
              {skill}
            </Badge>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
