import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import InstagramFeed from "@/components/InstagramFeed";
import { getSiteSettings, getOmOss, getProjects, getTjenester } from "@/sanity/lib/queries";
import { getInstagramPosts } from "@/lib/instagram";
import { placeholderPhotos } from "@/lib/placeholderPhotos";

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

  const heroImage = s.heroImage ?? placeholderPhotos[0];
  const aboutImage = om.aboutImage ?? placeholderPhotos[1];
  const bodyText1 = om.bodyText1 ?? "HAVN Boligstyling ble startet med en enkel visjon: å hjelpe folk å skape hjem som speiler hvem de er. Vi tror på at hvert rom har potensial til å bli et sted du virkelig trives – uansett størrelse eller budsjett.";
  const bodyText2 = om.bodyText2 ?? "Med erfaring fra boligstyling, innredning og salg/utleie, kombinerer vi estetikk med funksjon for å levere resultater du blir fornøyd med.";
  const services = tjenester.length > 0
    ? tjenester.slice(0, 3).map((t, i) => ({ title: t.title, body: t.description ?? "", slug: t.slug, image: t.heroImage ?? placeholderPhotos[(i + 2) % placeholderPhotos.length] }))
    : [
        { title: "Boligstyling", body: "Vi transformerer boligen din til et hjem som speiler din personlighet.", slug: "boligstyling", image: placeholderPhotos[2] },
        { title: "Konsultasjon", body: "Konkrete råd og veiledning for rom-for-rom, uten full boligstyling.", slug: "konsultasjon", image: placeholderPhotos[3] },
        { title: "Utleiestyling", body: "Vi stiler for salg og utleie slik at potensielle leietakere ser verdien.", slug: "utleiestyling", image: placeholderPhotos[4] },
      ];

  const workSamples = projects.length > 0
    ? projects.slice(0, 6)
    : [
        { _id: "1", title: "Villa Bygdøy", image: placeholderPhotos[0], description: "Full boligstyling før salg.", service: "Boligstyling" },
        { _id: "2", title: "Leilighet Grünerløkka", image: placeholderPhotos[1], description: "Konsultasjon og møblering.", service: "Konsultasjon" },
        { _id: "3", title: "Utleiebolig Frogner", image: placeholderPhotos[2], description: "Styling for korttidsutleie.", service: "Utleiestyling" },
        { _id: "4", title: "Rekkehus Nordstrand", image: placeholderPhotos[3], description: "Full boligstyling før salg.", service: "Boligstyling" },
      ];

  return (
    <div className="bg-paper pt-[70px]">

      {/* Title */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 px-10 sm:px-16 py-8 sm:py-10">
        <h1 className="text-display font-normal text-ink lg:max-w-[55%]">
          Styling som løfter boligen
        </h1>
        <div className="flex flex-col gap-6 lg:max-w-[30%]">
          <p className="text-body font-normal text-ink/70">
            Jeg hjelper deg få frem det beste i boligen – enten den skal selges eller bli et bedre sted å bo.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex w-fit items-center justify-center bg-ink px-[18px] py-[10px] text-body font-medium text-paper hover:opacity-90 transition-opacity"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

      {/* ── HERO ── */}
      <section className="w-full bg-paper p-16 box-border">
        <div className="relative h-[600px] lg:h-[848px] w-full">
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

      {/* ── ABOUT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
        <p className="text-body-sm font-medium uppercase text-ink">Om meg</p>

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
              Les mer om Havn boligstyling →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-8">
          {services.map(({ title, body, slug, image }) => (
            <div key={title} className="flex flex-1 flex-col gap-6">
              <div className="relative w-full aspect-[4/3]">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <div className="flex flex-col gap-2.5">
                <h2 className="text-heading-sm font-normal text-ink">{title}</h2>
                <p className="text-body-sm font-normal text-ink/70">{body}</p>
                <Link href={`/tjenester#${slug}`} className="mt-1 w-fit text-body-sm font-medium uppercase text-ink underline underline-offset-[3px]">
                  Se tjeneste →
                </Link>
              </div>
            </div>
          ))}
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
