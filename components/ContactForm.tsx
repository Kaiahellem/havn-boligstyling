"use client";

import { useState } from "react";

interface ContactFormProps {
  formspreeId: string;
}

const inputClass =
  "w-full bg-transparent border-b border-havna-200 focus:border-havna-800 py-3 text-havna-900 placeholder:text-havna-400 outline-none transition-colors duration-200";

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
      <div className="border border-havna-200 p-6 text-havna-600 text-sm">
        <p className="font-medium mb-1 text-havna-800">Skjema ikke konfigurert</p>
        <p>
          Legg til{" "}
          <code className="bg-havna-100 px-1">NEXT_PUBLIC_FORMSPREE_ID</code> i{" "}
          <code className="bg-havna-100 px-1">.env.local</code> for å aktivere kontaktskjemaet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-xs font-bold tracking-[0.15em] uppercase text-havna-500 mb-2">
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
        <label htmlFor="email" className="block text-xs font-bold tracking-[0.15em] uppercase text-havna-500 mb-2">
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
        <label htmlFor="phone" className="block text-xs font-bold tracking-[0.15em] uppercase text-havna-500 mb-2">
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
        <label htmlFor="message" className="block text-xs font-bold tracking-[0.15em] uppercase text-havna-500 mb-2">
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
        <p className="text-sm text-havna-700 border-l-2 border-havna-400 pl-4">
          Takk for meldingen! Vi tar kontakt så snart vi kan.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-havna-700 border-l-2 border-red-400 pl-4">
          Noe gikk galt. Prøv igjen eller ta kontakt på e-post.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-havna-900 text-sand-100 py-4 text-sm font-bold tracking-widest uppercase hover:bg-havna-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {status === "submitting" ? "Sender..." : "Send melding"}
      </button>
    </form>
  );
}
