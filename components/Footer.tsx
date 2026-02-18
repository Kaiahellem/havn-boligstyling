import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-havna-800 text-sand-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-[family-name:var(--font-cormorant)] text-lg text-sand-200">
            HAVN Boligstyling
          </p>
          <nav className="flex gap-6">
            <Link
              href="/tjenester"
              className="hover:text-white transition-colors"
            >
              Tjenester
            </Link>
            <Link
              href="/prosjekter"
              className="hover:text-white transition-colors"
            >
              Prosjekter
            </Link>
            <Link href="/om" className="hover:text-white transition-colors">
              Om
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-white transition-colors"
            >
              Kontakt
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-havna-700 text-center text-sm text-sand-300">
          © {currentYear} HAVN Boligstyling. Alle rettigheter reservert.
        </div>
      </div>
    </footer>
  );
}
