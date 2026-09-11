"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export interface GalleryTile {
  src: string;
  aspect: string;
  num: string;
  stepLabel: string;
  stepBody: string;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function OmGallery({ columns }: { columns: GalleryTile[][] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className="flex flex-col sm:flex-row gap-4"
    >
      {columns.map((column, ci) => (
        <div key={ci} className="flex flex-1 flex-col gap-8">
          {column.map((tile, ti) => (
            <motion.div key={ti} variants={item} className="flex flex-col gap-3">
              <div className={`relative w-full ${tile.aspect}`}>
                <Image
                  src={tile.src}
                  alt={tile.stepLabel || "HAVN Boligstyling interiør"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <span className="absolute top-4 right-4 text-heading-sm font-medium text-paper">{tile.num}</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-body-sm font-medium uppercase tracking-[0.05em] text-ink">{tile.stepLabel}</p>
                <p className="text-body-sm font-normal text-ink/60">{tile.stepBody}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
