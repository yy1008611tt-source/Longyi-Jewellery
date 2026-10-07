import type { Product } from "../types/product";

export const sku011: Product = {
  id: "011", sku: "011", name: "Verdant Guanyin Pendant", slug: "verdant-guanyin-pendant",
  category: "pendants", pdpLayout: "editorial", productType: "natural-variation",
  subtitle: "Natural Feizhoucui",
  material: "Natural Feizhoucui", tradeName: "Feizhoucui",
  treatment: "No artificial enhancement", cord: "Adjustable cord included", construction: "Carved Pendant",
  price: 179, featured: false, newArrival: true,
  shortDescription: "A Natural Feizhoucui pendant featuring a finely carved Guanyin design, finished with an adjustable cord for everyday wear.",
  seoDescription: "A Natural Feizhoucui pendant featuring a detailed Guanyin carving and an adjustable cord.",
  description: "A Natural Feizhoucui pendant featuring a finely carved Guanyin design, finished with an adjustable cord for everyday wear.",
  materialsFinish: [
    "Natural Feizhoucui forms the focal point of this carved pendant, shaped with a detailed Guanyin design and finished with an adjustable cord.",
    "The Feizhoucui has not undergone artificial enhancement.",
  ],
  care: "Handle with care and store separately when not in use.\nAvoid prolonged contact with perfume, cosmetics and household chemicals.\nGently wipe the Feizhoucui surface with a soft, dry cloth when needed.\nKeep the cord clean and dry when possible.",
  shippingNote: "$20 shipping · Free shipping on orders $200+",
  shippingPolicy: ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."],
  exchangePolicy: { title: "FINAL SALE", paragraphs: ["All sales are final and returns are not accepted.", "Please review the design and natural variation information before ordering."] },
  whatsapp: {
    name: "Tong", number: "8618825229842", sizingMessage: "",
    productMessage: "Hi Tong, I'm interested in the Verdant Guanyin Pendant (SKU 011). I have a question about this product.",
    tradeMessage: "Hi Tong, I'm interested in trade purchasing Verdant Guanyin Pendants (SKU 011). I'd like to ask about availability and trade pricing for an order of 10 pieces or more.",
  },
  tradeAvailable: true, tradeMOQ: 10, tradePricingType: "inquiry",
  tradeCopy: { contact: "Interested in Verdant Guanyin Pendants for your business?", pricing: "Trade pricing is available by inquiry only." },
  images: [
    { src: "/images/products/011/01-main.png", role: "main", alt: "Verdant Guanyin Natural Feizhoucui carved pendant" },
    { src: "/images/products/011/02-female-on-body.png", role: "Model", alt: "Verdant Guanyin Pendant worn on a woman" },
    { src: "/images/products/011/03-male-on-body.png", role: "Model", alt: "Verdant Guanyin Pendant worn on a man" },
    { src: "/images/products/011/04-detail.png", role: "detail", alt: "Natural Feizhoucui Guanyin carved pendant detail" },
  ],
};

export const sku011Schema = {
  "@context": "https://schema.org", "@type": "Product",
  name: sku011.name, sku: sku011.sku, description: sku011.seoDescription,
  image: sku011.images.map(image => image.src), material: sku011.material,
  offers: { "@type": "Offer", price: sku011.price, priceCurrency: "USD" },
};
