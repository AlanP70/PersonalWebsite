import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Places } from "@/components/sections/places";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="divide-y divide-white/10">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Places />
      <About />
      <Contact />
    </div>
  );
}
