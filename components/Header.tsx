"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollLock } from "@/lib/useScrollLock";

const navLinks = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/prosjekter", label: "Prosjekter" },
  { href: "/om", label: "Om" },
  { href: "/kontakt", label: "Kontakt" },
];

interface HeaderProps {
  logoUrl?: string | null;
}

export default function Header({ logoUrl }: HeaderProps) {
  const pathname = usePathname();
  const logoSrc = logoUrl ?? "/HAVN_BS_kuntekst.svg";
  const [logoError, setLogoError] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useScrollLock(sideMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1100) {
        setSideMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus trap for drawer
  useEffect(() => {
    if (!sideMenuOpen) return;
    const el = drawerRef.current;
    if (!el) return;

    const getFocusables = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

    getFocusables()[0]?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSideMenuOpen(false);
        return;
      }
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

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [sideMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-50 flex h-[70px] items-center px-6 sm:px-10 lg:px-16 transition-colors duration-200 ${
          scrolled ? "bg-paper" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
          {/* Desktop nav links */}
          <nav className="hidden min-[1100px]:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-subheading font-medium uppercase text-ink transition-opacity hover:opacity-60 ${
                    isActive ? "underline underline-offset-[3px] decoration-ink" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger (left, mirrors desktop nav position) */}
          <button
            type="button"
            className="flex items-center justify-center text-ink min-[1100px]:hidden"
            onClick={() => setSideMenuOpen(true)}
            aria-label="Åpne meny"
            aria-expanded={sideMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Wordmark — right */}
          <Link href="/" className="flex items-center">
            {logoSrc && !logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSrc}
                alt="HAVN Boligstyling logo"
                className="h-5 sm:h-6 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-heading font-medium text-ink">HAVN</span>
            )}
          </Link>
        </div>
      </header>

      {sideMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-ink/40 z-[60] animate-fade-in min-[1100px]:hidden"
            onClick={() => setSideMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            ref={drawerRef}
            className="fixed top-0 left-0 h-full w-72 bg-paper z-[70] flex flex-col animate-slide-in min-[1100px]:hidden"
            role="dialog"
            aria-label="Navigasjonsmeny"
            aria-modal="true"
          >
            <div className="flex items-center justify-between h-[70px] px-6 border-b border-ink">
              <span className="text-body-sm font-medium uppercase text-ink">Meny</span>
              <button
                type="button"
                className="text-ink"
                onClick={() => setSideMenuOpen(false)}
                aria-label="Lukk meny"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-subheading font-medium uppercase text-ink hover:opacity-60 transition-opacity"
                  onClick={() => setSideMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="mt-5 inline-flex items-center justify-center rounded-lg border border-ink px-[18px] py-[10px] text-body font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
                onClick={() => setSideMenuOpen(false)}
              >
                Bestill befaring
              </Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
