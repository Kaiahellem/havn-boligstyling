import type { Metadata } from "next";

export const siteName = "HAVN Boligstyling";
export const siteUrl = "https://styling.havnbolig.no";

const defaultImage = {
  url: "/forsideHAVN.JPG",
  width: 2400,
  height: 1600,
  alt: "HAVN Boligstyling — interiør",
};

/** Builds per-page title/description/OG/Twitter metadata so every route gets its own, non-duplicate values. */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "nb_NO",
      type: "website",
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage.url],
    },
  };
}
