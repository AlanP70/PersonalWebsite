import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";
import { Separator } from "@/components/ui/separator";
import { certifications } from "@/lib/data/skills";

const interests = ["Piano", "Tennis", "Basketball", "Chess", "Photography (Nikon D5500)"];
const languages = ["EN", "FR", "RU"];

export function About() {
  return (
    <section id="about" aria-label="About" className="py-24">
      <FadeIn>
        <div className="section-container">
          <h2 className="mb-10 font-heading text-3xl font-bold sm:text-4xl">
            <span className="mr-3 text-muted-foreground/50">05</span>
            About
          </h2>
          <div className="space-y-4 text-foreground/90">
            <p>
              CS student (cybersecurity emphasis) at the University of
              Guelph &middot; 3.8 GPA &middot; graduating April 2030.
            </p>
            <p>
              I build full-stack web apps, ML / computer-vision tooling, and
              business automation.
            </p>
            <p className="text-muted-foreground">
              Outside of code, I split my time between the piano, the tennis
              and basketball court, chess, and photography with my Nikon
              D5500.
            </p>
          </div>

          <div className="mt-8 space-y-6">
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
                    <Badge variant="outline" className="border-white/10">
                      {interest}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-10" />

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Certifications</h3>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert.name} className="text-sm text-muted-foreground">
                  {cert.name} <span className="text-muted-foreground/60">— {cert.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
