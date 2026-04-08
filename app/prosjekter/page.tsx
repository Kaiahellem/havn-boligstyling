import { getProjects } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";

export default async function ProsjekterPage() {
  const projects = await getProjects();

  return (
    <div className="bg-[#F4F2EF]">
      {/* Title */}
      <div className="border-b border-[#E5E0D8] flex items-end justify-between px-10 sm:px-16 pt-16 pb-14">
        <div>
          <p className="font-mono text-[13px] font-medium tracking-[2px] uppercase text-[#666666] mb-5">
            Portefølje
          </p>
          <h1 className="font-serif text-[clamp(48px,6vw,80px)] text-[#1A1A1A] leading-[1.03]">
            Prosjekter
          </h1>
        </div>
        <span className="font-mono text-[12px] font-medium tracking-[2px] uppercase text-[#777777] pb-2">
          Alle
        </span>
      </div>

      <ProsjekterGrid projects={projects} />
    </div>
  );
}
