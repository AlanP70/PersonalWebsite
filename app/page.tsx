import { SiteShell, type TabDef, type Readout } from "@/components/site-shell";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Places } from "@/components/sections/places";
import { Contact } from "@/components/sections/contact";
import { projects } from "@/lib/data/projects";
import { experience } from "@/lib/data/experience";
import { photos } from "@/lib/data/places";

// Count badges + the bottom-right readouts are pulled straight from lib/data so
// they can never drift from the real content (nothing invented).
const tabs: TabDef[] = [
  { id: "about", label: "About", panel: <About /> },
  { id: "education", label: "Education", panel: <Education /> },
  { id: "experience", label: "Experience", panel: <Experience />, count: experience.length },
  { id: "projects", label: "Projects", panel: <Projects />, count: projects.length },
  { id: "photography", label: "Photography", panel: <Places />, count: photos.length },
  { id: "contact", label: "Contact", panel: <Contact /> },
];

const readouts: Readout[] = [
  { label: "Class of", value: "2030" },
  { label: "Projects", value: String(projects.length).padStart(2, "0") },
  { label: "Photos", value: String(photos.length).padStart(2, "0") },
];

export default function Home() {
  return <SiteShell tabs={tabs} readouts={readouts} />;
}
