"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, Cpu, Building2, Zap } from "lucide-react";

type ProgramCode = "BSIT" | "BSEE" | "BSCE";

type CurriculumInfo = {
  name: string;
  shortName: string;
  icon: React.ReactNode;
  accentColor: string;
  border: string;
  bg: string;
  paragraphs: string[];
  focusAreas: { title: string; detail: string }[];
};

const curriculumData: Record<ProgramCode, CurriculumInfo> = {
  BSIT: {
    name: "Bachelor of Science in Information Technology",
    shortName: "Information Technology",
    icon: <Cpu className="w-5 h-5" />,
    accentColor: "#3b82f6",
    border: "border-blue-200",
    bg: "bg-blue-50",
    paragraphs: [
      "The Bachelor of Science in Information Technology curriculum emphasizes quantitative and communications skills as well as providing a foundation in business environments. Upon graduation, students will receive the degree of Bachelor of Science in Information Technology.",
      "Graduates of this program will qualify for employment as entry-level computer software applications engineers, computer and information systems managers, computer systems analysts, network systems professionals and computer systems software engineers.",
      "BSIT students may specialize in technology or management domains including Network and Systems Engineering, Software Engineering, Information Systems Administration and Telecommunications.",
    ],
    focusAreas: [
      { title: "Network and Systems Engineering", detail: "Infrastructure design, systems integration, and administration" },
      { title: "Software Engineering", detail: "Software analysis, design, development, and quality assurance" },
      { title: "Information Systems Administration", detail: "Enterprise systems, data management, and operations support" },
      { title: "Telecommunications", detail: "Communication systems, connectivity, and network services" },
    ],
  },
  BSEE: {
    name: "Bachelor of Science in Electrical Engineering",
    shortName: "Electrical Engineering",
    icon: <Zap className="w-5 h-5" />,
    accentColor: "#f59e0b",
    border: "border-amber-200",
    bg: "bg-amber-50",
    paragraphs: [
      "The Electrical Engineering curriculum is designed to develop engineers equipped with knowledge in Mathematics, Natural Sciences, Engineering Sciences, Allied Courses, and Professional Electrical Engineering Courses to ensure a strong theoretical and analytical foundation. General Education courses are included to ensure that graduates understand and develop communication skills, critical thinking, and ethical responsibility within the context of society.",
      "The Professional Electrical Engineering Courses in the curriculum cover power systems, electrical machines, control systems, instrumentation, and electrical design, among others. Laboratory activities, research projects, and internships will further enhance the acquired knowledge and ability to solve and analyze related problems through hands-on skills, demonstration, and industry exposure.",
      "The curriculum ensures that the graduates will acquire the competencies required to promote technical proficiency, teamwork, ethical practices, and lifelong learning as a preparation for professional practice, licensure board examinations, and continuous development in the industry.",
    ],
    focusAreas: [
      { title: "Mathematics and Natural Sciences", detail: "Builds a strong theoretical and analytical foundation for engineering practice" },
      { title: "Engineering and Allied Courses", detail: "Develops technical depth and multidisciplinary understanding in electrical engineering contexts" },
      { title: "Professional Electrical Engineering Courses", detail: "Covers power systems, electrical machines, control systems, instrumentation, and electrical design" },
      { title: "Laboratory, Research, and Internship", detail: "Enhances hands-on skills, problem-solving ability, and industry readiness through practical exposure" },
      { title: "General Education and Professional Formation", detail: "Strengthens communication, critical thinking, ethics, teamwork, and lifelong learning" },
    ],
  },
  BSCE: {
    name: "Bachelor of Science in Civil Engineering",
    shortName: "Civil Engineering",
    icon: <Building2 className="w-5 h-5" />,
    accentColor: "#10b981",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    paragraphs: [
      "Civil engineering deals with the design, construction and maintenance of physical and naturally built environments, including works such as bridges, roads, canals, dams and buildings. This field is traditionally broken into several subdisciplines, including environmental engineering, geotechnical engineering, structural engineering, transportation engineering, municipal or urban engineering, water sources engineering, materials engineering, coastal engineering, surveying and construction engineering. Civil engineering takes place in all levels: in the public sector from municipal to national levels, and in the private sector from individual home owners to international companies.",
    ],
    focusAreas: [
      { title: "Civil Engineering Curriculum", detail: "Civil engineering deals with the design, construction and maintenance of physical and naturally built environments, including works such as bridges, roads, canals, dams and buildings." },
      { title: "Subdisciplines", detail: "Environmental engineering, geotechnical engineering, structural engineering, transportation engineering, municipal or urban engineering, water sources engineering, materials engineering, coastal engineering, surveying and construction engineering." },
      { title: "Scope of Practice", detail: "Civil engineering takes place in all levels: in the public sector from municipal to national levels, and in the private sector from individual home owners to international companies." },
    ],
  },
};

export default function CurriculumPage() {
  const [activeProgram, setActiveProgram] = useState<ProgramCode>("BSIT");
  const current = curriculumData[activeProgram];

  return (
    <div className="min-h-screen bg-[#f2f4fb]">

      {/* ── HERO BANNER ── */}
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
            <span>Academics</span>
            <span className="text-[#ef8a22]">›</span>
            <span className="text-white/80">Curriculum</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight">Curriculum</h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />
          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
            Explore the curriculum details and focus areas for BSIT, BSEE, and BSCE.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12 md:py-16">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-5 h-5 text-[#ef8a22]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#ef8a22]"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            Programs Offered
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#dfe3ef] to-transparent" />
        </div>

        {/* ── PROGRAM SELECTOR CARDS ── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {(["BSIT", "BSEE", "BSCE"] as ProgramCode[]).map((code) => {
            const prog = curriculumData[code];
            const isActive = activeProgram === code;
            return (
              <button
                key={code}
                onClick={() => setActiveProgram(code)}
                className={`group relative rounded-2xl border p-5 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${isActive
                  ? `${prog.bg} ${prog.border} shadow-md -translate-y-0.5`
                  : "bg-white border-[#dfe3ef] hover:border-[#c8cfe8]"
                  }`}
              >
                {/* Watermark */}
                <span
                  className="absolute -right-1 -bottom-2 text-[52px] font-black opacity-[0.06] select-none pointer-events-none leading-none"
                  style={{ color: prog.accentColor, fontFamily: "'Georgia', serif" }}
                >
                  {code}
                </span>

                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors"
                  style={{
                    background: isActive ? `${prog.accentColor}20` : "#f2f4fb",
                    border: `1px solid ${isActive ? prog.accentColor + "40" : "#dfe3ef"}`,
                    color: isActive ? prog.accentColor : "#4e5a7b",
                  }}
                >
                  {prog.icon}
                </div>

                <p
                  className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                  style={{
                    color: isActive ? prog.accentColor : "#4e5a7b",
                    fontFamily: "'Trebuchet MS', sans-serif",
                  }}
                >
                  {code}
                </p>
                <p className={`text-sm font-semibold leading-snug ${isActive ? "text-[#1f2b55]" : "text-[#4e5a7b]"}`}>
                  {prog.shortName}
                </p>

                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl"
                    style={{ background: prog.accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── CONTENT PANEL ── */}
        <div
          key={activeProgram}
          className="rounded-2xl overflow-hidden bg-white border border-[#dfe3ef] shadow-sm"
        >
          {/* Panel header */}
          <div
            className="px-7 py-5 flex items-center gap-4 border-b border-[#dfe3ef]"
            style={{ background: "linear-gradient(135deg, #f7f8fd 0%, #f2f4fb 100%)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${current.accentColor}18`,
                border: `1px solid ${current.accentColor}35`,
                color: current.accentColor,
              }}
            >
              {current.icon}
            </div>
            <div>
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: current.accentColor, fontFamily: "'Trebuchet MS', sans-serif" }}
              >
                {activeProgram} · 4-Year Program
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#1f2b55] leading-tight">
                {current.name}
              </h2>
            </div>
          </div>

          {/* Panel body */}
          <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#dfe3ef]">

            {/* Overview */}
            <div className="md:col-span-3 px-7 py-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#ef8a22]" />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-[#4e5a7b]"
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                >
                  Program Overview
                </span>
              </div>
              <div className="space-y-4">
                {current.paragraphs.map((para, i) => (
                  <p key={i} className="text-[15px] text-[#4e5a7b] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Focus Areas */}
            <div className="md:col-span-2 px-7 py-8">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-[#ef8a22]" />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-[#4e5a7b]"
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                >
                  Focus Areas
                </span>
              </div>
              <ul className="space-y-2.5">
                {current.focusAreas.map((item, idx) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl p-3.5 border border-[#dfe3ef] bg-[#f7f8fd] transition-all duration-150 hover:border-[#c8cfe8] hover:bg-white hover:shadow-sm"
                  >
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
                      style={{
                        background: `${current.accentColor}15`,
                        color: current.accentColor,
                        border: `1px solid ${current.accentColor}30`,
                        fontFamily: "'Trebuchet MS', sans-serif",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-[#1f2b55] leading-snug">{item.title}</p>
                      <p className="text-xs mt-0.5 text-[#4e5a7b] leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom accent strip */}
          <div
            className="h-[3px]"
            style={{ background: `linear-gradient(to right, ${current.accentColor}, ${current.accentColor}30, transparent)` }}
          />
        </div>

        {/* ── STATS STRIP ── */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { label: "Programs Offered", value: "3" },
            { label: "Years Duration", value: "4" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white border border-[#dfe3ef] px-5 py-4 flex flex-col items-center text-center shadow-sm"
            >
              <span
                className="text-2xl font-extrabold text-[#ef8a22]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] text-[#4e5a7b] mt-0.5 uppercase tracking-wider"
                style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
