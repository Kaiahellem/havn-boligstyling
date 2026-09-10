import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentDefaults from "@/components/analytics/ConsentDefaults";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import ClarityLoader from "@/components/analytics/ClarityLoader";
import OutboundLinkTracker from "@/components/analytics/OutboundLinkTracker";
import { getSiteSettings, getKontaktinfo } from "@/sanity/lib/queries";
import { buildMetadata, siteUrl } from "@/lib/seo";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({
    title: "HAVN Boligstyling | Profesjonell boligstyling i Norge",
    description:
      "HAVN Boligstyling tilbyr boligstyling, konsultasjon og utleiestyling. Vi transformerer hjem til å speile ditt unike uttrykk.",
    path: "/",
  }),
  // Paste the verification code from Google Search Console into
  // GOOGLE_SITE_VERIFICATION in .env.local (and in Vercel's env vars).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const isProduction = process.env.NODE_ENV === "production";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, kontaktinfo] = await Promise.all([getSiteSettings(), getKontaktinfo()]);

  return (
    <html lang="no">
      <body className={`${GeistSans.variable} ${instrumentSerif.variable} font-sans antialiased min-h-screen flex flex-col bg-paper text-ink`}>
        {isProduction && <ConsentDefaults />}
        <Header
          logoUrl={siteSettings.logo ?? process.env.NEXT_PUBLIC_LOGO_URL ?? "/HAVN_BS_kuntekst.svg"}
          ctaButtonText={kontaktinfo.ctaButtonText}
        />
        <main className="flex-1">{children}</main>
        <Footer epost={kontaktinfo.epost} telefon={kontaktinfo.telefon} />

        {isProduction && (
          <>
            <ConsentBanner />
            <OutboundLinkTracker />
            {clarityId && <ClarityLoader clarityId={clarityId} />}
            {gaId && <GoogleAnalytics gaId={gaId} />}
          </>
        )}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
