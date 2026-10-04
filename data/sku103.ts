import type { Product } from "../types/product";

export const sku103: Product = {
  id: "103", sku: "103", name: "Verdant Gourd Drop Earrings", slug: "verdant-gourd-drop-earrings",
  category: "earrings", pdpLayout: "editorial", productType: "natural-variation",
  subtitle: "Natural Feizhoucui · 925 Sterling Silver",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui", metalComponents: "925 Sterling Silver",
  accentStones: "Zircon", treatment: "No artificial enhancement", soldAs: "One Pair",
  price: 75, featured: false, newArrival: true,
  shortDescription: "Natural Feizhoucui drop earrings featuring softly luminous gourd-shaped stones suspended beneath a refined 925 sterling silver setting with zircon accents.",
  seoDescription: "Natural Feizhoucui gourd-shaped drop earrings in 925 sterling silver with zircon accents.",
  description: "Natural Feizhoucui drop earrings featuring softly luminous gourd-shaped stones suspended beneath a refined 925 sterling silver setting with zircon accents.",
  materialsFinish: [
    "Natural Feizhoucui gourd-shaped stones form the focal point of these drop earrings, suspended from a refined 925 sterling silver setting with zircon accents.",
    "The Feizhoucui has not undergone artificial enhancement.",
  ],
  care: "Handle with care and store separately when not in use.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nGently wipe the 925 sterling silver setting with a soft, dry cloth when needed.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "Please review the design and natural variation information before ordering."] },
  whatsapp: {
    name: "Tong", number: "8618825229842", sizingMessage: "",
    productMessage: "Hi Tong, I'm interested in the Verdant Gourd Drop Earrings (SKU 103). I have a question about this product.",
    tradeMessage: "Hi Tong, I'm interested in trade purchasing the Verdant Gourd Drop Earrings (SKU 103). I'd like to ask about availability and trade pricing for an order of 10 pieces or more.",
  },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: { contact: "Interested in Verdant Gourd Drop Earrings for your business?", pricing: "Trade pricing is available by inquiry only." },
  images: [
    { src: "/images/products/103/01-main.png", role: "main", alt: "Verdant Gourd Natural Feizhoucui drop earrings in 925 sterling silver" },
    { src: "/images/products/103/02-on-ear.png", role: "Model", alt: "Verdant Gourd Drop Earrings worn on a model" },
    { src: "/images/products/103/03-detail.png", role: "detail", alt: "Natural Feizhoucui gourd drop earrings with 925 sterling silver and zircon details" },
  ],
};

export const sku103Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku103.name, sku: sku103.sku, description: sku103.seoDescription,
  image: sku103.images.map(image => image.src), material: sku103.material,
  offers: { "@type": "Offer", price: sku103.price, priceCurrency: "USD" },
};
