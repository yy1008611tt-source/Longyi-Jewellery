import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-media"><Image src={brand.hero.image} alt={`AI concept placeholder: ${brand.hero.imageBrief}`} fill preload sizes="100vw" /></div>
    <div className="hero-copy"><p className="eyebrow">DISCOVER FEIZHOUCUI</p>
      <h1 id="hero-title">{brand.hero.title[0]}<br />{brand.hero.title[1]}</h1>
      <p>{brand.hero.description}</p><Link className="button" href="/new-in">SHOP NEW ARRIVALS</Link>
    </div>
    <span className="concept-label">AI concept image · Real photography to follow</span>
  </section>;
}
