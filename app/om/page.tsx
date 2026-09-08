import Link from "next/link";
import { getOmOss, type OmOssGalleryStep } from "@/sanity/lib/queries";
import { placeholderPhotos } from "@/lib/placeholderPhotos";
import { OmIntro } from "@/components/OmIntro";
import { OmGallery, type GalleryTile } from "@/components/OmGallery";

const galleryLayout = [
  [
    { aspect: "aspect-[437/480]" },
    { aspect: "aspect-[437/280]" },
  ],
  [
    { aspect: "aspect-[437/280]" },
    { aspect: "aspect-[437/480]" },
  ],
  [
    { aspect: "aspect-[437/440]" },
    { aspect: "aspect-[437/320]" },
  ],
];

// Fallback steps, in the order the images are laid out (column by column,
// top to bottom) — walks through how a project runs. Used only until the
// client fills in gallerySteps in Sanity.
const defaultSteps: OmOssGalleryStep[] = [
  { label: "Befaring", body: "Vi besøker boligen og kartlegger mulighetene" },
  { label: "Konsept", body: "Plan for uttrykk, farger og møblering" },
  { label: "Møblering", body: "Riktige møbler velges og settes på plass" },
  { label: "Detaljer", body: "Tekstiler, farger og pyntegjenstander finpusses" },
  { label: "Kvalitetssjekk", body: "Hvert rom vurderes med et kritisk blikk" },
  { label: "Klar for visning", body: "Boligen viser fram sitt beste" },
];

export default async function OmPage() {
  const d = await getOmOss();

  const portraitImage = d.aboutImage ?? "/martyportrett.png";
  const name = d.name ?? "Martine Gullord Engebråten";
  const role = d.role ?? "Gründer og interiørstylist";
  const bio1 = d.bodyText1 ?? "Martine har jobbet med interiør og boligstyling i over åtte år, med bakgrunn fra både arkitektkontor og eiendomsbransjen. Hun startet HAVN med troen på at et hjem selger seg selv når det får vise sitt fulle potensial.";
  const bio2 = d.bodyText2 ?? "I dag leder hun hvert prosjekt personlig – fra første befaring til siste pute på plass – med et skarpt blikk for lys, proporsjoner og ro.";
  const galleryLabel = d.galleryLabel ?? "Slik jobber jeg";
  const galleryHeading = d.galleryHeading ?? "Fra befaring til ferdig hjem";
  const ctaHeading = d.cta?.heading ?? "Klar for en forandring?";
  const ctaBody = d.cta?.body ?? "La oss hjelpe deg med å presentere boligen din på sitt aller beste.";
  const ctaButtonText = d.cta?.buttonText ?? "Ta kontakt";

  const steps = d.gallerySteps && d.gallerySteps.length > 0 ? d.gallerySteps : defaultSteps;

  let imageCursor = 0;
  const galleryColumns: GalleryTile[][] = galleryLayout.map((column) =>
    column.map((tile) => {
      const step = steps[imageCursor % steps.length];
      const src = step.image ?? placeholderPhotos[imageCursor % placeholderPhotos.length];
      const num = String(imageCursor + 1).padStart(2, "0");
      imageCursor += 1;
      return { src, aspect: tile.aspect, num, stepLabel: step.label ?? "", stepBody: step.body ?? "" };
    })
  );

  return (
    <div className="bg-paper pt-[70px]">

      {/* Portrait — photo + intro */}
      <section className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16 py-16">
        <OmIntro portraitImage={portraitImage} name={name} role={role} bio1={bio1} bio2={bio2} />
      </section>

      {/* Gallery — each image walks through one step of how a project runs */}
      <section className="mx-auto w-full max-w-[1280px] flex flex-col gap-8 px-6 sm:px-10 lg:px-16 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-body-sm font-medium uppercase text-ink">{galleryLabel}</p>
          <h2 className="text-heading font-normal text-ink">{galleryHeading}</h2>
        </div>
        <OmGallery columns={galleryColumns} />
      </section>

      {/* CTA */}
      <section className="bg-paper border-t border-sand-400">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col sm:flex-row items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-3 px-6 sm:px-10 lg:px-16 pt-10 pb-4 sm:py-16">
            <h2 className="text-heading font-normal text-ink leading-[1.1]">
              {ctaHeading}
            </h2>
            <p className="text-body font-normal text-ink/70">
              {ctaBody}
            </p>
          </div>
          <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 pt-4 pb-10 sm:py-12">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center border border-ink bg-paper px-8 py-[14px] text-body-sm font-medium uppercase tracking-[0.05em] text-ink hover:opacity-90 transition-opacity"
            >
              {ctaButtonText}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
