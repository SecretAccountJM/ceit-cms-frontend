"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, FileText, Check } from "lucide-react";
import { facilities } from "@/lib/facilities";
import { fetchSiteContent } from "@/lib/api";

interface HomeContent {
  collegeSection: { title: string; description: string };
  deanSection: { name: string; photoUrl: string; description: string };
  registrarSection: {
    title: string; description: string; phone: string; email: string;
    location: string; hours: string; services: { id: string; title: string }[];
  };
}

const studentOrgs = [
  { name: "Association of Civil Engineering Students", abbr: "ACES", image: "/CE_Logo.png" },
  { name: "Association of Electrical Engineering Students", abbr: "AEES", image: "/EE_Logo.png" },
  { name: "Valenzuela Information Technology Society", abbr: "VITS", image: "/vits-logo.png" },
];

const DEFAULT_HOME: HomeContent = {
  collegeSection: {
    title: "College of Engineering and Information Technology",
    description: "Our college offers Civil Engineering, Electrical Engineering, and Information Technology programs. Each program is supported by a dedicated student organization:",
  },
  deanSection: {
    name: "Engr. Jordan Velasco",
    photoUrl: "/Engr-Jordan.jpg",
    description: "Under his guidance, the College continues to uphold its mission of producing future-ready engineers and IT professionals who are equipped to meet the evolving demands of society and industry.",
  },
  registrarSection: {
    title: "Registrar's Office",
    description: "The Registrar's Office maintains academic records, coordinates course registration, and ensures the integrity of academic policies and procedures.",
    phone: "8352 7000 local 125",
    email: "registrarsoffice_plv@yahoo.com",
    location: "Maysan Road corner Tongco Street, Maysan, Valenzuela City, Valenzuela, Philippines",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    services: [
      { id: "1", title: "Course Registration & Add/Drop" },
      { id: "2", title: "Transcript Requests" },
      { id: "3", title: "Degree Verification" },
      { id: "4", title: "Graduation Processing" },
    ],
  },
};

export default function Index() {
  const featuredFacilities = facilities.filter((facility) => facility.slug !== "ceit-building");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeContent, setHomeContent] = useState<HomeContent>(DEFAULT_HOME);
  const [isRegistrarVisible, setIsRegistrarVisible] = useState(false);
  const registrarRef = useRef<HTMLElement | null>(null);
  const totalSlides = featuredFacilities.length;

  // Auto-slide
  useEffect(() => {
    if (totalSlides === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  useEffect(() => {
    fetchSiteContent<HomeContent>("home").then((data) => {
      if (data) setHomeContent(data);
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsRegistrarVisible(true);
      return;
    }

    const registrarElement = registrarRef.current;
    if (!registrarElement) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setIsRegistrarVisible(true);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(registrarElement);

    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    if (totalSlides === 0) return;
    const normalizedIndex = (index + totalSlides) % totalSlides;
    setCurrentSlide(normalizedIndex);
  };

  const prevSlide = () => {
    goTo(currentSlide - 1);
  };

  const nextSlide = () => {
    goTo(currentSlide + 1);
  };

  const prevFacility = totalSlides > 0 ? featuredFacilities[(currentSlide - 1 + totalSlides) % totalSlides] : null;
  const nextFacility = totalSlides > 0 ? featuredFacilities[(currentSlide + 1) % totalSlides] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#0f2246",
          minHeight: "620px",
        }}
      >
        {featuredFacilities.map((facility, idx) => (
          <div
            key={facility.slug}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(10,24,52,0.94) 0%, rgba(20,43,86,0.9) 52%, rgba(9,25,58,0.94) 100%), url('${facility.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.12' stroke-width='1.2'%3E%3Cpath d='M14 8v12M8 14h12'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,191,73,0.2),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_52%)]" />

        <div className="relative z-10 w-full px-3 md:px-4 py-6 md:py-8">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40">
              <Image src="/CEIT_Logo.png" alt="CEIT" width={40} height={40} className="object-cover" />
            </div>
            <span className="text-[11px] tracking-[0.18em] uppercase text-white/75 font-semibold">
              PLV · CEIT Campus
            </span>
          </div>

          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
            <span className="w-1 h-10 md:h-12 rounded bg-gradient-to-b from-amber-400 to-amber-300 mt-1" />
            <div>
              <h1 className="text-3xl md:text-6xl lg:text-[64px] font-black text-white leading-[1.02] max-w-none lg:whitespace-nowrap tracking-tight">
                Discover Our Facilities
              </h1>
              <p className="text-xs md:text-sm text-white/75 mt-2 max-w-lg leading-relaxed">
                Explore state-of-the-art learning spaces, laboratories, and support centers across the CEIT campus.
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[92px_1fr_92px] gap-3 items-stretch">
              <Link
                href={prevFacility ? `/facility/${prevFacility.slug}` : "/facility"}
                className="hidden lg:block relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm min-h-[330px]"
                aria-label={prevFacility ? `Open ${prevFacility.title}` : "Open facility"}
              >
                {prevFacility && (
                  <>
                    <Image src={prevFacility.image} alt={prevFacility.title} fill className="object-cover opacity-65" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#081024]/85" />
                    <p
                      className="absolute left-1/2 -translate-x-1/2 bottom-3 text-[10px] text-white/90 uppercase tracking-[0.12em] font-semibold"
                      style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
                    >
                      {prevFacility.title}
                    </p>
                  </>
                )}
              </Link>

              <div className="rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.24),0_4px_18px_rgba(0,0,0,0.08)] min-h-[520px] md:min-h-0 md:h-[330px]">
                <div className="relative h-full">
                  {featuredFacilities.map((facility, idx) => (
                    <div
                      key={facility.slug}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${idx === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
                        }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        <Link
                          href={`/facility/${facility.slug}`}
                          className="relative h-[230px] md:h-full block"
                          aria-label={`Open ${facility.title}`}
                        >
                          <Image src={facility.image} alt={facility.title} fill className="object-cover" />
                          <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full">
                            Featured
                          </span>
                        </Link>

                        <div className="relative overflow-hidden px-5 py-6 md:px-6 md:py-5 flex flex-col justify-center h-full bg-[linear-gradient(135deg,#ffffff_0%,#f7f9ff_46%,#e9eefc_100%)]">
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-0 top-0 h-36 w-44 rounded-bl-[72px] bg-[linear-gradient(145deg,rgba(255,176,77,0.44)_0%,rgba(243,125,36,0.26)_58%,rgba(243,125,36,0.06)_100%)]"
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-6 top-5 h-20 w-20 rounded-full border border-[#f2a65f]/35"
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-10 top-9 h-12 w-12 rounded-full border border-[#f2a65f]/25"
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute right-2 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,173,87,0.26)_0%,rgba(255,173,87,0)_70%)] blur-md"
                          />
                          <p className="relative z-10 text-[11px] tracking-[0.16em] uppercase font-bold text-amber-500 mb-2">Campus Facility</p>
                          <h2 className="relative z-10 text-3xl md:text-[40px] font-black text-[#111f3f] leading-[0.98] mb-3 line-clamp-2 min-h-[3.5rem] md:min-h-[5rem]">
                            <Link href={`/facility/${facility.slug}`}>
                              {facility.title}
                            </Link>
                          </h2>
                          <p className="relative z-10 text-[#55607f] text-sm md:text-[14px] leading-relaxed mb-4 line-clamp-2 min-h-[2.8rem]">
                            {facility.shortDescription}
                          </p>
                          <Link
                            href={`/facility/${facility.slug}`}
                            className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[#1a2f5c] underline underline-offset-4 w-fit"
                          >
                            Explore this space <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={nextFacility ? `/facility/${nextFacility.slug}` : "/facility"}
                className="hidden lg:block relative rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm min-h-[330px]"
                aria-label={nextFacility ? `Open ${nextFacility.title}` : "Open facility"}
              >
                {nextFacility && (
                  <>
                    <Image src={nextFacility.image} alt={nextFacility.title} fill className="object-cover opacity-65" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#081024]/85" />
                    <p
                      className="absolute left-1/2 -translate-x-1/2 bottom-3 text-[10px] text-white/90 uppercase tracking-[0.12em] font-semibold"
                      style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
                    >
                      {nextFacility.title}
                    </p>
                  </>
                )}
              </Link>
            </div>

            <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {featuredFacilities.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-7 bg-amber-400" : "w-2 bg-white/45 hover:bg-white/65"
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
                <span className="text-xs text-white/60 ml-2">
                  {totalSlides === 0 ? "0 / 0" : `${currentSlide + 1} / ${totalSlides}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/facility"
                  className="text-white/90 text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-2 mr-2"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={prevSlide}
                  type="button"
                  className="w-11 h-11 rounded-full border border-white/45 bg-white/10 text-white inline-flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  type="button"
                  className="w-11 h-11 rounded-full border border-white/45 bg-white/10 text-white inline-flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLEGE INTRO */}
      <section
        className="py-24 md:py-32 text-center border-b border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ceit_section_home.png')" }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="w-28 h-28 rounded-full bg-gray-300 mx-auto mb-10 overflow-hidden flex items-center justify-center">
            <Image
              src="/CEIT_Logo.png"
              alt="College Logo"
              width={112}
              height={112}
              className="object-cover"
              priority
            />
          </div>
          <h2 className="text-5xl font-extrabold text-accent leading-tight">
            {homeContent.collegeSection.title}
          </h2>
          <p className="text-xl text-muted-foreground mt-8 leading-relaxed">
            {homeContent.collegeSection.description}
          </p>

          <div className="flex justify-center gap-16 md:gap-32 mt-20 flex-wrap">
            {studentOrgs.map((org, index) => (
              <div key={org.abbr} className="flex flex-col items-center gap-5">
                <div
                  className="relative w-32 h-32 rounded-full overflow-hidden bg-white logo-float"
                  style={{ animationDelay: `${index * 0.25}s` }}
                >
                  <Image
                    src={org.image}
                    alt={org.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-base text-muted-foreground max-w-[260px] text-center leading-relaxed">
                  {org.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE DEAN */}
      <section
        className="overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ceit_section_dean.png')" }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-stretch min-h-[550px]">
          <div className="relative lg:w-1/2 flex-shrink-0 flex items-end justify-center lg:justify-start">
            <div
              className="absolute bottom-0 left-0 w-[70%] h-[88%] rounded-tr-[90px] lg:rounded-tr-[120px]"
              style={{ background: "hsl(var(--accent))" }}
            />
            <div className="relative z-10 ml-0 lg:ml-14 mb-0">
              <div className="w-[300px] h-[320px] sm:w-[360px] sm:h-[380px] lg:w-[400px] lg:h-[420px] bg-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/Engr-Jordan.jpg"
                  alt="Dean"
                  width={400}
                  height={420}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center items-center text-center px-5 sm:px-10 lg:px-16 py-16 md:py-20">
            <p className="text-base font-bold text-accent uppercase tracking-widest mb-4">
              Meet the Dean
            </p>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              {homeContent.deanSection.name}
            </h2>
            <p className="text-lg text-white/90 mt-6 leading-relaxed max-w-lg">
              {homeContent.deanSection.description}
            </p>
            <Link
              href="/administration"
              className="mt-8 inline-flex items-center gap-2 text-base bg-accent text-white border border-accent rounded-full px-8 py-3 transform-gpu transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-white hover:text-accent hover:border-accent w-fit"
            >
              Meet the school officials <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section
        ref={registrarRef}
        className={`py-16 md:py-20 border-b border-[#e3e7f1] bg-white transform-gpu transition-all duration-700 ease-out ${isRegistrarVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-30 translate-y-8 scale-95"
          }`}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-7 h-7 text-[#ef8a22]" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2b55]">{homeContent.registrarSection.title}</h2>
          </div>

          <div className="h-px bg-[#dfe3ef] mb-6" />

          <p className="text-lg text-[#4e5a7b] leading-relaxed max-w-4xl">
            {homeContent.registrarSection.description}
          </p>

          <div className="mt-8 rounded-xl border border-[#dfe3ef] bg-[#f3f4f8] p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#1f2b55] mb-4">Services</h3>
            <ul className="space-y-3">
              {homeContent.registrarSection.services.map((service) => (
                <li key={service.id} className="flex items-center gap-3 text-[#1f2b55]">
                  <Check className="w-5 h-5 text-[#ef8a22]" />
                  <span className="text-lg">{service.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-base text-[#4e5a7b] leading-relaxed">
            <p className="font-semibold text-[#1f2b55]">Contact Information:</p>
            <p>Telephone: {homeContent.registrarSection.phone}</p>
            <p>Email: {homeContent.registrarSection.email}</p>
            <p>Location: {homeContent.registrarSection.location}</p>
            <p>Hours: {homeContent.registrarSection.hours}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
