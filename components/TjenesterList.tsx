"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  highlights: string[];
  heroImage: string;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function TjenesterList({ services }: { services: Service[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className="flex flex-col gap-16 sm:gap-20 lg:gap-24 pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24"
    >
      {services.map((service, i) => {
        const reversed = i % 2 !== 0;
        return (
          <motion.article
            key={service.id}
            id={service.id}
            variants={item}
            className={`mx-auto w-full max-w-[1280px] flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center lg:items-start gap-10 lg:gap-16 px-6 sm:px-10 lg:px-16`}
          >
            <div className="relative w-full lg:w-1/2 aspect-[4/3] shrink-0">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col lg:w-1/2">
              <span className="text-body-sm font-medium text-ink/60">{service.num}</span>
              <h2 className="mt-2 text-heading font-normal text-ink leading-[1.1]">{service.title}</h2>
              <p className="mt-3 text-body font-normal text-ink/70 max-w-2xl">{service.description}</p>
              {service.highlights.length > 0 && (
                <ul className="mt-9 grid sm:grid-cols-2 gap-x-12 gap-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-body-sm font-medium uppercase text-ink/70">
                      <span className="w-1 h-1 bg-ink shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/prosjekter?tjeneste=${service.id}`}
                className="mt-9 w-fit text-body-sm font-normal text-ink/70 hover:text-ink transition-colors"
              >
                Se {service.title.toLowerCase()}-prosjekter →
              </Link>
            </div>
          </motion.article>
        );
      })}
    </motion.section>
  );
}
