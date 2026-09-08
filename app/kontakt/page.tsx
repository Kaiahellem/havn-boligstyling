import { KontaktReveal } from "@/components/KontaktReveal";
import { getKontaktinfo } from "@/sanity/lib/queries";

export default async function KontaktPage() {
  const kontaktinfo = await getKontaktinfo();

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const instagramUrl = kontaktinfo.instagramUrl ?? process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return (
    <div className="bg-paper pt-[70px]">

      {/* Same alignment as the homepage's contact section */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <KontaktReveal
          formspreeId={formspreeId}
          instagramUrl={instagramUrl}
          kontaktinfo={kontaktinfo}
        />
      </section>

    </div>
  );
}
