import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BACKEND_API_BASE}/site-content/${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    const raw = await response.text();
    let data: unknown = null;

    if (raw) {
      try { data = JSON.parse(raw) as unknown; } catch { data = raw; }
    }

    if (!response.ok) {
      const detail =
        typeof data === "object" && data !== null && "detail" in data
          ? String((data as { detail?: string }).detail)
          : `Request failed with status ${response.status}`;
      return NextResponse.json({ detail }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ detail: "Backend unavailable" }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
