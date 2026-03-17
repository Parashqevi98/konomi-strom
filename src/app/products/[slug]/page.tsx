"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/superbase";
import { getProductImages, getProductVariants } from "@/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductVariantSelector from "@/components/ui/ProductVariantSelector";
import QuantitySelector from "@/components/ui/QuantitySelector";


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
  categories: { name: string; slug: string };
};

async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as Product;
}

async function getRelatedProducts(categorySlug: string, currentSlug: string) {
  const { data } = await supabase
    .from("products")
    .select("*, categories!inner(name, slug)")
    .eq("categories.slug", categorySlug)
    .neq("slug", currentSlug)
    .limit(3);
  return (data || []) as Product[];
}

const formatPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Lekë";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} className={`h-4 w-4 ${star <= rating ? "text-[#E8C168]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const prod = await getProductBySlug(slug);
      if (!prod) {
        notFound();
        return;
      }
      setProduct(prod);
      const [rel, imgs, vars] = await Promise.all([
        getRelatedProducts(prod.categories?.slug, slug),
        getProductImages(prod.id),
        getProductVariants(prod.id),
      ]);
      setRelated(rel);
      setImages(imgs);
      setVariants(vars);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading || !product) {
    return (
      <main className="min-h-screen bg-[#1A1917] flex items-center justify-center">
        <div className="text-[#EED7B7]">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A1917]">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 pt-24 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40">
          <Link href="/" className="hover:text-[#E8C168] transition-colors">Homepage</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#E8C168] transition-colors">Produktet</Link>
          {product.categories && (
            <>
              <span>/</span>
              <Link href={`/categories/${product.categories.slug}`} className="hover:text-[#E8C168] transition-colors">
                {product.categories.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#E8C168]/70 truncate max-w-[140px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Product Main */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">

          {/* Galeri — compact on mobile */}
          <div className="md:sticky md:top-24">
            <ProductGallery
              mainImage={product.image_url}
              images={images}
              name={product.name}
              badge={product.badge}
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-[#E8C168]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">
                {product.tag}
              </span>
            </div>

            <h1 className="font-display text-xl md:text-2xl font-semibold text-white mb-3 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="font-sans text-xs text-[#EED7B7]/40">
                ({product.reviews})
              </span>
            </div>

            <div className="h-px w-full bg-white/5 mb-4" />

            <p className="font-sans text-sm font-light text-[#EED7B7]/60 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Features */}
            <div className="space-y-2 mb-5">
              {[
                "Prodhuar me dorë në Sarandë",
                "Garanci e plotë nga prodhuesi",
                "Materiale cilësore të zgjedhura",
                "Dërgim falas në Shqipëri",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <div className="h-px w-4 flex-shrink-0 bg-[#E8C168]/60" />
                  <span className="font-sans text-xs font-light text-[#EED7B7]/60">{feature}</span>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-white/5 mb-5" />

            {/* Variant selector + CTA */}
            <ProductVariantSelector
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image_url: product.image_url,
                tag: product.tag,
              }}
              variants={variants}
            />

            {/* Contact */}
            <div className="mt-4 flex items-center gap-3 p-3 border border-white/5 rounded-xl bg-white/2">
              <svg className="h-4 w-4 text-[#E8C168]/50 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div>
                <p className="font-sans text-[9px] uppercase tracking-widest text-[#EED7B7]/30">Pyetje? Na telefononi</p>
                <a href="tel:+355692040349" className="font-sans text-xs font-light text-[#EED7B7]/60 hover:text-[#E8C168] transition-colors">
                  069 204 0349
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="w-full border-t border-white/5 py-10">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#E8C168]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">
                Produkte të Ngjashme
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#252320] rounded-xl mb-3">
                    {p.image_url && (
                      <img src={p.image_url} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white border border-white/60 px-3 py-1.5">Shiko</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-sans text-[9px] uppercase tracking-widest text-[#E8C168]/60 mb-0.5">{p.tag}</p>
                    <h3 className="font-display text-sm font-semibold text-white mb-1 leading-tight">{p.name}</h3>
                    <span className="font-display text-sm font-semibold text-[#E8C168]">{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}