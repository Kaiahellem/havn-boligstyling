import Link from "next/link";
import { getProjects } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";
import { placeholderPhotos } from "@/lib/placeholderPhotos";
import type { Project } from "@/lib/projects";

// Example projects — shown alongside whatever's in Sanity so the page reads
// full during design/dev. Same fictional cases as the homepage teaser.
const exampleProjects: Project[] = [
  {
    _id: "example-villa-bygdoy",
    title: "Villa Bygdøy",
    image: placeholderPhotos[0],
    images: [placeholderPhotos[0], placeholderPhotos[1], placeholderPhotos[2]],
    description: "Fullstyling, Oslo",
    service: "Fullstyling",
  },
  {
    _id: "example-leilighet-grunerlokka",
    title: "Leilighet Grünerløkka",
    image: placeholderPhotos[1],
    images: [placeholderPhotos[1], placeholderPhotos[2], placeholderPhotos[3]],
    description: "Rådgivning, Oslo",
    service: "Rådgivning",
  },
  {
    _id: "example-rekkehus-nordstrand",
    title: "Rekkehus Nordstrand",
    image: placeholderPhotos[2],
    images: [placeholderPhotos[2], placeholderPhotos[3], placeholderPhotos[4]],
    description: "Delstyling, Oslo",
    service: "Delstyling",
  },
  {
    _id: "example-leilighet-majorstuen",
    title: "Leilighet Majorstuen",
    image: placeholderPhotos[3],
    images: [placeholderPhotos[3], placeholderPhotos[4], placeholderPhotos[5]],
    description: "Rådgivning, Oslo",
    service: "Rådgivning",
  },
  {
    _id: "example-enebolig-nesodden",
    title: "Enebolig Nesodden",
    image: placeholderPhotos[4],
    images: [placeholderPhotos[4], placeholderPhotos[5], placeholderPhotos[0]],
    description: "Fullstyling, Nesodden",
    service: "Fullstyling",
  },
];

// "fullstyling" / "delstyling" / "radgivning" (matches the tjeneste slugs) →
// compared against Project.service with accents stripped, so CMS entries
// authored as "Rådgivning" still match the accent-free query param.
function normalize(value: string) {
  return value.toLowerCase().replaceAll("å", "a").replaceAll("æ", "ae").replaceAll("ø", "o");
}

const serviceLabels: Record<string, string> = {
  fullstyling: "Fullstyling",
  delstyling: "Delstyling",
  radgivning: "Rådgivning",
};

export default async function ProsjekterPage({
  searchParams,
}: {
  searchParams: Promise<{ tjeneste?: string }>;
}) {
  const [projects, { tjeneste }] = await Promise.all([getProjects(), searchParams]);
  const allProjects = [...projects, ...exampleProjects];

  const filteredProjects = tjeneste
    ? allProjects.filter((p) => p.service && normalize(p.service) === normalize(tjeneste))
    : allProjects;

  return (
    <div className="bg-paper pt-[70px]">

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

      <ProsjekterGrid projects={filteredProjects} />
    </div>
  );
}
