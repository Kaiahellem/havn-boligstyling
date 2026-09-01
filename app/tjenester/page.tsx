import Link from "next/link";
import Image from "next/image";
import { getTjenester } from "@/sanity/lib/queries";
import { placeholderPhotos } from "@/lib/placeholderPhotos";

const fallback = [
  {
    id: "boligstyling",
    num: "01",
    title: "Boligstyling",
    description: "Vi transformerer boligen din til et hjem som speiler din personlighet. Fra møblering og innredning til farger og detaljer – vi skaper et helhetlig uttrykk som gjør at du føler deg hjemme.",
    highlights: ["Møblering og innredning", "Fargevalg og materialer", "Dekorasjon og detaljer", "Helhetlig designkonsept"],
    heroImage: placeholderPhotos[0],
  },
  {
    id: "konsultasjon",
    num: "02",
    title: "Konsultasjon",
    description: "Trenger du råd uten full boligstyling? Vi tilbyr konsultasjoner der vi går gjennom rom, gir konkrete tips og veileder deg mot det uttrykket du ønsker.",
    highlights: ["Rom-for-rom vurdering", "Konkrete anbefalinger", "Kjøpsveiledning", "Farge- og stilråd"],
    heroImage: placeholderPhotos[1],
  },
  {
    id: "utleiestyling",
    num: "03",
    title: "Utleiestyling",
    description: "Skal du leie ut boligen? Vi stiler for salg og utleie slik at potensielle leietakere ser verdien. Profesjonelle bilder og et innbydende inntrykk øker interessen betydelig.",
    highlights: ["Staging for utleie/salg", "Fotovennlig innredning", "Maksimalt første inntrykk", "Rask gjennomføring"],
    heroImage: placeholderPhotos[2],
  },
];

export default async function TjenesterPage() {
  const data = await getTjenester();

  const heroImage = data[0]?.heroImage ?? placeholderPhotos[3];

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

      {/* Hero — full-width image */}
      <section className="bg-paper p-16 pb-0 box-border">
        <div className="relative w-full min-h-[400px] lg:min-h-[480px]">
          <Image
            src={heroImage}
            alt="HAVN Boligstyling interiør"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Title */}
      <section className="px-10 sm:px-16 pt-12 sm:pt-16">
        <h1 className="text-display font-normal text-ink max-w-2xl">
          Tjenester
        </h1>
        <p className="mt-6 text-body font-normal text-ink/70 max-w-md">
          Vi tilbyr skreddersydd boligstyling, konsultasjon og utleiestyling – slik at boligen din når sitt fulle potensial, enten du skal selge, leie ut eller bare trives bedre hjemme.
        </p>
      </section>

      {/* Services list */}
      <section className="flex flex-col gap-16 sm:gap-20 lg:gap-24 py-16 sm:py-20 lg:py-24">
        {services.map((service, i) => {
          const reversed = i % 2 !== 0;
          return (
            <article
              key={service.id}
              id={service.id}
              className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center lg:items-start gap-10 lg:gap-16 px-10 sm:px-16`}
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
              <div className="flex flex-col gap-3 lg:w-1/2">
                <span className="text-body-sm font-medium text-ink/60">{service.num}</span>
                <h2 className="text-heading font-normal text-ink leading-[1.1]">{service.title}</h2>
                <p className="mt-2 text-body font-normal text-ink/70 max-w-2xl">{service.description}</p>
                {service.highlights.length > 0 && (
                  <ul className="mt-4 grid sm:grid-cols-2 gap-x-12 gap-y-3">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-body-sm font-medium uppercase text-ink/70">
                        <span className="w-1 h-1 bg-ink shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/kontakt"
                  className="mt-4 inline-flex w-fit items-center justify-center bg-ink px-[18px] py-[10px] text-body font-medium text-paper hover:opacity-90 transition-opacity"
                >
                  Ta kontakt
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA */}
      <section className="flex flex-col sm:flex-row items-stretch bg-ink">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="text-heading font-normal text-paper leading-[1.1]">
            Usikker på hva som passer for deg?
          </h2>
          <p className="text-body font-normal text-paper/70">Vi hjelper deg gjerne med å finne ut av det.</p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center bg-paper px-[18px] py-[10px] text-body font-medium text-ink hover:opacity-90 transition-opacity"
          >
            Bestill befaring
          </Link>
        </div>
      </section>

    </div>
  );
}
