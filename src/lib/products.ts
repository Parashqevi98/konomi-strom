export const products = [
  {
    id: 1,
    name: "Memory Comfort Pro",
    category: "Dyshekë",
    categorySlug: "mattress",
    price: 45000,
    badge: "Bestseller",
    rating: 5,
    reviews: 128,
    image: "/images/products/memory-comfort-pro.png",
    description: "Memory foam me densitet të lartë — përshtatet sipas formës së trupit për rehati optimale.",
    tag: "FOAM",
  },
  {
    id: 2,
    name: "Hybrid Luxury",
    category: "Dyshekë",
    categorySlug: "mattress",
    price: 62000,
    badge: "I Ri",
    rating: 4,
    reviews: 64,
    image: "/images/products/hybrid-luxury.png",
    description: "Memory foam + Pocket spring — rehati dhe mbështetje pa kompromis.",
    tag: "HYBRID",
  },
  {
    id: 3,
    name: "Ortho Medical Pro",
    category: "Dyshekë",
    categorySlug: "mattress",
    price: 55000,
    badge: "Eksklusiv",
    rating: 5,
    reviews: 89,
    image: "/images/products/ortho-medical-pro.png",
    description: "Projektuar me rekomandimin e ortopedëve për mbështetje anatomike.",
    tag: "ORTHO",
  },
  {
    id: 4,
    name: "Nordic Wood Bed",
    category: "Krevate",
    categorySlug: "bed",
    price: 38000,
    badge: null,
    rating: 5,
    reviews: 42,
    image: "/images/products/nordic-wood-bed.png",
    description: "Dru ahu masiv natyral — dizajn nordic minimal për dhomën moderne.",
    tag: "KREVAT",
  },
  {
    id: 5,
    name: "Pocket Elite",
    category: "Dyshekë",
    categorySlug: "mattress",
    price: 48000,
    badge: null,
    rating: 4,
    reviews: 55,
    image: "/images/products/pocket-elite.png",
    description: "800 susta individuale — eliminojnë lëvizjen e partnerit gjatë natës.",
    tag: "SPRING",
  },
  {
    id: 6,
    name: "Natural Latex Pure",
    category: "Dyshekë",
    categorySlug: "mattress",
    price: 58000,
    badge: null,
    rating: 5,
    reviews: 37,
    image: "/images/products/natural-latex-pure.png",
    description: "Latex 100% natyral — ekologjik, anti-bakterial, hipoalergjik.",
    tag: "LATEX",
  },
  {
    id: 7,
    name: "Memory Pillow Contour",
    category: "Jastekë",
    categorySlug: "pillow",
    price: 4500,
    badge: null,
    rating: 4,
    reviews: 93,
    image: "/images/products/memory-pillow-contour.png",
    description: "Kontur ergonomik për rreshtin natyral të shtyllës kurrizore.",
    tag: "JASTEK",
  },
  {
    id: 8,
    name: "Velvet Headboard Luxury",
    category: "Krevate",
    categorySlug: "bed",
    price: 52000,
    badge: null,
    rating: 5,
    reviews: 28,
    image: "/images/products/velvet-headboard-luxury.png",
    description: "Kadife premium — dizajn dhe luksi për dhomën tuaj të gjumit.",
    tag: "KREVAT",
  },
];

export const bestsellers = products.filter((p) =>
  [1, 2, 3, 4].includes(p.id)
);

interface Product {
    id: number;
    name: string;
    category: string;
    categorySlug: string;
    price: number;
    badge: string | null;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    tag: string;
}

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("sq-AL", {
        style: "currency",
        currency: "ALL",
        minimumFractionDigits: 0,
    }).format(price);
};