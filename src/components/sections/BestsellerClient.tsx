"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  badge: string | null;
  rating: number;
  reviews: number;
  tag: string;
  image_url: string;
  is_bestseller: boolean;
  categories: { name: string; slug: string };
};

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Lekë";
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} className={`h-3 w-3 ${star <= rating ? "text-[#E8C168]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function BestsellerClient({ products }: { products: Product[] }) {
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
    <section ref={sectionRef} className="w-full bg-[#1A1917] py-16">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        {/* Header */}
        <div className={`mb-14 flex items-end justify-between ${enterBase} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#E8C168]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">Top Picks</span>
            </div>
            <h2>
              <div className="font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">Produktet Tona</div>
              <div className="font-display text-2xl font-semibold text-white md:text-2xl">Më të Shitura</div>
            </h2>
          </div>
          <Link href="/products" className="group hidden items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8C168] transition-all duration-200 md:inline-flex">
            Shiko Të Gjitha
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={`group cursor-pointer ${enterBase} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#252320] rounded-xl mb-4">
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                )}
                {product.badge && (
                  <div className="absolute left-3 top-3 bg-[#E8C168] px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-widest text-[#1A1917]">
                    {product.badge}
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white border border-white/60 px-4 py-2">Shiko Produktin</span>
                </div>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#E8C168]/60 mb-1">{product.tag}</p>
                <h3 className="font-display text-base font-semibold text-white mb-2 leading-tight">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={product.rating} />
                  <span className="font-sans text-[10px] text-[#EED7B7]/40">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-[#E8C168]">{formatPrice(product.price)}</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/60 border border-white/10 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:border-[#E8C168]/40 group-hover:text-[#E8C168]">Shto</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8C168]">
            Shiko Të Gjitha Produktet →
          </Link>
        </div>

      </div>
    </section>
  );
}