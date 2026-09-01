"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

export default function ScrollHero({ image, heading }: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  if (prefersReducedMotion) {
    return (
      <section className="w-full bg-paper p-16 pb-0 box-border">
        <div className="relative h-[600px] lg:h-[848px] w-full">
          <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper flex items-center justify-center">
        <motion.h1
          style={{ opacity: textOpacity }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[13vw] sm:text-[10vw] leading-[0.95] font-normal text-ink/[0.08] whitespace-pre-line select-none pointer-events-none px-4"
        >
          {heading}
        </motion.h1>

        <motion.div
          style={{ scale }}
          className="relative w-full h-full origin-center"
        >
          <Image src={image} alt="HAVN Boligstyling interiør" fill className="object-cover" priority sizes="100vw" />
        </motion.div>
      </div>
    </section>
  );
}
