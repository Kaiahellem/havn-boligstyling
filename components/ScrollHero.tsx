"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

const START_TOP = 80;
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
  const stickyRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Matches the current hero photo (2400x1600); corrected once the real
  // image loads so the frame always matches its actual proportions instead
  // of a guessed ratio — object-cover then never has to crop anything away,
  // whatever aspect ratio a future CMS-uploaded photo happens to have.
  const [aspect, setAspect] = useState(3 / 2);
  // Pixel size of the photo frame, computed to fit fully inside the padded
  // sticky area (like object-fit: contain) instead of stretching to an
  // arbitrary viewport-shaped box — that stretch is what forced object-cover
  // to crop the photo down before.
  const [frameSize, setFrameSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const compute = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      if (width / height > aspect) {
        setFrameSize({ width: height * aspect, height });
      } else {
        setFrameSize({ width, height: width / aspect });
      }
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  // Text starts low in the viewport and rises to its resting spot (slightly
  // above center) during the first 30% of the scroll, then holds still there
  // for the rest of the scroll.
  const textTop = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v / 0.3, 1);
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

      <section ref={containerRef} className="relative hidden h-[200vh] sm:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper p-3 lg:p-5 box-border">
          <div ref={stickyRef} className="relative w-full h-full flex items-center justify-center">
            <motion.div
              style={{ scale, y: -48, width: frameSize?.width, height: frameSize?.height }}
              className={`relative z-0 origin-center scale-[0.85] overflow-hidden ${frameSize ? "" : "w-full h-full"}`}
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
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth && img.naturalHeight) {
                      setAspect(img.naturalWidth / img.naturalHeight);
                    }
                  }}
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
