import ContactForm from "@/components/ContactForm";

export default function KontaktPage() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return (
    <div className="bg-paper pt-[70px]">

      {/* Title */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 px-10 sm:px-16 py-8 sm:py-10">
        <h1 className="text-display font-normal text-ink lg:max-w-[55%]">
          La oss ta en prat
        </h1>
        <p className="text-body font-normal text-ink/70 lg:max-w-[30%]">
          Ønsker du en befaring eller har du spørsmål om boligstyling? Fyll ut skjemaet, så tar vi kontakt så snart vi kan.
        </p>
      </section>

      {/* Content — info + form */}
      <section className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12 px-10 sm:px-16 pb-16 sm:pb-24">
        <div className="flex flex-col lg:w-[360px] shrink-0 gap-10 lg:gap-16">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-1.5">
              <span className="text-body-sm font-medium uppercase text-ink/60">E-post</span>
              <span className="text-body font-normal text-ink">hei@havn.no</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-body-sm font-medium uppercase text-ink/60">Telefon</span>
              <span className="text-body font-normal text-ink">+47 400 00 000</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-body-sm font-medium uppercase text-ink/60">Område</span>
              <span className="text-body font-normal text-ink">Oslo og omegn</span>
            </div>
          </div>

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-body-sm font-medium uppercase text-ink/60 hover:text-ink transition-colors group w-fit"
            >
              Følg oss på Instagram
              <span className="w-4 h-px bg-ink/60 group-hover:w-8 transition-all duration-300" />
            </a>
          )}
        </div>

        <div className="flex-1 w-full">
          <ContactForm formspreeId={formspreeId} />
        </div>
      </section>
    </div>
  );
}
