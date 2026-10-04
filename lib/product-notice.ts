import type { Product } from "../types/product";

export const naturalMaterialNotice = {
  heading: "Naturally Unique",
  body: "Natural materials are not perfectly uniform. Subtle variations in color, texture, translucency and natural characteristics are part of what makes each piece unique.",
};

export function showsNaturalMaterialNotice(product: Pick<Product, "material" | "tradeName" | "stone">) {
  return [product.material, product.tradeName, product.stone].some(value => /\bfeizhoucui\b/i.test(value ?? ""));
}
