"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface ScrollHeroProps {
  image: string;
  heading: string;
}

const START_TOP = 90;
const CENTER_TOP = 45;

function HeroImage({ image, heading }: ScrollHeroProps) {
  return <Image src={image} alt={heading} fill className="object-cover object-center" priority sizes="100vw" />;
}

// The image box: on mobile it's 75% of the viewport tall instead of
// stretched to fill the screen — tall enough that object-cover's centered
// crop still shows the room's full height plus most of its width (the
// wall art and both pillows stay in frame), short enough to leave a strip
// of plain paper background below as breathing room before the next
// section, instead of cropping the photo down to a sliver to force full
// coverage. From sm up the box fills its full-height parent exactly as
// before, since screen and photo aspect ratios are already close there.
function ImageBox({ children }: { children: ReactNode }) {
  return <div className="relative w-full h-[75vh] overflow-hidden sm:h-full">{children}</div>;
}

// Static hero — full-width image with the heading overlaid, no scroll-tied
// motion. Used for reduced-motion at every width.
function StaticHero({ image, heading }: ScrollHeroProps) {
  return (
    <section className="w-full bg-paper box-border">
      <div className="relative w-full sm:h-[600px] lg:h-[848px]">
        <ImageBox>
          <HeroImage image={image} heading={heading} />
          <h1 className="absolute inset-x-0 top-[45%] -translate-y-1/2 text-center text-[7vw] sm:text-[4.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
            {heading}
          </h1>
        </ImageBox>
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

  // Text starts low in the image box and rises to its resting spot (slightly
  // above center) during the first 60% of the scroll, then holds still there
  // for the rest of the scroll. Percentages are relative to the image box
  // itself (see ImageBox), not the full screen, so on mobile the motion
  // stays scoped to the photo rather than sweeping through the empty paper
  // space below it.
  const textTop = useTransform(smoothProgress, (v) => {
    const t = Math.min(v / 0.6, 1);
    return `${START_TOP + (CENTER_TOP - START_TOP) * t}%`;
  });

  if (prefersReducedMotion) {
    return <StaticHero image={image} heading={heading} />;
  }

  return (
    // -mt-[70px] cancels the page wrapper's header-clearance padding just for
    // this section, so its natural top already sits at the viewport's top
    // edge at scroll 0 — matching the sticky child's own top-0 pin point
    // exactly. Without it, the section starts 70px below where sticky wants
    // to hold it, and the whole image visibly slides up that 70px before
    // sticky "catches" and the pin actually engages.
    //
    // h-screen (not h-dvh) on both this container and the sticky child below
    // — a static vh-based unit, not one that changes as a mobile browser's
    // address bar collapses. Mixing units here previously meant the address
    // bar auto-hiding shortly after load changed the container's measured
    // height mid-flight, which useScroll read as scroll progress changing on
    // its own — the heading visibly rose without the user touching the
    // screen. A static unit keeps scrollYProgress tied to actual scroll only.
    <section ref={containerRef} className="relative h-[140vh] -mt-[70px]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper">
        {/* pt-[70px] excludes the fixed header's own height from the
            centering math below, so the mobile image box (shorter than the
            screen) sits with equal paper margins above and below it rather
            than touching the header with all the leftover space pushed to
            the bottom. sm:pt-0 sm:block drops this on desktop, where the
            image box already fills the full height exactly as before. */}
        <div className="flex h-full flex-col justify-center pt-[70px] sm:block sm:pt-0">
          <ImageBox>
            <motion.div
              className="relative w-full h-full"
              animate={{ scale: [1, 1.22, 1], x: ["0%", "-6%", "0%"], y: ["0%", "4.5%", "0%"] }}
              transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeroImage image={image} heading={heading} />
            </motion.div>

            <motion.h1
              style={{ top: textTop }}
              className="absolute inset-x-0 z-10 -translate-y-1/2 text-center text-[7vw] sm:text-[4.5vw] leading-[0.95] font-normal text-paper whitespace-pre-line select-none px-4 drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
            >
              {heading}
            </motion.h1>
          </ImageBox>
        </div>
      </div>
    </section>
  );
}
