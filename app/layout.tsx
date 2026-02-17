import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header logoUrl={process.env.NEXT_PUBLIC_LOGO_URL ?? "/logo.svg"} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
