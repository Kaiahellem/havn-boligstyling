"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

interface Service {
  title: string;
  body: string;
  slug: string;
  image: string;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
      className="flex flex-col gap-10 sm:flex-row sm:gap-8"
    >
      {services.map(({ title, body, slug, image }) => (
        <motion.div key={title} variants={item} className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-heading-sm font-normal text-ink">{title}</h2>
            <p className="text-body-sm font-normal text-ink/70">{body}</p>
            <Link href={`/tjenester#${slug}`} className="mt-1 w-fit text-body-sm font-medium uppercase text-ink underline underline-offset-[3px]">
              Se tjeneste →
            </Link>
          </div>
          <div className="relative w-full aspect-[3/4]">
            <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
