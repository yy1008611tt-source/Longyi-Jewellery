import type { Product } from "../types/product";

export const naturalMaterialNotice = {
  heading: "Natural Variation",
  body: "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.",
};

export const naturalMaterialNoticeZh = {
  heading: "天然差异",
  body: "天然材质在颜色、纹理和通透度上可能存在细微差异，这些都是材质本身的正常特征。",
};

export function productPhotoNote(product: Pick<Product, "productType">, language: "en" | "zh" = "en") {
  if (product.productType === "exact-pair") return language === "zh" ? "照片中展示的这对，就是你实际会收到的商品。" : "The pair shown in the photographs is the pair you will receive.";
  if (product.productType === "exact-piece") return language === "zh" ? "照片中展示的商品，就是你实际会收到的商品。" : "The item shown in the photographs is the item you will receive.";
  return language === "zh" ? "图片展示的是商品的设计与整体外观，天然材质在颜色、纹理和通透度上可能存在细微差异。" : "The photographs represent the design and overall appearance. Natural variations in color, texture and translucency may occur.";
}

export function showsNaturalMaterialNotice(product: Pick<Product, "material" | "tradeName" | "stone">) {
  return [product.material, product.tradeName, product.stone].some(value => /\bfeizhoucui\b/i.test(value ?? ""));
}
