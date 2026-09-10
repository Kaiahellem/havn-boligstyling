"use client";

import { trackEvent } from "@/lib/analytics";

interface ContactLinksProps {
  epost?: string;
  telefon?: string;
  location: string;
  className?: string;
}

const defaultClassName = "text-body font-normal text-ink/70";

export default function ContactLinks({ epost, telefon, location, className = defaultClassName }: ContactLinksProps) {
  const email = epost ?? "hei@havn.no";
  const phone = telefon ?? "+47 400 00 000";

  return (
    <>
      <a
        href={`mailto:${email}`}
        onClick={() => trackEvent("email_click", { location })}
        className={`w-fit hover:opacity-70 transition-opacity ${className}`}
      >
        {email}
      </a>
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        onClick={() => trackEvent("phone_click", { location })}
        className={`w-fit hover:opacity-70 transition-opacity ${className}`}
      >
        {phone}
      </a>
    </>
  );
}
