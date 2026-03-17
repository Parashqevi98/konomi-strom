"use client";

import { useEffect, useRef, useState } from "react";

const LegacySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const slideInFromRight = isVisible
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-10";

  const growLine = isVisible ? "w-16" : "w-0";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1A1917] py-32"
    >
      {/* VIDEO BACKGROUND */}

      {/* Mobile: Full background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-fallback.jpg"
        className="absolute left-0 top-0 h-full w-full object-cover lg:hidden"
      >
        <source src="/videos/mattress-texture.mp4" type="video/mp4" />
      </video>

      {/* Mobile overlay */}
      <div className="absolute inset-0 bg-[#1A1917]/80 lg:hidden" />

      {/* Desktop: Left side video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-fallback.jpg"
        className="absolute left-0 top-0 hidden h-full w-1/2 object-cover lg:block"
      >
        <source src="/videos/mattress-texture.mp4" type="video/mp4" />
      </video>

      {/* Desktop overlays */}
      <div
        className="absolute left-0 top-0 hidden h-full w-1/2 lg:block"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, transparent 40%, #1A1917 100%)",
        }}
      />

      <div
        className="absolute left-0 top-0 hidden h-full w-1/2 lg:block"
        style={{
          background:
            "linear-gradient(to bottom, #1A1917 0%, transparent 15%, transparent 85%, #1A1917 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:ml-auto lg:max-w-[520px] lg:pr-20 lg:text-left">
          <div
            className={`transition-all duration-900 ease-out ${slideInFromRight}`}
          >
            {/* Label */}
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#E8C168]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">
                HISTORIA JONË
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-8">
              <div className="font-display text-2xl md:text-2xl font-light italic text-[#EED7B7]/90">
                Arti i Gjumit,
              </div>
              <div className="font-display text-2xl md:text-2xl font-semibold text-white">
                Ndërtuar për të Zgjatur.
              </div>
            </h2>

            {/* Divider */}
            <div
              className={`mt-8 h-px bg-[#E8C168]/40 transition-all duration-900 ease-out ${growLine}`}
            />

            {/* Paragraph */}
            <p className="mt-5 max-w-md font-sans text-sm font-light text-[#EED7B7]/60">
              Që nga viti 2004, Konomi Strom është specialisti kryesor i gjumit
              në Shqipëri. Ne kombinojmë teknikat artizanale me shkencën moderne
              të gjumit për të ofruar dyshekë me cilësinë e parë.
            </p>

            {/* Stats */}
            <div className="mt-10 flex items-center">
              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-[#E8C168]">
                  20+
                </div>
                <div className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40">
                  Vjet
                </div>
              </div>

              <div className="mx-6 h-8 w-px bg-[#E8C168]/20" />

              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-[#E8C168]">
                  100%
                </div>
                <div className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40">
                  Punë Dore
                </div>
              </div>

              <div className="mx-6 h-8 w-px bg-[#E8C168]/20" />

              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-[#E8C168]">
                  AL
                </div>
                <div className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40">
                  Shqipëri
                </div>
              </div>
            </div>

            {/* Link */}
            <a
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-[#E8C168]"
            >
              Zbulo më shumë
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;