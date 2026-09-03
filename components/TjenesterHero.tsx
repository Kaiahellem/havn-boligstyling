"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function TjenesterHero({ label }: { label: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={container} className="flex flex-col">
      <motion.div variants={item} className="flex items-center gap-4 mb-8">
        <span className="h-px w-14 bg-sand-400" aria-hidden="true" />
        <span className="text-body-sm font-medium uppercase tracking-[0.05em] text-ink/50">{label}</span>
      </motion.div>
      <motion.h1 variants={item} className="text-display font-normal text-ink">
        Tjenester
      </motion.h1>
    </motion.div>
  );
}
