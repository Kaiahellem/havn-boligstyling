"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/lib/projects";
import { placeholderPhotos } from "@/lib/placeholderPhotos";

interface GalleryTile {
  aspect: string;
  caption?: string;
}

// Three column-composition variants, cycled per project — matches the staggered
// editorial gallery layout designed in Paper (varied image sizes, a caption on a
// couple of images per project calling out an interior detail).
const galleryVariants: GalleryTile[][][] = [
  [
    [
      { aspect: "aspect-[21/19]", caption: "Kjøkkenøy i eik med benkeplate i honet marmor" },
      { aspect: "aspect-[21/13]" },
    ],
    [{ aspect: "aspect-[21/32]" }],
    [
      { aspect: "aspect-[7/5]" },
      { aspect: "aspect-[21/17]", caption: "Håndvevd ullteppe og vintage lyspendel i stuen" },
    ],
  ],
  [
    [{ aspect: "aspect-[21/32]" }],
    [
      { aspect: "aspect-[7/5]" },
      { aspect: "aspect-[21/17]", caption: "Skreddersydd sofa i bouclé, farget i varm sand" },
    ],
    [
      { aspect: "aspect-[21/13]", caption: "Original flisegulv bevart og restaurert i entreen" },
      { aspect: "aspect-[21/19]" },
    ],
  ],
  [
    [
      { aspect: "aspect-[7/5]" },
      { aspect: "aspect-[21/17]", caption: "Peis kledd i kalkpuss, med innfelte bokhyller" },
    ],
    [
      { aspect: "aspect-[21/19]", caption: "Fransk balkongdør med original sprosseinndeling" },
      { aspect: "aspect-[21/13]" },
    ],
    [{ aspect: "aspect-[21/13]" }, { aspect: "aspect-[21/19]" }],
  ],
];

function galleryForProject(project: Project, index: number) {
  const variant = galleryVariants[index % galleryVariants.length];
  const tileCount = variant.reduce((sum, column) => sum + column.length, 0);
  const sourceImages = project.images?.length ? project.images : placeholderPhotos;

  let cursor = 0;
  return variant.map((column) =>
    column.map((tile) => {
      const src = sourceImages[(cursor + index) % sourceImages.length];
      cursor += 1;
      return { ...tile, src };
    })
  );
}

export default function ProsjekterGrid({ projects }: { projects: Project[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const projectGalleries = projects.map((project, i) => galleryForProject(project, i));
  const allImages = projectGalleries.flatMap((gallery) => gallery.flat().map((tile) => tile.src));

  let globalCursor = 0;

  return (
    <>
      {/* Projects — each with a staggered gallery of interior photos */}
      <section>
        {projects.map((project, i) => {
          const gallery = projectGalleries[i];
          return (
            <div key={project._id} className="w-full">
              <div className="flex flex-col gap-2 px-10 sm:px-16 pt-16 pb-8">
                <span className="text-body font-medium text-ink/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-heading-sm font-normal text-ink">{project.title}</h2>
                {project.description && (
                  <p className="text-caption font-medium uppercase tracking-wide text-ink/50">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 px-10 sm:px-16 pb-16">
                {gallery.map((column, ci) => (
                  <div key={ci} className="flex flex-1 flex-col gap-8">
                    {column.map((tile, ti) => {
                      const imageIndex = globalCursor;
                      globalCursor += 1;
                      return (
                        <div key={ti} className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedIndex(imageIndex)}
                            className={`relative block w-full overflow-hidden group cursor-pointer ${tile.aspect}`}
                          >
                            <Image
                              src={tile.src}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          </button>
                          {tile.caption && (
                            <p className="text-body-sm font-normal text-ink/55">{tile.caption}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="flex flex-col sm:flex-row items-stretch bg-ink">
        <div className="flex-1 flex flex-col justify-center gap-3 px-10 sm:px-16 py-16">
          <h2 className="text-heading font-normal text-paper leading-[1.1]">
            Liker du det du ser?
          </h2>
          <p className="text-body font-normal text-paper/70">Vi hjelper deg gjerne med å skape noe like bra hos deg.</p>
        </div>
        <div className="flex items-center justify-center px-10 sm:px-16 py-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center bg-paper px-[18px] py-[10px] text-body font-medium text-ink hover:opacity-90 transition-opacity"
          >
            Bestill befaring
          </Link>
        </div>
      </section>

      <ProjectModal
        images={allImages}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex((i) => (i === null ? i : (i - 1 + allImages.length) % allImages.length))}
        onNext={() => setSelectedIndex((i) => (i === null ? i : (i + 1) % allImages.length))}
      />
    </>
  );
}
