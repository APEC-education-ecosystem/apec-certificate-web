import { getCourseImageUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

// Cache for 1 hour, revalidate in background
export const revalidate = 3600;

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const cleanId = id.split("&")[0];

  try {
    const upstreamUrl = await getCourseImageUrl(cleanId);

    const upstreamResponse = await fetch(upstreamUrl, {
      // Enable Next.js caching for upstream requests
      next: { revalidate: 3600 },
    });

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      return NextResponse.json(
        { error: "Image not found" },
        {
          status:
            upstreamResponse.status === 200 ? 404 : upstreamResponse.status,
        }
      );
    }

    const result = new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: {
        "Content-Type":
          upstreamResponse.headers.get("content-type") ??
          "application/octet-stream",
        // Cache on CDN/browser for 1 hour, stale-while-revalidate for 24 hours
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        // Optional: add ETag for conditional requests
        ...(upstreamResponse.headers.get("etag") && {
          ETag: upstreamResponse.headers.get("etag")!,
        }),
      },
    });

    return result;
  } catch (error) {
    console.error("Failed to proxy image", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 502 }
    );
  }
}
