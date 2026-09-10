declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Sends a custom event to GA4 via gtag. Safe to call anywhere (server render,
 * before GA has loaded, consent denied) — it's a no-op unless window.gtag
 * exists. Consent Mode v2 (see lib/consent.ts) handles whether GA actually
 * sends the ping.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
