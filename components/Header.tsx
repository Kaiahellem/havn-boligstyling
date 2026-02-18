"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const leftNavLinks = [
  
  { href: "/tjenester", label: "TJENESTER" },
  { href: "/prosjekter", label: "PROSJEKTER" },
];
const rightNavLinks = [
  { href: "/om", label: "OM" },
  { href: "/kontakt", label: "KONTAKT" },
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
      if (window.innerWidth >= 1100) {
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
        className="sticky top-0 z-50 bg-[#f3f1ed] border-b border-[#f3f1ed]"
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-28">
            <div className="flex-1 flex items-center gap-16">
              <button
                type="button"
                className="p-2 -ml-2 text-havna-800 hover:text-havna-700 min-[1100px]:hidden"
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
              {leftNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-havna-800 hover:text-havna-700 font-medium transition-colors hidden min-[1100px]:block"
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
                    alt="HAVN Boligstyling logo"
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

            <div className="flex-1 flex items-center justify-end gap-20">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-havna-800 hover:text-havna-700 font-medium transition-colors hidden min-[1100px]:block"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-havna-800 hover:text-havna-700 transition-colors p-1"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <div className="w-10 h-10 min-[1100px]:hidden" aria-hidden="true" />
            </div>
          </div>
        </nav>
      </div>

      {sideMenuOpen && (
        <>
          <aside
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-[#ECE9E3] shadow-xl z-[70] flex flex-col animate-slide-in min-[1100px]:hidden"
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
              {[...leftNavLinks, ...rightNavLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-havna-800 hover:text-havna-700 hover:bg-sand-200 rounded-md font-medium transition-colors"
                  onClick={() => setSideMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
             
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
