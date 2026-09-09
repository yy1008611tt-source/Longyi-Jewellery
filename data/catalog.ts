import type { Category, Collection, Product } from "@/types/product";

export const collections: Collection[] = [
  { slug: "bangles", name: "Bangles", image: "/images/bangles.svg", description: "A continuous form. A character all its own.", imageBrief: "Bangle lifestyle / product image" },
  { slug: "beaded-bracelets", name: "Beaded Bracelets", image: "/images/beaded-bracelets.svg", description: "A little natural colour, close at hand.", imageBrief: "Beaded bracelet image" },
  { slug: "beaded-necklaces", name: "Beaded Necklaces", image: "/images/beaded-necklaces.svg", description: "Distinctive strands for the everyday.", imageBrief: "Necklace lifestyle image" },
  { slug: "earrings", name: "Earrings", image: "/images/earrings.svg", description: "Small details. An effortless finishing touch.", imageBrief: "Model wearing earrings" },
  { slug: "rings", name: "Rings", image: "/images/rings.svg", description: "Naturally expressive, quietly personal.", imageBrief: "Ring close-up / lifestyle" },
];

// All entries are samples. Unknown stone identity, origin, treatment and certificates
// are intentionally omitted. Add each verified field to the individual product.
const samples: { id: string; name: string; category: Category; price: number; sku: string; featured?: boolean }[] = [
  { id: "11", name: "Ice Green Feizhoucui Bangle", category: "bangles", price: 189, sku: "BG001", featured: true },
  { id: "12", name: "Soft Green Feizhoucui Bangle", category: "bangles", price: 229, sku: "BG002" },
  { id: "1", name: "Moss Feizhoucui Beaded Bracelet", category: "beaded-bracelets", price: 89, sku: "BR001", featured: true },
  { id: "6", name: "Meadow Feizhoucui Beaded Bracelet", category: "beaded-bracelets", price: 109, sku: "BR002" },
  { id: "2", name: "River Feizhoucui Beaded Necklace", category: "beaded-necklaces", price: 259, sku: "BN001", featured: true },
  { id: "7", name: "Grove Feizhoucui Beaded Necklace", category: "beaded-necklaces", price: 229, sku: "BN002" },
  { id: "4", name: "Forest Feizhoucui Drop Earrings", category: "earrings", price: 99, sku: "ER001", featured: true },
  { id: "9", name: "Dew Feizhoucui Earrings", category: "earrings", price: 89, sku: "ER002" },
  { id: "5", name: "Stillwater Feizhoucui Ring", category: "rings", price: 79, sku: "RG001" },
  { id: "10", name: "Olive Feizhoucui Ring", category: "rings", price: 95, sku: "RG002" },
];

export const products: Product[] = samples.map((sample) => ({
  ...sample,
  slug: sample.name.toLowerCase().replaceAll(" ", "-"),
  sku: `DEMO-${sample.sku}`,
  tradeName: "Feizhoucui",
  shortDescription: "A quietly distinctive piece, imagined for modern everyday wear.",
  description: "A considered shape with an individual character. This sample introduces the collection; final photographs and verified product details will be added before launch.",
  featured: sample.featured ?? false,
  newArrival: sample.featured ?? false,
  images: [
    { src: `/images/${sample.category}.svg`, alt: `${sample.name} front-view illustration`, role: "Front", placeholder: true },
    { alt: "Model wearing this exact piece", role: "Model", placeholder: true },
    { alt: "Close-up of this stone’s colour and texture", role: "Detail", placeholder: true },
    { alt: "Side and reverse views of this piece", role: "Side", placeholder: true },
    { alt: "Accurate size reference for this piece", role: "Scale", placeholder: true },
    { alt: "This piece styled for everyday wear", role: "Lifestyle", placeholder: true },
  ],
}));
export const categoryName = (slug: Category) => collections.find((c) => c.slug === slug)!.name;
