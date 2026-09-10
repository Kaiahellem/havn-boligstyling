"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, setConsent } from "@/lib/consent";

/**
 * Minimal cookie consent banner gating GA4 (via Consent Mode v2) and Clarity
 * until the visitor makes a choice.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  function handleChoice(choice: "granted" | "denied") {
    setConsent(choice);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Personverninnstillinger"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-sand-400 bg-paper px-6 py-5 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-body-sm font-normal text-ink/80">
          Vi bruker informasjonskapsler for å forstå hvordan nettsiden brukes og forbedre
          opplevelsen. Du kan godta eller avslå dette.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleChoice("denied")}
            className="inline-flex items-center justify-center border border-ink/30 px-6 py-3 text-body-sm font-medium uppercase tracking-[0.05em] text-ink hover:opacity-70 transition-opacity"
          >
            Avslå
          </button>
          <button
            type="button"
            onClick={() => handleChoice("granted")}
            className="inline-flex items-center justify-center border border-ink bg-ink px-6 py-3 text-body-sm font-medium uppercase tracking-[0.05em] text-paper hover:opacity-90 transition-opacity"
          >
            Godta
          </button>
        </div>
      </div>
    </div>
  );
}
