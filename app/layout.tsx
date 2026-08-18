import type { Metadata } from "next";
import { Inter, Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-mono",
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
      <body className={`${inter.variable} ${playfair.variable} ${ibmMono.variable} font-sans antialiased min-h-screen flex flex-col bg-paper text-ink`}>
        <Header logoUrl={process.env.NEXT_PUBLIC_LOGO_URL ?? "/HAVN_BS_kuntekst.svg"} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
