# Analytics

Traffic and funnel tracking for styling.havnbolig.no. Goal: visit → engagement → contact,
not raw pageview counts.

All of this only runs in production (`NODE_ENV=production` — i.e. not `next dev`).

## Stack

- **GA4** — `@next/third-parties/google`'s `<GoogleAnalytics>`, mounted in `app/layout.tsx`.
- **Microsoft Clarity** — session recordings/heatmaps, loaded via `next/script` in
  `components/analytics/ClarityLoader.tsx`.
- **Vercel Analytics + Speed Insights** — `@vercel/analytics` and `@vercel/speed-insights`,
  mounted in `app/layout.tsx`. Requires clicking **Enable** on the Analytics tab in the
  Vercel dashboard after deploy — this isn't something that can be turned on from code.
- **Consent** — a minimal banner (`components/analytics/ConsentBanner.tsx`) gates GA4 (via
  Google Consent Mode v2) and Clarity until the visitor chooses. See "Consent" below.

## Environment variables

| Variable | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `.env.local` + Vercel | GA4 Measurement ID (`G-...`) |
| `NEXT_PUBLIC_CLARITY_ID` | `.env.local` + Vercel | Clarity Project ID |
| `GOOGLE_SITE_VERIFICATION` | `.env.local` + Vercel | Verification code from Search Console's "HTML tag" method (paste just the code value) |

**You must add these to Vercel's Environment Variables (Project Settings → Environment
Variables) for them to work in production** — `.env.local` only applies locally.

## Custom events

Defined via `trackEvent(name, params)` in `lib/analytics.ts`, which calls `window.gtag`
directly. Safe to call anywhere — it's a no-op if GA hasn't loaded (dev mode, consent
denied, script blocked).

| Event | Fired from | When |
|---|---|---|
| `cta_click` | `components/Header.tsx`, `app/prosjekter/ProsjekterGrid.tsx` | "Bestill befaring" (or equivalent) clicked, in header/mobile menu/prosjekter footer |
| `email_click` | `components/ContactLinks.tsx`, `components/Footer.tsx` | Email address clicked (footer, homepage contact section, kontakt page) |
| `phone_click` | `components/ContactLinks.tsx`, `components/Footer.tsx` | Phone number clicked (same locations) |
| `form_submit_attempt` | `components/ContactForm.tsx` | Contact form submitted |
| `form_submit_success` | `components/ContactForm.tsx` | Formspree responded OK |
| `form_submit_error` | `components/ContactForm.tsx` | Formspree errored or the request failed |
| `scroll_depth` | `components/analytics/ScrollDepthTracker.tsx` | Homepage scrolled past 25/50/75/100%, once each per page load |
| `project_image_click` | `app/prosjekter/ProsjekterGrid.tsx` | A project image opened in the lightbox |
| `outbound_click` | `components/analytics/OutboundLinkTracker.tsx` | Any link to an external domain clicked (Instagram, a partner site, etc.) — caught automatically via a delegated click listener, no per-link wiring needed |

All events show up in GA4 under Reports → Engagement → Events (or Realtime while testing).

## Adding a new event

1. Import `trackEvent` from `@/lib/analytics`.
2. Call it in the relevant handler: `trackEvent("my_event_name", { some_param: "value" })`.
3. If the component isn't already a Client Component, add `"use client"` at the top —
   `trackEvent` only does anything in the browser.
4. Add a row to the table above.

Keep event names `snake_case` and params flat (GA4 doesn't do nested objects well).

## Consent

Norway/EU requires consent before analytics runs at full capacity. Implementation:

- `components/analytics/ConsentDefaults.tsx` sets Google Consent Mode v2 to `denied` by
  default (`beforeInteractive`, so it runs before GA4 itself loads), reading any stored
  choice from `localStorage` first.
- `components/analytics/ConsentBanner.tsx` shows a banner until the visitor picks
  "Godta"/"Avslå". The choice is stored in `localStorage` (`havn_analytics_consent`) and
  applied via `gtag('consent', 'update', ...)`.
- `components/analytics/ClarityLoader.tsx` only injects the Clarity script once consent is
  `"granted"` — Clarity has no consent-mode equivalent, so it's simply not loaded until then.
- `lib/consent.ts` holds the shared read/write/hook logic (`getStoredConsent`,
  `setConsent`, `useConsent`).

The banner copy in `ConsentBanner.tsx` is final wording, approved by the site owner.

## Search Console

The verification is wired via Next's built-in `metadata.verification.google` field in
`app/layout.tsx`, sourced from `GOOGLE_SITE_VERIFICATION`. Once that env var is set (locally
and in Vercel) and deployed, verify the property in Search Console using the "HTML tag"
method — it should find the tag automatically.
