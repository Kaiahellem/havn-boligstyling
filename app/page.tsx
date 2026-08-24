import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import InstagramFeed from "@/components/InstagramFeed";
import { getSiteSettings, getOmOss, getProjects, getTjenester } from "@/sanity/lib/queries";
import { getInstagramPosts } from "@/lib/instagram";

export default async function HomePage() {
  const [s, om, projects, tjenester, instagramPosts] = await Promise.all([
    getSiteSettings(),
    getOmOss(),
    getProjects(),
    getTjenester(),
    getInstagramPosts(),
  ]);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  const aboutImage = om.aboutImage ?? "/placeholder.svg";
  const bodyText1 = om.bodyText1 ?? "HAVN Boligstyling ble startet med en enkel visjon: å hjelpe folk å skape hjem som speiler hvem de er. Vi tror på at hvert rom har potensial til å bli et sted du virkelig trives – uansett størrelse eller budsjett.";
  const bodyText2 = om.bodyText2 ?? "Med erfaring fra boligstyling, innredning og salg/utleie, kombinerer vi estetikk med funksjon for å levere resultater du blir fornøyd med.";
  const aboutTextSections = tjenester.length > 0
    ? tjenester.slice(0, 3).map((t) => ({ title: t.title, body: t.description ?? "" }))
    : [
        { title: "Boligstyling", body: "Vi transformerer boligen din til et hjem som speiler din personlighet." },
        { title: "Konsultasjon", body: "Konkrete råd og veiledning for rom-for-rom, uten full boligstyling." },
        { title: "Utleiestyling", body: "Vi stiler for salg og utleie slik at potensielle leietakere ser verdien." },
      ];

  const workSamples = projects.length > 0
    ? projects.slice(0, 6)
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
      </section>

      {/* ── ABOUT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="flex flex-col gap-5 max-w-2xl">
          <p className="text-body-sm font-medium uppercase text-ink">Om Havn</p>
          <h2 className="text-heading font-normal text-ink">Et hjem som speiler hvem du er.</h2>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start gap-8 sm:gap-12 lg:gap-16 pb-24 lg:pb-32">
          <div className="relative w-40 sm:w-48 lg:w-56 aspect-[4/5] shrink-0">
            <Image
              src={aboutImage}
              alt="HAVN Boligstyling prosjekt"
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>
          <div className="flex flex-col gap-5 flex-1">
            <p className="text-body font-normal text-ink">{bodyText1}</p>
            <p className="text-body font-normal text-ink">{bodyText2}</p>
            <Link
              href="/om"
              className="w-fit text-body font-normal text-ink"
            >
              Les mer om oss →
            </Link>
          </div>
        </div>

        <div className="relative left-1/2 w-screen -translate-x-1/2 bg-ink">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 sm:flex-row sm:px-10 lg:px-16">
            {aboutTextSections.map(({ title, body }, i) => (
              <div
                key={title}
                className={`flex-1 flex flex-col gap-2.5 py-10 ${i > 0 ? "sm:pl-10" : ""} ${i < aboutTextSections.length - 1 ? "sm:pr-10" : ""}`}
              >
                <h3 className="text-body-sm font-medium uppercase text-paper">{title}</h3>
                <p className="text-body-sm font-normal text-paper/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <InstagramFeed
        posts={instagramPosts}
        instagramUrl={instagramUrl}
        logoUrl={process.env.NEXT_PUBLIC_LOGO_URL}
        fallbackProjects={workSamples}
      />

      {/* ── CONTACT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:gap-14">
          <div className="flex flex-col justify-between gap-10 lg:w-[380px] shrink-0 lg:pr-14 pb-10 lg:pb-0">
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
                  className="mt-3 w-fit text-body font-normal text-ink"
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
