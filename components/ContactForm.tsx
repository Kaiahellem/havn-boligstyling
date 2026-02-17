"use client";

import { useState } from "react";

interface ContactFormProps {
  formspreeId: string;
}

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
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-800">
        <p className="font-medium mb-2">Skjema ikke konfigurert</p>
        <p className="text-sm">
          Legg til Formspree ID i <code className="bg-amber-100 px-1 rounded">.env.local</code> som{" "}
          <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_FORMSPREE_ID</code> for å aktivere
          kontaktskjemaet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-havna-700 mb-2">
          Navn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg border border-sand-300 focus:ring-2 focus:ring-havna-700 focus:border-havna-700 outline-none transition-colors"
          placeholder="Ditt navn"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-havna-700 mb-2">
          E-post
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-sand-300 focus:ring-2 focus:ring-havna-700 focus:border-havna-700 outline-none transition-colors"
          placeholder="din@epost.no"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-havna-700 mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 rounded-lg border border-sand-300 focus:ring-2 focus:ring-havna-700 focus:border-havna-700 outline-none transition-colors"
          placeholder="+47 xxx xx xxx"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-havna-700 mb-2">
          Melding
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg border border-sand-300 focus:ring-2 focus:ring-havna-700 focus:border-havna-700 outline-none transition-colors resize-none"
          placeholder="Fortell oss om prosjektet ditt eller still spørsmål..."
        />
      </div>

      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Takk for meldingen! Vi tar kontakt så snart vi kan.
        </div>
      )}
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          Noe gikk galt. Prøv igjen eller ta kontakt på e-post.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-havna-800 text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-havna-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
      >
        {status === "submitting" ? "Sender..." : "Send melding"}
      </button>
    </form>
  );
}
