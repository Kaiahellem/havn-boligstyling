"use client";

import { useEffect, useState } from "react";

export type ConsentChoice = "granted" | "denied";
export type ConsentState = ConsentChoice | null;

// Keep this in sync with the inline script in components/analytics/ConsentDefaults.tsx
export const CONSENT_STORAGE_KEY = "havn_analytics_consent";
const CONSENT_EVENT = "havn:consent-change";

export function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // localStorage unavailable (private mode, etc.) — consent still applies
    // to this page load via gtag below, just won't persist across visits.
  }

  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  });

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

/** Tracks the current consent choice, updating live when setConsent() is called elsewhere. */
export function useConsent(): ConsentState {
  const [consent, setConsentState] = useState<ConsentState>(null);

  useEffect(() => {
    setConsentState(getStoredConsent());
    const handler = (e: Event) => setConsentState((e as CustomEvent<ConsentChoice>).detail);
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  return consent;
}
