import type { Article } from "@/lib/types/article";
import type { Newsletter } from "@/lib/types/newsletter";

const API_BASE_URL = "/api";

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    const fallbackError = `Request failed with status ${response.status}`;
    let detail = fallbackError;

    try {
      const data = (await response.json()) as { detail?: string };
      detail = data?.detail ?? fallbackError;
    } catch {
      detail = fallbackError;
    }

    throw new Error(detail);
  }

  return (await response.json()) as T;
}

export async function fetchArticles(): Promise<Article[]> {
  return apiRequest<Article[]>("/articles/");
}

export async function fetchArticleById(id: string): Promise<Article> {
  return apiRequest<Article>(`/articles/${id}`);
}

export async function likeArticle(articleId: string): Promise<Article> {
  return apiRequest<Article>(`/articles/${articleId}/like`, { method: "POST" });
}

export async function fetchNewsletters(): Promise<Newsletter[]> {
  return apiRequest<Newsletter[]>("/newsletters/");
}

export function resolveImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";
  const backendOrigin = apiBase.replace(/\/api\/v1\/?$/, "");
  return `${backendOrigin}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function fetchSiteContent<T>(page: string): Promise<T | null> {
  try {
    const res = await apiRequest<{ content: T }>(`/site-content/${page}`);
    return res.content;
  } catch {
    return null;
  }
}
