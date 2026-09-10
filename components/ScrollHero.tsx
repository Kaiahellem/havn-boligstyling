"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

const START_TOP = 90;
const CENTER_TOP = 45;

// Static hero — full-width image with the heading overlaid, no scroll-tied
// motion. Used for reduced-motion at every width, and as the mobile hero
// outright: the scroll-scrubbed zoom below relies on a tall (200vh) sticky
// section that reads as a cramped, narrow sliver of image on phone-sized
// viewports, so phones get this instead rather than a shrunk-down version
// of the desktop effect.
function StaticHero({ image, heading, className = "" }: ScrollHeroProps & { className?: string }) {
  return (
    <section className={`w-full bg-paper box-border ${className}`}>
      <div className="relative h-[520px] sm:h-[600px] lg:h-[848px] w-full">
        <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
        <h1 className="absolute inset-x-0 top-[45%] -translate-y-1/2 text-center text-[7vw] sm:text-[4.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
          {heading}
        </h1>
      </div>
    </section>
  );
}

export default function ScrollHero({ image, heading }: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Smooths the raw scroll position so the text eases toward each point
  // instead of snapping 1:1 with the wheel/trackpad — a fast flick no
  // longer yanks it straight to its target.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.5,
  });

  // Text starts low in the viewport and rises to its resting spot (slightly
  // above center) during the first 60% of the scroll, then holds still there
  // for the rest of the scroll.
  const textTop = useTransform(smoothProgress, (v) => {
    const t = Math.min(v / 0.6, 1);
    return `${START_TOP + (CENTER_TOP - START_TOP) * t}%`;
  });

  if (prefersReducedMotion) {
    return <StaticHero image={image} heading={heading} />;
  }

  return (
    <>
      {/* Phones get the plain static hero — the scroll-scrub effect below
          needs real vertical scroll distance and screen width to read right. */}
      <StaticHero image={image} heading={heading} className="sm:hidden" />

      {/* -mt-[70px] cancels the page wrapper's header-clearance padding just
          for this section, so its natural top already sits at the viewport's
          top edge at scroll 0 — matching the sticky child's own top-0 pin
          point exactly. Without it, the section starts 70px below where
          sticky wants to hold it, and the whole image visibly slides up
          that 70px before sticky "catches" and the pin actually engages. */}
      <section ref={containerRef} className="relative hidden h-[140vh] sm:block -mt-[70px]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper">
          <motion.div
            className="relative w-full h-full"
            animate={{ scale: [1, 1.22, 1], x: ["0%", "-6%", "0%"], y: ["0%", "4.5%", "0%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt="HAVN Boligstyling interiør"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>

          <motion.h1
            style={{ top: textTop }}
            className="absolute inset-x-0 z-10 -translate-y-1/2 text-center text-[7vw] sm:text-[4.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
          >
            {heading}
          </motion.h1>
        </div>
      </section>
    </>
  );
}
