"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  badge: string;
};

export default function CategoriesClient({ categories }: { categories: Category[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const enterBase = "transition-all duration-700 ease-out";

  return (
    <section ref={sectionRef} className="w-full bg-[#1A1917] py-14">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        {/* Header */}
        <div className={`text-center mb-12 ${enterBase} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-[#E8C168]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Bli sipas kategorisë</span>
            <div className="h-px w-10 bg-[#E8C168]" />
          </div>
          <h2>
            <div className="font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">Zbulo</div>
            <div className="font-display text-2xl font-semibold text-white md:text-2xl">Koleksionet tona</div>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`group cursor-pointer overflow-hidden border border-[#E8C168]/10 bg-[#111109] rounded-xl transition-all duration-300 hover:border-[#E8C168]/30 ${enterBase} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#2A2925]">
                {category.image_url && (
                  <img src={category.image_url} alt={category.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute bottom-3 left-3 bg-[#E8C168] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#1A1917]">
                  {category.badge}
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 font-display text-lg font-semibold text-white">{category.name}</h3>
                <p className="mb-4 text-sm font-light text-[#EED7B7]/60 line-clamp-2">{category.description}</p>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8C168]">
                  Shiko Tani
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}