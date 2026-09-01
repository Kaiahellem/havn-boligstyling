"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Masks the "Om meg" section so it unrolls downward as it scrolls into view —
// tied directly to scroll position, so it reads as being pulled down from a
// hidden fold behind the hero rather than a timed fade-in.
export function AboutReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 55%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  return (
    // Negative margin matches the hero's own bottom padding (p-6/p-10/p-16),
    // so the reveal starts right at the photo's edge instead of below the
    // empty margin that frames it.
    <div ref={ref} className="relative w-full overflow-hidden bg-paper -mt-6 sm:-mt-10 lg:-mt-16">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
