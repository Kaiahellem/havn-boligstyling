"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/** Fires `scroll_depth` once per threshold (25/50/75/100%) per page load. Mount on the homepage only. */
export default function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = (scrollTop / docHeight) * 100;

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackEvent("scroll_depth", { percent: threshold, page: "home" });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
