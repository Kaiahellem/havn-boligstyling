import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings, getOmOss, getProjects } from "@/sanity/lib/queries";

export default async function HomePage() {
  const [s, om, projects] = await Promise.all([getSiteSettings(), getOmOss(), getProjects()]);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  const heroLabel = s.heroLabel ?? "Boligstyling";
  const heroTitle = s.heroTitle ?? "Vi gjør boligen\ndin klar for\nmarkedet.";
  const heroBody = s.heroBody ?? "En stylet bolig skaper det første inntrykket som teller. Vi fremhever boligens styrker og øker sjansen for en bedre budrunde.";
  const heroCta = s.heroCta ?? "Bestill befaring";

  const aboutImage = om.aboutImage ?? "/placeholder.svg";
  const bodyText1 = om.bodyText1 ?? "HAVN Boligstyling ble startet med en enkel visjon: å hjelpe folk å skape hjem som speiler hvem de er. Vi tror på at hvert rom har potensial til å bli et sted du virkelig trives – uansett størrelse eller budsjett.";
  const bodyText2 = om.bodyText2 ?? "Med erfaring fra boligstyling, innredning og salg/utleie, kombinerer vi estetikk med funksjon for å levere resultater du blir fornøyd med.";
  const stats = om.stats?.length
    ? om.stats
    : [
        { num: "200+", label: "Prosjekter", desc: "Fullført med presisjon og omsorg." },
        { num: "98%", label: "Fornøyde kunder", desc: "Vår beste markedsføring." },
        { num: "15%", label: "Høyere salgspris", desc: "I snitt for stylede boliger." },
      ];

  const workSamples = projects.length > 0
    ? projects.slice(0, 4)
    : [
        { _id: "1", title: "Villa Bygdøy", image: "/placeholder.svg", description: "Full boligstyling før salg.", service: "Boligstyling" },
        { _id: "2", title: "Leilighet Grünerløkka", image: "/placeholder.svg", description: "Konsultasjon og møblering.", service: "Konsultasjon" },
        { _id: "3", title: "Utleiebolig Frogner", image: "/placeholder.svg", description: "Styling for korttidsutleie.", service: "Utleiestyling" },
        { _id: "4", title: "Rekkehus Nordstrand", image: "/placeholder.svg", description: "Full boligstyling før salg.", service: "Boligstyling" },
      ];

  return (
    <div className="bg-paper">

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[560px] w-full">
        <Image
          src={s.heroImage ?? "/placeholder.svg"}
          alt="HAVN Boligstyling interiør"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/15 to-transparent" />
        <div className="absolute bottom-0 left-0 flex max-w-xl flex-col gap-5 p-6 pb-24 sm:p-10 sm:pb-32 lg:p-16 lg:pb-36 [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
          <p className="text-body-sm font-medium uppercase text-paper">{heroLabel}</p>
          <h1 className="text-display font-normal text-paper whitespace-nowrap">{heroTitle}</h1>
          <p className="text-[18px] leading-[1.55] font-normal text-paper/90 max-w-md">{heroBody}</p>
          <Link
            href="/kontakt"
            className="inline-flex w-fit items-center justify-center rounded-none bg-paper px-[18px] py-[10px] text-body font-medium text-ink transition-colors hover:bg-paper/90"
          >
            {heroCta}
          </Link>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="flex flex-col gap-5 max-w-2xl">
          <p className="text-body-sm font-medium uppercase text-ink">Om Havn</p>
          <h2 className="text-heading font-normal text-ink">Et hjem som speiler hvem du er.</h2>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row lg:border-t lg:border-ink">
          <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-[440px] lg:border-r border-ink shrink-0">
            <Image
              src={aboutImage}
              alt="HAVN Boligstyling prosjekt"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 flex-1 py-10 lg:py-14 lg:pl-14">
            <p className="text-body font-normal text-ink">{bodyText1}</p>
            <p className="text-body font-normal text-ink">{bodyText2}</p>
            <Link
              href="/om"
              className="w-fit text-body font-normal text-ink underline underline-offset-[3px] decoration-ink"
            >
              Les mer om oss →
            </Link>
          </div>
        </div>

        <div className="relative left-1/2 w-screen -translate-x-1/2 bg-ink">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:flex-row sm:px-10 lg:px-16">
            {stats.map(({ num, label, desc }, i) => (
              <div
                key={label}
                className={`flex-1 flex flex-col gap-2.5 py-10 ${i > 0 ? "sm:pl-10" : ""} ${i < stats.length - 1 ? "sm:pr-10" : ""}`}
              >
                <span className="text-heading-sm font-medium text-paper">{num}</span>
                <span className="text-body-sm font-medium uppercase text-paper">{label}</span>
                <p className="text-body-sm font-normal text-paper/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK SAMPLES ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div className="flex flex-col gap-5 max-w-2xl">
            <p className="text-body-sm font-medium uppercase text-ink">Utvalgte prosjekter</p>
            <h2 className="text-heading font-normal text-ink">Arbeid som taler for seg selv.</h2>
          </div>
          <Link
            href="/prosjekter"
            className="w-fit shrink-0 text-body font-normal text-ink underline underline-offset-[3px] decoration-ink"
          >
            Se alle prosjekter →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {workSamples.map((project) => (
            <Link key={project._id} href="/prosjekter" className="group flex flex-col gap-2.5">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-body-sm font-medium uppercase text-ink">{project.title}</h3>
              {project.description && (
                <p className="text-body font-normal text-ink/70">{project.description}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 border-t border-ink">
        <div className="flex flex-col lg:flex-row lg:gap-14">
          <div className="flex flex-col justify-between gap-10 lg:w-[380px] shrink-0 lg:border-r border-ink lg:pr-14 pb-10 lg:pb-0">
            <div className="flex flex-col gap-5">
              <p className="text-body-sm font-medium uppercase text-ink">Kontakt</p>
              <h2 className="text-heading font-normal text-ink">La oss ta en prat!</h2>
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
                  className="mt-3 w-fit text-body font-normal text-ink underline underline-offset-[3px] decoration-ink"
                >
                  Følg oss på Instagram
                </a>
              )}
            </div>
          </div>

          <div className="flex-1 pt-10 lg:pt-0">
            <ContactForm formspreeId={formspreeId} />
          </div>
        </div>
      </section>

    </div>
  );
}
