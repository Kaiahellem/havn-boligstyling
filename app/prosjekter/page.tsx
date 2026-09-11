import type { Metadata } from "next";
import Link from "next/link";
import { getProjects, getProsjekterSide } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Prosjekter | HAVN Boligstyling",
  description:
    "Se referanseprosjekter fra HAVN Boligstyling — fullstyling, delstyling og veiledning for boliger i Oslo og Akershus.",
  path: "/prosjekter",
});

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
  const filteredProjects = tjeneste
    ? projects.filter((p) => p.service && normalize(p.service) === normalize(tjeneste))
    : projects;

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
