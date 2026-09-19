import { chineseTerminology } from "./terminology";

export const brand = {
  name: "Longyi Jewellery",
  chineseName: chineseTerminology["Longyi Jewellery"],
  hero: {
    title: "Made by Nature. Worn Your Way.",
    description: "Natural stone jewelry designed for everyday life — each piece shaped by its own color, texture and character.",
    image: "/images/home/hero-main.png",
    imageBrief: "Woman wearing green natural stone necklace, earrings, ring and bracelet against a deep green background",
  },
  whyTitle: "From Source to Store.",
  whyDescription: "We stay close to every step — from material selection to the finished piece — with a hands-on approach focused on quality, consistency and transparency.",
  advantages: [
    { title: "Closer to the Source", text: "A closer connection to sourcing and production helps us understand the materials we work with and stay involved throughout the process." },
    { title: "A Real Place, A Real Presence", text: "Our physical presence gives customers another way to experience our jewelry beyond the screen." },
  ],
  advantagesAreDraft: false,
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
