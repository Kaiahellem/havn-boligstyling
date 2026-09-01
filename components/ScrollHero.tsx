"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

// On narrow screens the heading wraps onto two lines, so it needs to start
// higher up — otherwise the taller block spills past the image's bottom edge
// into the page background, where the light text loses contrast.
const START_TOP_NARROW = 72;
const START_TOP_WIDE = 82;
const CENTER_TOP = 45;

export default function ScrollHero({ image, heading }: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
  // Text starts low in the viewport and rises to its resting spot (slightly
  // above center) during the first 30% of the scroll, then holds still there
  // for the rest of the scroll.
  const startTop = isNarrow ? START_TOP_NARROW : START_TOP_WIDE;
  const textTop = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.3, 1);
    return `${startTop + (CENTER_TOP - startTop) * t}%`;
  });

  if (prefersReducedMotion) {
    return (
      <section className="w-full bg-paper p-16 pb-0 box-border">
        <div className="relative h-[600px] lg:h-[848px] w-full">
          <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
          <h1 className="absolute inset-x-0 top-[45%] -translate-y-1/2 text-center text-[8vw] sm:text-[5.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
            {heading}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper flex items-center justify-center p-6 sm:p-10 lg:p-16 box-border">
        <motion.div
          style={{ scale }}
          className="relative z-0 w-full h-full origin-center"
        >
          <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
        </motion.div>

        <motion.h1
          style={{ top: textTop }}
          className="absolute inset-x-0 z-10 -translate-y-1/2 text-center text-[8vw] sm:text-[5.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none pointer-events-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
        >
          {heading}
        </motion.h1>
      </div>
    </section>
  );
}
