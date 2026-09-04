"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

interface OmIntroProps {
  portraitImage: string;
  bio1: string;
  bio2: string;
}

export function OmIntro({ portraitImage, bio1, bio2 }: OmIntroProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-24 w-full"
    >
      <motion.div variants={item} className="relative w-full lg:w-[280px] aspect-[460/552] lg:aspect-auto shrink-0">
        <Image
          src={portraitImage}
          alt="Martine Gullord Engebråten"
          fill
          className="object-cover grayscale"
          sizes="(max-width: 1024px) 100vw, 280px"
        />
      </motion.div>
      <motion.div variants={item} className="flex flex-col gap-5 max-w-[500px]">
        <p className="text-caption font-medium uppercase text-ink/50">Gründer og interiørstylist</p>
        <h2 className="text-heading font-normal text-ink whitespace-nowrap">Martine Gullord Engebråten</h2>
        <p className="text-body font-normal text-ink/70">{bio1}</p>
        <p className="text-body font-normal text-ink/70">{bio2}</p>
      </motion.div>
    </motion.div>
  );
}
