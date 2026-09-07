import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.slug}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-image-link"
            aria-label={`Visiter ${project.title} (nouvel onglet)`}
          >
            <div className="project-image">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
            </div>
            <span className="project-visit">
              Visiter le site <ArrowUpRight size={17} />
            </span>
          </a>
          <div className="project-meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </article>
      ))}
    </div>
  );
}
