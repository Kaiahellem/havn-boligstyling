import ContactForm from "@/components/ContactForm";

export default function KontaktPage() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return (
    <div className="bg-[#F4F2EF]">
      <section className="flex flex-col lg:flex-row border-b border-[#E5E0D8] min-h-[600px]">
        {/* Left: heading + info */}
        <div className="flex flex-col justify-between px-10 sm:px-16 py-16 gap-6 border-b lg:border-b-0 lg:border-r border-[#E5E0D8] lg:w-[420px] shrink-0">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666]">Kontakt</p>
            <h1 className="font-serif text-[clamp(48px,5vw,72px)] text-[#1A1A1A] leading-[1.03]">
              La oss ta en prat!
            </h1>
            <p className="text-[16px] text-[#4A4A4A] leading-relaxed max-w-sm">
              Ønsker du en befaring eller har du spørsmål? Fyll ut skjemaet, så tar vi
              kontakt så snart vi kan.
            </p>
          </div>

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[12px] font-medium tracking-[1px] uppercase text-[#777777] hover:text-[#1A1A1A] transition-colors group w-fit"
            >
              Følg oss på Instagram
              <span className="w-4 h-px bg-[#777777] group-hover:w-8 transition-all duration-300" />
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
