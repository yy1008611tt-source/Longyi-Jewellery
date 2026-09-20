import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 95] },
  async redirects() {
    return [
      { source: "/collections/bracelets", destination: "/collections/beaded-bracelets", permanent: true },
      { source: "/new-arrivals", destination: "/new-in", permanent: true },
      { source: "/our-jade", destination: "/about-feizhoucui", permanent: true },
      ...[
        ["moss-beaded-bracelet", "moss-feizhoucui-beaded-bracelet"],
        ["meadow-beaded-bracelet", "meadow-feizhoucui-beaded-bracelet"],
        ["river-beaded-necklace", "river-feizhoucui-beaded-necklace"],
        ["grove-beaded-necklace", "grove-feizhoucui-beaded-necklace"],
        ["natural-green-jade-bangle", "ice-green-feizhoucui-bangle"],
        ["soft-green-jade-bangle", "soft-green-feizhoucui-bangle"],
        ["forest-drop-earrings", "forest-feizhoucui-drop-earrings"],
        ["dew-earrings", "dew-feizhoucui-earrings"],
        ["stillwater-ring", "stillwater-feizhoucui-ring"],
        ["olive-ring", "olive-feizhoucui-ring"],
      ].map(([oldSlug, newSlug]) => ({ source: `/products/${oldSlug}`, destination: `/products/${newSlug}`, permanent: true })),
    ];
  },
};

export default nextConfig;
