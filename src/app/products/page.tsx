import { getProducts, getCategories } from "@/lib/queries";
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
  category_id: string;
  categories: { name: string; slug: string };
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("sq-AL", { minimumFractionDigits: 0 }).format(price) + " Lekë";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} className={`h-3 w-3 ${star <= rating ? "text-[#E8C168]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [allProducts, categories] = await Promise.all([
    getProducts() as Promise<Product[]>,
    getCategories() as Promise<Category[]>,
  ]);

  const filtered = category
    ? allProducts.filter((p) => p.categories?.slug === category)
    : allProducts;

  return (
    <main className="min-h-screen bg-[#1A1917]">

      {/* Header */}
      <section className="w-full border-b border-white/5 pt-28 pb-10">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="flex items-center gap-2 mb-6 font-sans text-[11px] uppercase tracking-widest text-[#EED7B7]/40">
            <Link href="/" className="hover:text-[#E8C168] transition-colors">Ballina</Link>
            <span>/</span>
            <span className="text-[#E8C168]/70">Produktet</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#E8C168]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">
                  Konomi Strom
                </span>
              </div>
              <h1>
                <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">
                  Të gjitha
                </span>
                <span className="block font-display text-2xl font-semibold text-white md:text-2xl">
                  Produktet Tona
                </span>
              </h1>
            </div>
            <div className="hidden md:block text-right">
              <span className="font-display text-3xl font-semibold text-[#E8C168]">{filtered.length}</span>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/40 mt-1">Produkte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter by category */}
      <section className="w-full border-b border-white/5 py-4">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Link
              href="/products"
              className={`flex-shrink-0 font-sans text-[11px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-200 ${
                !category
                  ? "border-[#E8C168] text-[#E8C168] bg-[#E8C168]/10"
                  : "border-white/10 text-[#EED7B7]/50 hover:border-[#E8C168]/40 hover:text-[#E8C168]"
              }`}
            >
              Të gjitha
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`flex-shrink-0 font-sans text-[11px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-200 ${
                  category === cat.slug
                    ? "border-[#E8C168] text-[#E8C168] bg-[#E8C168]/10"
                    : "border-white/10 text-[#EED7B7]/50 hover:border-[#E8C168]/40 hover:text-[#E8C168]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-8 md:px-16 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-sm text-[#EED7B7]/40">Nuk ka produkte në këtë kategori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#252320] rounded-xl mb-4">
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                  {product.badge && (
                    <div className="absolute left-3 top-3 bg-[#E8C168] px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-widest text-[#1A1917]">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white border border-white/60 px-4 py-2">
                      Shiko Produktin
                    </span>
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
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#EED7B7]/60 border border-white/10 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:border-[#E8C168]/40 group-hover:text-[#E8C168]">
                      Shiko
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}