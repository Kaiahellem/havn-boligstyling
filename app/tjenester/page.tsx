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
    <div className="bg-[#F4F2EF] pt-[70px]">

      {/* Hero — title left, image right */}
      <section className="flex flex-col lg:flex-row border-b border-[#E5E0D8] min-h-[580px]">
        <div className="flex flex-col justify-end flex-1 px-10 sm:px-16 pt-16 pb-14 gap-5 border-b lg:border-b-0 lg:border-r border-[#E5E0D8]">
          <p className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666]">
            Hva vi tilbyr
          </p>
          <h1 className="font-serif text-[clamp(48px,6vw,80px)] text-[#1A1A1A] leading-[1.03]">
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
          <article key={service.id} id={service.id} className="flex flex-col lg:flex-row border-b border-[#E5E0D8]">
            <div className="flex flex-col gap-3 px-10 sm:px-16 py-14 lg:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#E5E0D8]">
              <span className="font-mono text-[13px] font-medium tracking-[1px] text-[#C8B496]">{service.num}</span>
              <h2 className="font-serif text-[36px] text-[#1A1A1A] leading-[1.08]">{service.title}</h2>
            </div>
            <div className="flex-1 px-10 sm:px-16 py-14 flex flex-col gap-8">
              <p className="text-[16px] text-[#4A4A4A] leading-relaxed max-w-2xl">{service.description}</p>
              {service.highlights.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-mono text-[13px] font-medium tracking-[0.5px] text-[#777777]">
                      <span className="w-1 h-1 bg-[#C8B496] shrink-0" />
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
      <section className="flex flex-col sm:flex-row items-stretch bg-[#1E1E1E]">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] text-white leading-[1.08]">
            Usikker på hva som passer for deg?
          </h2>
          <p className="text-[15px] text-[#666666]">Vi hjelper deg gjerne med å finne ut av det.</p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12 sm:border-l border-[#333333]">
          <Link
            href="/kontakt"
            className="inline-block border border-[#E5E0D8] text-white font-mono text-[13px] font-medium tracking-[2px] uppercase px-9 py-[18px] hover:bg-white hover:text-[#1E1E1E] transition-colors duration-200"
          >
            Bestill befaring
          </Link>
        </div>
      </section>

    </div>
  );
}
