import Hero from "@/components/sections/Hero";
import FindMattressSection from "@/components/sections/FindMattressSection";
import LegacySection from "@/components/sections/LegacySection";
import StatsBar from "@/components/sections/StatsBar";
import CategoriesSection from "@/components/sections/CategoriesSection";
import BestsellerSection from "@/components/sections/Bestsellers";

export default function Home() {
  return (
    <>
      <Hero />
      <FindMattressSection />
      <LegacySection />
      <StatsBar />
      <CategoriesSection />
      <BestsellerSection />
    </>
  );
}