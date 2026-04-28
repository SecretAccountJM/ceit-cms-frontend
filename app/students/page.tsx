"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen, Briefcase, MessageCircle,
  ChevronLeft, ChevronRight, Users, ExternalLink,
} from "lucide-react";

type DepartmentKey = "EE" | "IT" | "CE";

const departments: Record<
  DepartmentKey,
  {
    title: string;
    abbr: string;
    founded: string;
    description: string;
    image: string;
    accentColor: string;
    socialLinks: { label: string; url: string }[];
  }
> = {
  EE: {
    title: "Association of Electrical Engineering Students",
    abbr: "AEES",
    founded: "Est. 2004",
    description:
      "The Association of Electrical Engineering Students (AEES), established in 2004, two years after the founding of Pamantasan ng Lungsod ng Valenzuela, is a duly recognized student organization committed to the academic, professional, and personal development of electrical engineering students. The organization upholds active student involvement, discipline, and continuous excellence while fostering camaraderie, cooperation, and leadership among its members to prepare them for future professional practice.",
    image: "/EE_studentlife.png",
    accentColor: "#f59e0b",
    socialLinks: [
      { label: "Facebook", url: "https://www.facebook.com/PLVAEES2004" },
      { label: "Email", url: "mailto:aeesplv@gmail.com" },
    ],
  },
  IT: {
    title: "Valenzuela Information Technology Society",
    abbr: "VITS",
    founded: "Est. 2011",
    description:
      "The Valenzuela Information Technology Society (VITS) was founded in 2011 within the Department of Information Technology at Pamantasan ng Lungsod ng Valenzuela. The organization was established to unify the voices of Information Technology students. VITS aims to build strong camaraderie among the members and to strengthen the foundation of Information Technology students at PLV. Additionally, VITS serves as a representation of the PLV student body, conveying the needs and grievances of its members.",
    image: "/IT_studentlife.jpg",
    accentColor: "#3b82f6",
    socialLinks: [
      { label: "VITS Page", url: "https://www.facebook.com/ValenzuelaITSociety" },
      { label: "VITS ITlympics Page", url: "https://www.facebook.com/PLVVITSITLympics" },
    ],
  },
  CE: {
    title: "PLV Association of Civil Engineering Students",
    abbr: "PLV-ACES",
    founded: "Est. 2012",
    description:
      "PLV-ACES was founded in 2012 to support the academic and professional growth of civil engineering students and dedicated to upholding a strong union among its members while fostering a culture of technical excellence. In 2022, it becomes a student chapter of the Philippine Institute of Civil Engineering (PICE), strengthening its industry connections. In 2023, it further expanded learning and networking opportunities by joining the American Concrete Institute (ACI), providing members with broader opportunities for technical knowledge, research, and industry connections.",
    image: "/CE_studentlife.jpg",
    accentColor: "#10b981",
    socialLinks: [
      { label: "Facebook", url: "https://www.facebook.com/plv.aces" },
      { label: "Instagram", url: "https://www.instagram.com/plv.aces" },
    ],
  },
};

const guidanceCards = [
  {
    icon: MessageCircle,
    title: "Personal Counselling",
    body: "Confidential one-on-one sessions to address personal concerns and emotional well-being.",
  },
  {
    icon: BookOpen,
    title: "Academic Guidance",
    body: "Support for academic challenges, study skills, and educational planning.",
  },
  {
    icon: Briefcase,
    title: "Career Counselling",
    body: "Assistance with career exploration, planning, and preparation for professional life.",
  },
];

export default function Students() {
  const departmentOrder: DepartmentKey[] = ["CE", "EE", "IT"];
  const headerSlides = [
    "/aces1.jpg", "/aees1.jpg", "/vits1.jpg",
    "/aces2.jpg", "/aees2.jpg", "/vits2.jpg",
    "/aces3.jpg", "/aees3.jpg", "/vits3.jpg",
  ];
  const [currentHeaderSlide, setCurrentHeaderSlide] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    hero: false, organizations: false, guidance: false,
  });
  const heroRef = useRef<HTMLElement | null>(null);
  const organizationsRef = useRef<HTMLElement | null>(null);
  const guidanceRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeaderSlide((prev) => (prev + 1) % headerSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [headerSlides.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setVisibleSections({ hero: true, organizations: true, guidance: true });
      return;
    }

    const entries: Array<{ key: keyof typeof visibleSections; element: HTMLElement | null }> = [
      { key: "hero", element: heroRef.current },
      { key: "organizations", element: organizationsRef.current },
      { key: "guidance", element: guidanceRef.current },
    ];

    const observer = new IntersectionObserver(
      (observerEntries, obs) => {
        observerEntries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute("data-section-key") as keyof typeof visibleSections | null;
          if (!key) return;
          setVisibleSections((prev) => ({ ...prev, [key]: true }));
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    entries.forEach(({ key, element }) => {
      if (!element) return;
      element.setAttribute("data-section-key", key);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const prevHeaderSlide = () =>
    setCurrentHeaderSlide((prev) => (prev - 1 + headerSlides.length) % headerSlides.length);
  const nextHeaderSlide = () =>
    setCurrentHeaderSlide((prev) => (prev + 1) % headerSlides.length);

  const revealClass = (visible: boolean) =>
    `transform-gpu transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <div className="min-h-screen bg-[#f2f4fb]">

      {/* ── HERO SLIDER ── */}
      <section
        ref={heroRef}
        className={`relative h-[440px] md:h-[560px] overflow-hidden ${revealClass(visibleSections.hero)}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentHeaderSlide * 100}%)` }}
          >
            {headerSlides.map((slide) => (
              <div key={slide} className="relative h-full min-w-full">
                <Image src={slide} alt="Student life banner" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Dark-left gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0d1f3c]/55 to-transparent" />
        {/* Fade into page bg at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f2f4fb] to-transparent" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <button
          onClick={prevHeaderSlide}
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm p-2.5 text-white border border-white/30 transition-all hover:bg-white/35 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextHeaderSlide}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm p-2.5 text-white border border-white/30 transition-all hover:bg-white/35 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {headerSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentHeaderSlide(index)}
              className={`rounded-full transition-all duration-300 ${index === currentHeaderSlide
                  ? "w-6 h-2.5 bg-[#ef8a22]"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-5 md:px-12 pb-16">
          <div className="max-w-2xl">
            <div
              className="flex items-center gap-2 text-white/50 text-xs mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
            >
              <span>Home</span>
              <span className="text-[#ef8a22]">›</span>
              <span className="text-white/80">Students</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Students
            </h1>
            <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />
            <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
              Explore student organizations, support services, and programs that enrich campus life and help learners thrive.
            </p>
          </div>
        </div>
      </section>

      {/* ── ORGANIZATIONS SECTION HEADER ── */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-10 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-5 h-5 text-[#ef8a22]" />
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#ef8a22]"
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            Student Organizations
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#dfe3ef] to-transparent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2b55]">
          Organizations at CEIT
        </h2>
      </div>

      {/* ── ORGANIZATIONS ── */}
      <section
        ref={organizationsRef}
        className={`mx-auto max-w-[1200px] px-5 md:px-8 py-7 ${revealClass(visibleSections.organizations)}`}
      >
        <div className="space-y-5">
          {departmentOrder.map((key, index) => {
            const dept = departments[key];
            const isReverse = index % 2 === 1;

            return (
              <div
                key={key}
                className="group rounded-2xl overflow-hidden bg-white border border-[#dfe3ef] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 items-stretch">

                  {/* Image */}
                  <div className={`relative h-[220px] md:h-auto min-h-[260px] overflow-hidden ${isReverse ? "md:order-2" : ""}`}>
                    <Image
                      src={dept.image}
                      alt={dept.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {/* Accent tint */}
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{ background: `linear-gradient(135deg, ${dept.accentColor}66, transparent 55%)` }}
                    />
                    {/* Dark bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-md"
                        style={{ background: dept.accentColor, fontFamily: "'Trebuchet MS', sans-serif" }}
                      >
                        {dept.abbr}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-[10px] font-semibold text-white/80 uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded"
                        style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                      >
                        {dept.founded}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`flex flex-col justify-center px-7 py-8 md:px-9 ${isReverse ? "md:order-1" : ""}`}>
                    <div className="flex items-start gap-4">
                      {/* Color accent stripe */}
                      <div
                        className="w-[3px] self-stretch rounded-full flex-shrink-0"
                        style={{ background: `linear-gradient(to bottom, ${dept.accentColor}, ${dept.accentColor}22)` }}
                      />
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-[#1f2b55] leading-tight">
                          {dept.title}
                        </h3>
                        <p className="mt-3 text-[#4e5a7b] leading-relaxed text-[15px]">
                          {dept.description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {dept.socialLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target={link.url.startsWith("http") ? "_blank" : undefined}
                              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-sm"
                              style={{
                                color: dept.accentColor,
                                borderColor: `${dept.accentColor}50`,
                                background: `${dept.accentColor}10`,
                              }}
                            >
                              <ExternalLink className="w-3 h-3" />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── GUIDANCE & COUNSELLING ── */}
      <section
        ref={guidanceRef}
        className={`relative overflow-hidden py-16 md:py-20 ${revealClass(visibleSections.guidance)}`}
        style={{ background: "linear-gradient(150deg, #1f2b55 0%, #162046 55%, #1b2a52 100%)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Orange glow top right */}
        <div
          className="absolute top-0 right-0 w-80 h-80 blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ef8a22, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Left */}
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ef8a22] mb-3"
                style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" /> Student Support
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Guidance &amp;<br />Counselling
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-[#ef8a22] to-transparent" />

              <div className="mt-7 space-y-3">
                {guidanceCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex items-start gap-4 bg-white/[0.07] border border-white/10 rounded-xl p-4 transition-all duration-200 hover:bg-white/[0.12]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#ef8a22]/15 border border-[#ef8a22]/25 flex items-center justify-center flex-shrink-0">
                      <card.icon className="w-4 h-4 text-[#ef8a22]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{card.title}</h3>
                      <p className="text-white/55 text-sm mt-0.5 leading-relaxed">{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative pt-4">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/Guidance.jpg" alt="Guidance and counselling" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162046]/50 to-transparent" />
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-extrabold text-white">Personal Counselling</h3>
                <p className="mt-2 text-white/70 text-[15px] leading-relaxed">
                  Our Guidance and Counseling Center provides comprehensive support to help you navigate academic
                  challenges, personal concerns, and career decisions throughout your university journey.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
