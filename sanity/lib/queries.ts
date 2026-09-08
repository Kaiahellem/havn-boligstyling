import { client } from "./client";
import type { Project } from "@/lib/projects";

const revalidate = { next: { revalidate: 60 } };

export interface CtaBlock {
  heading?: string;
  body?: string;
  buttonText?: string;
}

const ctaProjection = `cta { heading, body, buttonText }`;

// ── Projects ──────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const data = await client.fetch<Project[]>(
    `*[_type == "project"] | order(order asc, _createdAt asc) {
      "_id": _id,
      title,
      "image": mainImage.asset->url,
      "images": images[]{ "url": image.asset->url, caption },
      description,
      service
    }`,
    {},
    revalidate
  );
  return data ?? [];
}

// ── Generelt (logo) ─────────────────────────────────────────
export interface SiteSettings {
  logo?: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await client.fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] {
      "logo": logo.asset->url
    }`,
    {},
    revalidate
  );
  return data ?? {};
}

// ── Forside ───────────────────────────────────────────────
export interface Forside {
  heroImage?: string;
  heroHeading?: string;
  whyStyleLabel?: string;
  whyStyleHeading?: string;
  whyStyleIntro?: string;
  whyStyleReasons?: { title?: string; body?: string }[];
}

export async function getForside(): Promise<Forside> {
  const data = await client.fetch<Forside>(
    `*[_type == "forside"][0] {
      "heroImage": heroImage.asset->url,
      heroHeading,
      whyStyleLabel,
      whyStyleHeading,
      whyStyleIntro,
      whyStyleReasons[] { title, body }
    }`,
    {},
    revalidate
  );
  return data ?? {};
}

// ── Kontaktinfo ───────────────────────────────────────────
export interface Kontaktinfo {
  epost?: string;
  telefon?: string;
  omrade?: string;
  instagramUrl?: string;
  ctaButtonText?: string;
  kontaktLabel?: string;
  kontaktHeading?: string;
  kontaktIntro?: string;
}

export async function getKontaktinfo(): Promise<Kontaktinfo> {
  const data = await client.fetch<Kontaktinfo>(
    `*[_type == "kontaktinfo"][0] {
      epost, telefon, omrade, instagramUrl, ctaButtonText,
      kontaktLabel, kontaktHeading, kontaktIntro
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

export interface TjenesterSide {
  cta?: CtaBlock;
}

export async function getTjenesterSide(): Promise<TjenesterSide> {
  const data = await client.fetch<TjenesterSide>(
    `*[_type == "tjenesterSide"][0] { ${ctaProjection} }`,
    {},
    revalidate
  );
  return data ?? {};
}

// ── Om ────────────────────────────────────────────────────
export interface OmOssGalleryStep {
  label?: string;
  body?: string;
  image?: string;
}

export interface OmOss {
  aboutImage?: string;
  name?: string;
  role?: string;
  bodyText1?: string;
  bodyText2?: string;
  galleryLabel?: string;
  galleryHeading?: string;
  gallerySteps?: OmOssGalleryStep[];
  cta?: CtaBlock;
}

export async function getOmOss(): Promise<OmOss> {
  const data = await client.fetch<OmOss>(
    `*[_type == "omOss"][0] {
      "aboutImage": aboutImage.asset->url,
      name, role, bodyText1, bodyText2,
      galleryLabel, galleryHeading,
      gallerySteps[] { label, body, "image": image.asset->url },
      ${ctaProjection}
    }`,
    {},
    revalidate
  );
  return data ?? {};
}

// ── Prosjekter ────────────────────────────────────────────
export interface ProsjekterSide {
  cta?: CtaBlock;
}

export async function getProsjekterSide(): Promise<ProsjekterSide> {
  const data = await client.fetch<ProsjekterSide>(
    `*[_type == "prosjekterSide"][0] { ${ctaProjection} }`,
    {},
    revalidate
  );
  return data ?? {};
}
