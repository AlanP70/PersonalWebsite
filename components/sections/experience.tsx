import { experience } from "@/lib/data/experience";

export function Experience() {
  return (
    <section aria-label="Experience" className="section-container py-14 sm:py-16">
      <h2 className="mb-8 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
        Experience
      </h2>
      <ul className="divide-y divide-border">
        {experience.map((entry) => (
          <li key={`${entry.org}-${entry.role}`} className="flex gap-4 py-5 first:pt-0">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-heading text-sm font-semibold text-foreground/80"
            >
              {entry.org.charAt(0)}
            </span>
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
                <p className="shrink-0 text-sm text-muted-foreground">
                  {entry.dates}
                </p>
              </div>
              <p className="mt-1 text-sm text-foreground/80">{entry.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
