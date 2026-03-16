import { getCategories } from "@/lib/queries";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  badge: string;
};

export default async function CategoriesPage() {
  const categories = await getCategories() as Category[];

  return (
    <main className="min-h-screen bg-[#1A1917]">

      {/* Page Hero */}
      <section className="relative w-full pt-40 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#E8C168]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#E8C168]/80">
              Konomi Strom
            </span>
            <div className="h-px w-10 bg-[#E8C168]" />
          </div>
          <h1>
            <span className="block font-display text-2xl font-light italic text-[#EED7B7]/90 md:text-2xl">
              Të gjitha
            </span>
            <span className="block font-display text-2xl font-semibold text-white md:text-2xl">
              Koleksionet Tona
            </span>
          </h1>
          <p className="mt-5 font-sans text-sm font-light text-[#EED7B7]/60 max-w-xl mx-auto">
            Zgjidhni kategorinë që ju përshtatet dhe zbuloni produktet tona të kujdesshme.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-8 md:px-16 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group cursor-pointer overflow-hidden border border-[#E8C168]/10 bg-[#111109] rounded-xl transition-all duration-300 hover:border-[#E8C168]/30 hover:shadow-lg hover:shadow-[#E8C168]/5"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden bg-[#2A2925]">
                {category.image_url && (
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                {category.badge && (
                  <div className="absolute bottom-3 left-3 bg-[#E8C168] px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-widest text-[#1A1917]">
                    {category.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="mb-2 font-display text-xl font-semibold text-white group-hover:text-[#EED7B7] transition-colors duration-200">
                  {category.name}
                </h2>
                <p className="mb-5 text-sm font-light text-[#EED7B7]/50 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8C168]">
                  Shiko Tani
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}