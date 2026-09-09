import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CategoryMosaic } from "@/components/home/category-mosaic";
import { BestSellers } from "@/components/home/best-sellers";
import { WhyChooseUs } from "@/components/home/why-choose-us";
export const metadata: Metadata = {
  title: { absolute: "Longyi Jewellery | Natural Stone. Naturally Unique." },
  description: "Discover Feizhoucui jewelry for modern everyday wear. Explore bangles, beaded bracelets, beaded necklaces, earrings and rings.",
};
export default function Home() {
  return <main id="main-content"><Hero /><CategoryMosaic /><BestSellers /><WhyChooseUs /></main>;
}
