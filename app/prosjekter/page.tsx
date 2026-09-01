import { getProjects } from "@/sanity/lib/queries";
import ProsjekterGrid from "./ProsjekterGrid";

export default async function ProsjekterPage() {
  const projects = await getProjects();

  return (
    <div className="bg-paper pt-[70px]">

      <ProsjekterGrid projects={projects} />
    </div>
  );
}
