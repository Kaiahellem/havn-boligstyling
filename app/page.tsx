"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

const heroGalleryItems = [
  {
    projectId: "1",
    image: projects[0].afterImage,
    alt: projects[0].title,
    w: 320,
    h: 260,
    offset: -40,
    spacing: 0,
  },
  {
    projectId: "2",
    image: projects[1].afterImage,
    alt: projects[1].title,
    w: 180,
    h: 240,
    offset: 60,
    spacing: -24,
  },
  {
    projectId: "3",
    image: projects[2].afterImage,
    alt: projects[2].title,
    w: 260,
    h: 180,
    offset: -20,
    spacing: 24,
  },
  {
    projectId: "4",
    image: projects[3]?.afterImage ?? projects[0].afterImage,
    alt: projects[3]?.title ?? projects[0].title,
    w: 200,
    h: 200,
    offset: 30,
    spacing: -20,
  },
  {
    projectId: "5",
    image: projects[4]?.afterImage ?? projects[0].afterImage,
    alt: projects[4]?.title ?? projects[0].title,
    w: 200,
    h: 200,
    offset: 30,
    spacing: -20,
  },
  {
    projectId: "6",
    image: projects[5]?.afterImage ?? projects[0].afterImage,
    alt: projects[5]?.title ?? projects[0].title,
    w: 200,
    h: 200,
    offset: 30,
    spacing: -20,
  },
];

export default function HomePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

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
        <div className="relative mt-20 overflow-hidden bg-[var(--background)]">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-30 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-30 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

          <div
            ref={trackRef}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            className="flex items-end w-max will-change-transform pt-12 pb-16 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8"
          >
            {[...heroGalleryItems, ...heroGalleryItems, ...heroGalleryItems].map((item, i) => (
              <Link
                key={`${item.projectId}-${i}`}
                href={`/prosjekter/${item.projectId}`}
                className="group relative shrink-0 overflow-hidden bg-sand-100 shadow-lg hover:z-10"
                style={{
                  width: item.w,
                  height: item.h,
                  transform: `translateY(${item.offset ?? 0}px)`,
                  marginLeft:
                  i > 0
                    ? `${item.spacing ?? 24}px`
                    : undefined,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/tjenester"
              className="group p-8 rounded-xl border border-sand-200 hover:border-havna-400 hover:shadow-lg transition-all"
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
              className="group p-8 rounded-xl border border-sand-200 hover:border-havna-400 hover:shadow-lg transition-all"
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
              className="group p-8 rounded-xl border border-sand-200 hover:border-havna-400 hover:shadow-lg transition-all"
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
    </div>
  );
}