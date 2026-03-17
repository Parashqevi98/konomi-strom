"use client";

import { useEffect, useState } from "react";

type HeroProps = {
  backgroundImageUrl?: string;
};

const Hero = ({ backgroundImageUrl = "/images/hero.png" }: HeroProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 50);
    return () => window.clearTimeout(id);
  }, []);

  const enterBase =
    "transition-all duration-700 ease-out will-change-transform will-change-opacity";
  const enterFrom = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[#1A1917]"
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,25,23,0.75)] via-[rgba(26,25,23,0.45)] to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center pl-8 pr-4 md:pl-16 md:pr-8">
        <div className="max-w-xl">
          {/* Label */}
          <div
            className={`${enterBase} ${enterFrom} flex items-center gap-3 font-sans text-xs uppercase tracking-[0.35em] text-[#E8C168]`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="h-px w-10 bg-[#E8C168]/70" />
            <span>KONOMI STROM</span>
            <span className="h-px w-10 bg-[#E8C168]/70" />
          </div>

          {/* Title */}
          <h1 className="mt-5 leading-[0.95]">
                        <span
              className={`${enterBase} ${enterFrom} block font-display text-3xl italic text-[#EED7B7] md:text-4xl`}
              style={{ transitionDelay: "400ms" }}
            >
              Gjumi i Mirë
            </span>
            <span
              className={`${enterBase} ${enterFrom} mt-1 block font-display text-4xl font-bold text-white md:text-4xl`}
              style={{ transitionDelay: "600ms" }}
            >
              Fillon Këtu.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`${enterBase} ${enterFrom} mt-6 max-w-[480px] font-sans text-lg text-[#EED7B7]/80`}
            style={{ transitionDelay: "800ms" }}
          >
            20 vjet eksperiencë në prodhimin e dyshekëve. Cilësi, garanci, cmim.
          </p>

          {/* CTAs */}
          <div
            className={`${enterBase} ${enterFrom} mt-26 md:mt-12 flex flex-col gap-4 sm:flex-row sm:items-center`}
            style={{ transitionDelay: "1000ms" }}
          >
           <a
  href="/products"
  className="
    group relative inline-flex items-center justify-center overflow-hidden 
    border border-[#E8C168]/60 
    
    /* FIX kryesor */
    w-fit
    
    /* MOBILE (compact + më poshtë) */
    px-5 py-2.5 text-xs mt-8 md:mt-0

    /* DESKTOP */
    md:px-8 md:py-4 md:text-sm

    font-sans font-bold uppercase tracking-[0.18em]

    bg-[#E8C168] text-[#1A1917]
    md:bg-transparent md:text-[#E8C168]

    transition-all duration-300
    active:scale-95
  "
>
  {/* Desktop hover fill */}
  <span className="absolute inset-0 hidden translate-y-full bg-[#E8C168] transition-transform duration-500 ease-out md:block group-hover:translate-y-0" />

  {/* Content */}
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 md:group-hover:text-[#1A1917]">
    Zbulo Koleksionin
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>
</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="mx-auto flex w-fit flex-col items-center gap-2">
          <div className="animate-bounce text-[#E8C168]/60">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v12" />
              <path d="M7 12l5 5 5-5" />
            </svg>
          </div>
          <div className="font-sans text-xs tracking-[0.35em] text-[#E8C168]/60">
            SCROLL
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
