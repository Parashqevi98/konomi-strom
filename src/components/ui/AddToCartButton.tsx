"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image_url: string;
    tag: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full px-6 py-4 font-sans text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${
        added
          ? "bg-white/10 text-[#E8C168] border border-[#E8C168]/40"
          : "bg-[#E8C168] text-[#1A1917] hover:bg-[#D9B55E]"
      }`}
    >
      {added ? "✓ U Shtua në Shportë" : "Shto në Shportë"}
    </button>
  );
}