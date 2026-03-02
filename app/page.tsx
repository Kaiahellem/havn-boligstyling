"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectModal from "@/components/ProjectModal";

const heroGalleryItems = [
  {
    projectId: "1",
    image: projects[0].image,
    alt: projects[0].title,
    w: 350,
    h: 480,
    offset: -40,
    spacing: 20,
  },
  {
    projectId: "2",
    image: projects[1].image,
    alt: projects[1].title,
    w: 350,
    h: 440,
    offset: 20,
    spacing: -24,
  },
  {
    projectId: "3",
    image: projects[2].image,
    alt: projects[2].title,
    w: 400,
    h: 490,
    offset: -20,
    spacing: 29,
  },
  {
    projectId: "4",
    image: projects[3]?.image ?? projects[0].image,
    alt: projects[3]?.title ?? projects[0].title,
    w: 300,
    h: 450,
    offset: 40,
    spacing: -20,
  },
  {
    projectId: "5",
    image: projects[4]?.image ?? projects[0].image,
    alt: projects[4]?.title ?? projects[0].title,
    w: 300,
    h: 500,
    offset: -40,
    spacing: 30,
  },
  {
    projectId: "6",
    image: projects[5]?.image ?? projects[0].image,
    alt: projects[5]?.title ?? projects[0].title,
    w: 400,
    h: 480,
    offset: 30,
    spacing: -20,
  },
];

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  useEffect(() => {
    let x = 0;
    let raf: number;

    const loop = () => {
      if (!trackRef.current) return;

      if (!paused.current) x -= 0.4;

      const setWidth = trackRef.current.scrollWidth / 3;
      if (x <= -setWidth) x += setWidth;

      trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section >
      

        {/* Gallery */}
        <div className="relative mt-10 overflow-hidden bg-[var(--background)]">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-30 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-30 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

          <div
            ref={trackRef}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            className="flex items-end w-max will-change-transform pt-12 pb-16 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8"
          >
            {[...heroGalleryItems, ...heroGalleryItems, ...heroGalleryItems].map((item, i) => {
              const project = projects.find((p) => p.id === item.projectId) ?? projects[0];
              return (
                <button
                  key={`${item.projectId}-${i}`}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group relative shrink-0 overflow-hidden bg-sand-100 shadow-lg hover:z-10 cursor-pointer"
                  style={{
                    width: item.w,
                    height: item.h,
                    transform: `translateY(${item.offset ?? 0}px)`,
                    marginLeft:
                      i > 0 ? `${item.spacing ?? 24}px` : undefined,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="/HAVN_BS_kuntekst.svg"
            alt="HAVN Boligstyling"
            className="w-full max-w-sm mx-auto mb-8"
          />
          <p className="font-serif text-lg sm:text-xl text-havna-700 leading-relaxed">
          Vi gjør boligen din klar for markedet.
          Vi tilbyr boligstyling, rådgivning og styling for utleie – fra små grep til full klargjøring før visning og annonsering
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="font-serif text-xl sm:text-3xl text-havna-900 mb-6">
              Derfor lønner boligstyling seg
              </h1>
          <p className="font-serif text-lg sm:text-xl text-havna-700 leading-relaxed">
          Boligstyling handler om å gjøre boligen mer attraktiv for flest mulig kjøpere.
          Ved å fremheve boligens styrker og skape et ryddig, helhetlig uttrykk, øker du sjansen for flere interessenter – og et bedre utgangspunkt i budrunden.
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/tjenester"
              className="group p-8 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 hover:shadow-lg transition-all"
            >
              <h3 className="font-serif text-2xl font-semibold text-havna-800 mb-2 group-hover:text-havna-700">
                Våre tjenester
              </h3>
              <p className="text-havna-700">
                Boligstyling, konsultasjon og utleiestyling tilpasset ditt behov.
              </p>
            </Link>

            <Link
              href="/prosjekter"
              className="group p-8 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 hover:shadow-lg transition-all"
            >
              <h3 className="font-serif text-2xl font-semibold text-havna-800 mb-2 group-hover:text-havna-700">
                Se prosjekter
              </h3>
              <p className="text-havna-700">
                Inspirer deg av våre før/etter-transformasjoner.
              </p>
            </Link>

            <Link
              href="/kontakt"
              className="group p-8 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 hover:shadow-lg transition-all"
            >
              <h3 className="font-serif text-2xl font-semibold text-havna-800 mb-2 group-hover:text-havna-700">
                Ta kontakt
              </h3>
              <p className="text-havna-700">
                Book en befaring eller stille spørsmål – vi svarer raskt.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        hasPrev={selectedProject ? projects.findIndex((p) => p.id === selectedProject.id) > 0 : false}
        hasNext={
          selectedProject ? projects.findIndex((p) => p.id === selectedProject.id) < projects.length - 1 : false
        }
        onPrev={() => {
          if (!selectedProject) return;
          const idx = projects.findIndex((p) => p.id === selectedProject.id);
          if (idx > 0) setSelectedProject(projects[idx - 1]);
        }}
        onNext={() => {
          if (!selectedProject) return;
          const idx = projects.findIndex((p) => p.id === selectedProject.id);
          if (idx < projects.length - 1) setSelectedProject(projects[idx + 1]);
        }}
      />
    </div>
  );
}