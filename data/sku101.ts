import type { Product } from "../types/product";

export const sku101: Product = {
  id: "101", sku: "101", name: "Verdant Halo Stud Earrings", slug: "verdant-halo-stud-earrings",
  category: "earrings", pdpLayout: "editorial", productType: "natural-variation",
  subtitle: "Natural Feizhoucui · 925 Sterling Silver",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui", metalComponents: "925 Sterling Silver",
  accentStones: "Zircon", treatment: "No artificial enhancement", soldAs: "One Pair",
  price: 75, featured: false, newArrival: true,
  shortDescription: "Natural Feizhoucui stud earrings framed by zircon accents in 925 sterling silver. Sold as one pair, with natural variation in every stone.",
  seoDescription: "Verdant Halo Stud Earrings: Natural Feizhoucui, 925 sterling silver and zircon accents. Sold as one pair, $75 USD, with natural stone variation.",
  description: "A halo of zircon accents frames Natural Feizhoucui in a 925 sterling silver stud setting. You will receive the same design shown, rather than the exact pair photographed.",
  naturalVariationSubtitle: "The same design. Naturally individual stones.",
  naturalVariation: "Your pair will follow the design shown. Natural Feizhoucui can vary reasonably in color, texture, translucency and internal structure, so the stones you receive may differ from the photographs. These natural differences are part of each stone's character.",
  care: "Handle with care and store separately.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nWipe gently with a soft, dry cloth.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "Please review the design and natural variation information before ordering."] },
  whatsapp: { name: "Tong", number: "8618825229842", sizingMessage: "", productMessage: "Hi Tong, I'm interested in the Verdant Halo Stud Earrings (SKU 101). I have a question about this design and its natural variation.", tradeMessage: "Hi Tong, I'm interested in trade purchasing Verdant Halo Stud Earrings (SKU 101). Please share availability and trade pricing for 10 pieces or more." },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: { contact: "Interested in this design for your business?", pricing: "Wholesale orders start from 10 pieces. Natural stone characteristics vary by pair. Availability and trade pricing are available by inquiry." },
  images: [
    { src: "/images/products/101/01-main.png", role: "main", alt: "Verdant Halo Stud Earrings with Natural Feizhoucui and zircon halos" },
    { src: "/images/products/101/02-on-ear.png", role: "Model", alt: "Verdant Halo Stud Earrings worn on the ear" },
    { src: "/images/products/101/03-detail.png", role: "detail", alt: "Natural Feizhoucui halo stud earrings with 925 sterling silver and zircon details" },
  ],
};

export const sku101Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku101.name, sku: sku101.sku, description: sku101.seoDescription,
  image: sku101.images.map(image => image.src), material: sku101.material,
  offers: { "@type": "Offer", price: sku101.price, priceCurrency: "USD" },
};
