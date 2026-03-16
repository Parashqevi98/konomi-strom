"use client";

import { useState } from "react";

type Image = {
  id: string;
  image_url: string;
  sort_order: number;
};

type Props = {
  mainImage: string;
  images: Image[];
  name: string;
  badge: string | null;
};

export default function ProductGallery({ mainImage, images, name, badge }: Props) {
  const allImages = images.length > 0
    ? images.map(i => i.image_url)
    : [mainImage].filter(Boolean);

  const [selected, setSelected] = useState(allImages[0] || mainImage);

  return (
    <div className="flex flex-col gap-2">
      {/* Main image — aspect-[4/3] on mobile, square on desktop */}
      <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-xl bg-[#252320]">
        {selected && (
          <img
            src={selected}
            alt={name}
            className="h-full w-full object-cover transition-opacity duration-300"
          />
        )}
        {badge && (
          <div className="absolute left-3 top-3 bg-[#E8C168] px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-widest text-[#1A1917]">
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(img)}
              className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                selected === img
                  ? "border-[#E8C168]"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={img} alt={`${name} ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}