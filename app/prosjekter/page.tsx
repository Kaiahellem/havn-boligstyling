import Link from "next/link";
import { getProjects } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";

export default async function ProsjekterPage() {
  const projects = await getProjects();

  return (
    <div className="bg-paper pt-[70px]">

      {/* Title */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 px-10 sm:px-16 py-8 sm:py-10">
        <h1 className="text-display font-normal text-ink lg:max-w-[55%]">
          Prosjekter
        </h1>
        <div className="flex flex-col gap-6 lg:max-w-[30%]">
          <p className="text-body font-normal text-ink/70">
            Et utvalg av prosjekter vi har fullført innen boligstyling, konsultasjon og utleiestyling.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex w-fit items-center justify-center bg-ink px-[18px] py-[10px] text-body font-medium text-paper hover:opacity-90 transition-opacity"
          >
            Bestill befaring
          </Link>
        </div>
      </section>

      <ProsjekterGrid projects={projects} />
    </div>
  );
}
