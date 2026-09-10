"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const footerLinks = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/prosjekter", label: "Prosjekter" },
  { href: "/om", label: "Om" },
  { href: "/kontakt", label: "Kontakt" },
];

interface FooterProps {
  epost?: string;
  telefon?: string;
}

export default function Footer({ epost, telefon }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-16 sm:py-14">
        {/* Wordmark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/g172.svg" alt="HAVN Boligstyling" className="h-6 sm:h-7 w-auto" />

        {/* Link list */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-sm font-medium uppercase tracking-[0.05em] text-paper hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact + copyright */}
        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${epost ?? "hei@havn.no"}`}
            onClick={() => trackEvent("email_click", { location: "footer" })}
            className="text-body-sm font-normal text-paper/70 hover:opacity-70 transition-opacity w-fit"
          >
            {epost ?? "hei@havn.no"}
          </a>
          <a
            href={`tel:${(telefon ?? "+47 400 00 000").replace(/\s/g, "")}`}
            onClick={() => trackEvent("phone_click", { location: "footer" })}
            className="text-body-sm font-normal text-paper/70 hover:opacity-70 transition-opacity w-fit"
          >
            {telefon ?? "+47 400 00 000"}
          </a>
          <span className="font-sans text-[12px] leading-[1.2] text-paper/50">
            © {currentYear} HAVN Boligstyling
          </span>
        </div>
      </div>
    </footer>
  );
}
