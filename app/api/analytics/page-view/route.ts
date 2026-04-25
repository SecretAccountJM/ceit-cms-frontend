import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

export async function POST(request: NextRequest) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_API_BASE}/analytics/page-view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ detail: "Backend unavailable" }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
