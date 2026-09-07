"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

const START_TOP = 90;
const CENTER_TOP = 45;
// Wide-banner shape for the hero frame — lower and wider than the source
// photo's own 3:2, so object-cover trims a bit off the top/bottom.
const FRAME_ASPECT = 16 / 9;

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
  const stickyRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Pixel size of the photo frame, computed to fit fully inside the padded
  // sticky area (like object-fit: contain) at a fixed wide-banner ratio,
  // rather than stretching to whatever shape the viewport happens to leave —
  // that stretch is what forced object-cover to crop unpredictably before.
  const [frameSize, setFrameSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const compute = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      if (width / height > FRAME_ASPECT) {
        setFrameSize({ width: height * FRAME_ASPECT, height });
      } else {
        setFrameSize({ width, height: width / FRAME_ASPECT });
      }
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text starts low in the viewport and rises to its resting spot (slightly
  // above center) during the first 60% of the scroll, then holds still there
  // for the rest of the scroll.
  const textTop = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.6, 1);
    // -48px matches the photo frame's own upward shift below, so the
    // heading stays locked to the same spot on the image.
    return `calc(${START_TOP + (CENTER_TOP - START_TOP) * t}% - 48px)`;
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
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper p-1.5 lg:p-2 box-border">
          <div ref={stickyRef} className="relative w-full h-full flex items-center justify-center">
            <motion.div
              style={{ y: -48, width: frameSize?.width, height: frameSize?.height }}
              className={`relative z-0 origin-center overflow-hidden ${frameSize ? "" : "w-full h-full"}`}
            >
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
            </motion.div>

            <motion.h1
              style={{ top: textTop }}
              className="absolute inset-x-0 z-10 -translate-y-1/2 text-center text-[8vw] sm:text-[5.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
            >
              {heading}
            </motion.h1>
          </div>
        </div>
      </section>
    </>
  );
}
