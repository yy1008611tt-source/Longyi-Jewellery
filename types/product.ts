export type Category = "bracelets" | "beaded-necklaces" | "pendants" | "earrings" | "rings";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  sku: string;
  material: string;
  description: string;
}
