"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/prosjekter", label: "Prosjekter" },
  { href: "/om", label: "Om" },
  { href: "/kontakt", label: "Kontakt" },
];

interface HeaderProps {
  logoUrl?: string | null;
}

export default function Header({ logoUrl }: HeaderProps) {
  const logoSrc = logoUrl ?? "/logo.svg";
  const [logoError, setLogoError] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    if (sideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sideMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1400) {
        setSideMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        role="banner"
        className="sticky top-0 z-50 bg-[#ECE9E3] border-b border-[#e0dfdc]"
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-28">
            <div className="flex-1 flex items-center gap-6">
              <button
                type="button"
                className="p-2 -ml-2 text-havna-800 hover:text-havna-700 min-[1400px]:hidden"
                onClick={() => setSideMenuOpen(true)}
                aria-label="Åpne meny"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-havna-800 hover:text-havna-700 font-medium transition-colors hidden min-[1400px]:block"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
            >
              {logoSrc && !logoError ? (
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt="HAVn Boligstyling logo"
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-havna-200/50 rounded-lg flex items-center justify-center border-2 border-dashed border-havna-300 text-havna-600 text-xs text-center p-1">
                  Logo
                </div>
              )}
            </Link>

            <div className="flex-1 flex items-center justify-end gap-6">
              <Link
                href="/kontakt"
                className="bg-havna-800 text-white px-5 py-2.5 rounded-md hover:bg-havna-700 transition-colors font-medium hidden min-[1400px]:inline-block"
              >
                Bestill befaring
              </Link>
              <div className="w-10 h-10 min-[1400px]:hidden" aria-hidden="true" />
            </div>
          </div>
        </nav>
      </div>

      {sideMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[60] animate-fade-in min-[1400px]:hidden"
            onClick={() => setSideMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-[#ECE9E3] shadow-xl z-[70] flex flex-col animate-slide-in min-[1400px]:hidden"
            role="dialog"
            aria-label="Navigasjonsmeny"
          >
            <div className="flex justify-end p-4 border-b border-[#e0dfdc]">
              <button
                type="button"
                className="p-2 -mr-2 text-havna-800 hover:text-havna-700 transition-colors"
                onClick={() => setSideMenuOpen(false)}
                aria-label="Lukk meny"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-havna-800 hover:text-havna-700 hover:bg-sand-200 rounded-md font-medium transition-colors"
                  onClick={() => setSideMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="mt-4 py-3 px-4 bg-havna-800 text-white rounded-md text-center font-medium hover:bg-havna-700 transition-colors"
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
