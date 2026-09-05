"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Masks the wrapped section so it unrolls downward as it scrolls into view —
// tied directly to scroll position, so it reads as being pulled down from a
// hidden fold behind the hero rather than a timed fade-in. The raw scroll
// progress is run through a spring so the motion has some give instead of
// snapping 1:1 with the scroll wheel.
//
// Skipped on phones: the spring's lag behind the scroll wheel is fine for a
// small, slow-scrolling About block, but with a taller section (the services
// grid) underneath, fast mobile scrolling outruns the spring and the content
// renders still mid-unroll, overlapping the hero above it. Phones get the
// section's own whileInView fade instead — no scroll-position tracking, so
// nothing to outrun.
export function AboutReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setSkip(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 40%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.3,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-100%", "0%"]);

  if (skip) {
    return <div className="relative w-full bg-paper">{children}</div>;
  }

  return (
    // Negative margin matches the hero's own bottom padding (p-6/p-10/p-16),
    // so the reveal starts right at the photo's edge instead of below the
    // empty margin that frames it.
    <div ref={ref} className="relative w-full overflow-hidden bg-paper -mt-6 sm:-mt-10 lg:-mt-16">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
