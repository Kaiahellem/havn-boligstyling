import Image from "next/image";
import Link from "next/link";
import { getOmOss } from "@/sanity/lib/queries";

const fallbackValues = [
  { title: "Helhet", desc: "Vi ser hele rommet, ikke bare enkeltdetaljer. Hvert valg henger sammen." },
  { title: "Enkelhet", desc: "Det beste resultatet kommer fra å fjerne det som ikke tilhører – ikke å legge til mer." },
  { title: "Funksjon", desc: "Estetikk uten funksjon holder ikke. Vi designer rom du faktisk bor i." },
];

const fallbackStats = [
  { num: "200+", label: "Prosjekter fullført", desc: "Hvert prosjekt gjennomføres med presisjon og omsorg." },
  { num: "98%", label: "Fornøyde kunder", desc: "Fornøyde kunder er vår beste markedsføring." },
  { num: "15%", label: "Høyere salgspris", desc: "Stylede boliger oppnår gjennomsnittlig høyere salgspris." },
];

export default async function OmPage() {
  const d = await getOmOss();

  const heroImage = d.heroImage ?? "/placeholder.svg";
  const aboutImage = d.aboutImage ?? "/placeholder.svg";
  const quote = d.quote ?? "«Vi startet HAVN fordi vi tror at et godt hjem er utgangspunktet for alt annet – uansett størrelse eller budsjett.»";
  const quoteAuthor = d.quoteAuthor ?? "— Grunnlegger, HAVN Boligstyling";
  const bodyText1 = d.bodyText1 ?? "HAVN Boligstyling ble startet med en enkel visjon: å hjelpe folk å skape hjem som speiler hvem de er. Vi tror på at hvert rom har potensial til å bli et sted du virkelig trives – uansett størrelse eller budsjett.";
  const bodyText2 = d.bodyText2 ?? "Med erfaring fra boligstyling, innredning og salg/utleie, kombinerer vi estetikk med funksjon for å levere resultater du blir fornøyd med.";
  const values = d.values?.length ? d.values : fallbackValues;
  const stats = d.stats?.length ? d.stats : fallbackStats;

  return (
    <div className="bg-paper pt-[70px]">

      {/* Hero — quote + image */}
      <section className="flex flex-col lg:flex-row border-b border-ink min-h-[500px]">
        <div className="flex flex-col justify-center flex-1 px-10 sm:px-16 py-16 gap-6 border-b lg:border-b-0 lg:border-r border-ink">
          <blockquote className="text-heading font-normal text-ink leading-[1.2]">
            {quote}
          </blockquote>
          <p className="text-body-sm font-medium uppercase text-ink/60">
            {quoteAuthor}
          </p>
        </div>
        <div className="relative w-full lg:w-[560px] min-h-[360px] lg:min-h-0 shrink-0">
          <Image src={heroImage} alt="HAVN Boligstyling" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 560px" />
        </div>
      </section>

      {/* Values */}
      <section className="flex flex-col sm:flex-row border-b border-ink">
        <div className="px-10 sm:px-16 py-14 border-b sm:border-b-0 sm:border-r border-ink sm:w-[260px] shrink-0 flex items-start">
          <p className="text-body-sm font-medium uppercase text-ink">Våre verdier</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-1">
          {values.map(({ title, desc }, i) => (
            <div key={title} className={`flex-1 flex flex-col gap-4 px-10 sm:px-14 py-14 ${i < values.length - 1 ? "border-b sm:border-b-0 sm:border-r border-ink" : ""}`}>
              <h3 className="text-heading-sm font-normal text-ink">{title}</h3>
              <p className="text-body font-normal text-ink/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About text + image */}
      <section className="flex flex-col lg:flex-row border-b border-ink min-h-[540px]">
        <div className="relative w-full lg:w-[520px] min-h-[380px] lg:min-h-0 shrink-0 order-last lg:order-first">
          <Image src={aboutImage} alt="HAVN Boligstyling prosjekt" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" />
        </div>
        <div className="flex flex-col justify-center gap-6 flex-1 px-10 sm:px-16 py-16 border-t lg:border-t-0 lg:border-l border-ink">
          <p className="text-body font-normal text-ink">{bodyText1}</p>
          <p className="text-body font-normal text-ink">{bodyText2}</p>
          <Link
            href="/kontakt"
            className="inline-flex w-fit items-center justify-center rounded-lg border border-ink px-[18px] py-[10px] text-body font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="flex flex-col sm:flex-row border-b border-ink">
        {stats.map(({ num, label, desc }, i) => (
          <div
            key={num}
            className={`flex-1 flex flex-col gap-4 px-10 sm:px-14 py-14 ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-ink" : ""}`}
          >
            <span className="text-heading-sm font-medium text-ink">{num}</span>
            <span className="text-body-sm font-medium uppercase text-ink">{label}</span>
            <p className="text-body-sm font-normal text-ink/70">{desc}</p>
          </div>
        ))}
      </section>

      {/* Dark CTA */}
      <section className="flex flex-col sm:flex-row items-stretch bg-ink">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="text-heading font-normal text-paper leading-[1.1]">
            Klar for en forandring?
          </h2>
          <p className="text-body font-normal text-paper/70">
            La oss hjelpe deg med å presentere boligen din på sitt aller beste.
          </p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12 sm:border-l border-paper/20">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center rounded-lg border border-paper px-[18px] py-[10px] text-body font-medium text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

    </div>
  );
}
