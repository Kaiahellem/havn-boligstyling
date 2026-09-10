import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getKontaktinfo } from "@/sanity/lib/queries";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HAVN Boligstyling | Profesjonell boligstyling i Norge",
  description:
    "HAVN Boligstyling tilbyr boligstyling, konsultasjon og utleiestyling. Vi transformerer hjem til å speile ditt unike uttrykk.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, kontaktinfo] = await Promise.all([getSiteSettings(), getKontaktinfo()]);

  return (
    <html lang="no">
      <body className={`${GeistSans.variable} ${instrumentSerif.variable} font-sans antialiased min-h-screen flex flex-col bg-paper text-ink`}>
        <Header
          logoUrl={siteSettings.logo ?? process.env.NEXT_PUBLIC_LOGO_URL ?? "/HAVN_BS_kuntekst.svg"}
          ctaButtonText={kontaktinfo.ctaButtonText}
        />
        <main className="flex-1">{children}</main>
        <Footer epost={kontaktinfo.epost} telefon={kontaktinfo.telefon} />
      </body>
    </html>
  );
}
