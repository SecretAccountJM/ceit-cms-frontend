"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Users, Award } from "lucide-react";
import { fetchSiteContent } from "@/lib/api";

interface AdminCmsContent {
  boardOfRegents: { members: { id: string; name: string; position: string; photo: string }[] };
  organizationalChart: { members: { id: string; name: string; position: string; photo: string }[] };
}

type OrgNodeProps = {
  name: string;
  role: string;
  image?: string;
  compact?: boolean;
  accent?: string;
};

const OrgNode = ({ name, role, image, compact = false, accent = "#ef8a22" }: OrgNodeProps) => (
  <div
    className={[
      "group relative mx-auto w-full overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
      compact ? "max-w-[320px]" : "max-w-[420px]",
    ].join(" ")}
    style={{ borderColor: "#dfe3ef" }}
  >
    <div
      className="h-[3px] w-full"
      style={{ background: "linear-gradient(to right, #1f2b55, #1f2b5560, transparent)" }}
    />

    <div className="relative flex items-center gap-3 px-4 py-3">
      <span
        className="absolute -right-1 -bottom-2 text-[44px] font-black opacity-[0.05] select-none pointer-events-none leading-none"
        style={{ color: accent, fontFamily: "'Georgia', serif" }}
      >
        PLV
      </span>

      <div
        className="relative z-10 flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-[#f2f4fb]"
        style={{ borderColor: `${accent}40` }}
      >
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-[10px] font-semibold text-[#4e5a7b]">Photo</span>
        )}
      </div>
      <div className="relative z-10 min-w-0">
        <p className="text-sm font-extrabold text-[#1f2b55] leading-tight break-words">{name}</p>
        <p
          className="text-[10px] font-black uppercase tracking-wider leading-tight mt-1 break-words"
          style={{ color: accent, fontFamily: "'Trebuchet MS', sans-serif" }}
        >
          {role}
        </p>
      </div>
    </div>

    <div
      className="h-[3px] w-full"
      style={{ background: "linear-gradient(to right, #1f2b55, #1f2b5540, transparent)" }}
    />
  </div>
);

type AdministrationTab = "Board of Regents" | "Organizational Chart";

const boardMembers = [
  { role: "Chairman", names: ["City Mayor Weslie T. Gatchalian"], highlight: true },
  { role: "Vice-Chairman", names: ["Atty. Danilo L. Concepcion"], highlight: true },
  { role: "PLV President", names: ["Dr. Nedeña C. Torralba"], highlight: true },
  {
    role: "Regent",
    names: [
      "Regent Lorena C. Natividad-Borja",
      "Regent Floro P. Alejo",
      "Regent Wilfredo E. Cabral",
      "Regent Angeleca SJ. Villena",
    ],
    highlight: false,
  },
  { role: "Member", names: ["Atty. Allan Roullo Yap"], highlight: false },
  { role: "Board Secretary", names: ["Adelia E. Soriano"], highlight: false },
  { role: "Board Treasurer", names: ["Ulysses Hermogenes C. Aguilar"], highlight: false },
  {
    role: "Technical Working Group",
    names: [
      "Elizabeth A. Chongco",
      "Pia Febes P. Aquino",
      "Flocerfida D. Villamar",
      "Erlindo C. Dionisio",
      "Leonora B. Katalbas",
      "Ana Maria C. Fernandez",
      "Carolina V. Santiago",
      "Lanilyn A. Deroña",
    ],
    highlight: false,
  },
];

const defaultOrgChart = [
  { name: "Dr. Nedena C. Torralba", position: "University President", photo: "/pres_torralba.png" },
  { name: "Dr. Michville Rivera", position: "Vice President for Academic Affairs", photo: "/vpaa_rivera.png" },
  { name: "Engr. Jordan N. Velasco", position: "Dean, College of CEIT", photo: "/engr_jordan-velasco.png" },
  { name: "Norie Caunda", position: "Secretary, College of CEIT", photo: "/norie_caunda.png" },
  { name: "Engr. Tirao", position: "Civil Engineering Department Chairperson", photo: "/engr_tirao.png" },
  { name: "Alex Montano", position: "Electrical Engineering Department Chairperson", photo: "/alex_monstano.png" },
  { name: "Kenmar Bernardino", position: "Information Technology Department Chairperson", photo: "/kenmar_bernardino.png" },
  { name: "Engr. Darryl John Bandino", position: "CE Department Research Coordinator", photo: "/john-bandino.png" },
  { name: "Engr. Erica Cruz", position: "EE Department Research Coordinator", photo: "/erika_cruz.png" },
  { name: "Patrick Luis Francisco", position: "IT Department Research Coordinator", photo: "/patrick_francisco.png" },
];

const AdministrationPage = () => {
  const [activeTab, setActiveTab] = useState<AdministrationTab>("Board of Regents");
  const [cmsContent, setCmsContent] = useState<AdminCmsContent | null>(null);

  useEffect(() => {
    fetchSiteContent<AdminCmsContent>("administration").then((data) => {
      if (data) setCmsContent(data);
    });
  }, []);

  const orgChartMembers = cmsContent?.organizationalChart?.members ?? defaultOrgChart;

  // Helper to get org chart member by index with fallback
  const org = (index: number) => {
    const member = orgChartMembers[index];
    return member
      ? { name: member.name, role: member.position, image: member.photo }
      : { name: "—", role: "—", image: undefined };
  };

  return (
    <div className="min-h-screen bg-[#f2f4fb]">

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
            <span>Home</span>
            <span className="text-[#ef8a22]">›</span>
            <span className="text-white/80">Administration</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">Administration</h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />
          <p className="mt-4 max-w-3xl text-base md:text-lg text-white/85 leading-relaxed">
            Meet the administrators and school officials who lead CEIT programs, student services, and institutional development.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-12 md:py-16">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-[#ef8a22]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#ef8a22]"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            School Officials
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#dfe3ef] to-transparent" />
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["Board of Regents", "Organizational Chart"] as AdministrationTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-3 rounded-2xl text-sm font-bold border transition-all duration-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5"
                style={{
                  background: isActive ? "linear-gradient(135deg, #1f2b55, #162046)" : "white",
                  borderColor: isActive ? "#1f2b55" : "#dfe3ef",
                  color: isActive ? "white" : "#4e5a7b",
                  fontFamily: "'Trebuchet MS', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl"
                    style={{ background: "#ef8a22" }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── BOARD OF REGENTS ── */}
        {activeTab === "Board of Regents" && (
          <div key="board">
            {/* Header card */}
            <div
              className="relative overflow-hidden rounded-2xl px-8 py-8 mb-8 border border-[#d97706]"
              style={{ background: "linear-gradient(150deg, #ef8a22 0%, #d97706 55%, #b45309 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div
                className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-25 pointer-events-none"
                style={{ background: "radial-gradient(circle, #fff7ed, transparent 70%)" }}
              />
              <div className="relative flex items-center gap-3 mb-1">
                <Award className="w-5 h-5 text-white/80" />
                <span
                  className="text-xs font-bold uppercase tracking-widest text-white/80"
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                >
                  Governing Body
                </span>
              </div>
              <h2 className="relative text-3xl md:text-4xl font-extrabold text-white">Board of Regents</h2>
              <p className="relative mt-1 text-white/70 text-sm">
                Pamantasan ng Lungsod ng Valenzuela
              </p>
            </div>

            {/* Board members cards */}
            <div
              className="relative overflow-hidden rounded-2xl border border-[#dfe3ef] px-4 py-5 md:px-6 md:py-6"
              style={{ background: "linear-gradient(135deg, #f7f8fd 0%, #eef2fa 100%)" }}
            >
              <div className="mx-auto max-w-[760px] grid grid-cols-1 gap-3">
                {cmsContent?.boardOfRegents?.members
                  ? cmsContent.boardOfRegents.members.map((member) => (
                    <div
                      key={member.id}
                      className="relative overflow-hidden rounded-xl border border-[#d9deec] bg-[#fcfdff] px-4 py-3 shadow-[0_1px_0_rgba(31,43,85,0.05)] text-center"
                    >
                      <span
                        className="pointer-events-none absolute -right-1 -bottom-2 text-[36px] font-black opacity-[0.04] leading-none select-none"
                        style={{ color: "#1f2b55", fontFamily: "'Georgia', serif" }}
                      >
                        PLV
                      </span>
                      <p
                        className="text-[9px] font-black uppercase tracking-widest leading-none mb-1"
                        style={{ color: "#7a8398", fontFamily: "'Trebuchet MS', sans-serif" }}
                      >
                        {member.position}
                      </p>
                      <p
                        className="text-[15px] font-extrabold text-[#1f2b55] leading-tight"
                        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                      >
                        {member.name}
                      </p>
                    </div>
                  ))
                  : boardMembers.flatMap((group) =>
                    group.names.map((name) => (
                      <div
                        key={`${group.role}-${name}`}
                        className="relative overflow-hidden rounded-xl border border-[#d9deec] bg-[#fcfdff] px-4 py-3 shadow-[0_1px_0_rgba(31,43,85,0.05)] text-center"
                      >
                        <span
                          className="pointer-events-none absolute -right-1 -bottom-2 text-[36px] font-black opacity-[0.04] leading-none select-none"
                          style={{ color: "#1f2b55", fontFamily: "'Georgia', serif" }}
                        >
                          PLV
                        </span>
                        <p
                          className="text-[9px] font-black uppercase tracking-widest leading-none mb-1"
                          style={{ color: "#7a8398", fontFamily: "'Trebuchet MS', sans-serif" }}
                        >
                          {group.role}
                        </p>
                        <p
                          className="text-[15px] font-extrabold text-[#1f2b55] leading-tight"
                          style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                        >
                          {name}
                        </p>
                      </div>
                    ))
                  )
                }
              </div>
            </div>
          </div>
        )}

        {/* ── ORGANIZATIONAL CHART ── */}
        {activeTab === "Organizational Chart" && (
          <div key="orgchart">
            {/* Header card */}
            <div
              className="relative overflow-hidden rounded-2xl px-8 py-8 mb-8 border border-[#d97706]"
              style={{ background: "linear-gradient(150deg, #ef8a22 0%, #d97706 55%, #b45309 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div
                className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-25 pointer-events-none"
                style={{ background: "radial-gradient(circle, #fff7ed, transparent 70%)" }}
              />
              <div className="relative flex items-center gap-3 mb-1">
                <Users className="w-5 h-5 text-white/80" />
                <span
                  className="text-xs font-bold uppercase tracking-widest text-white/80"
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                >
                  CEIT Structure
                </span>
              </div>
              <h2 className="relative text-3xl md:text-4xl font-extrabold text-white">Organizational Chart</h2>
              <p className="relative mt-1 text-white/60 text-sm">
                College of Engineering and Information Technology
              </p>
            </div>

            {/* Mobile list */}
            <div className="space-y-3 lg:hidden mx-auto max-w-[420px]">
              <OrgNode {...org(0)} />
              <OrgNode {...org(1)} />
              <OrgNode {...org(2)} compact />
              <OrgNode {...org(3)} compact />
              <OrgNode {...org(4)} compact />
              <OrgNode {...org(5)} compact />
              <OrgNode {...org(6)} compact />
              <OrgNode {...org(7)} compact />
              <OrgNode {...org(8)} compact />
              <OrgNode {...org(9)} compact />
            </div>

            {/* Desktop tree */}
            <div className="hidden lg:block overflow-x-auto pb-4">
              <div className="mx-auto min-w-[1040px] text-center">

                <OrgNode {...org(0)} />
                <div className="mx-auto h-8 w-px bg-[#dfe3ef]" />

                <OrgNode {...org(1)} />
                <div className="mx-auto h-8 w-px bg-[#dfe3ef]" />

                {/* Dean + Secretary side by side */}
                <div className="relative mx-auto w-[620px]">
                  <div className="absolute left-1/2 top-1/2 h-px w-[360px] -translate-x-1/2 -translate-y-1/2 bg-[#dfe3ef]" />
                  <div className="relative flex items-center justify-center gap-6">
                    <OrgNode {...org(2)} compact accent="#ef8a22" />
                    <OrgNode {...org(3)} compact />
                  </div>
                </div>

                <div className="mx-auto h-8 w-px bg-[#dfe3ef]" />
                <div className="mx-auto h-px w-[680px] bg-[#dfe3ef]" />

                <div className="mx-auto mb-2 flex w-[680px] justify-between">
                  <div className="h-8 w-px bg-[#dfe3ef]" />
                  <div className="h-8 w-px bg-[#dfe3ef]" />
                  <div className="h-8 w-px bg-[#dfe3ef]" />
                </div>

                {/* Dept chairs */}
                <div className="flex justify-center gap-10">
                  <OrgNode {...org(4)} compact accent="#10b981" />
                  <OrgNode {...org(5)} compact accent="#f59e0b" />
                  <OrgNode {...org(6)} compact accent="#3b82f6" />
                </div>

                <div className="mx-auto mt-2 mb-2 flex w-[980px] justify-between px-[100px]">
                  <div className="h-8 w-px bg-[#dfe3ef]" />
                  <div className="h-8 w-px bg-[#dfe3ef]" />
                  <div className="h-8 w-px bg-[#dfe3ef]" />
                </div>

                {/* Research coordinators */}
                <div className="flex justify-center gap-10">
                  <OrgNode {...org(7)} compact accent="#10b981" />
                  <OrgNode {...org(8)} compact accent="#f59e0b" />
                  <OrgNode {...org(9)} compact accent="#3b82f6" />
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdministrationPage;
