import type { Product } from "../types/product";

export const sku105: Product = {
  id: "105", sku: "105", name: "Verdant Cabochon Stud Earrings", slug: "verdant-cabochon-stud-earrings",
  category: "earrings", pdpLayout: "editorial", productType: "natural-variation",
  subtitle: "Natural Feizhoucui · 925 Sterling Silver",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui", metalComponents: "925 Sterling Silver",
  treatment: "No artificial enhancement", soldAs: "One Pair",
  price: 75, featured: false, newArrival: true,
  shortDescription: "Natural Feizhoucui stud earrings featuring softly polished oval cabochon stones set in 925 sterling silver.",
  seoDescription: "Natural Feizhoucui oval cabochon stud earrings set in 925 sterling silver with a clean, understated design.",
  description: "Natural Feizhoucui stud earrings featuring softly polished oval cabochon stones set in 925 sterling silver.",
  materialsFinish: [
    "Natural Feizhoucui oval cabochons form the focal point of these stud earrings, set in 925 sterling silver with a clean and understated finish.",
    "The Feizhoucui has not undergone artificial enhancement.",
  ],
  care: "Handle with care and store separately when not in use.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nGently wipe the 925 sterling silver setting with a soft, dry cloth when needed.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "Please review the design and natural variation information before ordering."] },
  whatsapp: {
    name: "Tong", number: "8618825229842", sizingMessage: "",
    productMessage: "Hi Tong, I'm interested in the Verdant Cabochon Stud Earrings (SKU 105). I have a question about this product.",
    tradeMessage: "Hi Tong, I'm interested in trade purchasing the Verdant Cabochon Stud Earrings (SKU 105). I'd like to ask about availability and trade pricing for an order of 10 pieces or more.",
  },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: { contact: "Interested in Verdant Cabochon Stud Earrings for your business?", pricing: "Trade pricing is available by inquiry only." },
  images: [
    { src: "/images/products/105/01-main.png", role: "main", alt: "Verdant Cabochon Natural Feizhoucui stud earrings in 925 sterling silver" },
    { src: "/images/products/105/02-on-ear.png", role: "Model", alt: "Verdant Cabochon Stud Earrings worn on a model" },
    { src: "/images/products/105/03-detail.png", role: "detail", alt: "Natural Feizhoucui cabochon stud earring with 925 sterling silver post" },
  ],
};

export const sku105Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku105.name, sku: sku105.sku, description: sku105.seoDescription,
  image: sku105.images.map(image => image.src), material: sku105.material,
  offers: { "@type": "Offer", price: sku105.price, priceCurrency: "USD" },
};
