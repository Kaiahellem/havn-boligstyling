import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";
import type { Project } from "@/lib/projects";

interface InstagramFeedProps {
  posts: InstagramPost[];
  instagramUrl?: string;
  logoUrl?: string | null;
  fallbackProjects: Project[];
}

function handleFromUrl(url?: string) {
  if (!url) return "havn.boligstyling";
  try {
    const path = new URL(url).pathname.replace(/\//g, "");
    return path || "havn.boligstyling";
  } catch {
    return "havn.boligstyling";
  }
}

export default function InstagramFeed({ posts, instagramUrl, logoUrl, fallbackProjects }: InstagramFeedProps) {
  const handle = handleFromUrl(instagramUrl);

  const tiles: { id: string; href: string; imageUrl: string; mediaType: InstagramPost["mediaType"] }[] =
    posts.length > 0
      ? posts.map((p) => ({ id: p.id, href: p.permalink, imageUrl: p.imageUrl, mediaType: p.mediaType }))
      : fallbackProjects.slice(0, 6).map((p) => ({ id: p._id, href: "/prosjekter", imageUrl: p.image, mediaType: "IMAGE" }));

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-heading font-normal text-ink">Følg med på Instagram.</h2>
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-body font-medium text-ink hover:opacity-60 transition-opacity"
          >
            <InstagramIcon className="w-4 h-4" />
            @{handle}
          </a>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-greige">
            <Image src={logoUrl ?? "/HAVN_BS_kuntekst.svg"} alt="HAVN" fill className="object-contain p-2.5" />
          </div>
          <span className="text-body font-medium text-ink">{handle}</span>
        </div>
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-ink px-[18px] py-[10px] text-body font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Følg
          </a>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-1">
        {tiles.map((tile) => (
          <a
            key={tile.id}
            href={tile.href}
            target={tile.href.startsWith("http") ? "_blank" : undefined}
            rel={tile.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group relative block aspect-square overflow-hidden"
          >
            <Image
              src={tile.imageUrl}
              alt="Instagram-innlegg"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {tile.mediaType !== "IMAGE" && (
              <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-ink/70 text-paper">
                {tile.mediaType === "VIDEO" ? <PlayIcon className="w-3 h-3" /> : <CarouselIcon className="w-3 h-3" />}
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CarouselIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="7" y="7" width="14" height="14" rx="2" strokeWidth={1.5} />
      <path d="M3 13V5a2 2 0 0 1 2-2h8" strokeWidth={1.5} />
    </svg>
  );
}
