import type { Category, Collection, Product } from "@/types/product";

export const collections: Collection[] = [
  { slug: "bangles", name: "Bangles", image: "/images/bangles.svg", description: "A continuous form. A character all its own.", imageBrief: "Bangle lifestyle / product image" },
  { slug: "beaded-bracelets", name: "Beaded Bracelets", image: "/images/beaded-bracelets.svg", description: "A little natural colour, close at hand.", imageBrief: "Beaded bracelet image" },
  { slug: "beaded-necklaces", name: "Beaded Necklaces", image: "/images/beaded-necklaces.svg", description: "Distinctive strands for the everyday.", imageBrief: "Necklace lifestyle image" },
  { slug: "earrings", name: "Earrings", image: "/images/earrings.svg", description: "Small details. An effortless finishing touch.", imageBrief: "Model wearing earrings" },
  { slug: "rings", name: "Rings", image: "/images/rings.svg", description: "Naturally expressive, quietly personal.", imageBrief: "Ring close-up / lifestyle" },
];

// All entries are samples. Unknown stone identity, origin, treatment and certificates
// are intentionally omitted. Add each verified field to the individual product.
const samples: { id: string; name: string; category: Category; price: number; sku: string; featured?: boolean }[] = [
  { id: "11", name: "Ice Green Feizhoucui Bangle", category: "bangles", price: 189, sku: "BG001", featured: true },
  { id: "12", name: "Soft Green Feizhoucui Bangle", category: "bangles", price: 229, sku: "BG002" },
  { id: "1", name: "Moss Feizhoucui Beaded Bracelet", category: "beaded-bracelets", price: 89, sku: "BR001", featured: true },
  { id: "6", name: "Meadow Feizhoucui Beaded Bracelet", category: "beaded-bracelets", price: 109, sku: "BR002" },
  { id: "2", name: "River Feizhoucui Beaded Necklace", category: "beaded-necklaces", price: 259, sku: "BN001", featured: true },
  { id: "7", name: "Grove Feizhoucui Beaded Necklace", category: "beaded-necklaces", price: 229, sku: "BN002" },
  { id: "4", name: "Forest Feizhoucui Drop Earrings", category: "earrings", price: 99, sku: "ER001", featured: true },
  { id: "9", name: "Dew Feizhoucui Earrings", category: "earrings", price: 89, sku: "ER002" },
  { id: "5", name: "Stillwater Feizhoucui Ring", category: "rings", price: 79, sku: "RG001" },
  { id: "10", name: "Olive Feizhoucui Ring", category: "rings", price: 95, sku: "RG002" },
];

const demoProducts: Product[] = samples.map((sample) => ({
  ...sample,
  slug: sample.name.toLowerCase().replaceAll(" ", "-"),
  sku: `DEMO-${sample.sku}`,
  tradeName: "Feizhoucui",
  shortDescription: "A quietly distinctive piece, imagined for modern everyday wear.",
  description: "A considered shape with an individual character. This sample introduces the collection; final photographs and verified product details will be added before launch.",
  featured: sample.featured ?? false,
  newArrival: sample.featured ?? false,
  images: [
    { src: `/images/${sample.category}.svg`, alt: `${sample.name} front-view illustration`, role: "Front", placeholder: true },
    { alt: "Model wearing this exact piece", role: "Model", placeholder: true },
    { alt: "Close-up of this stone’s colour and texture", role: "Detail", placeholder: true },
    { alt: "Side and reverse views of this piece", role: "Side", placeholder: true },
    { alt: "Accurate size reference for this piece", role: "Scale", placeholder: true },
    { alt: "This piece styled for everyday wear", role: "Lifestyle", placeholder: true },
  ],
}));
// SKU 001 uses confirmed retail/trade terms. Wrist ranges are made-to-fit choices, not stock.
export const sku001: Product = {
  id: "001",
  sku: "001",
  name: "Verdant Beaded Bracelet",
  slug: "verdant-beaded-bracelet",
  category: "beaded-bracelets",
  pdpLayout: "editorial",
  subtitle: "Natural Feizhoucui · 8 mm",
  material: "Natural Feizhoucui",
  tradeName: "Feizhoucui",
  beadSize: 8,
  beadSizeApproximate: true,
  construction: "Flexible elastic cord",
  metalComponents: "None",
  treatment: "No artificial enhancement",
  productType: "natural-variation",
  gender: "Unisex",
  useCase: "Everyday wear",
  price: 150,
  wristSizes: [
    { id: "small", label: "14–16 cm", description: "For wrist circumferences between 14 and 16 cm." },
    { id: "medium", label: "16–18 cm", description: "For wrist circumferences between 16 and 18 cm." },
    { id: "large", label: "18–20 cm", description: "For wrist circumferences between 18 and 20 cm." },
  ],
  customSizing: true,
  sizingDescription: "Measure your wrist circumference and choose the closest range. Each bracelet is adjusted by adding or removing beads for a comfortable fit.",
  measuringInstructions: "Wrap a soft measuring tape snugly around your wrist where you normally wear your bracelet.\nMeasure your actual wrist circumference without adding extra length.\nThen choose the closest size range.",
  fitAdjustment: "Each bracelet is adjusted by adding or removing beads according to the selected wrist-size range and is finished with a flexible elastic cord for a comfortable fit.",
  materialVariation: "Color, pattern and translucency may vary naturally from piece to piece.",
  whatsapp: {
    name: "Tong",
    number: "8618825229842",
    sizingMessage: "Hi Tong, I'm interested in the Verdant Beaded Bracelet. Could you help me choose the right wrist size?",
    customSizingMessage: "Hi Tong, I'm interested in the Verdant Beaded Bracelet. I need help with a different wrist size.",
    productMessage: "Hi Tong, I'm interested in the Verdant Beaded Bracelet. I have a question about this product.",
    tradeMessage: "Hi Tong, I'm interested in wholesale purchasing for the Verdant Beaded Bracelet. I'd like to ask about trade pricing and availability for an order of 10 pieces or more.",
  },
  tradeAvailable: true,
  tradeMOQ: 10,
  tradePricingType: "inquiry",
  tradeCopy: {
    pricing: "Trade pricing is available by inquiry only.",
    contact: "Contact Tong on WhatsApp for pricing, availability and order details.",
  },
  shippingNote: "$20 shipping · Free shipping on orders $300+",
  shippingPolicy: [
    "A flat $20 USD shipping fee applies to orders under $300 USD.",
    "Orders of $300 USD or more qualify for free shipping.",
  ],
  exchangePolicy: {
    title: "Final Sale — Fit Exchanges Only",
    paragraphs: [
      "All sales are final and returns are not accepted.",
      "If the bracelet fit is unsuitable, you may request a size exchange for the same product within 3 days of delivery.",
      "The item must remain unworn, undamaged, and in its complete original packaging.",
      "A continuous unboxing video recorded when the package is first opened is required for exchange verification.",
      "Customers are responsible for all shipping costs associated with the exchange.",
      "Exchanges for a different product or style are not available.",
    ],
  },
  wristFitCm: null,
  wristFitIn: null,
  featured: false,
  newArrival: false,
  shortDescription: "Designed for effortless everyday wear, this beaded bracelet highlights the naturally varied green tones and individual patterns found in each stone.",
  description: "An everyday bracelet made with approximately 8 mm Natural Feizhoucui beads on a flexible elastic cord, with no metal components.",
  naturalVariationSubtitle: "No two bracelets are exactly alike.",
  naturalVariation: "Each bead is formed by nature, so subtle variations in color, pattern and translucency are expected and make every bracelet individually distinctive.",
  care: "Avoid prolonged contact with harsh chemicals.\nStore separately to help protect the polished surface.\nClean gently with a soft, dry cloth.",
  sizeScaleDescription: "A balanced everyday size with a noticeable presence on the wrist.",
  sizeGuideCaption: "Bead-size comparison only. This bracelet is offered with approximately 8 mm beads; other sizes and bracelet designs shown are for scale reference.",
  images: [
    { src: "/images/products/001/01-main.png", role: "main", alt: "Verdant Beaded Bracelet on a warm ivory background" },
    { src: "/images/products/001/02-stone-detail.png", role: "detail", alt: "Close-up of three green Feizhoucui beads showing natural variation" },
    { src: "/images/products/001/04-female-on-wrist.png", role: "on-wrist", alt: "Verdant Beaded Bracelet worn with an ivory shirt" },
    { src: "/images/products/001/05-male-on-wrist.png", role: "on-wrist", alt: "Verdant Beaded Bracelet worn with a dark knitted sweater" },
    { src: "/images/products/001/06-natural-variation.png", role: "natural-variation", alt: "Three Verdant bracelets showing individual variations in green tones and patterns" },
    { src: "/images/products/001/07-macro-detail.png", role: "macro-detail", alt: "Macro view of polished Feizhoucui beads and their individual textures" },
    { src: "/images/products/001/03-bead-size-guide.png", role: "size-guide", alt: "Wrist comparison showing bead sizes from 4 mm to 12 mm, including 8 mm" },
  ],
};
export const products: Product[] = [...demoProducts, sku001];
export const categoryName = (slug: Category) => collections.find((c) => c.slug === slug)!.name;
