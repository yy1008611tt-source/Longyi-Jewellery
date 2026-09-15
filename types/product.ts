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
  role: "Front" | "Model" | "Detail" | "Side" | "Scale" | "Lifestyle"
    | "main" | "product" | "detail" | "on-wrist" | "size-guide"
    | "natural-variation" | "construction" | "lifestyle" | "packaging";
  placeholder?: boolean;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number | null;
  pdpLayout?: "editorial";
  subtitle?: string;
  material?: string; // Supplied commercial material description, distinct from stone identity.
  productType?: "natural-variation" | "exact-piece";
  construction?: string;
  metalComponents?: string;
  wristFitCm?: string | null;
  wristFitIn?: string | null;
  beadSizeApproximate?: boolean;
  gender?: string;
  useCase?: string;
  naturalVariationSubtitle?: string;
  sizeScaleDescription?: string;
  sizeGuideCaption?: string;
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
