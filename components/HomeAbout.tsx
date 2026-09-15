"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HomeAboutProps {
  aboutImage: string;
  name: string;
  bodyText1: string;
  bodyText2: string;
}

export default function HomeAbout({ aboutImage, name, bodyText1, bodyText2 }: HomeAboutProps) {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
      <div className="flex flex-col sm:flex-row items-start justify-center gap-8 sm:gap-12 lg:gap-16 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-36 sm:w-48 lg:w-60 aspect-[4/5] shrink-0"
        >
          <Image
            src={aboutImage}
            alt={name}
            fill
            className="object-cover grayscale"
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 192px, 240px"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="flex flex-col gap-5 max-w-md"
        >
          <h2 className="text-heading font-normal text-ink">Om meg</h2>
          <p className="text-body font-normal text-ink">{bodyText1}</p>
          <p className="text-body font-normal text-ink">{bodyText2}</p>
          <Link href="/om" className="group w-fit inline-flex items-center gap-1 text-body font-normal text-ink">
            Les mer om hvordan jeg jobber
            <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
