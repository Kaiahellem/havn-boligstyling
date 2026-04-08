"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollLock } from "@/lib/useScrollLock";
import type { Project } from "@/lib/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: ProjectModalProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(!!project);

  // Reset image index when project changes
  useEffect(() => {
    setImageIndex(0);
  }, [project?._id]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    if (!project) return;
    const el = modalRef.current;
    if (!el) return;

    const getFocusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

    // Focus first element on open
    getFocusables()[0]?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = getFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [project]);

  if (!project) return null;

  const images = project.images ?? [project.image];
  const hasMultipleImages = images.length > 1;

  const prevImage = () => setImageIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setImageIndex((i) => (i + 1) % images.length);

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

      {/* Modal content */}
      <div
        ref={modalRef}
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
          {/* Image with carousel */}
          <div className="flex-1 flex flex-col justify-center items-start p-6 sm:p-16 pt-0 md:pt-8 md:pr-4 order-1 md:order-1">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden">
              <Image
                src={images[imageIndex]}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-havna-700 transition-colors"
                    aria-label="Forrige bilde"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-havna-700 transition-colors"
                    aria-label="Neste bilde"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            {hasMultipleImages && (
              <div className="flex gap-1.5 mt-3 justify-center w-full max-w-md">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      idx === imageIndex ? "bg-havna-800" : "bg-havna-300"
                    }`}
                    aria-label={`Bilde ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text content */}
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

        {/* Navigation */}
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
