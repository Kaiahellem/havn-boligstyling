export interface InstagramPost {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;
  caption?: string;
}

interface GraphMediaItem {
  id: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  caption?: string;
  children?: { data: { media_url: string }[] };
}

const GRAPH_VERSION = "v21.0";

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !accessToken) return [];

  const fields = "id,permalink,media_type,media_url,thumbnail_url,caption,children{media_url}";
  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const json = (await res.json()) as { data?: GraphMediaItem[] };

    return (json.data ?? [])
      .map((item): InstagramPost | null => {
        const imageUrl =
          item.thumbnail_url ?? item.media_url ?? item.children?.data?.[0]?.media_url;
        if (!imageUrl) return null;
        return {
          id: item.id,
          permalink: item.permalink,
          mediaType: item.media_type,
          imageUrl,
          caption: item.caption,
        };
      })
      .filter((post): post is InstagramPost => post !== null);
  } catch {
    return [];
  }
}
