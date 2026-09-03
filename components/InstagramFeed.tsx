import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";
import type { Project } from "@/lib/projects";

interface InstagramFeedProps {
  posts: InstagramPost[];
  instagramUrl?: string;
  logoUrl?: string | null;
  fallbackProjects: Project[];
}

interface Tile {
  id: string;
  href: string;
  imageUrl: string;
  mediaType: InstagramPost["mediaType"];
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

function Tile({ tile }: { tile: Tile }) {
  return (
    <a
      href={tile.href}
      target={tile.href.startsWith("http") ? "_blank" : undefined}
      rel={tile.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative block w-full aspect-square overflow-hidden bg-greige"
    >
      <Image
        src={tile.imageUrl}
        alt="Instagram-innlegg"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
      />
      {tile.mediaType !== "IMAGE" && (
        <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-ink/70 text-paper">
          {tile.mediaType === "VIDEO" ? <PlayIcon className="w-3 h-3" /> : <CarouselIcon className="w-3 h-3" />}
        </span>
      )}
    </a>
  );
}

export default function InstagramFeed({ posts, instagramUrl, fallbackProjects }: InstagramFeedProps) {
  const handle = handleFromUrl(instagramUrl);

  const tiles: Tile[] =
    posts.length > 0
      ? posts.map((p) => ({ id: p.id, href: p.permalink, imageUrl: p.imageUrl, mediaType: p.mediaType }))
      : fallbackProjects.slice(0, 6).map((p) => ({ id: p._id, href: "/prosjekter", imageUrl: p.image, mediaType: "IMAGE" }));

  const displayTiles = tiles.slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16">
      <span className="block h-px w-full bg-sand-400" aria-hidden="true" />
      <div className="flex flex-col gap-6 pb-8 mt-[6vh] sm:flex-row sm:items-end sm:justify-between">
        <p className="text-body-sm font-medium uppercase text-ink">Instagram</p>
        <a
          href={instagramUrl ?? "https://instagram.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 text-body font-medium text-ink hover:opacity-60 transition-opacity"
        >
          <InstagramIcon className="w-4 h-4" />
          @{handle}
        </a>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 pb-16 sm:pb-20">
        {displayTiles.map((tile) => (
          <Tile key={tile.id} tile={tile} />
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
