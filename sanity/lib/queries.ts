import { client } from "./client";
import type { Project } from "@/lib/projects";

const revalidate = { next: { revalidate: 60 } };

// ── Projects ──────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const data = await client.fetch<Project[]>(
    `*[_type == "project"] | order(order asc, _createdAt asc) {
      "_id": _id,
      title,
      "image": mainImage.asset->url,
      "images": images[].asset->url,
      description,
      city,
      service
    }`,
    {},
    revalidate
  );
  return data ?? [];
}

// ── Site settings (forsiden) ───────────────────────────────
export interface SiteSettings {
  heroImage?: string;
  heroLabel?: string;
  heroTitle?: string;
  heroBody?: string;
  heroCta?: string;
  editorialImage?: string;
  editorialLabel?: string;
  editorialTitle?: string;
  editorialBody?: string;
  editorialQuote?: string;
  editorialQuoteAuthor?: string;
  stats?: { num: string; label: string; desc: string }[];
  ctaTitle?: string;
  ctaBody?: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] {
      "heroImage": heroImage.asset->url,
      heroLabel, heroTitle, heroBody, heroCta,
      "editorialImage": editorialImage.asset->url,
      editorialLabel, editorialTitle, editorialBody, editorialQuote, editorialQuoteAuthor,
      stats, ctaTitle, ctaBody
    }`,
    {},
    revalidate
  );
  return data ?? {};
}

// ── Tjenester ─────────────────────────────────────────────
export interface Tjeneste {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  description?: string;
  highlights?: string[];
  heroImage?: string;
}

export async function getTjenester(): Promise<Tjeneste[]> {
  const data = await client.fetch<Tjeneste[]>(
    `*[_type == "tjeneste"] | order(order asc, _createdAt asc) {
      "_id": _id,
      title,
      "slug": slug.current,
      order,
      description,
      highlights,
      "heroImage": heroImage.asset->url
    }`,
    {},
    revalidate
  );
  return data ?? [];
}

// ── Om oss ────────────────────────────────────────────────
export interface OmOss {
  heroImage?: string;
  aboutImage?: string;
  quote?: string;
  quoteAuthor?: string;
  bodyText1?: string;
  bodyText2?: string;
  values?: { title: string; desc: string }[];
  stats?: { num: string; label: string; desc: string }[];
}

export async function getOmOss(): Promise<OmOss> {
  const data = await client.fetch<OmOss>(
    `*[_type == "omOss"][0] {
      "heroImage": heroImage.asset->url,
      "aboutImage": aboutImage.asset->url,
      quote, quoteAuthor, bodyText1, bodyText2, values, stats
    }`,
    {},
    revalidate
  );
  return data ?? {};
}
