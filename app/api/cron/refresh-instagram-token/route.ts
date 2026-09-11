import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await client.fetch<{ _id: string; instagramAccessToken?: string } | null>(
    `*[_type == "siteSettings"][0]{ _id, instagramAccessToken }`
  );

  const currentToken = settings?.instagramAccessToken ?? process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!settings?._id || !currentToken) {
    return NextResponse.json(
      { error: "Fant ingen siteSettings-dokument eller access token å fornye" },
      { status: 500 }
    );
  }

  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(currentToken)}`;

  const res = await fetch(url);
  const json = (await res.json()) as { access_token?: string; expires_in?: number; error?: unknown };

  if (!res.ok || !json.access_token) {
    return NextResponse.json({ error: "Fornyelse feilet", details: json }, { status: 502 });
  }

  await writeClient
    .patch(settings._id)
    .set({
      instagramAccessToken: json.access_token,
      instagramTokenUpdatedAt: new Date().toISOString(),
    })
    .commit();

  return NextResponse.json({ success: true, expiresIn: json.expires_in });
}
