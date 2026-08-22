import Link from "next/link";
import Image from "next/image";
import { getTjenester } from "@/sanity/lib/queries";

const fallback = [
  {
    id: "boligstyling",
    num: "01",
    title: "Boligstyling",
    description: "Vi transformerer boligen din til et hjem som speiler din personlighet. Fra møblering og innredning til farger og detaljer – vi skaper et helhetlig uttrykk som gjør at du føler deg hjemme.",
    highlights: ["Møblering og innredning", "Fargevalg og materialer", "Dekorasjon og detaljer", "Helhetlig designkonsept"],
  },
  {
    id: "konsultasjon",
    num: "02",
    title: "Konsultasjon",
    description: "Trenger du råd uten full boligstyling? Vi tilbyr konsultasjoner der vi går gjennom rom, gir konkrete tips og veileder deg mot det uttrykket du ønsker.",
    highlights: ["Rom-for-rom vurdering", "Konkrete anbefalinger", "Kjøpsveiledning", "Farge- og stilråd"],
  },
  {
    id: "utleiestyling",
    num: "03",
    title: "Utleiestyling",
    description: "Skal du leie ut boligen? Vi stiler for salg og utleie slik at potensielle leietakere ser verdien. Profesjonelle bilder og et innbydende inntrykk øker interessen betydelig.",
    highlights: ["Staging for utleie/salg", "Fotovennlig innredning", "Maksimalt første inntrykk", "Rask gjennomføring"],
  },
];

export default async function TjenesterPage() {
  const data = await getTjenester();

  const heroImage = data[0]?.heroImage ?? "/placeholder.svg";

  const services = data.length > 0
    ? data.map((t, i) => ({
        id: t.slug,
        num: String(i + 1).padStart(2, "0"),
        title: t.title,
        description: t.description ?? "",
        highlights: t.highlights ?? [],
      }))
    : fallback;

  return (
    <div className="bg-paper pt-[70px]">

      {/* Hero — title left, image right */}
      <section className="flex flex-col lg:flex-row border-b border-ink min-h-[580px]">
        <div className="flex flex-col justify-end flex-1 px-10 sm:px-16 pt-16 pb-14 gap-5 border-b lg:border-b-0 lg:border-r border-ink">
          <p className="text-body-sm font-medium uppercase text-ink">
            Hva vi tilbyr
          </p>
          <h1 className="text-display font-normal text-ink">
            Våre tjenester
          </h1>
        </div>
        <div className="relative w-full lg:w-[60%] min-h-[400px] lg:min-h-0 shrink-0">
          <Image
            src={heroImage}
            alt="HAVN Boligstyling interiør"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      </section>

      {/* Services list */}
      <section>
        {services.map((service) => (
          <article key={service.id} id={service.id} className="flex flex-col lg:flex-row border-b border-ink">
            <div className="flex flex-col gap-3 px-10 sm:px-16 py-14 lg:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-ink">
              <span className="text-body-sm font-medium text-ink/60">{service.num}</span>
              <h2 className="text-heading font-normal text-ink leading-[1.1]">{service.title}</h2>
            </div>
            <div className="flex-1 px-10 sm:px-16 py-14 flex flex-col gap-8">
              <p className="text-body font-normal text-ink/70 max-w-2xl">{service.description}</p>
              {service.highlights.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-body-sm font-medium uppercase text-ink/70">
                      <span className="w-1 h-1 bg-ink shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="flex flex-col sm:flex-row items-stretch bg-ink">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="text-heading font-normal text-paper leading-[1.1]">
            Usikker på hva som passer for deg?
          </h2>
          <p className="text-body font-normal text-paper/70">Vi hjelper deg gjerne med å finne ut av det.</p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12 sm:border-l border-paper/20">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg border border-paper px-[18px] py-[10px] text-body font-medium text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            Bestill befaring
          </Link>
        </div>
      </section>

    </div>
  );
}
