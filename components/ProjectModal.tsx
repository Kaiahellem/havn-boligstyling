"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollLock } from "@/lib/useScrollLock";

interface ProjectModalProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectModal({ images, index, onClose, onPrev, onNext }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;

  useScrollLock(isOpen);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const el = modalRef.current;
    if (!el) return;

    const getFocusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

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
  }, [isOpen]);

  if (index === null) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Prosjektbilde"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Stage */}
      <div ref={modalRef} className="relative w-full h-full flex items-center justify-center animate-fade-in">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 z-10 p-2 rounded-full bg-paper/80 hover:bg-paper text-ink transition-colors"
          aria-label="Lukk"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div
          className="relative w-full h-full max-w-5xl max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[index]}
            alt="Prosjektbilde"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/80 hover:bg-paper shadow-md flex items-center justify-center text-ink transition-colors"
              aria-label="Forrige bilde"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/80 hover:bg-paper shadow-md flex items-center justify-center text-ink transition-colors"
              aria-label="Neste bilde"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
