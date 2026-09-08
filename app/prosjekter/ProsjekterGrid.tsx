"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/lib/projects";
import type { CtaBlock } from "@/sanity/lib/queries";
import { placeholderPhotos } from "@/lib/placeholderPhotos";

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

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
  const sourceImages: { url: string; caption?: string }[] = project.images?.length
    ? project.images
    : placeholderPhotos.map((url) => ({ url }));

  let cursor = 0;
  return variant.map((column) =>
    column.map((tile) => {
      const image = sourceImages[(cursor + index) % sourceImages.length];
      cursor += 1;
      return { ...tile, src: image.url, caption: image.caption ?? tile.caption };
    })
  );
}

export default function ProsjekterGrid({ projects, cta }: { projects: Project[]; cta?: CtaBlock }) {
  const ctaHeading = cta?.heading ?? "Liker du det du ser?";
  const ctaBody = cta?.body ?? "Vi hjelper deg gjerne med å skape noe like bra hos deg.";
  const ctaButtonText = cta?.buttonText ?? "Bestill befaring";
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
            <motion.div
              key={project._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={reveal}
              className="mx-auto w-full max-w-[1280px]"
            >
              <div className="flex flex-col gap-2 px-6 sm:px-10 lg:px-16 pt-16 pb-8">
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

              <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 px-6 sm:px-10 lg:px-16 pb-16">
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
            </motion.div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="bg-paper border-t border-sand-400">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col sm:flex-row items-stretch">
          <div className="flex-1 flex flex-col justify-center gap-3 px-6 sm:px-10 lg:px-16 pt-10 pb-4 sm:py-16">
            <h2 className="text-heading font-normal text-ink leading-[1.1]">
              {ctaHeading}
            </h2>
            <p className="text-body font-normal text-ink/70">{ctaBody}</p>
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
