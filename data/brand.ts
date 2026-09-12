export const brand = {
  name: "Longyi Jewellery",
  hero: {
    title: "Naturally Distinctive.",
    description: "Jewelry crafted to celebrate the unique beauty of natural stone.",
    image: "/images/home/hero-main.png",
    imageBrief: "Woman wearing green natural stone necklace, earrings, ring and bracelet against a deep green background",
  },
  // Configurable draft claims. Approve wording against actual business operations before launch.
  advantages: [
    { title: "FROM OUR OWN WORKSHOP", text: "From material selection to finished jewelry, we work closely with every stage of the process." },
    { title: "NATURAL MATERIALS. TRANSPARENTLY PRESENTED.", text: "We believe you should know what you are wearing. Material and treatment information is presented clearly for every piece." },
    { title: "INDIVIDUALLY SELECTED", text: "Every piece is individually inspected and selected for colour, texture, translucency and overall character." },
    { title: "VISIT US IN STORE", text: "Experience our jewelry in person at our physical retail location. Location details will be shared before launch." },
  ],
  advantagesAreDraft: true,
  storeAddress: null as string | null,
  workshopImage: "/images/workshop-placeholder.png",
  naturalVariation: "Formed by nature, each stone has its own variations in colour, texture and translucency. These natural differences are part of what makes every piece unique.",
};

// Homepage-only campaign assets; catalog and product imagery remain independent.
export const homeCategoryImages = {
  bangles: { src: '/images/home/category-bangles.png', alt: 'Woman wearing a green natural stone bangle in a warm lifestyle setting', tone: 'light' },
  'beaded-bracelets': { src: '/images/home/category-beaded-bracelets.png', alt: 'Green natural stone beaded bracelet worn on the wrist', tone: 'light' },
  'beaded-necklaces': { src: '/images/home/category-beaded-necklaces.png', alt: 'Green natural stone beaded necklace arranged on a large leaf', tone: 'dark' },
  earrings: { src: '/images/home/category-earrings.png', alt: 'Green natural stone drop earring worn by a woman', tone: 'dark' },
  rings: { src: '/images/home/category-rings.png', alt: 'Green natural stone ring worn in a warm lifestyle setting', tone: 'dark' },
};
