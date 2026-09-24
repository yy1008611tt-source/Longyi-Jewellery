import type { Category } from "../types/product";

// Browsable categories are independent from homepage campaign imagery and products.
export const shopCategories: { slug: Category; name: string; description: string }[] = [
  { slug: "bangles", name: "Bangles", description: "A continuous form. A character all its own." },
  { slug: "beaded-bracelets", name: "Beaded Bracelets", description: "A little natural colour, close at hand." },
  { slug: "beaded-necklaces", name: "Beaded Necklaces", description: "Distinctive strands for the everyday." },
  { slug: "pendants", name: "Pendants", description: "Explore our pendant selection as new pieces arrive." },
  { slug: "earrings", name: "Earrings", description: "Small details. An effortless finishing touch." },
  { slug: "rings", name: "Rings", description: "Naturally expressive, quietly personal." },
];

export const primaryLinks = [["HOME", "/"], ["NEW IN", "/new-in"], ["DISCOVER FEIZHOUCUI", "/about-feizhoucui"]] as const;
