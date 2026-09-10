import Script from "next/script";

/**
 * Sets up gtag's Consent Mode v2 defaults before any other script runs, so
 * GA4 never fires a "granted" ping before the user has actually consented.
 * Must render with strategy="beforeInteractive" and before GoogleAnalytics /
 * ClarityLoader in the tree. Reads localStorage directly (not lib/consent.ts)
 * because it has to run as a synchronous inline script, not React.
 */
export default function ConsentDefaults() {
  return (
    <Script id="consent-defaults" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){ window.dataLayer.push(arguments); }
        window.gtag = gtag;

        var stored = null;
        try { stored = window.localStorage.getItem("havn_analytics_consent"); } catch (e) {}
        var granted = stored === "granted" ? "granted" : "denied";

        gtag("consent", "default", {
          analytics_storage: granted,
          ad_storage: granted,
          ad_user_data: granted,
          ad_personalization: granted,
          wait_for_update: 500
        });
      `}
    </Script>
  );
}
