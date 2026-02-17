import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "1",
    title: "Eksempelprosjekt 1",
    beforeImage: "https://picsum.photos/seed/before1/800/600",
    afterImage: "https://picsum.photos/seed/after1/800/600",
    description: "Transformasjon av stue og kjøkken.",
    city: "Oslo",
    service: "Boligstyling",
  },
  {
    id: "2",
    title: "Eksempelprosjekt 2",
    beforeImage: "https://picsum.photos/seed/before2/800/600",
    afterImage: "https://picsum.photos/seed/after2/800/600",
    description: "Utleiestyling for salg.",
    city: "Bergen",
    service: "Utleiestyling",
  },
  {
    id: "3",
    title: "Eksempelprosjekt 3",
    beforeImage: "https://picsum.photos/seed/before3/800/600",
    afterImage: "https://picsum.photos/seed/after3/800/600",
    description: "Konsultasjon og fargeråd.",
    service: "Konsultasjon",
  },
];

const serviceLabels: Record<string, string> = {
  boligstyling: "Boligstyling",
  konsultasjon: "Konsultasjon",
  utleiestyling: "Utleiestyling",
};

export default function ProsjekterPage() {
  return (
    <div>
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-havna-900 mb-4">
            Prosjekter
          </h1>
          <p className="text-xl text-havna-700">
            Se før og etter fra våre boligstyling-prosjekter. Hvert hjem får sitt
            unike uttrykk.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl overflow-hidden bg-sand-50 border border-sand-200 hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative">
                      <Image
                        src={project.beforeImage}
                        alt={`${project.title} - før`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        Før
                      </span>
                    </div>
                    <div className="w-1/2 relative border-l-2 border-white">
                      <Image
                        src={project.afterImage}
                        alt={`${project.title} - etter`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        Etter
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.service && (
                      <span className="text-xs font-medium text-havna-600 bg-havna-100 px-2 py-1 rounded">
                        {serviceLabels[project.service] || project.service}
                      </span>
                    )}
                    {project.city && (
                      <span className="text-xs text-havna-500">
                        {project.city}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-havna-800 mb-2">
                    {project.title}
                  </h2>
                  {project.description && (
                    <p className="text-havna-600 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
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
