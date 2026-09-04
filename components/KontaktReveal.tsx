"use client";

import { motion, type Variants } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

interface KontaktRevealProps {
  formspreeId: string;
  instagramUrl?: string;
}

export function KontaktReveal({ formspreeId, instagramUrl }: KontaktRevealProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="flex flex-col lg:flex-row lg:gap-14"
    >
      <motion.div variants={item} className="flex flex-col justify-between gap-10 lg:w-[380px] shrink-0 lg:pr-14 pb-10 lg:pb-0">
        <div className="flex flex-col gap-5">
          <p className="text-body-sm font-medium uppercase text-ink">Kontakt</p>
          <h1 className="text-heading font-normal text-ink">La oss ta en prat!</h1>
          <p className="text-body font-normal text-ink/70 max-w-sm">
            Ønsker du en befaring eller har du spørsmål? Fyll ut skjemaet, så tar vi
            kontakt så snart vi kan.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-body font-normal text-ink/70">hei@havn.no</span>
          <span className="text-body font-normal text-ink/70">+47 400 00 000</span>
          <span className="text-body font-normal text-ink/70">Oslo, Norge</span>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-fit text-body font-normal text-ink"
            >
              Følg oss på Instagram
            </a>
          )}
        </div>
      </motion.div>

      <motion.div variants={item} className="flex-1 pt-10 lg:pt-0">
        <ContactForm formspreeId={formspreeId} />
      </motion.div>
    </motion.div>
  );
}
