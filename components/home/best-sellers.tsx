import Link from "next/link";
import { products } from "@/data/catalog";
import { ProductCard } from "@/components/product/product-card";
export function BestSellers() {
  return <section className="section container best-sellers" aria-labelledby="best-heading">
    <div className="section-heading"><h2 id="best-heading" className="section-label">BEST SELLERS</h2><Link className="text-link" href="/shop">Shop All ↗</Link></div>
    <p className="catalog-disclaimer">Preview selection · Sample products and prices, not sales rankings</p>
    <div className="product-grid">{products.filter(p => p.featured).slice(0,4).map(p => <ProductCard product={p} key={p.id} />)}</div>
  </section>;
}
