import { SiteShell, type TabDef } from "@/components/site-shell";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Places } from "@/components/sections/places";
import { Contact } from "@/components/sections/contact";

const tabs: TabDef[] = [
  { id: "about", label: "About", panel: <About /> },
  { id: "education", label: "Education", panel: <Education /> },
  { id: "experience", label: "Experience", panel: <Experience /> },
  { id: "projects", label: "Projects", panel: <Projects /> },
  { id: "photography", label: "Photography", panel: <Places /> },
  { id: "contact", label: "Contact", panel: <Contact /> },
];

export default function Home() {
  return <SiteShell tabs={tabs} />;
}
