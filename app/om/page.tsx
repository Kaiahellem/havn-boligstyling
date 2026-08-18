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
  const quote = d.quote ??"«Vi startet HAVN fordi vi tror at et godt hjem er utgangspunktet for alt annet – uansett størrelse eller budsjett.»";
  const quoteAuthor = d.quoteAuthor ?? "— Grunnlegger, HAVN Boligstyling";
  const bodyText1 = d.bodyText1 ?? "HAVN Boligstyling ble startet med en enkel visjon: å hjelpe folk å skape hjem som speiler hvem de er. Vi tror på at hvert rom har potensial til å bli et sted du virkelig trives – uansett størrelse eller budsjett.";
  const bodyText2 = d.bodyText2 ?? "Med erfaring fra boligstyling, innredning og salg/utleie, kombinerer vi estetikk med funksjon for å levere resultater du blir fornøyd med.";
  const values = d.values?.length ? d.values : fallbackValues;
  const stats = d.stats?.length ? d.stats : fallbackStats;

  return (
    <div className="bg-[#F4F2EF] pt-[70px]">

      {/* Hero — quote + image */}
      <section className="flex flex-col lg:flex-row border-b border-[#E5E0D8] min-h-[500px]">
        <div className="flex flex-col justify-center flex-1 px-10 sm:px-16 py-16 gap-6 border-b lg:border-b-0 lg:border-r border-[#E5E0D8]">
          <blockquote className="font-serif italic text-[clamp(22px,2.8vw,34px)] text-[#1A1A1A] leading-[1.25]">
            {quote}
          </blockquote>
          <p className="font-mono text-[12px] font-medium tracking-[1px] uppercase text-[#777777]">
            {quoteAuthor}
          </p>
        </div>
        <div className="relative w-full lg:w-[560px] min-h-[360px] lg:min-h-0 shrink-0">
          <Image src={heroImage} alt="HAVN Boligstyling" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 560px" />
        </div>
      </section>

      {/* Values */}
      <section className="flex flex-col sm:flex-row border-b border-[#E5E0D8]">
        <div className="px-10 sm:px-16 py-14 border-b sm:border-b-0 sm:border-r border-[#E5E0D8] sm:w-[260px] shrink-0 flex items-start">
          <p className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666]">Våre verdier</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-1">
          {values.map(({ title, desc }, i) => (
            <div key={title} className={`flex-1 flex flex-col gap-4 px-10 sm:px-14 py-14 ${i < values.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[#E5E0D8]" : ""}`}>
              <h3 className="font-serif text-[24px] text-[#1A1A1A]">{title}</h3>
              <p className="text-[14px] text-[#777777] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About text + image */}
      <section className="flex flex-col lg:flex-row border-b border-[#E5E0D8] min-h-[540px]">
        <div className="relative w-full lg:w-[520px] min-h-[380px] lg:min-h-0 shrink-0 order-last lg:order-first">
          <Image src={aboutImage} alt="HAVN Boligstyling prosjekt" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" />
        </div>
        <div className="flex flex-col justify-center gap-6 flex-1 px-10 sm:px-16 py-16 border-t lg:border-t-0 lg:border-l border-[#E5E0D8]">
          <p className="text-[16px] text-[#4A4A4A] leading-relaxed">{bodyText1}</p>
          <p className="text-[16px] text-[#4A4A4A] leading-relaxed">{bodyText2}</p>
          <Link
            href="/kontakt"
            className="inline-block bg-[#1E1E1E] text-white font-mono text-[13px] font-medium tracking-[2px] uppercase px-9 py-[18px] w-fit hover:bg-[#333] transition-colors duration-200"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="flex flex-col sm:flex-row border-b border-[#E5E0D8]">
        {stats.map(({ num, label, desc }, i) => (
          <div
            key={num}
            className={`flex-1 flex flex-col gap-4 px-10 sm:px-14 py-14 ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[#E5E0D8]" : ""}`}
          >
            <span className="font-serif text-[64px] italic text-[#C8B496] leading-none">{num}</span>
            <span className="font-mono text-[13px] font-medium tracking-[1px] uppercase text-[#777777]">{label}</span>
            <p className="text-[14px] text-[#777777] leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Dark CTA */}
      <section className="flex flex-col sm:flex-row items-stretch bg-[#1E1E1E]">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="font-serif text-[clamp(36px,4vw,52px)] text-white leading-[1.05]">
            Klar for en forandring?
          </h2>
          <p className="text-[15px] text-[#666666]">
            La oss hjelpe deg med å presentere boligen din på sitt aller beste.
          </p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12 sm:border-l border-[#333333]">
          <Link
            href="/kontakt"
            className="inline-block border border-[#E5E0D8] text-white font-mono text-[13px] font-medium tracking-[2px] uppercase px-9 py-[18px] hover:bg-white hover:text-[#1E1E1E] transition-colors duration-200"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

    </div>
  );
}
