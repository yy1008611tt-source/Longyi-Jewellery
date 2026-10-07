import type { Product } from "../types/product";

export const sku012: Product = {
  id: "012", sku: "012", name: "Verdant Samantabhadra Pendant", slug: "verdant-samantabhadra-pendant",
  category: "pendants", pdpLayout: "editorial", productType: "natural-variation",
  subtitle: "Natural Feizhoucui",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui",
  treatment: "No artificial enhancement", cord: "Adjustable cord included", construction: "Carved Pendant",
  price: 179, featured: false, newArrival: true,
  shortDescription: "A Natural Feizhoucui pendant featuring a detailed Samantabhadra carving with an elephant motif, finished with an adjustable cord for everyday wear.",
  seoDescription: "A Natural Feizhoucui pendant featuring a detailed Samantabhadra carving with an elephant motif and an adjustable cord.",
  description: "A Natural Feizhoucui pendant featuring a detailed Samantabhadra carving with an elephant motif, finished with an adjustable cord for everyday wear.",
  materialsFinish: [
    "Natural Feizhoucui forms the focal point of this carved pendant, featuring a detailed Samantabhadra design with an elephant motif and finished with an adjustable cord.",
    "The Feizhoucui has not undergone artificial enhancement.",
  ],
  care: "Handle with care and store separately when not in use.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nGently wipe the Feizhoucui surface with a soft, dry cloth when needed.\nKeep the cord clean and dry when possible.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "Please review the design and natural variation information before ordering."] },
  whatsapp: {
    name: "Tong", number: "8618825229842", sizingMessage: "",
    productMessage: "Hi Tong, I'm interested in the Verdant Samantabhadra Pendant (SKU 012). I have a question about this product.",
    tradeMessage: "Hi Tong, I'm interested in trade purchasing Verdant Samantabhadra Pendants (SKU 012). I'd like to ask about availability and trade pricing for an order of 10 pieces or more.",
  },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: { contact: "Interested in Verdant Samantabhadra Pendants for your business?", pricing: "Trade pricing is available by inquiry only." },
  images: [
    { src: "/images/products/012/01-main.png", role: "main", alt: "Verdant Samantabhadra Natural Feizhoucui carved pendant" },
    { src: "/images/products/012/02-female-on-body.png", role: "Model", alt: "Verdant Samantabhadra Pendant worn on a woman" },
    { src: "/images/products/012/03-male-on-body.png", role: "Model", alt: "Verdant Samantabhadra Pendant worn on a man" },
    { src: "/images/products/012/04-detail.png", role: "detail", alt: "Natural Feizhoucui Samantabhadra and elephant carving detail" },
  ],
};

export const sku012Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku012.name, sku: sku012.sku, description: sku012.seoDescription,
  image: sku012.images.map(image => image.src), material: sku012.material,
  offers: { "@type": "Offer", price: sku012.price, priceCurrency: "USD" },
};

export const sku012CulturalSymbolism = {
  heading: "CULTURAL SYMBOLISM",
  body: "In Buddhist tradition, Samantabhadra is traditionally associated with wisdom, practice and virtuous action. The elephant motif is also associated with strength and steadiness.",
};
