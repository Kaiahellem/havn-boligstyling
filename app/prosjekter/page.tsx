import type { Metadata } from "next";
import Link from "next/link";
import { getProjects, getProsjekterSide } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";
import { placeholderPhotos } from "@/lib/placeholderPhotos";
import type { Project } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Prosjekter | HAVN Boligstyling",
  description:
    "Se referanseprosjekter fra HAVN Boligstyling — fullstyling, delstyling og veiledning for boliger i Oslo og Akershus.",
  path: "/prosjekter",
});

// Example projects — shown only until the client has added real projects in
// Sanity so the page reads full during design/dev. Same fictional cases as
// the homepage teaser.
const exampleProjects: Project[] = [
  {
    _id: "example-villa-bygdoy",
    title: "Villa Bygdøy",
    image: placeholderPhotos[0],
    images: [{ url: placeholderPhotos[0] }, { url: placeholderPhotos[1] }, { url: placeholderPhotos[2] }],
    description: "Fullstyling, Oslo",
    service: "Fullstyling",
  },
  {
    _id: "example-leilighet-grunerlokka",
    title: "Leilighet Grünerløkka",
    image: placeholderPhotos[1],
    images: [{ url: placeholderPhotos[1] }, { url: placeholderPhotos[2] }, { url: placeholderPhotos[3] }],
    description: "Veiledning, Oslo",
    service: "Veiledning",
  },
  {
    _id: "example-rekkehus-nordstrand",
    title: "Rekkehus Nordstrand",
    image: placeholderPhotos[2],
    images: [{ url: placeholderPhotos[2] }, { url: placeholderPhotos[3] }, { url: placeholderPhotos[4] }],
    description: "Delstyling, Oslo",
    service: "Delstyling",
  },
  {
    _id: "example-leilighet-majorstuen",
    title: "Leilighet Majorstuen",
    image: placeholderPhotos[3],
    images: [{ url: placeholderPhotos[3] }, { url: placeholderPhotos[4] }, { url: placeholderPhotos[5] }],
    description: "Veiledning, Oslo",
    service: "Veiledning",
  },
  {
    _id: "example-enebolig-nesodden",
    title: "Enebolig Nesodden",
    image: placeholderPhotos[4],
    images: [{ url: placeholderPhotos[4] }, { url: placeholderPhotos[5] }, { url: placeholderPhotos[0] }],
    description: "Fullstyling, Nesodden",
    service: "Fullstyling",
  },
];

// "fullstyling" / "delstyling" / "veiledning" (matches the tjeneste slugs) →
// compared against Project.service with accents stripped, so CMS entries
// authored as "Veiledning" still match the accent-free query param.
function normalize(value: string) {
  return value.toLowerCase().replaceAll("å", "a").replaceAll("æ", "ae").replaceAll("ø", "o");
}

const serviceLabels: Record<string, string> = {
  fullstyling: "Fullstyling",
  delstyling: "Delstyling",
  veiledning: "Veiledning",
};

export default async function ProsjekterPage({
  searchParams,
}: {
  searchParams: Promise<{ tjeneste?: string }>;
}) {
  const [projects, prosjekterSide, { tjeneste }] = await Promise.all([
    getProjects(),
    getProsjekterSide(),
    searchParams,
  ]);
  const allProjects = projects.length > 0 ? projects : exampleProjects;

  const filteredProjects = tjeneste
    ? allProjects.filter((p) => p.service && normalize(p.service) === normalize(tjeneste))
    : allProjects;

  return (
    <div className="bg-paper pt-[70px]">
      <h1 className="sr-only">Prosjekter</h1>

      {tjeneste && (
        <div className="mx-auto w-full max-w-[1280px] flex items-center gap-4 px-6 sm:px-10 lg:px-16 pt-10">
          <p className="text-body-sm font-medium uppercase tracking-[0.05em] text-ink/50">
            Viser prosjekter innen {serviceLabels[normalize(tjeneste)] ?? tjeneste}
          </p>
          <Link href="/prosjekter" className="text-body-sm font-medium text-ink underline underline-offset-[3px]">
            Se alle prosjekter
          </Link>
        </div>
      )}

      <ProsjekterGrid projects={filteredProjects} cta={prosjekterSide.cta} />
    </div>
  );
}
