import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass-panel flex flex-col overflow-hidden transition-colors hover:border-primary/40">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-white/10">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(80% 100% at 0% 0%, rgba(59,130,246,0.16) 0%, rgba(11,18,32,0) 70%)",
            }}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {project.link.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
