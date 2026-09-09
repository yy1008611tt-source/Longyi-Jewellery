export type Category = "bangles" | "beaded-bracelets" | "beaded-necklaces" | "earrings" | "rings";
export interface Collection {
  slug: Category;
  name: string;
  image: string;
  description: string;
  imageBrief: string;
}
export interface ProductImage {
  src?: string;
  alt: string;
  role: "Front" | "Model" | "Detail" | "Side" | "Scale" | "Lifestyle";
  placeholder?: boolean;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  sku: string;
  tradeName: string;
  stone?: string;
  colour?: string;
  origin?: string;
  treatment?: string;
  finish?: string;
  craftsmanship?: string;
  workshop?: string;
  naturalVariation?: string;
  certificate?: { label: string; reference?: string; url?: string };
  size?: number[]; // Bangle inner diameter, millimetres; never inventory.
  beadSize?: number;
  braceletLength?: number;
  necklaceLength?: number;
  clasp?: string;
  reviews?: { rating: number; count: number };
  shippingNote?: string;
  care?: string;
  shortDescription: string;
  description: string;
  images: [ProductImage, ...ProductImage[]];
  featured: boolean; // Demo best-seller selection, not sales statistics.
  newArrival?: boolean;
}
