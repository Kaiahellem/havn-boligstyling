import Link from "next/link";
import { getOmOss } from "@/sanity/lib/queries";
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

// One step per gallery image, in the order the images are laid out
// (column by column, top to bottom) — walks through how a project runs.
const processSteps = [
  "Befaring — Vi besøker boligen og kartlegger mulighetene",
  "Konsept — Plan for uttrykk, farger og møblering",
  "Møblering — Riktige møbler velges og settes på plass",
  "Detaljer — Tekstiler, farger og pyntegjenstander finpusses",
  "Kvalitetssjekk — Hvert rom vurderes med et kritisk blikk",
  "Klar for visning — Boligen viser fram sitt beste",
];

export default async function OmPage() {
  const d = await getOmOss();

  const portraitImage = d.aboutImage ?? "/martyportrett.png";
  const bio1 = d.bodyText1 ?? "Martine har jobbet med interiør og boligstyling i over åtte år, med bakgrunn fra både arkitektkontor og eiendomsbransjen. Hun startet HAVN med troen på at et hjem selger seg selv når det får vise sitt fulle potensial.";
  const bio2 = d.bodyText2 ?? "I dag leder hun hvert prosjekt personlig – fra første befaring til siste pute på plass – med et skarpt blikk for lys, proporsjoner og ro.";

  let imageCursor = 0;
  const galleryColumns: GalleryTile[][] = galleryLayout.map((column) =>
    column.map((tile) => {
      const src = placeholderPhotos[imageCursor % placeholderPhotos.length];
      const num = String(imageCursor + 1).padStart(2, "0");
      const [stepLabel, stepBody] = processSteps[imageCursor].split(" — ");
      imageCursor += 1;
      return { src, aspect: tile.aspect, num, stepLabel, stepBody };
    })
  );

  return (
    <div className="bg-paper pt-[70px]">

      {/* Portrait — photo + intro */}
      <section className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-16 py-16">
        <OmIntro portraitImage={portraitImage} bio1={bio1} bio2={bio2} />
      </section>

      {/* Gallery — each image walks through one step of how a project runs */}
      <section className="mx-auto w-full max-w-[1280px] flex flex-col gap-8 px-6 sm:px-10 lg:px-16 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-body-sm font-medium uppercase text-ink">Slik jobber jeg</p>
          <h2 className="text-heading font-normal text-ink">Fra befaring til ferdig hjem</h2>
        </div>
        <OmGallery columns={galleryColumns} />
      </section>

      {/* Dark CTA */}
      <section className="bg-ink">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col sm:flex-row items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-3 px-6 sm:px-10 lg:px-16 py-16">
            <h2 className="text-heading font-normal text-paper leading-[1.1]">
              Klar for en forandring?
            </h2>
            <p className="text-body font-normal text-paper/70">
              La oss hjelpe deg med å presentere boligen din på sitt aller beste.
            </p>
          </div>
          <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center bg-paper px-[18px] py-[10px] text-body font-medium text-ink hover:opacity-90 transition-opacity"
            >
              Ta kontakt
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
