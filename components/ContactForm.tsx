"use client";

import { useState } from "react";

interface ContactFormProps {
  formspreeId: string;
}

const inputClass =
  "w-full bg-transparent border-b border-ink/30 focus:border-ink py-3 text-body text-ink placeholder:text-ink/40 outline-none transition-colors duration-200";

export default function ContactForm({ formspreeId }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formspreeId) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!formspreeId) {
    return (
      <div className="p-6 text-body text-ink/70">
        <p className="font-medium mb-1 text-ink">Skjema ikke konfigurert</p>
        <p>
          Legg til{" "}
          <code className="bg-ink/5 px-1">NEXT_PUBLIC_FORMSPREE_ID</code> i{" "}
          <code className="bg-ink/5 px-1">.env.local</code> for å aktivere kontaktskjemaet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-body-sm font-medium uppercase text-ink mb-2">
          Navn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="Ditt navn"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-body-sm font-medium uppercase text-ink mb-2">
          E-post
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputClass}
          placeholder="din@epost.no"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-body-sm font-medium uppercase text-ink mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={inputClass}
          placeholder="+47 xxx xx xxx"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-body-sm font-medium uppercase text-ink mb-2">
          Melding
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-none`}
          placeholder="Fortell oss om prosjektet ditt eller still spørsmål..."
        />
      </div>

      {status === "success" && (
        <p className="text-body-sm text-ink border-l border-ink pl-4">
          Takk for meldingen! Vi tar kontakt så snart vi kan.
        </p>
      )}
      {status === "error" && (
        <p className="text-body-sm text-ink border-l border-ink pl-4">
          Noe gikk galt. Prøv igjen eller ta kontakt på e-post.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center border border-ink bg-paper px-8 py-[14px] text-body-sm font-medium uppercase tracking-[0.05em] text-ink hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {status === "submitting" ? "Sender..." : "Send melding"}
      </button>
    </form>
  );
}
