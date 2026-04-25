"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, ThumbsUp, Calendar, User, Loader2 } from "lucide-react";
import { fetchArticleById, likeArticle, resolveImageUrl } from "@/lib/api";
import type { Article, ArticleCategory } from "@/lib/types/article";

const categoryLabel: Record<ArticleCategory, string> = {
  announcements: "Announcement",
  achievements: "Achievement",
  events: "Event",
  partnerships: "Partnership",
};

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  Announcement: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
  Achievement: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  Event: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  Partnership: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
};

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const articleId = params.slug;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (!articleId) return;
    setLoading(true);
    fetchArticleById(articleId)
      .then((data) => {
        setArticle(data);
        setError(null);
      })
      .catch(() => {
        setError("Article not found or could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, [articleId]);

  const handleLike = async () => {
    if (!article || liking) return;
    setLiking(true);
    setArticle((prev) => prev ? { ...prev, like_count: prev.like_count + 1 } : prev);
    try {
      const updated = await likeArticle(article.id);
      setArticle((prev) => prev ? { ...prev, like_count: updated.like_count } : prev);
    } catch {
      setArticle((prev) => prev ? { ...prev, like_count: Math.max(0, prev.like_count - 1) } : prev);
    } finally {
      setLiking(false);
    }
  };

  const tag = article ? categoryLabel[article.category] ?? "Announcement" : "Announcement";
  const tagColor = tagColors[tag] ?? tagColors["Announcement"];
  const authorName = article
    ? [article.author_first_name, article.author_last_name].filter(Boolean).join(" ") || "CEIT Staff"
    : "";
  const formattedDate = article
    ? new Date(article.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const formattedTime = article
    ? new Date(article.created_at).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const imageUrl = article ? resolveImageUrl(article.image_path) : null;

  return (
    <main className="min-h-screen bg-[#f2f4fb]">
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-16 md:py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/banner_academics.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0d1f3c]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f2f4fb] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-12">
          <div
            className="flex items-center gap-2 text-white/50 text-xs mb-4 uppercase tracking-widest"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <span className="text-[#ef8a22]">&rsaquo;</span>
            <Link href="/news" className="hover:text-white/80 transition-colors">
              News
            </Link>
            <span className="text-[#ef8a22]">&rsaquo;</span>
            <span className="text-white/80">Article</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl">
            {loading ? "Loading..." : article ? article.title : "Article Not Found"}
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />
          {article && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-white/75 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {authorName}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate} at {formattedTime}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="mx-auto max-w-[900px] px-5 md:px-12 py-10 md:py-14">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#4e5a7b] hover:text-[#ef8a22] transition-colors mb-8"
          style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        {loading && (
          <div className="rounded-2xl bg-white border border-[#dfe3ef] px-8 py-20 text-center">
            <Loader2 className="w-8 h-8 text-[#ef8a22] mx-auto mb-3 animate-spin" />
            <p className="text-[#4e5a7b] text-sm">Loading article...</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl bg-white border border-[#dfe3ef] px-8 py-16 text-center">
            <p className="text-[#4e5a7b] text-sm">{error}</p>
          </div>
        )}

        {article && !loading && (
          <article className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f2f4fb]">
              <div className="w-10 h-10 rounded-full bg-[#1f2b55] flex items-center justify-center flex-shrink-0">
                <span
                  className="text-white text-[10px] font-black"
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                >
                  CEIT
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1f2b55] leading-tight">
                  {authorName}
                </p>
                <p className="text-xs text-[#4e5a7b]">
                  {formattedDate} at {formattedTime}
                </p>
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${tagColor.bg} ${tagColor.text} ${tagColor.border}`}
                style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
              >
                {tag}
              </span>
            </div>

            {/* Image */}
            {imageUrl && (
              <div className="border-b border-[#f2f4fb]">
                <img
                  src={imageUrl}
                  alt={article.image_alt_text ?? article.title}
                  className="w-full max-h-[480px] object-cover"
                />
              </div>
            )}

            {/* Article body */}
            <div className="px-6 py-6 md:px-8 md:py-8">
              <h2 className="text-2xl font-extrabold text-[#1f2b55] mb-5 leading-tight">
                {article.title}
              </h2>
              <div className="text-sm text-[#4e5a7b] leading-relaxed whitespace-pre-line">
                {article.body}
              </div>
            </div>

            {/* Engagement bar */}
            <div className="px-6 py-4 border-t border-[#f2f4fb] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#4e5a7b]">
                <Heart className="w-4 h-4 text-[#ef8a22]" />
                <span>
                  {article.like_count} {article.like_count === 1 ? "like" : "likes"}
                </span>
              </div>
              <button
                onClick={() => void handleLike()}
                disabled={liking}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border border-[#dfe3ef] text-[#4e5a7b] hover:bg-[#f2f4fb] hover:border-[#ef8a22] hover:text-[#ef8a22] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Like
              </button>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
