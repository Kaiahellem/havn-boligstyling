import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-100 via-sand-50 to-sand-200" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sand-300/30 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl lg:text-7xl font-semibold text-havna-900 mb-6 leading-tight">
            Din bolig fortjener
            <br />
            <span className="text-havna-700">å speile deg</span>
          </h1>
          <p className="text-xl text-havna-700 max-w-2xl mx-auto mb-10">
            HAVn Boligstyling hjelper deg med å skape et hjem som er både
            funksjonelt og personlig. Fra boligstyling til utleie – vi gir deg
            det profesjonelle uttrykket du ønsker.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-havna-800 text-white px-10 py-4 rounded-md text-lg font-medium hover:bg-havna-700 transition-colors shadow-lg shadow-havna-950/20"
          >
            Bestill befaring
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20 bg-sand-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/tjenester"
              className="group p-8 rounded-xl border border-sand-200 hover:border-havna-400 hover:shadow-lg transition-all"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-havna-800 mb-2 group-hover:text-havna-700">
                Våre tjenester
              </h3>
              <p className="text-havna-700">
                Boligstyling, konsultasjon og utleiestyling tilpasset ditt behov.
              </p>
            </Link>
            <Link
              href="/prosjekter"
              className="group p-8 rounded-xl border border-sand-200 hover:border-havna-400 hover:shadow-lg transition-all"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-havna-800 mb-2 group-hover:text-havna-700">
                Se prosjekter
              </h3>
              <p className="text-havna-700">
                Inspirer deg av våre før/etter-transformasjoner.
              </p>
            </Link>
            <Link
              href="/kontakt"
              className="group p-8 rounded-xl border border-sand-200 hover:border-havna-400 hover:shadow-lg transition-all"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-havna-800 mb-2 group-hover:text-havna-700">
                Ta kontakt
              </h3>
              <p className="text-havna-700">
                Book en befaring eller stille spørsmål – vi svarer raskt.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
