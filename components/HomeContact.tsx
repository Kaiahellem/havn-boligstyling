"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import ContactLinks from "@/components/ContactLinks";

interface HomeContactProps {
  label: string;
  heading: string;
  intro: string;
  epost?: string;
  telefon?: string;
  omrade: string;
  instagramUrl?: string;
  formspreeId: string;
}

export default function HomeContact({
  label,
  heading,
  intro,
  epost,
  telefon,
  omrade,
  instagramUrl,
  formspreeId,
}: HomeContactProps) {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="flex flex-col lg:flex-row lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-10 lg:w-[380px] shrink-0 lg:pr-14 pb-10 lg:pb-0"
        >
          <div className="flex flex-col gap-5">
            <p className="text-body-sm font-medium uppercase text-ink">{label}</p>
            <h2 className="text-heading font-normal text-ink">{heading}</h2>
            <p className="text-body font-normal text-ink/70 max-w-sm">{intro}</p>
          </div>

          <div className="flex flex-col gap-2">
            <ContactLinks epost={epost} telefon={telefon} location="home_contact_section" />
            <span className="text-body font-normal text-ink/70">{omrade}</span>
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

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="flex-1 pt-10 lg:pt-0"
        >
          <ContactForm formspreeId={formspreeId} />
        </motion.div>
      </div>
    </section>
  );
}
