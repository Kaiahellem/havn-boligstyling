"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/lib/projects";

export default function ProsjekterGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      {/* Staggered grid */}
      <section>
        {projects.map((project, i) => (
          <button
            key={project._id}
            type="button"
            onClick={() => setSelectedProject(project)}
            className={`w-full text-left flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} border-b border-ink group cursor-pointer`}
          >
            {/* Text side */}
            <div className="flex flex-col justify-center gap-5 flex-1 px-10 sm:px-16 py-16 border-b lg:border-b-0 border-ink">
              <span className="text-body-sm font-medium text-ink/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-heading font-normal text-ink leading-[1.1]">{project.title}</h2>
              {project.description && (
                <p className="text-body font-normal text-ink/70 max-w-sm">{project.description}</p>
              )}
              {project.service && (
                <span className="text-body-sm font-medium uppercase text-ink/60">
                  {project.service}
                </span>
              )}
              <span className="text-body-sm font-medium uppercase text-ink underline underline-offset-[3px] decoration-ink w-fit">
                Se prosjekt →
              </span>
            </div>
            {/* Image side */}
            <div className="relative w-full lg:w-[55%] shrink-0 overflow-hidden min-h-[320px] lg:min-h-[480px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </button>
        ))}
      </section>

      {/* CTA */}
      <div className="flex justify-center px-10 sm:px-16 py-16 border-b border-ink">
        <Link
          href="/kontakt"
          className="inline-flex items-center justify-center rounded-lg border border-ink px-[18px] py-[10px] text-body font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Bestill befaring
        </Link>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        hasPrev={selectedProject ? projects.findIndex((p) => p._id === selectedProject._id) > 0 : false}
        hasNext={
          selectedProject
            ? projects.findIndex((p) => p._id === selectedProject._id) < projects.length - 1
            : false
        }
        onPrev={() => {
          if (!selectedProject) return;
          const idx = projects.findIndex((p) => p._id === selectedProject._id);
          if (idx > 0) setSelectedProject(projects[idx - 1]);
        }}
        onNext={() => {
          if (!selectedProject) return;
          const idx = projects.findIndex((p) => p._id === selectedProject._id);
          if (idx < projects.length - 1) setSelectedProject(projects[idx + 1]);
        }}
      />
    </>
  );
}
