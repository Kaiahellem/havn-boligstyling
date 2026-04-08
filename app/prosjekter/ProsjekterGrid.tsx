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
            className={`w-full text-left flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} border-b border-[#E5E0D8] group cursor-pointer`}
          >
            {/* Text side */}
            <div className="flex flex-col justify-center gap-5 flex-1 px-10 sm:px-16 py-16 border-b lg:border-b-0 border-[#E5E0D8]">
              <span className="font-mono text-[13px] font-medium tracking-[1px] text-[#C8B496]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-[32px] text-[#1A1A1A] leading-[1.08]">{project.title}</h2>
              {project.description && (
                <p className="text-[15px] text-[#777777] leading-relaxed max-w-sm">{project.description}</p>
              )}
              {project.service && (
                <span className="font-mono text-[12px] font-medium tracking-[1px] uppercase text-[#777777]">
                  {project.service}
                </span>
              )}
              <span className="font-mono text-[12px] font-medium tracking-[1px] uppercase text-[#1A1A1A] group-hover:tracking-[3px] transition-all duration-300 w-fit">
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
      <div className="flex justify-center px-10 sm:px-16 py-16 border-b border-[#E5E0D8]">
        <Link
          href="/kontakt"
          className="inline-block bg-[#1E1E1E] text-white font-mono text-[13px] font-medium tracking-[2px] uppercase px-9 py-[18px] hover:bg-[#333] transition-colors duration-200"
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
