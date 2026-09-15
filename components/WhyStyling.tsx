"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Reason {
  title?: string;
  body?: string;
}

interface WhyStylingProps {
  label: string;
  heading: string;
  intro: string;
  reasons: Reason[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyStyling({ label, heading, intro, reasons }: WhyStylingProps) {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pt-8 pb-4 sm:px-10 sm:pt-10 sm:pb-5 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 lg:w-[380px] shrink-0"
        >
          <p className="text-body-sm font-medium uppercase text-ink">{label}</p>
          <h2 className="text-heading font-normal text-ink">{heading}</h2>
          <p className="text-body font-normal text-ink/70 max-w-md">{intro}</p>
        </motion.div>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-3 flex-1 lg:mt-[38px]">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title ?? i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className="flex flex-col gap-2.5"
            >
              <h3 className="text-heading-sm font-normal text-ink">{reason.title}</h3>
              <p className="text-body-sm font-normal text-ink/70">{reason.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Link href="/prosjekter" className="group mt-12 inline-flex w-fit items-center gap-1 text-body font-normal text-ink">
        Se våre prosjekter
        <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
          →
        </span>
      </Link>
    </section>
  );
}
