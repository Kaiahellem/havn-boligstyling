"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxGalleryProps {
  images: string[];
}

function Column({ images, speed }: { images: string[]; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className="flex flex-1 flex-col gap-4">
      {images.map((src, i) => (
        <div key={i} className="relative w-full aspect-[3/4]">
          <Image
            src={src}
            alt="HAVN Boligstyling interiør"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function ParallaxGallery({ images }: ParallaxGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const columns = [images.slice(0, 2), images.slice(2, 4), images.slice(4, 6)];
  const speeds = [8, -12, 6];

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-col gap-4 px-10 sm:flex-row sm:px-16 py-20 sm:py-28">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-4">
            {col.map((src, j) => (
              <div key={j} className="relative w-full aspect-[3/4]">
                <Image src={src} alt="HAVN Boligstyling interiør" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-10 sm:flex-row sm:px-16 py-32 sm:py-40 overflow-hidden">
      {columns.map((col, i) => (
        <Column key={i} images={col} speed={speeds[i]} />
      ))}
    </div>
  );
}
