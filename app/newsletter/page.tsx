"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Download, Eye, Maximize2, BookMarked } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Paste URLs here when the team provides them 
// Nasa /public/pdf/ ng frontend folder. 
const NEWSLETTERS = [
  {
    id: "auralis-2026",
    title: "Auralis - The Blueprint",
    volume: "Vol. 5 · Issue 2",
    date: "February 2026",
    flipbookUrl: "https://online.fliphtml5.com/AURALIS2026/dvtm/",
    pdfUrl: "/pdf/Auralis - The Blueprint.pdf", //palitan ng link ng pdf
  },
  {
    id: "auralis-2027",
    title: "Auralis - The Blueprint (Copy)",
    volume: "Vol. 6 · Issue 1",
    date: "August 2026",
    flipbookUrl: "https://online.fliphtml5.com/AURALIS2026/dvtm/",
    pdfUrl: "/pdf/Auralis - The Blueprint.pdf", //palitan ng link ng pdf
  },
];

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = React.useState(NEWSLETTERS[0].id);
  const activeNewsletter = NEWSLETTERS.find((n) => n.id === activeTab) || NEWSLETTERS[0];

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
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-12">
          <div
            className="flex items-center gap-2 text-white/50 text-xs mb-4 uppercase tracking-widest"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span className="text-[#ef8a22]">›</span>
            <span className="text-white/80">Newsletter</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">CEIT Newsletter</h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />
          <p className="mt-4 max-w-2xl text-white/85 leading-relaxed">
            Published stories, feature articles, and college highlights — the official publication of CEIT.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-10 md:py-14">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-5 h-5 text-[#ef8a22]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#ef8a22]"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            Official College Publication
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#dfe3ef] to-transparent" />
        </div>

        {/* ── NEWSLETTER TABS ── */}
        {NEWSLETTERS.length > 1 && (
          <div className="flex overflow-x-auto gap-2 pb-6 mb-2 no-scrollbar">
            {NEWSLETTERS.map((newsletter) => (
              <button
                key={newsletter.id}
                onClick={() => setActiveTab(newsletter.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === newsletter.id
                  ? "bg-[#1f2b55] text-white shadow-md border-transparent"
                  : "bg-white text-[#4e5a7b] border border-[#dfe3ef] hover:border-[#1f2b55] hover:text-[#1f2b55]"
                  }`}
                style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
              >
                {newsletter.volume}
              </button>
            ))}
          </div>
        )}

        {/* ── FLIPBOOK CARD ── */}
        <div className="rounded-2xl overflow-hidden border border-[#dfe3ef] shadow-lg">

          {/* Header — navy */}
          <div
            className="relative overflow-hidden px-7 py-6"
            style={{ background: "linear-gradient(150deg, #1f2b55 0%, #162046 55%, #1b2a52 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div
              className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #ef8a22, transparent 70%)" }}
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookMarked className="w-4 h-4 text-[#ef8a22]" />
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest text-[#ef8a22]"
                    style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                  >
                    Interactive Flipbook
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white leading-tight">
                  {activeNewsletter.title}
                </h2>
                <p className="text-white/55 text-sm mt-0.5">
                  Interactive Digital Edition — {activeNewsletter.volume}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {activeNewsletter.flipbookUrl && activeNewsletter.pdfUrl ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
                        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                      >
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-[#0d1623] border-[#1f2b55] text-white">
                      <DialogHeader>
                        <DialogTitle className="text-white text-xl">Download Newsletter</DialogTitle>
                        <DialogDescription className="text-white/60">
                          You are about to download "{activeNewsletter.title}". The PDF file will be saved to your device.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-3 mt-4">
                        <DialogClose asChild>
                          <button className="px-5 py-2.5 rounded-md border border-white/20 text-sm font-semibold hover:bg-white/10 text-white transition-colors">
                            Cancel
                          </button>
                        </DialogClose>
                        <DialogClose asChild>
                          <a
                            href={activeNewsletter.pdfUrl}
                            download={`${activeNewsletter.title}.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold bg-[#ef8a22] text-[#1f2b55] hover:opacity-90 transition-opacity"
                          >
                            <Download className="w-4 h-4 mr-2" /> Start Download
                          </a>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-white/25 text-white opacity-50 cursor-not-allowed"
                    style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                )}
                {activeNewsletter.flipbookUrl && (
                  <a
                    href={activeNewsletter.flipbookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full bg-[#ef8a22] text-[#1f2b55] hover:opacity-90 transition-opacity"
                    style={{
                      fontFamily: "'Trebuchet MS', sans-serif",
                    }}
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> View Full Size
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Newsletter Cover Display */}
          <div className="bg-[#0d1623] relative overflow-hidden" style={{ minHeight: "580px" }}>
            {activeNewsletter.flipbookUrl ? (
              <div className="w-full h-[650px] p-4 md:p-8">
                <iframe
                  key={activeNewsletter.id} // Forces iframe reload when changing tabs
                  src={activeNewsletter.flipbookUrl}
                  className="w-full h-full rounded-lg shadow-2xl border-4 border-white/10"
                  frameBorder="0"
                  allowFullScreen
                  title="CEIT Newsletter Flipbook"
                />
              </div>
            ) : (
              /* ── PLACEHOLDER: left = cover mockup, right = title + description ── */
              <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 select-none">
                <div className="w-full max-w-3xl grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">

                  {/* LEFT — stacked magazine cover mockup */}
                  <div className="flex justify-center md:justify-start">
                    <div className="relative w-44 h-60">
                      {/* Page 3 — back */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl border border-white/10 shadow-xl"
                        style={{
                          background: "linear-gradient(160deg, #1a2d4a, #0d1f3c)",
                          transform: "rotate(-10deg) translate(-14px, 8px)",
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl" style={{ background: "rgba(239,138,34,0.35)" }} />
                      </div>
                      {/* Page 2 — middle */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-xl border border-white/10 shadow-xl"
                        style={{
                          background: "linear-gradient(160deg, #1f2b55, #152340)",
                          transform: "rotate(-4deg) translate(-5px, 4px)",
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-xl" style={{ background: "rgba(239,138,34,0.6)" }} />
                      </div>
                      {/* Page 1 — front */}
                      <div
                        className="relative w-full h-full rounded-xl border border-white/20 shadow-2xl overflow-hidden"
                        style={{ background: "linear-gradient(160deg, #f2f4fb 0%, #e8ecf7 100%)" }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#ef8a22]" />
                        <div className="p-5 pt-7">
                          <p className="text-[8px] font-black uppercase tracking-widest text-[#ef8a22] mb-1"
                            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>CEIT Newsletter</p>
                          <p className="text-[10px] font-black text-[#1f2b55] mb-4 leading-tight">Vol. 5 · Issue 2</p>
                          <div className="w-full h-20 rounded-lg bg-gradient-to-br from-[#dfe3ef] to-[#c8cfe8] mb-4 flex items-center justify-center">
                            <BookOpen className="w-7 h-7 text-[#4e5a7b]/30" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-1.5 rounded bg-[#dfe3ef] w-full" />
                            <div className="h-1.5 rounded bg-[#dfe3ef] w-4/5" />
                            <div className="h-1.5 rounded bg-[#dfe3ef] w-3/5" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <div className="h-px bg-[#dfe3ef] mb-1.5" />
                          <p className="text-[7px] text-[#4e5a7b] font-semibold">February 2026 · PLV-CEIT</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — title, description, dev note */}
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#ef8a22] mb-2"
                        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                        {activeNewsletter.volume} · {activeNewsletter.date}
                      </p>
                      <h3 className="text-2xl font-extrabold text-white leading-tight mb-3">
                        Flipbook Coming Soon
                      </h3>
                      <p className="text-sm text-white/55 leading-relaxed">
                        The interactive digital flipbook is currently being prepared by the CEIT team.
                        Once the embed link is ready, the full flipbook will appear here automatically — no page reload needed.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        "Engineering the Future: Innovation at CEIT",
                        "BSEE Students Win Regional Quiz Bee",
                        "ITlympics 2026: VITS Hosts Biggest IT Competition Yet",
                        "Faculty Spotlight: Engr. Jordan Velasco",
                      ].map((article, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm text-white/50">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#ef8a22" }} />
                          {article}
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
                      style={{ background: "rgba(239,138,34,0.07)", borderColor: "rgba(239,138,34,0.25)" }}
                    >
                      <Eye className="w-4 h-4 text-[#ef8a22] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-white/50 leading-relaxed">
                        <span className="font-bold text-[#ef8a22]">Developer note: </span>
                        Paste the embed URL into{" "}
                        <code className="text-[#ef8a22] bg-white/5 px-1 py-0.5 rounded text-[10px]">FLIPBOOK_URL</code>{" "}
                        at the top of this file to activate the viewer.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Footer bar */}
          <div
            className="px-7 py-4 border-t border-[#dfe3ef] flex flex-wrap items-center justify-between gap-3"
            style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: activeNewsletter.flipbookUrl ? "#10b981" : "#ef8a22",
                  animation: activeNewsletter.flipbookUrl ? "none" : "pulse 2s infinite",
                }}
              />
              <p className="text-xs text-[#4e5a7b]" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                {activeNewsletter.flipbookUrl ? "Newsletter loaded" : "Awaiting pages and PDF URLs from the team"}
              </p>
            </div>
            <p className="text-xs text-[#4e5a7b]" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
              CEIT Official Publication · Pamantasan ng Lungsod ng Valenzuela
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}