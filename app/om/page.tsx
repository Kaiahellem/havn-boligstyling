import Image from "next/image";
import Link from "next/link";

export default function OmPage() {
  return (
    <div>
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-havna-900 mb-6">
                Om HAVN Boligstyling
              </h1>
              <div className="prose prose-lg text-havna-700 max-w-none">
                <p className="leading-relaxed">
                  HAVN Boligstyling ble startet med en enkel visjon: å hjelpe
                  folk å skape hjem som speiler hvem de er. Vi tror på at hvert
                  rom har potensial til å bli et sted du virkelig trives –
                  uansett størrelse eller budsjett.
                </p>
                <p className="leading-relaxed mt-4">
                  Med erfaring fra boligstyling, innredning og salg/utleie,
                  kombinerer vi estetikk med funksjon for å levere resultater du
                  blir fornøyd med.
                </p>
              </div>
              <Link
                href="/kontakt"
                className="inline-block mt-8 bg-havna-800 text-white px-10 py-4 rounded-md text-lg font-medium hover:bg-havna-700 transition-colors"
              >
                Ta kontakt
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sand-200">
              <Image
                src="https://picsum.photos/seed/havn-om/800/1000"
                alt="Om HAVN Boligstyling"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
