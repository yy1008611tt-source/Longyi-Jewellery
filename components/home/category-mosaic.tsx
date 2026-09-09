import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/catalog";
export function CategoryMosaic() {
  return <section className="section wide-container" aria-labelledby="category-heading">
    <div className="section-heading"><h2 id="category-heading" className="section-label">SHOP BY CATEGORY</h2><span className="small">Five forms. Your own expression.</span></div>
    <div className="category-mosaic">{collections.map((c) => <Link className={`mosaic-card mosaic-${c.slug}`} href={`/collections/${c.slug}`} key={c.slug}>
      <Image className={c.image.endsWith(".svg") ? "mosaic-illustration" : undefined} src={c.image} alt={`Placeholder: ${c.imageBrief}`} fill sizes="(max-width: 599px) 100vw, 45vw" />
      <div className="mosaic-caption"><h3>{c.name}</h3><span>Shop Now ↗</span></div>
    </Link>)}</div>
  </section>;
}
