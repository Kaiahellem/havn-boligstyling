"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

/**
 * Loads Microsoft Clarity only after the visitor has granted consent —
 * Clarity has no built-in consent-mode equivalent to GA4's, so we simply
 * don't inject the script until then.
 */
export default function ClarityLoader({ clarityId }: { clarityId: string }) {
  const consent = useConsent();

  if (consent !== "granted") return null;

  return (
    <Script id="clarity-script" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `}
    </Script>
  );
}
