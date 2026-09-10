import type { Metadata } from "next";
import Link from "next/link";
import { getTjenester, getTjenesterSide } from "@/sanity/lib/queries";
import { placeholderPhotos } from "@/lib/placeholderPhotos";
import { TjenesterHero } from "@/components/TjenesterHero";
import { TjenesterList } from "@/components/TjenesterList";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tjenester | HAVN Boligstyling",
  description:
    "Fullstyling, delstyling og rådgivning — se hvilke boligstylingstjenester HAVN tilbyr for salg og utleie av bolig.",
  path: "/tjenester",
});

const fallback = [
  {
    id: "fullstyling",
    num: "01",
    title: "Fullstyling",
    description: "Vi tar hele boligen fra A til Å – møblering, farger, tekstiler og detaljer satt sammen til et helhetlig uttrykk som føles gjennomtenkt i hvert eneste rom.",
    highlights: ["Møblering og innredning", "Fargevalg og materialer", "Tekstiler og detaljer", "Helhetlig designkonsept"],
    heroImage: placeholderPhotos[0],
  },
  {
    id: "delstyling",
    num: "02",
    title: "Delstyling",
    description: "Trenger du ikke hele boligen stylet? Vi tar for oss utvalgte rom – stue, soverom eller kjøkken – og gir dem et løft uten at du må gjennom en full prosess.",
    highlights: ["Ett eller flere utvalgte rom", "Rask og fleksibel prosess", "Fotoklar styling for salg/utleie", "Skreddersydd etter budsjett"],
    heroImage: placeholderPhotos[1],
  },
  {
    id: "radgivning",
    num: "03",
    title: "Rådgivning",
    description: "Trenger du råd uten å styles helt? Vi tilbyr rådgivning der vi går gjennom rom, gir konkrete tips og veileder deg mot det uttrykket du ønsker.",
    highlights: ["Rom-for-rom vurdering", "Konkrete anbefalinger", "Kjøpsveiledning", "Farge- og stilråd"],
    heroImage: placeholderPhotos[2],
  },
];

export default async function TjenesterPage() {
  const [data, tjenesterSide] = await Promise.all([getTjenester(), getTjenesterSide()]);

  const ctaHeading = tjenesterSide.cta?.heading ?? "Usikker på hva som passer for deg?";
  const ctaBody = tjenesterSide.cta?.body ?? "Vi hjelper deg gjerne med å finne ut av det.";
  const ctaButtonText = tjenesterSide.cta?.buttonText ?? "Bestill befaring";

  const services = data.length > 0
    ? data.map((t, i) => ({
        id: t.slug,
        num: String(i + 1).padStart(2, "0"),
        title: t.title,
        description: t.description ?? "",
        highlights: t.highlights ?? [],
        heroImage: t.heroImage ?? placeholderPhotos[(i + 3) % placeholderPhotos.length],
      }))
    : fallback;

  return (
    <div className="bg-paper pt-[70px]">

      {/* Hero — air instead of an image, heading carries the page alone */}
      <section className="mx-auto w-full max-w-[1280px] flex flex-col px-6 sm:px-10 lg:px-16 pt-10 sm:pt-16">
        <TjenesterHero label={services.map((s) => s.title).join(" — ")} />
      </section>

      {/* Services list */}
      <TjenesterList services={services} />

      {/* CTA */}
      <section className="bg-paper border-t border-sand-400">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col sm:flex-row items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-3 px-6 sm:px-10 lg:px-16 pt-10 pb-4 sm:py-16">
            <h2 className="text-heading font-normal text-ink leading-[1.1]">
              {ctaHeading}
            </h2>
            <p className="text-body font-normal text-ink/70">{ctaBody}</p>
          </div>
          <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 pt-4 pb-10 sm:py-12">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center border border-ink bg-paper px-8 py-[14px] text-body-sm font-medium uppercase tracking-[0.05em] text-ink hover:opacity-90 transition-opacity"
            >
              {ctaButtonText}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
