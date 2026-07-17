import { FadeIn } from "@/components/ui/fade-in";
import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="py-24">
      <FadeIn>
        <div className="section-container">
          <h2 className="mb-10 font-heading text-3xl font-bold sm:text-4xl">
            <span className="mr-3 text-muted-foreground/50">01</span>
            Experience
          </h2>
          <ul className="space-y-8">
            {experience.map((entry) => (
              <li key={`${entry.org}-${entry.role}`} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] font-heading text-sm font-semibold text-foreground/80"
                >
                  {entry.org.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-heading font-semibold text-foreground">
                      {entry.role}{" "}
                      <span className="font-normal text-muted-foreground">
                        &middot; {entry.org}
                      </span>
                    </p>
                    <p className="shrink-0 text-sm text-muted-foreground">
                      {entry.dates}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-foreground/80">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
