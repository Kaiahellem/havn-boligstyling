"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Project {
  id: string;
  title: string;
  image: string;
  description?: string;
  city?: string;
  service?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: ProjectModalProps) {
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
        className="relative w-full max-w-[1200px] h-[90vh] max-h-[90vh] overflow-y-auto bg-[var(--background)] shadow-2xl animate-slide-in-bottom"
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

        <div className="flex flex-col md:flex-row min-h-full">
          {/* Bilde til venstre */}
          <div className="flex-1 flex flex-col justify-center items-start p-6 sm:p-16 pt-0 md:pt-8 md:pr-4 order-1 md:order-1">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Tekst til høyre */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center order-2 md:order-2">
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
          </div>
        </div>

        {/* Navigasjon og lenke nederst til høyre */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
          <Link
            href="/prosjekter"
            className="text-havna-700 font-medium underline underline-offset-4 decoration-2 transition-all duration-200 hover:decoration-transparent"
          >
            Se alle prosjekter
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-havna-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Forrige prosjekt"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-havna-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Neste prosjekt"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
