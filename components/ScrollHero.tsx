"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

const START_TOP = 82;
const CENTER_TOP = 45;

// Static hero — full-width image with the heading overlaid, no scroll-tied
// motion. Used for reduced-motion at every width, and as the mobile hero
// outright: the scroll-scrubbed zoom below relies on a tall (200vh) sticky
// section that reads as a cramped, narrow sliver of image on phone-sized
// viewports, so phones get this instead rather than a shrunk-down version
// of the desktop effect.
function StaticHero({ image, heading, className = "" }: ScrollHeroProps & { className?: string }) {
  return (
    <section className={`w-full bg-paper p-6 sm:p-10 lg:p-16 pb-0 box-border ${className}`}>
      <div className="relative h-[520px] sm:h-[600px] lg:h-[848px] w-full">
        <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
        <h1 className="absolute inset-x-0 top-[45%] -translate-y-1/2 text-center text-[8vw] sm:text-[5.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
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

  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
  // Text starts low in the viewport and rises to its resting spot (slightly
  // above center) during the first 30% of the scroll, then holds still there
  // for the rest of the scroll.
  const textTop = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.3, 1);
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

      <section ref={containerRef} className="relative hidden h-[200vh] sm:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper flex items-center justify-center p-10 lg:p-16 box-border">
          <motion.div
            style={{ scale }}
            className="relative z-0 w-full h-full origin-center overflow-hidden"
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: [1, 1.14, 1], x: ["0%", "-3.5%", "0%"], y: ["0%", "2.5%", "0%"] }}
              transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
            </motion.div>
          </motion.div>

          <motion.h1
            style={{ top: textTop }}
            className="absolute inset-x-0 z-10 -translate-y-1/2 text-center text-[8vw] sm:text-[5.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
          >
            {heading}
          </motion.h1>
        </div>
      </section>
    </>
  );
}
