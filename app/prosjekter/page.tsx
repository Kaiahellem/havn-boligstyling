import { getProjects } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";

export default async function ProsjekterPage() {
  const projects = await getProjects();

  return (
    <div className="bg-paper pt-[70px]">
      {/* Title */}
      <div className="border-b border-ink flex items-end justify-between px-10 sm:px-16 pt-16 pb-14">
        <div>
          <p className="text-body-sm font-medium uppercase text-ink mb-5">
            Portefølje
          </p>
          <h1 className="text-display font-normal text-ink">
            Prosjekter
          </h1>
        </div>
      </div>

      <ProsjekterGrid projects={projects} />
    </div>
  );
}
