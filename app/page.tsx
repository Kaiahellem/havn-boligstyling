import Link from "next/link";
import Image from "next/image";
import { AboutReveal } from "@/components/AboutReveal";
import ContactForm from "@/components/ContactForm";
import InstagramFeed from "@/components/InstagramFeed";
import ScrollHero from "@/components/ScrollHero";
import ServicesGrid from "@/components/ServicesGrid";
import { getForside, getKontaktinfo, getOmOss, getProjects, getTjenester } from "@/sanity/lib/queries";
import { getInstagramPosts } from "@/lib/instagram";
import { placeholderPhotos } from "@/lib/placeholderPhotos";

export default async function HomePage() {
  const [forside, kontaktinfo, om, projects, tjenester, instagramPosts] = await Promise.all([
    getForside(),
    getKontaktinfo(),
    getOmOss(),
    getProjects(),
    getTjenester(),
    getInstagramPosts(),
  ]);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = kontaktinfo.instagramUrl ?? process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  const heroImage = forside.heroImage ?? placeholderPhotos[0];
  const heroHeading = forside.heroHeading ?? "Styling som løfter boligen";
  const whyStyleLabel = forside.whyStyleLabel ?? "Hvorfor style?";
  const whyStyleHeading = forside.whyStyleHeading ?? "Derfor lønner det seg å style boligen";
  const whyStyleIntro = forside.whyStyleIntro ?? "Ved salg eller utleie er førsteinntrykket alt. En godt stylet bolig hjelper kjøpere og leietakere til å se seg selv bo der – noe rå eller rotete rom sjelden klarer.";
  const defaultReasons = [
    { title: "Bedre bilder", body: "Stylede rom fotograferer vesentlig bedre, og gode bilder er det som får folk til å klikke seg inn på annonsen." },
    { title: "Flere på visning", body: "Et innbydende og gjennomtenkt hjem trekker flere interesserte til visning." },
    { title: "Sterkere førsteinntrykk", body: "Kjøpere og leietakere bestemmer seg raskt – styling sikrer at det første inntrykket er det rette." },
  ];
  const whyStyleReasons = forside.whyStyleReasons && forside.whyStyleReasons.length > 0
    ? forside.whyStyleReasons
    : defaultReasons;

  const aboutImage = om.aboutImage ?? "/martyportrett.png";
  const bodyText1 = om.bodyText1 ?? "HAVN Boligstyling ble startet med en enkel visjon: å hjelpe folk å skape hjem som speiler hvem de er. Vi tror på at hvert rom har potensial til å bli et sted du virkelig trives – uansett størrelse eller budsjett.";
  const bodyText2 = om.bodyText2 ?? "Med erfaring fra boligstyling, innredning og salg/utleie, kombinerer vi estetikk med funksjon for å levere resultater du blir fornøyd med.";
  const services = tjenester.length > 0
    ? tjenester.slice(0, 3).map((t, i) => ({ title: t.title, body: t.description ?? "", slug: t.slug, image: t.heroImage ?? placeholderPhotos[(i + 2) % placeholderPhotos.length] }))
    : [
        { title: "Fullstyling", body: "Hele boligen fra A til Å – et helhetlig uttrykk i hvert rom.", slug: "fullstyling", image: placeholderPhotos[2] },
        { title: "Delstyling", body: "Utvalgte rom stylet med samme kvalitet – uten full prosess.", slug: "delstyling", image: placeholderPhotos[3] },
        { title: "Rådgivning", body: "Konkrete råd og veiledning, rom for rom – uten full styling.", slug: "radgivning", image: placeholderPhotos[4] },
      ];

  const placeholderSamples = [
    { _id: "placeholder-1", title: "Villa Bygdøy", image: placeholderPhotos[0], description: "Full boligstyling før salg.", service: "Fullstyling" },
    { _id: "placeholder-2", title: "Leilighet Grünerløkka", image: placeholderPhotos[1], description: "Rådgivning og møblering.", service: "Rådgivning" },
    { _id: "placeholder-3", title: "Utleiebolig Frogner", image: placeholderPhotos[2], description: "Delstyling for korttidsutleie.", service: "Delstyling" },
    { _id: "placeholder-4", title: "Rekkehus Nordstrand", image: placeholderPhotos[3], description: "Full boligstyling før salg.", service: "Fullstyling" },
    { _id: "placeholder-5", title: "Leilighet Majorstuen", image: placeholderPhotos[4], description: "Rådgivning og møblering.", service: "Rådgivning" },
    { _id: "placeholder-6", title: "Enebolig Nesodden", image: placeholderPhotos[5], description: "Delstyling for korttidsutleie.", service: "Delstyling" },
    { _id: "placeholder-7", title: "Loft Sagene", image: placeholderPhotos[0], description: "Full boligstyling før salg.", service: "Fullstyling" },
    { _id: "placeholder-8", title: "Villa Ullern", image: placeholderPhotos[1], description: "Rådgivning og møblering.", service: "Rådgivning" },
    { _id: "placeholder-9", title: "Leilighet Frogner", image: placeholderPhotos[2], description: "Delstyling for korttidsutleie.", service: "Delstyling" },
  ];

  // Pad with placeholders whenever there aren't yet enough real projects to
  // fill all three rows of the Instagram-section grid, instead of dropping
  // to just whatever handful of real projects exist.
  const workSamples = projects.length >= 9
    ? projects.slice(0, 9)
    : [...projects, ...placeholderSamples].slice(0, 9);

  return (
    <div className="bg-paper pt-[70px]">

      {/* ── HERO ── */}
      <ScrollHero image={heroImage} heading={heroHeading} />

      {/* ── SERVICES ── */}
      <AboutReveal>
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20 lg:px-16">
          <ServicesGrid services={services} />
        </section>
      </AboutReveal>

      {/* ── WHY STYLING ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-8 pb-4 sm:px-10 sm:pt-10 sm:pb-5 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="flex flex-col gap-5 lg:w-[380px] shrink-0">
            <p className="text-body-sm font-medium uppercase text-ink">{whyStyleLabel}</p>
            <h2 className="text-heading font-normal text-ink">{whyStyleHeading}</h2>
            <p className="text-body font-normal text-ink/70 max-w-md">
              {whyStyleIntro}
            </p>
          </div>
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-3 flex-1 lg:mt-[38px]">
            {whyStyleReasons.map((reason, i) => (
              <div key={reason.title ?? i} className="flex flex-col gap-2.5">
                <h3 className="text-heading-sm font-normal text-ink">{reason.title}</h3>
                <p className="text-body-sm font-normal text-ink/70">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
        <Link
          href="/prosjekter"
          className="mt-12 inline-flex w-fit text-body font-normal text-ink"
        >
          Se våre prosjekter →
        </Link>
      </section>

      {/* ── INSTAGRAM ── */}
      <InstagramFeed
        posts={instagramPosts}
        instagramUrl={instagramUrl}
        logoUrl={process.env.NEXT_PUBLIC_LOGO_URL}
        fallbackProjects={workSamples}
      />

      {/* ── ABOUT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
        <div className="flex flex-col sm:flex-row items-start justify-center gap-8 sm:gap-12 lg:gap-16 pb-12 sm:pb-16">
          <div className="relative w-36 sm:w-48 lg:w-60 aspect-[4/5] shrink-0">
            <Image
              src={aboutImage}
              alt={om.name ?? "Martine Gullord Engebråten"}
              fill
              className="object-cover grayscale"
              sizes="(max-width: 640px) 144px, (max-width: 1024px) 192px, 240px"
            />
          </div>
          <div className="flex flex-col gap-5 max-w-md">
            <h2 className="text-heading font-normal text-ink">Om meg</h2>
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

      {/* ── CONTACT ── */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:gap-14">
          <div className="flex flex-col justify-between gap-10 lg:w-[380px] shrink-0 lg:pr-14 pb-10 lg:pb-0">
            <div className="flex flex-col gap-5">
              <p className="text-body-sm font-medium uppercase text-ink">{kontaktinfo.kontaktLabel ?? "Kontakt"}</p>
              <h2 className="text-heading font-normal text-ink">{kontaktinfo.kontaktHeading ?? "La oss ta en prat!"}</h2>
              <p className="text-body font-normal text-ink/70 max-w-sm">
                {kontaktinfo.kontaktIntro ?? "Ønsker du en befaring eller har du spørsmål? Fyll ut skjemaet, så tar vi kontakt så snart vi kan."}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-body font-normal text-ink/70">{kontaktinfo.epost ?? "hei@havn.no"}</span>
              <span className="text-body font-normal text-ink/70">{kontaktinfo.telefon ?? "+47 400 00 000"}</span>
              <span className="text-body font-normal text-ink/70">{kontaktinfo.omrade ?? "Oslo, Norge"}</span>
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
