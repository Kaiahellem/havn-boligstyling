"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Project {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
  city?: string;
  service?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content - slides in from bottom */}
      <div
        className="relative w-full max-w-[1200px] max-h-[90vh] overflow-y-auto bg-[var(--background)] shadow-2xl animate-slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-havna-600 hover:text-havna-800 hover:bg-havna-100 transition-colors"
          aria-label="Lukk"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.afterImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.service && (
              <span className="text-xs font-medium text-havna-600 bg-havna-100 px-2 py-1 rounded">
                {project.service}
              </span>
            )}
            {project.city && (
              <span className="text-xs text-havna-500">{project.city}</span>
            )}
          </div>
          <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-havna-900 mb-4">
            {project.title}
          </h2>
          {project.description && (
            <p className="text-havna-700 mb-6 leading-relaxed">{project.description}</p>
          )}
          <Link
            href="/prosjekter"
            className="inline-block bg-havna-800 text-white px-6 py-3 rounded-md font-medium hover:bg-havna-700 transition-colors"
          >
            Se alle prosjekter
          </Link>
        </div>
      </div>
    </div>
  );
}
