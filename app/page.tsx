import Link from "next/link";
import Image from "next/image";
import { getSiteSettings, getTjenester } from "@/sanity/lib/queries";

const tickerItems = ["Boligstyling", "Konsultasjon", "Utleiestyling", "Befaring", "Transformasjon"];

export default async function HomePage() {
  const [s, tjenester] = await Promise.all([getSiteSettings(), getTjenester()]);

  const heroLabel = s.heroLabel ?? "Boligstyling";
  const heroTitle = s.heroTitle ?? "Vi gjør boligen\ndin klar for\nmarkedet.";
  const heroBody = s.heroBody ?? "En stylet bolig skaper det første inntrykket som teller. Vi fremhever boligens styrker og øker sjansen for en bedre budrunde.";
  const heroCta = s.heroCta ?? "Bestill befaring";

  const editorialLabel = s.editorialLabel ?? "Hvorfor boligstyling";
  const editorialTitle = s.editorialTitle ?? "Et bedre\nutgangspunkt\ni budrunden.";
  const editorialBody = s.editorialBody ?? "En stylet bolig skaper det første inntrykket som teller. Vi fremhever boligens styrker, skaper helhet og ro – og øker sjansen for at flest mulig finner seg hjemme allerede under visningen.";
  const editorialQuote = s.editorialQuote ?? "«Vi fikk 15% over prisantydning etter styling med HAVN.»";
  const editorialQuoteAuthor = s.editorialQuoteAuthor ?? "— Anna K., Oslo";

  const stats = s.stats ?? [
    { num: "200+", label: "Prosjekter fullført", desc: "Hvert prosjekt gjennomføres med presisjon og omsorg." },
    { num: "98%", label: "Fornøyde kunder", desc: "Fornøyde kunder er vår beste markedsføring." },
    { num: "15%", label: "Høyere salgspris", desc: "Stylede boliger oppnår gjennomsnittlig høyere salgspris." },
    { num: "30d", label: "Raskere salg", desc: "Kortere tid på markedet med profesjonell styling." },
  ];

  const ctaTitle = s.ctaTitle ?? "Klar for en forandring?";
  const ctaBody = s.ctaBody ?? "La oss hjelpe deg med å presentere boligen din på sitt aller beste.";

  const services = tjenester.length > 0
    ? tjenester.slice(0, 3).map((t, i) => ({
        num: String(i + 1).padStart(2, "0"),
        title: t.title,
        desc: t.description ?? "",
        href: `/tjenester#${t.slug}`,
      }))
    : [
        { num: "01", title: "Boligstyling", desc: "Profesjonell innredning og staging for salg. Vi fremhever boligens beste egenskaper.", href: "/tjenester#boligstyling" },
        { num: "02", title: "Konsultasjon", desc: "Konkrete råd og veiledning for ditt hjem. Personlig tilpasset din situasjon.", href: "/tjenester#konsultasjon" },
        { num: "03", title: "Utleiestyling", desc: "Styling tilpasset korttids- og langtidsutleie. Maksimer verdien av din eiendom.", href: "/tjenester#utleiestyling" },
      ];

  return (
    <div className="bg-[#F4F2EF]">

      {/* ── HERO ── */}
      <section className="flex flex-col lg:flex-row border-b border-[#E5E0D8] min-h-[680px]">
        <div className="flex flex-col justify-between flex-1 px-10 sm:px-16 py-20 gap-6 border-b lg:border-b-0 lg:border-r border-[#E5E0D8]">
          <p className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666]">
            {heroLabel}
          </p>
          <div>
            <h1 className="font-serif text-[clamp(48px,6vw,88px)] leading-[1.05] text-[#1A1A1A] mb-6 whitespace-pre-line">
              {heroTitle}
            </h1>
            <p className="text-[#4A4A4A] text-base leading-relaxed max-w-md mb-8">
              {heroBody}
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-[#1E1E1E] text-white font-mono text-[13px] font-medium tracking-[2px] uppercase px-9 py-[18px] hover:bg-[#333] transition-colors duration-200"
            >
              {heroCta}
            </Link>
          </div>
        </div>
        <div className="relative w-full lg:w-[560px] min-h-[420px] lg:min-h-0 shrink-0">
          <Image
            src={s.heroImage ?? "/prosjektBilde1.jpg"}
            alt="HAVN Boligstyling interiør"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#1E1E1E] border-b border-[#E5E0D8] h-12 overflow-hidden flex items-center">
        <div className="flex animate-ticker whitespace-nowrap w-max">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8">
              <span className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666]">{item}</span>
              <span className="w-1 h-1 bg-[#C8B496] shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="flex flex-col sm:flex-row border-b border-[#E5E0D8]">
        {services.map(({ num, title, desc, href }, i) => (
          <Link
            key={num}
            href={href}
            className={`group flex-1 flex flex-col gap-5 px-10 sm:px-14 py-14 ${i < services.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[#E5E0D8]" : ""}`}
          >
            <span className="font-mono text-[13px] font-medium tracking-[1px] text-[#C8B496]">{num}</span>
            <h2 className="font-serif text-[28px] text-[#1A1A1A]">{title}</h2>
            <p className="text-[14px] text-[#777777] leading-relaxed">{desc}</p>
            <span className="font-mono text-[12px] font-medium tracking-[1px] uppercase text-[#1A1A1A] group-hover:tracking-[3px] transition-all duration-300">
              Les mer →
            </span>
          </Link>
        ))}
      </section>

      {/* ── EDITORIAL BLOCK ── */}
      <section className="flex flex-col lg:flex-row border-b border-[#E5E0D8] min-h-[620px]">
        <div className="relative w-full lg:w-[640px] min-h-[420px] lg:min-h-0 shrink-0">
          <Image
            src={s.editorialImage ?? "/prosjektBilde4.jpg"}
            alt="HAVN Boligstyling prosjekt"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 640px"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 flex-1 px-10 sm:px-16 py-20 border-t lg:border-t-0 lg:border-l border-[#E5E0D8]">
          <p className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666]">
            {editorialLabel}
          </p>
          <h2 className="font-serif text-[clamp(36px,4vw,52px)] text-[#1A1A1A] leading-[1.08] whitespace-pre-line">
            {editorialTitle}
          </h2>
          <p className="text-[15px] text-[#4A4A4A] leading-relaxed max-w-md">
            {editorialBody}
          </p>
          <hr className="w-10 border-[#E5E0D8]" />
          <blockquote className="font-serif italic text-[20px] text-[#4A4A4A] leading-relaxed max-w-sm">
            {editorialQuote}
          </blockquote>
          <p className="font-mono text-[12px] font-medium tracking-[1px] uppercase text-[#777777]">
            {editorialQuoteAuthor}
          </p>
          <Link
            href="/tjenester"
            className="font-mono text-[13px] font-medium tracking-[1px] uppercase text-[#1A1A1A] hover:tracking-[3px] transition-all duration-300 w-fit"
          >
            Se alle tjenestene →
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
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

      {/* ── DARK CTA ── */}
      <section className="flex flex-col sm:flex-row items-stretch bg-[#1E1E1E] border-b border-[#E5E0D8]">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="font-serif text-[clamp(36px,4vw,52px)] text-white leading-[1.05]">
            {ctaTitle}
          </h2>
          <p className="text-[15px] text-[#666666]">
            {ctaBody}
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
