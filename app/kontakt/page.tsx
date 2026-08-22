import ContactForm from "@/components/ContactForm";

export default function KontaktPage() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return (
    <div className="bg-paper pt-[70px]">
      <section className="flex flex-col lg:flex-row border-b border-ink min-h-[600px]">
        {/* Left: heading + info */}
        <div className="flex flex-col justify-between px-10 sm:px-16 py-16 gap-6 border-b lg:border-b-0 lg:border-r border-ink lg:w-[400px] shrink-0">
          <div className="flex flex-col gap-5">
            <p className="text-body-sm font-medium uppercase text-ink">Kontakt</p>
            <h1 className="text-display font-normal text-ink">
              La oss ta en prat!
            </h1>
            <p className="text-body font-normal text-ink/70 max-w-sm">
              Ønsker du en befaring eller har du spørsmål? Fyll ut skjemaet, så tar vi
              kontakt så snart vi kan.
            </p>
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

        {/* Right: form */}
        <div className="flex-1 px-10 sm:px-16 py-16">
          <ContactForm formspreeId={formspreeId} />
        </div>
      </section>
    </div>
  );
}
