import Link from "next/link";

const services = [
  {
    id: "boligstyling",
    title: "Boligstyling",
    description:
      "Vi transformerer boligen din til et hjem som speiler din personlighet. Fra møblering og innredning til farger og detaljer – vi skaper et helhetlig uttrykk som gjør at du føler deg hjemme.",
    highlights: [
      "Møblering og innredning",
      "Fargevalg og materialer",
      "Dekorasjon og detaljer",
      "Helhetlig designkonsept",
    ],
  },
  {
    id: "konsultasjon",
    title: "Konsultasjon",
    description:
      "Trenger du råd uten full boligstyling? Vi tilbyr konsultasjoner der vi går gjennom rom, gir konkrete tips og veileder deg mot det uttrykket du ønsker.",
    highlights: [
      "Rom-for-rom vurdering",
      "Konkrete anbefalinger",
      "Kjøpsveiledning",
      "Farge- og stilråd",
    ],
  },
  {
    id: "utleiestyling",
    title: "Utleiestyling",
    description:
      "Skal du leie ut boligen? Vi stilrer for salg og utleie slik at potensielle leietakere ser verdien. Profesjonelle bilder og et innbydende inntrykk øker interessen betydelig.",
    highlights: [
      "Staging for utleie/salg",
      "Fotovennlig innredning",
      "Maksimalt første inntrykk",
      "Rask gjennomføring",
    ],
  },
];

export default function TjenesterPage() {
  return (
    <div>
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-semibold text-havna-900 mb-4">
            Våre tjenester
          </h1>
          <p className="text-xl text-havna-700">
            Vi tilbyr skreddersydde løsninger for boligstyling, konsultasjon og
            utleie. Uansett behov – vi finner løsningen.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col lg:flex-row gap-10 items-start"
            >
              <div className="lg:w-1/3">
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-havna-800 mb-2">
                  {service.title}
                </h2>
                <div className="w-16 h-1 bg-havna-400 rounded" />
              </div>
              <div className="lg:w-2/3">
                <p className="text-havna-700 mb-6 text-lg leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-havna-600"
                    >
                      <span className="text-havna-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
          <p className="text-havna-700 mb-6">
            Usikker på hva som passer for deg? Vi hjelper deg gjerne med å finne
            ut av det.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-havna-800 text-white px-10 py-4 rounded-md text-lg font-medium hover:bg-havna-700 transition-colors"
          >
            Bestill befaring
          </Link>
        </div>
      </section>
    </div>
  );
}
