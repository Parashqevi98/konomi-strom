import { getBestsellers } from "@/lib/queries";
import Link from "next/link";
import BestsellerClient from "@/components/sections/BestsellerClient";

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

const BestsellerSection = async () => {
  const bestsellers = await getBestsellers() as Product[];
  return <BestsellerClient products={bestsellers} />;
};

export default BestsellerSection;