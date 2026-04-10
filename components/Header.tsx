"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollLock } from "@/lib/useScrollLock";

const navLinks = [
  { href: "/tjenester", label: "TJENESTER" },
  { href: "/prosjekter", label: "PROSJEKTER" },
  { href: "/om", label: "OM" },
  { href: "/kontakt", label: "KONTAKT" },
];

interface HeaderProps {
  logoUrl?: string | null;
}

export default function Header({ logoUrl }: HeaderProps) {
  const pathname = usePathname();
  const logoSrc = logoUrl ?? "/HAVN_BS_kuntekst.svg";
  const [logoError, setLogoError] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useScrollLock(sideMenuOpen);

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
        className="sticky top-0 z-50 bg-[#F4F2EF] border-b border-[#E5E0D8] flex h-[70px] items-stretch"
      >
        {/* Logo zone */}
        <Link
          href="/"
          className="flex items-center px-8 sm:px-10 sm:border-r border-[#E5E0D8] shrink-0 w-[180px] sm:w-[240px]"
        >
          {logoSrc && !logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt="HAVN Boligstyling logo"
              className="h-7 w-auto object-contain object-left"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="font-serif text-[22px] font-bold text-[#1A1A1A] tracking-[2px]">HAVN</span>
          )}
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden min-[1100px]:flex items-stretch flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-10 border-r border-[#E5E0D8] font-mono text-[13px] font-medium tracking-[1px] uppercase transition-colors duration-150 ${
                  isActive ? "text-[#1A1A1A] bg-[#ECEAE6]" : "text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#ECEAE6]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex-1" />
        </nav>

        {/* Mobile spacer */}
        <div className="flex-1 min-[1100px]:hidden" />

        {/* Desktop CTA */}
        <Link
          href="/kontakt"
          className="hidden min-[1100px]:flex items-center justify-center w-[200px] bg-[#1E1E1E] border-l border-[#E5E0D8] font-mono text-[11px] font-medium tracking-[2px] uppercase text-white hover:bg-[#333] transition-colors shrink-0"
        >
          Bestill befaring
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center justify-center w-[70px] sm:border-l border-[#E5E0D8] text-[#1A1A1A] min-[1100px]:hidden"
          onClick={() => setSideMenuOpen(true)}
          aria-label="Åpne meny"
          aria-expanded={sideMenuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {sideMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[60] animate-fade-in min-[1100px]:hidden"
            onClick={() => setSideMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            ref={drawerRef}
            className="fixed top-0 left-0 h-full w-72 bg-[#F4F2EF] z-[70] flex flex-col animate-slide-in min-[1100px]:hidden"
            role="dialog"
            aria-label="Navigasjonsmeny"
            aria-modal="true"
          >
            <div className="flex items-center justify-between h-[70px] px-8 border-b border-[#E5E0D8]">
              <span className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#777777]">Meny</span>
              <button
                type="button"
                className="text-[#1A1A1A]"
                onClick={() => setSideMenuOpen(false)}
                aria-label="Lukk meny"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-8 py-5 border-b border-[#E5E0D8] font-mono text-[13px] font-medium tracking-[1px] uppercase text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#ECEAE6] transition-colors"
                  onClick={() => setSideMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="mx-8 mt-8 flex items-center justify-center bg-[#1E1E1E] font-mono text-[11px] font-medium tracking-[2px] uppercase text-white py-4"
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
