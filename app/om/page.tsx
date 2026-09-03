import Image from "next/image";
import Link from "next/link";
import { getOmOss } from "@/sanity/lib/queries";
import { placeholderPhotos } from "@/lib/placeholderPhotos";

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

  return (
    <div className="bg-paper pt-[70px]">

      {/* Portrait — photo + intro */}
      <section className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-24 px-10 sm:px-16 py-16">
        <div className="relative w-full lg:w-[280px] aspect-[460/552] lg:aspect-auto shrink-0">
          <Image src={portraitImage} alt="Martine Gullord Engebråten" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 280px" />
        </div>
        <div className="flex flex-col gap-5 max-w-[500px]">
          <p className="text-caption font-medium uppercase text-ink/50">Gründer og interiørstylist</p>
          <h2 className="text-display font-normal text-ink">Martine Gullord Engebråten</h2>
          <p className="text-body font-normal text-ink/70">{bio1}</p>
          <p className="text-body font-normal text-ink/70">{bio2}</p>
        </div>
      </section>

      {/* Gallery — each image walks through one step of how a project runs */}
      <section className="flex flex-col gap-8 px-10 sm:px-16 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-body-sm font-medium uppercase text-ink">Slik jobber jeg</p>
          <h2 className="text-heading font-normal text-ink">Fra befaring til ferdig hjem</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
        {galleryLayout.map((column, ci) => (
          <div key={ci} className="flex flex-1 flex-col gap-8">
            {column.map((tile, ti) => {
              const src = placeholderPhotos[imageCursor % placeholderPhotos.length];
              const num = String(imageCursor + 1).padStart(2, "0");
              const [stepLabel, stepBody] = processSteps[imageCursor].split(" — ");
              imageCursor += 1;
              return (
                <div key={ti} className="flex flex-col gap-3">
                  <div className={`relative w-full ${tile.aspect}`}>
                    <Image
                      src={src}
                      alt="HAVN Boligstyling interiør"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <span className="absolute top-4 right-4 text-caption font-medium text-ink/40">{num}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-body-sm font-medium uppercase tracking-[0.05em] text-ink">{stepLabel}</p>
                    <p className="text-body-sm font-normal text-ink/60">{stepBody}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </section>

      {/* Dark CTA */}
      <section className="flex flex-col sm:flex-row items-stretch bg-ink">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="text-heading font-normal text-paper leading-[1.1]">
            Klar for en forandring?
          </h2>
          <p className="text-body font-normal text-paper/70">
            La oss hjelpe deg med å presentere boligen din på sitt aller beste.
          </p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center bg-paper px-[18px] py-[10px] text-body font-medium text-ink hover:opacity-90 transition-opacity"
          >
            Ta kontakt
          </Link>
        </div>
      </section>

    </div>
  );
}
