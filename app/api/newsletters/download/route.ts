import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename") || "newsletter.pdf";

  if (!url) {
    return NextResponse.json({ detail: "Missing url parameter" }, { status: 400 });
  }

  if (!url.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ detail: "Invalid URL: only Cloudinary URLs are allowed" }, { status: 400 });
  }

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) {
      return NextResponse.json({ detail: "Failed to fetch PDF" }, { status: 502 });
    }

    const blob = await res.arrayBuffer();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ detail: "Download failed" }, { status: 503 });
  }
}
