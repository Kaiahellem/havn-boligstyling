import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HAVN Boligstyling | Profesjonell boligstyling i Norge",
  description:
    "HAVN Boligstyling tilbyr boligstyling, konsultasjon og utleiestyling. Vi transformerer hjem til å speile ditt unike uttrykk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${GeistSans.variable} ${fraunces.variable} font-sans antialiased min-h-screen flex flex-col bg-paper text-ink`}>
        <Header logoUrl={process.env.NEXT_PUBLIC_LOGO_URL ?? "/HAVN_BS_kuntekst.svg"} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
