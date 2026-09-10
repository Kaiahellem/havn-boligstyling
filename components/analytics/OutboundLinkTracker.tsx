"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Delegated click listener that fires `outbound_click` for any link pointing
 * off-site (Instagram, the partner renovation company, etc.) — new outbound
 * links picked up automatically, no per-link wiring needed.
 */
export default function OutboundLinkTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("http")) return;

      try {
        const url = new URL(href);
        if (url.hostname === window.location.hostname) return;
        trackEvent("outbound_click", { url: url.href, domain: url.hostname });
      } catch {
        // Malformed URL — ignore.
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
