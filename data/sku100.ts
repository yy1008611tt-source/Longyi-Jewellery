import type { Product } from "../types/product";

export const sku100: Product = {
  id: "100", sku: "100", name: "Verdant Drop Earrings", slug: "verdant-drop-earrings",
  category: "earrings", pdpLayout: "editorial", productType: "exact-pair",
  subtitle: "Natural Feizhoucui · 925 Sterling Silver",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui", metalComponents: "925 Sterling Silver",
  accentStones: "Zircon", treatment: "No artificial enhancement", soldAs: "One Pair",
  price: 75, featured: false, newArrival: true,
  shortDescription: "Natural Feizhoucui drop earrings set in 925 sterling silver with zircon accents.",
  seoDescription: "Verdant Drop Earrings in Natural Feizhoucui set in 925 sterling silver with zircon accents. Sold as one pair.",
  description: "Natural Feizhoucui drop earrings set in 925 sterling silver with zircon accents. Sold as one pair.",
  materialsFinish: [
    "Natural Feizhoucui forms the focal point of these earrings, set in 925 sterling silver and finished with zircon accents.",
    "The Feizhoucui has not undergone artificial enhancement, allowing its natural color, translucency and individual characteristics to remain part of the piece.",
  ],
  exactPiece: ["The pair shown in the photographs is the pair you will receive."],
  care: "Handle with care and store separately when not in use.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nGently wipe the 925 sterling silver setting with a soft, dry cloth when needed.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "This is a one-of-a-kind exact-pair item. Please review the product photographs carefully before placing your order."] },
  whatsapp: {
    name: "Tong", number: "8618825229842", sizingMessage: "",
    productMessage: "Hi Tong, I'm interested in the Verdant Drop Earrings (SKU 100). I have a question about this exact pair.",
    tradeMessage: "Hi Tong, I'm interested in trade purchasing and similar Feizhoucui earrings. I'd like to ask about availability and trade pricing for an order of 10 pieces or more.",
  },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: {
    contact: "Looking for similar Feizhoucui earrings for your business?",
    pricing: "Wholesale orders start from 10 pieces. Availability, color and natural characteristics vary by piece. Trade pricing is available by inquiry only.",
  },
  images: [
    { src: "/images/products/100/01-main.png", role: "main", alt: "Verdant Drop Natural Feizhoucui earrings in 925 sterling silver" },
    { src: "/images/products/100/02-on-ear.png", role: "Model", alt: "Verdant Drop Earrings worn on a model" },
    { src: "/images/products/100/03-detail.png", role: "detail", alt: "Natural Feizhoucui earrings with 925 sterling silver and zircon details" },
  ],
};

// Purchasing is a preview: no unverified inventory or availability claim.
export const sku100Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku100.name, sku: sku100.sku, description: sku100.seoDescription,
  image: sku100.images.map(image => image.src), material: sku100.material,
  offers: { "@type": "Offer", price: sku100.price, priceCurrency: "USD" },
};
