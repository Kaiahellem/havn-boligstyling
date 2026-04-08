import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F4F2EF] border-t border-[#E5E0D8]">
      <div className="flex flex-col sm:flex-row">
        {/* Brand */}
        <div className="flex flex-col gap-5 px-10 sm:px-14 py-14 border-b sm:border-b-0 sm:border-r border-[#E5E0D8] sm:w-[300px] shrink-0">
          <div className="relative h-14 w-[180px]">
            <Image src="/havnLogo.svg" alt="HAVN Boligstyling" fill className="object-contain object-left" />
          </div>
          <p className="font-mono text-[12px] font-medium tracking-[1px] text-[#777777]">
            © {currentYear} HAVN Boligstyling
          </p>
        </div>

        {/* Tjenester */}
        <div className="flex flex-col gap-4 px-10 sm:px-14 py-14 border-b sm:border-b-0 sm:border-r border-[#E5E0D8] flex-1">
          <p className="font-mono text-[13px] font-medium tracking-[1px] uppercase text-[#1A1A1A] mb-2">Tjenester</p>
          <Link href="/tjenester#boligstyling" className="text-[14px] text-[#777777] hover:text-[#1A1A1A] transition-colors">Boligstyling</Link>
          <Link href="/tjenester#konsultasjon" className="text-[14px] text-[#777777] hover:text-[#1A1A1A] transition-colors">Konsultasjon</Link>
          <Link href="/tjenester#utleiestyling" className="text-[14px] text-[#777777] hover:text-[#1A1A1A] transition-colors">Utleiestyling</Link>
        </div>

        {/* Selskap */}
        <div className="flex flex-col gap-4 px-10 sm:px-14 py-14 border-b sm:border-b-0 sm:border-r border-[#E5E0D8] flex-1">
          <p className="font-mono text-[13px] font-medium tracking-[1px] uppercase text-[#1A1A1A] mb-2">Selskap</p>
          <Link href="/om" className="text-[14px] text-[#777777] hover:text-[#1A1A1A] transition-colors">Om oss</Link>
          <Link href="/prosjekter" className="text-[14px] text-[#777777] hover:text-[#1A1A1A] transition-colors">Prosjekter</Link>
          <Link href="/kontakt" className="text-[14px] text-[#777777] hover:text-[#1A1A1A] transition-colors">Kontakt</Link>
        </div>

        {/* Kontakt */}
        <div className="flex flex-col gap-4 px-10 sm:px-14 py-14 flex-1">
          <p className="font-mono text-[13px] font-medium tracking-[1px] uppercase text-[#1A1A1A] mb-2">Kontakt</p>
          <span className="text-[14px] text-[#777777]">hei@havn.no</span>
          <span className="text-[14px] text-[#777777]">+47 400 00 000</span>
          <span className="text-[14px] text-[#777777]">Oslo, Norge</span>
        </div>
      </div>
    </footer>
  );
}
