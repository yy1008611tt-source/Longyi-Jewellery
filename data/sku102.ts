import type { Product } from "../types/product";

export const sku102: Product = {
  id: "102", sku: "102", name: "Verdant Pebble Drop Earrings", slug: "verdant-pebble-drop-earrings",
  category: "earrings", pdpLayout: "editorial", productType: "natural-variation",
  subtitle: "Natural Feizhoucui · 925 Sterling Silver",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui", metalComponents: "925 Sterling Silver",
  accentStones: "Zircon", treatment: "No artificial enhancement", soldAs: "One Pair",
  price: 75, featured: false, newArrival: true,
  shortDescription: "Natural Feizhoucui drop earrings featuring softly luminous green round stones suspended beneath an organic pebble-inspired setting in 925 sterling silver with zircon accents.",
  seoDescription: "Natural Feizhoucui drop earrings in 925 sterling silver with zircon accents and an organic pebble-inspired design.",
  description: "Natural Feizhoucui drop earrings featuring softly luminous green round stones suspended beneath an organic pebble-inspired setting in 925 sterling silver with zircon accents.",
  materialsFinish: [
    "Natural Feizhoucui round stones form the focal point of these drop earrings, suspended beneath an organic pebble-inspired setting in 925 sterling silver with zircon accents.",
    "The Feizhoucui has not undergone artificial enhancement.",
  ],
  care: "Handle with care and store separately when not in use.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nGently wipe the 925 sterling silver setting with a soft, dry cloth when needed.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "Please review the design and natural variation information before ordering."] },
  whatsapp: {
    name: "Tong", number: "8618825229842", sizingMessage: "",
    productMessage: "Hi Tong, I'm interested in the Verdant Pebble Drop Earrings (SKU 102). I have a question about this product.",
    tradeMessage: "Hi Tong, I'm interested in trade purchasing the Verdant Pebble Drop Earrings (SKU 102). I'd like to ask about availability and trade pricing for an order of 10 pieces or more.",
  },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: { contact: "Interested in Verdant Pebble Drop Earrings for your business?", pricing: "Trade pricing is available by inquiry only." },
  images: [
    { src: "/images/products/102/01-main.png", role: "main", alt: "Verdant Pebble Natural Feizhoucui drop earrings in 925 sterling silver" },
    { src: "/images/products/102/02-on-ear.png", role: "Model", alt: "Verdant Pebble Drop Earrings worn on a model" },
    { src: "/images/products/102/03-detail.png", role: "detail", alt: "Natural Feizhoucui drop earrings with 925 sterling silver and zircon details" },
  ],
};

export const sku102Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku102.name, sku: sku102.sku, description: sku102.seoDescription,
  image: sku102.images.map(image => image.src), material: sku102.material,
  offers: { "@type": "Offer", price: sku102.price, priceCurrency: "USD" },
};
