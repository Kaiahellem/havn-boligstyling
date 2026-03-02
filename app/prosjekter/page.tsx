import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProsjekterPage() {
  return (
    <div>
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16">
            {projects.map((project, index) => {
              const imageRight = index % 2 === 0;
              return (
                <article
                  key={project.id}
                  id={`prosjekt-${project.id}`}
                  className={`group flex flex-col gap-6 md:gap-10 items-start scroll-mt-24 p-6 md:p-8 ${
                    imageRight ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 w-full md:min-w-0 pt-8 md:pt-12">
                    <h2 className="font-serif text-5xl text-havna-800 mb-3">
                      {project.title}
                    </h2>
                    {project.description && (
                      <p className="text-havna-600 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-full md:w-96 lg:w-[28rem]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 448px"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
          <Link
            href="/kontakt"
            className="inline-block bg-havna-800 text-white px-10 py-4 rounded-md text-lg font-medium hover:bg-havna-700 transition-colors"
          >
            Bestill befaring
          </Link>
        </div>
      </section>
    </div>
  );
}
