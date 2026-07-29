import { projects } from "@/lib/data/projects";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import {
  ProjectGallery,
  type GalleryItem,
} from "@/components/sections/project-gallery";

export function Projects() {
  // Covers are rendered here on the server (ProjectCover reads /public) and
  // handed to the client gallery as nodes; the gallery owns the click-to-open
  // dossier interaction. The catalog FILE number is a project's position in the
  // source list, so it reads the same regardless of which tier renders it.
  const items: GalleryItem[] = projects.map((project, i) => ({
    project,
    index: i + 1,
    cover: (
      <ProjectCover
        title={project.title}
        image={project.image}
        sizes={project.featured ? "featured" : "grid"}
      />
    ),
  }));

  return (
    <section
      aria-label="Projects"
      className="section-container-gallery section-pad"
    >
      <SectionHeading>Projects</SectionHeading>
      <ProjectGallery items={items} />
    </section>
  );
}
