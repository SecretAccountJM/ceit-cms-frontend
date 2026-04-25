"use client";

import { useState, useEffect } from "react";
import { Check, BookOpen, GraduationCap, ClipboardList, Cpu, Building2, Zap, ChevronDown } from "lucide-react";
import { fetchSiteContent } from "@/lib/api";

interface AcademicsContent {
  aboutCEIT: { description: string; bulletPoints: { id: string; text: string }[] };
  coreValues: { id: string; text: string }[];
  collegeAim: { id: string; text: string }[];
  academicSupport: { id: string; text: string }[];
  admission: string;
}

type AcademicTab = "About CEIT" | "Programs Offered" | "Admission";
type ProgramCode = "BSIT" | "BSEE" | "BSCE";

type ProgramInfo = {
  code: ProgramCode;
  name: string;
  shortName: string;
  accentColor: string;
  border: string;
  bg: string;
  icon: React.ReactNode;
  overview: string;
  outcomes: string[];
  focusAreas: { title: string; detail: string }[];
  careers: string[];
};

const topTabs: AcademicTab[] = ["About CEIT", "Programs Offered", "Admission"];

const programs: Record<ProgramCode, ProgramInfo> = {
  BSCE: {
    code: "BSCE",
    name: "Bachelor of Science in Civil Engineering",
    shortName: "Civil Engineering",
    accentColor: "#10b981",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    icon: <Building2 className="w-5 h-5" />,
    overview: `Civil engineering deals with the design, construction and maintenance of physical and naturally built environments, including works such as bridges, roads, canals, dams and buildings. This field is traditionally broken into several subdisciplines, including environmental engineering, geotechnical engineering, structural engineering, transportation engineering, municipal or urban engineering, water sources engineering, materials engineering, coastal engineering, surveying and construction engineering. Civil engineering takes place in all levels: in the public sector from municipal to national levels, and in the private sector from individual home owners to international companies.

The University will produce Civil Engineering graduates who will:
- Highly establish themselves in their specialized field of civil engineering and able to provide technical solutions to complex engineering problems;
- Continuously adapt to the developing needs of the profession by pursuing career improvement through studies and trainings;
- Involve themselves to the community to promote social and ethical responsibility, awareness and development.`,
    outcomes: [
      "Ability to apply knowledge of mathematics and science to solve engineering problems.",
      "Ability to design and conduct experiments, as well as to analyze and interpret data.",
      "Ability to design a system, component or process to meet desired needs within realistic constraints such as economic, environmental, social, political, ethical, health and safety, manufacturability, and sustainability, in accordance with standards.",
      "Ability to function in multidisciplinary teams.",
      "Ability to identify, formulate and solve engineering problems.",
      "Understanding of professional and ethical responsibilities.",
      "Ability to communicate effectively.",
      "Broad education necessary to understand the impact of engineering solutions in global, economic, environmental and societal contexts.",
      "Recognition of the need for and an ability to engage in lifelong learning.",
      "Knowledge of contemporary issues.",
      "Ability to use techniques, skills and modern engineering tools necessary for engineering practice.",
      "Knowledge and understanding of engineering and management principles as a member and leader in a team, to manage projects in multidisciplinary environments.",
      "Understand at least one specialized field in Civil Engineering.",
    ],
    focusAreas: [
      { title: "Civil Engineering Curriculum", detail: "Civil engineering deals with the design, construction and maintenance of physical and naturally built environments, including works such as bridges, roads, canals, dams and buildings." },
      { title: "Subdisciplines", detail: "Environmental engineering, geotechnical engineering, structural engineering, transportation engineering, municipal or urban engineering, water sources engineering, materials engineering, coastal engineering, surveying and construction engineering." },
      { title: "Scope of Practice", detail: "Civil engineering takes place in all levels: in the public sector from municipal to national levels, and in the private sector from individual home owners to international companies." },
    ],
    careers: [
      "Project Manager", "Project Engineer", "Structural Engineer", "Resident Engineer",
      "Quantity Surveyor", "Quality Control Engineer", "Application Engineer", "Project Control Executive",
      "Site Engineer", "Planning Engineer", "Design Engineer", "Water and Sanitation Engineer",
    ],
  },
  BSEE: {
    code: "BSEE",
    name: "Bachelor of Science in Electrical Engineering",
    shortName: "Electrical Engineering",
    accentColor: "#f59e0b",
    border: "border-amber-200",
    bg: "bg-amber-50",
    icon: <Zap className="w-5 h-5" />,
    overview: `In today's world where computers, digital systems, and networks are deeply embedded in everyday life, the Computer Engineering program prepares students to become versatile and adaptive professionals. The program integrates core knowledge from computer science, electrical engineering, mathematics, and the natural sciences to develop a strong theoretical and practical foundation.

Recognizing the rapid evolution of computing technologies, the program emphasizes lifelong learning and continuous skills development. It distinguishes computer engineers by their ability to design and integrate hardware and software systems, going beyond simple assembly or configuration to solve complex and novel engineering problems while considering real-world constraints and trade-offs.

Graduates of the program are equipped with broad engineering knowledge and are prepared for professional practice, enabling them to contribute effectively to industry, research, and innovation in the ever-changing field of computer engineering.`,
    outcomes: [
      "Apply knowledge of mathematics and science to solve engineering problems.",
      "Design and conduct experiments, as well as analyze and interpret data.",
      "Design a system, component or process to meet desired needs within realistic constraints such as economic, environmental, social, political, ethical, health and safety, manufacturability, and sustainability, in accordance with standards.",
      "Function in multidisciplinary teams.",
      "Identify, formulate and solve engineering problems.",
      "Understand professional and ethical responsibilities.",
      "Communicate effectively.",
      "Have broad education necessary to understand the impact of engineering solutions in global, economic, environmental and societal contexts.",
      "Recognize the need for and have an ability to engage in lifelong learning.",
      "Have knowledge of contemporary issues.",
      "Use techniques, skills and modern engineering tools necessary for engineering practice.",
      "Have knowledge and understanding of engineering and management principles as a member and leader in a team, to manage projects in multidisciplinary environments.",
    ],
    focusAreas: [
      { title: "Mathematics and Natural Sciences", detail: "Builds a strong theoretical and analytical foundation for engineering practice" },
      { title: "Engineering and Allied Courses", detail: "Develops technical depth and multidisciplinary understanding in electrical engineering contexts" },
      { title: "Professional Electrical Engineering Courses", detail: "Covers power systems, electrical machines, control systems, instrumentation, and electrical design" },
      { title: "Laboratory, Research, and Internship", detail: "Enhances hands-on skills, problem-solving ability, and industry readiness through practical exposure" },
      { title: "General Education and Professional Formation", detail: "Strengthens communication, critical thinking, ethics, teamwork, and lifelong learning" },
    ],
    careers: [
      "Power Engineer (Power System Operation, Power System Protection, Power System Economics, Power Plant)",
      "Design Engineer (Advanced Power Systems, Advanced Electrical Design, Machine Automation, and Process Design)",
      "Illumination Engineer", "Entrepreneur", "Sales Engineer", "Distribution Engineer",
      "System Distribution Engineer", "Engineering Educator and Researcher",
      "Instrumentation and Control Engineer", "Safety Engineer",
      "Maintenance Engineer", "Construction and Project Engineer", "Electrical Design Inspector",
    ],
  },
  BSIT: {
    code: "BSIT",
    name: "Bachelor of Science in Information Technology",
    shortName: "Information Technology",
    accentColor: "#3b82f6",
    border: "border-blue-200",
    bg: "bg-blue-50",
    icon: <Cpu className="w-5 h-5" />,
    overview: `The Bachelor of Science in Information Technology curriculum emphasizes quantitative and communications skills as well as providing a foundation in business environments. Upon graduation, students will receive the degree of Bachelor of Science in Information Technology.

Graduates of this program will qualify for employment as entry-level computer software applications engineers, computer and information systems managers, computer systems analysts, network systems professionals and computer systems software engineers.

BSIT students may specialize in technology or management domains including Network and Systems Engineering, Software Engineering, Information Systems Administration and Telecommunications.`,
    outcomes: [
      "Ability to apply knowledge of computing, basic science and mathematics appropriate to the discipline and the program educational objectives.",
      "Ability to analyze a problem, and identify and define the computing requirements appropriate to the problem's solution.",
      "Ability to design, implement and evaluate the capability of a computer-based system, process, component or program to meet desired needs.",
      "Ability to function effectively on teams to accomplish a common goal.",
      "Ability to understand professional, ethical, legal, security and social issues and responsibilities.",
      "Ability to communicate effectively with a range of audiences.",
      "Ability to analyze the local and global impact of computing on individuals, organizations and society.",
      "Ability to recognize the need for and ability to engage in continuing professional development.",
      "Ability to use techniques, skills and tools necessary to current computing practice.",
    ],
    focusAreas: [
      { title: "Network and Systems Engineering", detail: "Infrastructure design, systems integration, and administration" },
      { title: "Software Engineering", detail: "Software analysis, design, development, and quality assurance" },
      { title: "Information Systems Administration", detail: "Enterprise systems, data management, and operations support" },
      { title: "Telecommunications", detail: "Communication systems, connectivity, and network services" },
    ],
    careers: [
      "Entry-level Computer Software Applications Engineer",
      "Computer and Information Systems Manager",
      "Computer Systems Analyst",
      "Network Systems Professional",
      "Computer Systems Software Engineer",
      "Network and Systems Engineering",
      "Software Engineering",
      "Information Systems Administration",
      "Telecommunications",
    ],
  },
};

const defaultCoreValues = [
  { label: "Academic Excellence", color: "#ef8a22" },
  { label: "Integrity and Professional Leadership", color: "#3b82f6" },
  { label: "Scholarly Research", color: "#10b981" },
  { label: "Commitment to Service", color: "#f59e0b" },
  { label: "Lifelong Learning", color: "#8b5cf6" },
];

const coreValueColors = ["#ef8a22", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const Academics = () => {
  const [activeTab, setActiveTab] = useState<AcademicTab>("About CEIT");
  const [activeProgram, setActiveProgram] = useState<ProgramCode | null>(null);
  const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false);
  const [cmsContent, setCmsContent] = useState<AcademicsContent | null>(null);

  useEffect(() => {
    fetchSiteContent<AcademicsContent>("academics").then((data) => {
      if (data) setCmsContent(data);
    });
  }, []);

  const coreValues = cmsContent
    ? cmsContent.coreValues.map((v, i) => ({ label: v.text, color: coreValueColors[i % coreValueColors.length] }))
    : defaultCoreValues;

  const bulletPoints = cmsContent
    ? cmsContent.aboutCEIT.bulletPoints.map((bp) => bp.text)
    : [
        "Acquire full understanding of scientific principles and knowledge in their respective fields",
        "Develop a high level of competence in engineering and IT methods and applications",
        "Communicate effectively and succinctly the results of technical studies (both verbally and in writing)",
        "Nurture the desire for continuing professional growth and explore new horizons in technology",
        "Imbue graduates with socially and morally sound motivations and principles",
      ];

  const collegeAims = cmsContent
    ? cmsContent.collegeAim.map((a) => a.text)
    : [
        "To become the premiere institution of higher learning in Valenzuela City",
        "To produce competent and committed engineers and IT professionals",
        "To contribute to the development of the City of Valenzuela and the nation",
      ];

  const academicSupport = cmsContent
    ? cmsContent.academicSupport.map((s) => s.text)
    : [
        "Engineering seminars and review sessions for graduating students",
        "Assessment examinations to monitor board exam readiness",
        "Laboratory facilities for hands-on learning",
        "Industry linkages and research engagements",
      ];

  const currentProgram = activeProgram ? programs[activeProgram] : null;

  const handleTabChange = (tab: AcademicTab) => {
    if (tab === "Programs Offered") {
      setIsProgramMenuOpen((prev) => !prev);
    } else {
      setActiveTab(tab);
      setIsProgramMenuOpen(false);
    }
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
        <div className="relative max-w-[1400px] mx-auto px-5 md:px-12">
          <div
            className="flex items-center gap-2 text-white/50 text-xs mb-4 uppercase tracking-widest"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            <span>Home</span>
            <span className="text-[#ef8a22]">›</span>
            <span className="text-white/80">Academics</span>
          </div>
          <h1 className="relative text-6xl md:text-7xl font-extrabold text-white">Academics</h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />
          <p className="relative text-lg text-white/90 mt-4 max-w-2xl leading-relaxed">
            Discover our programs designed to inspire, challenge, and prepare you for success in a rapidly changing world.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-12 md:py-16">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-5 h-5 text-[#ef8a22]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#ef8a22]"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            College of Engineering &amp; IT
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#dfe3ef] to-transparent" />
        </div>

        {/* ── TABS ── */}
        {/* Mobile */}
        <div className="space-y-2 lg:hidden mb-6">
          {topTabs.map((tab) => {
            const isActive = activeTab === tab || (tab === "Programs Offered" && isProgramMenuOpen);
            return (
              <div key={tab}>
                <button
                  onClick={() => handleTabChange(tab)}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold border transition-all duration-200"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #1f2b55, #162046)" : "white",
                    borderColor: isActive ? "#1f2b55" : "#dfe3ef",
                    color: isActive ? "white" : "#4e5a7b",
                    fontFamily: "'Trebuchet MS', sans-serif",
                  }}
                >
                  {tab}
                  {tab === "Programs Offered" && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProgramMenuOpen ? "rotate-180" : ""}`} />
                  )}
                </button>
                {tab === "Programs Offered" && isProgramMenuOpen && (
                  <div className="mt-1 space-y-1 pl-3">
                    {(["BSIT", "BSEE", "BSCE"] as ProgramCode[]).map((code) => {
                      const prog = programs[code];
                      return (
                        <button
                          key={code}
                          onClick={() => { setActiveProgram(code); setActiveTab("Programs Offered"); setIsProgramMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold border transition-all"
                          style={{
                            background: activeProgram === code ? `${prog.accentColor}15` : "white",
                            borderColor: activeProgram === code ? `${prog.accentColor}50` : "#dfe3ef",
                            color: activeProgram === code ? prog.accentColor : "#4e5a7b",
                            fontFamily: "'Trebuchet MS', sans-serif",
                          }}
                        >
                          <span style={{ color: prog.accentColor }}>{prog.icon}</span>
                          {code} — {prog.shortName}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop tabs */}
        <div className="hidden lg:flex flex-wrap gap-2 mb-8">
          {topTabs.map((tab) => {
            const isActive = activeTab === tab || (tab === "Programs Offered" && isProgramMenuOpen);
            return (
              <div key={tab} className="relative">
                <button
                  onClick={() => handleTabChange(tab)}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold border transition-all duration-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #1f2b55, #162046)" : "white",
                    borderColor: isActive ? "#1f2b55" : "#dfe3ef",
                    color: isActive ? "white" : "#4e5a7b",
                    fontFamily: "'Trebuchet MS', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl" style={{ background: "#ef8a22" }} />
                  )}
                  {tab === "About CEIT" && <BookOpen className="w-4 h-4" />}
                  {tab === "Programs Offered" && <GraduationCap className="w-4 h-4" />}
                  {tab === "Admission" && <ClipboardList className="w-4 h-4" />}
                  {tab}
                  {tab === "Programs Offered" && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isProgramMenuOpen ? "rotate-180" : ""}`} />
                  )}
                </button>

                {/* Programs dropdown */}
                {tab === "Programs Offered" && isProgramMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 z-20 bg-white rounded-2xl border border-[#dfe3ef] shadow-xl overflow-hidden w-72">
                    {(["BSIT", "BSEE", "BSCE"] as ProgramCode[]).map((code) => {
                      const prog = programs[code];
                      return (
                        <button
                          key={code}
                          onClick={() => { setActiveProgram(code); setActiveTab("Programs Offered"); setIsProgramMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-5 py-3.5 text-left border-b border-[#f2f4fb] last:border-b-0 transition-all hover:bg-[#f7f8fd]"
                        >
                          <span style={{ color: prog.accentColor }}>{prog.icon}</span>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest" style={{ color: prog.accentColor, fontFamily: "'Trebuchet MS', sans-serif" }}>{code}</p>
                            <p className="text-sm font-semibold text-[#1f2b55]">{prog.shortName}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <div key={`${activeTab}-${activeProgram ?? "none"}`}>

          {/* ABOUT CEIT */}
          {activeTab === "About CEIT" && (
            <div className="space-y-6">
              {/* Header card */}
              <div
                className="relative overflow-hidden rounded-2xl px-8 py-8 border border-[#dfe3ef]"
                style={{ background: "linear-gradient(150deg, #1f2b55 0%, #162046 55%, #1b2a52 100%)" }}
              >
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #ef8a22, transparent 70%)" }} />
                <div className="relative flex items-center gap-3 mb-1">
                  <BookOpen className="w-5 h-5 text-[#ef8a22]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ef8a22]"
                    style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>About the College</span>
                </div>
                <h2 className="relative text-3xl md:text-4xl font-extrabold text-white">About CEIT</h2>
                <p className="relative mt-1 text-white/60 text-sm">College of Engineering and Information Technology</p>
              </div>

              {/* Programs overview */}
              <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                  <h3 className="text-lg font-extrabold text-[#1f2b55]">Programs Designed To</h3>
                </div>
                <div className="px-7 py-6 grid md:grid-cols-2 gap-3">
                  {bulletPoints.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                      <Check className="w-4 h-4 text-[#ef8a22] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Core Values */}
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-lg font-extrabold text-[#1f2b55]">Core Values</h3>
                  </div>
                  <div className="px-7 py-6 space-y-2">
                    {coreValues.map((val) => (
                      <div key={val.label} className="flex items-center gap-3 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: val.color }} />
                        <p className="text-sm font-semibold text-[#1f2b55]">{val.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* College Aim */}
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-lg font-extrabold text-[#1f2b55]">College Aim</h3>
                  </div>
                  <div className="px-7 py-6 space-y-3">
                    {collegeAims.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                          style={{ background: "#ef8a2215", color: "#ef8a22", border: "1px solid #ef8a2230", fontFamily: "'Trebuchet MS', sans-serif" }}>
                          {i + 1}
                        </span>
                        <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic Support */}
              <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                  <h3 className="text-lg font-extrabold text-[#1f2b55]">Academic Support &amp; Training</h3>
                </div>
                <div className="px-7 py-6 grid md:grid-cols-2 gap-3">
                  {academicSupport.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                      <Check className="w-4 h-4 text-[#ef8a22] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROGRAMS OFFERED */}
          {activeTab === "Programs Offered" && (
            <div>
              {!currentProgram ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(["BSIT", "BSEE", "BSCE"] as ProgramCode[]).map((code) => {
                    const prog = programs[code];
                    return (
                      <button
                        key={code}
                        onClick={() => setActiveProgram(code)}
                        className={`group relative rounded-2xl border p-6 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${prog.bg} ${prog.border}`}
                      >
                        <span className="absolute -right-1 -bottom-2 text-[52px] font-black opacity-[0.06] select-none pointer-events-none leading-none"
                          style={{ color: prog.accentColor, fontFamily: "'Georgia', serif" }}>{code}</span>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                          style={{ background: `${prog.accentColor}20`, border: `1px solid ${prog.accentColor}40`, color: prog.accentColor }}>
                          {prog.icon}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1"
                          style={{ color: prog.accentColor, fontFamily: "'Trebuchet MS', sans-serif" }}>{code}</p>
                        <p className="text-base font-extrabold text-[#1f2b55] leading-snug">{prog.name}</p>
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl"
                          style={{ background: prog.accentColor }} />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Program selector mini-tabs */}
                  <div className="flex flex-wrap gap-2">
                    {(["BSIT", "BSEE", "BSCE"] as ProgramCode[]).map((code) => {
                      const prog = programs[code];
                      const isActive = activeProgram === code;
                      return (
                        <button key={code} onClick={() => setActiveProgram(code)}
                          className={`relative rounded-2xl border px-5 py-2.5 text-sm font-bold overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${isActive ? `${prog.bg} ${prog.border}` : "bg-white border-[#dfe3ef]"}`}
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest block"
                            style={{ color: isActive ? prog.accentColor : "#4e5a7b", fontFamily: "'Trebuchet MS', sans-serif" }}>{code}</span>
                          <span className={`text-xs ${isActive ? "text-[#1f2b55]" : "text-[#4e5a7b]"}`}>{prog.shortName}</span>
                          {isActive && <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: prog.accentColor }} />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Program header card */}
                  <div className="relative overflow-hidden rounded-2xl px-8 py-7 border"
                    style={{ background: `linear-gradient(135deg, ${currentProgram.accentColor}18, ${currentProgram.accentColor}08)`, borderColor: `${currentProgram.accentColor}40` }}>
                    <div className="absolute top-0 right-0 w-48 h-48 blur-3xl opacity-20 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${currentProgram.accentColor}, transparent 70%)` }} />
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${currentProgram.accentColor}20`, border: `1px solid ${currentProgram.accentColor}40`, color: currentProgram.accentColor }}>
                        {currentProgram.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest"
                          style={{ color: currentProgram.accentColor, fontFamily: "'Trebuchet MS', sans-serif" }}>
                          {currentProgram.code} · 4-Year Program
                        </span>
                        <h3 className="text-xl md:text-2xl font-extrabold text-[#1f2b55] leading-tight">{currentProgram.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Overview + Outcomes two-col */}
                  <div className="grid md:grid-cols-5 gap-6">
                    <div className="md:col-span-3 rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                      <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#ef8a22]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4e5a7b]"
                            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Program Overview</span>
                        </div>
                      </div>
                      <div className="px-7 py-6 space-y-3">
                        {currentProgram.overview.trim().split("\n\n").map((para, i) => (
                          <p key={i} className="text-[15px] text-[#4e5a7b] leading-relaxed whitespace-pre-line">{para}</p>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                      <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#ef8a22]" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4e5a7b]"
                            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Student Outcomes</span>
                        </div>
                      </div>
                      <div className="px-7 py-6 space-y-2 max-h-[460px] overflow-y-auto">
                        {currentProgram.outcomes.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5"
                              style={{ background: `${currentProgram.accentColor}15`, color: currentProgram.accentColor, border: `1px solid ${currentProgram.accentColor}30`, fontFamily: "'Trebuchet MS', sans-serif" }}>
                              {i + 1}
                            </span>
                            <p className="text-xs text-[#4e5a7b] leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Careers */}
                  <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-[#ef8a22]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#4e5a7b]"
                          style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Career Opportunities</span>
                      </div>
                    </div>
                    <div className="px-7 py-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentProgram.careers.map((career, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                          <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: currentProgram.accentColor }} />
                          <p className="text-sm text-[#4e5a7b] leading-relaxed">{career}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ADMISSION */}
          {activeTab === "Admission" && (
            <div className="space-y-6">
              {/* Header card - orange */}
              <div
                className="relative overflow-hidden rounded-2xl px-8 py-8 border border-[#d97706]"
                style={{ background: "linear-gradient(150deg, #ef8a22 0%, #d97706 55%, #b45309 100%)" }}
              >
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-25 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #fff7ed, transparent 70%)" }} />
                <div className="relative flex items-center gap-3 mb-1">
                  <ClipboardList className="w-5 h-5 text-white/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80"
                    style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Enrollment</span>
                </div>
                <h2 className="relative text-3xl md:text-4xl font-extrabold text-white">Admission Requirements</h2>
                <p className="relative mt-1 text-white/70 text-sm">PLV-CAT Academic Year 2026–2027</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Eligibility */}
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-base font-extrabold text-[#1f2b55]">Who May Apply</h3>
                  </div>
                  <div className="px-7 py-6 space-y-3">
                    {[
                      "Grade 12 students expected to graduate at the end of Academic Year 2025-2026.",
                      "Graduate of Senior High School of the previous Academic Year (2024-2025 and below) who have not enrolled in any Colleges and or Universities.",
                      "College Transferee — must be an incoming 2nd year level student at the time of application for the PLV-CAT 2026.",
                      "Alternative Learning System (ALS) or PEPT completers whose eligibility is equivalent to a Senior High School Graduate.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5"
                          style={{ background: "#ef8a2215", color: "#ef8a22", border: "1px solid #ef8a2230", fontFamily: "'Trebuchet MS', sans-serif" }}>{i + 1}</span>
                        <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policies */}
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-base font-extrabold text-[#1f2b55]">Policies &amp; Qualifications</h3>
                  </div>
                  <div className="px-7 py-6 space-y-2">
                    {[
                      "The applicant must be a registered voter of Valenzuela City.",
                      "One (1) or both biological parents must be a registered voter of Valenzuela City.",
                      "The applicant must be a Filipino citizen.",
                      "Must comply with the Academic Residency Requirements — a graduate of any Public or Private School in Valenzuela City.",
                      "Must comply with the Grade Requirements.",
                      "Must TAKE and PASS the PLV-CAT for Academic Year 2026-2027.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#ef8a22] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Retention */}
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-base font-extrabold text-[#1f2b55]">Academic Retention</h3>
                  </div>
                  <div className="px-7 py-6 space-y-2">
                    {[
                      "Students enrolled in 24 units or more: accumulation of 12 units or more of failed courses.",
                      "Students enrolled in fewer than 24 units: failure of 50% or more of the total enrolled courses.",
                      "All INC grade requirements must be completed before the last day of enrollment of the succeeding semester; otherwise converted to a failing grade.",
                      "Prerequisites for courses shall not be waived, except for students with fourth-year status, subject to Department evaluation.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-[#dfe3ef] bg-[#f7f8fd] hover:bg-white hover:shadow-sm transition-all">
                        <Check className="w-4 h-4 text-[#ef8a22] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shifting */}
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-base font-extrabold text-[#1f2b55]">Shifting Requirements</h3>
                  </div>
                  <div className="px-7 py-6 space-y-2">
                    {[
                      "Must be an incoming second-year student.",
                      "A minimum grade of 2.50 in all General Education, PATHFIT, and NSTP courses.",
                      "Passing results in the shifting examination and interview.",
                      "Availability of slots in the receiving department.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#ef8a22] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#4e5a7b] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grading + Contacts side by side */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                    <h3 className="text-base font-extrabold text-[#1f2b55]">Grading System</h3>
                  </div>
                  <div className="px-7 py-6">
                    <p className="text-sm text-[#4e5a7b] mb-3">The University uses the ten-point grading system.</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        ["1.00", "97–100"], ["1.25", "94–96"], ["1.50", "91–93"], ["1.75", "88–90"],
                        ["2.00", "85–87"], ["2.25", "82–84"], ["2.50", "79–81"], ["2.75", "76–78"],
                        ["3.00", "75"], ["5.00", "Failed"],
                      ].map(([grade, range]) => (
                        <div key={grade} className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#dfe3ef] bg-[#f7f8fd]">
                          <span className="text-xs font-black text-[#1f2b55]" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>{grade}</span>
                          <span className="text-xs text-[#4e5a7b]">{range}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {["INC — Incomplete", "W — Withdrawn", "D — Dropped", "U.D — Unofficially Dropped"].map((item) => (
                        <span key={item} className="text-[10px] px-2.5 py-1 rounded-full border border-[#dfe3ef] bg-[#f7f8fd] text-[#4e5a7b]"
                          style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                      <h3 className="text-base font-extrabold text-[#1f2b55]">Curriculum Offerings</h3>
                    </div>
                    <div className="px-7 py-5 space-y-2">
                      {["BSCE — Civil Engineering", "BSCpE — Computer Engineering", "BSECE — Electronics Engineering", "BSEE — Electrical Engineering", "BSIT — Information Technology"].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-[#ef8a22] flex-shrink-0" />
                          <p className="text-sm text-[#4e5a7b]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-[#dfe3ef] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#dfe3ef]" style={{ background: "linear-gradient(135deg, #f7f8fd, #f2f4fb)" }}>
                      <h3 className="text-base font-extrabold text-[#1f2b55]">Contact Information</h3>
                    </div>
                    <div className="px-7 py-5 space-y-2">
                      {[
                        ["CEIT Faculty Room", "352-7000 loc. 141"],
                        ["Dean's Office", "352-7000 loc. 140"],
                        ["IT Office", "352-7000 loc. 139"],
                      ].map(([label, val]) => (
                        <div key={label} className="flex items-center justify-between py-2 border-b border-[#f2f4fb] last:border-b-0">
                          <span className="text-xs font-bold text-[#1f2b55]">{label}</span>
                          <span className="text-xs text-[#ef8a22] font-semibold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;