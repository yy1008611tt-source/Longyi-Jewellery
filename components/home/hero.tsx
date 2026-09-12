import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <Image src={brand.hero.image} alt={brand.hero.imageBrief} fill preload sizes="100vw" />
      </div>
      <div className="hero-copy">
        <h1 id="hero-title">{brand.hero.title}</h1>
        <p>{brand.hero.description}</p>
        <Link className="hero-cta" href="/new-in">SHOP NEW ARRIVALS <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
