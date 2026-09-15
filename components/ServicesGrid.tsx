"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Service {
  title: string;
  body: string;
  slug: string;
  image: string;
}

// Text and image are separate grid items (not nested in one card box) so
// that all three titles/bodies share row 1 and all three images share row
// 2 at sm+ — a CSS grid row auto-sizes to its tallest item, so the images
// line up at the same y regardless of how many lines each card's text
// wraps to. ROW_START interleaves them back into text-then-image order on
// the single-column mobile layout, where sm:row-start overrides take over.
const ROW_START = ["row-start-1", "row-start-2", "row-start-3", "row-start-4", "row-start-5", "row-start-6"];
const COL_START = ["sm:col-start-1", "sm:col-start-2", "sm:col-start-3"];

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-y-6">
      {services.map(({ title, body, slug }, i) => (
        <motion.div
          key={`${title}-text`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          className={`flex flex-col gap-2.5 ${ROW_START[i * 2]} sm:row-start-1 ${COL_START[i]}`}
        >
          <h2 className="text-heading-sm font-normal text-ink">{title}</h2>
          <p className="text-body-sm font-normal text-ink/70">{body}</p>
          <Link href={`/tjenester#${slug}`} className="group mt-1 inline-flex w-fit items-center gap-1 text-body-sm font-medium text-ink">
            Se tjeneste
            <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      ))}
      {services.map(({ title, image }, i) => (
        <motion.div
          key={`${title}-image`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          className={`relative w-full aspect-[4/3] sm:aspect-[3/4] ${ROW_START[i * 2 + 1]} sm:row-start-2 ${COL_START[i]}`}
        >
          <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
        </motion.div>
      ))}
    </div>
  );
}
