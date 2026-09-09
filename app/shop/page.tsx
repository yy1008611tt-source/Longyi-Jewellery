import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductCard } from "@/components/product/product-card";
import { ShopSort } from "@/components/product/shop-sort";
import { collections, products } from "@/data/catalog";
import { filterAndSortProducts, shopHref, shopSelection } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore bangles, beaded bracelets, beaded necklaces, earrings and rings in our sample everyday jewelry collection.",
};

export default async function Shop({ searchParams }: {
  searchParams: Promise<{ category?: string | string[]; sort?: string | string[] }>;
}) {
  const { category, sort } = shopSelection(await searchParams, collections);
  const selection = filterAndSortProducts(products, category, sort);
  return (
    <main id="main-content" className="container browse-page">
      <Breadcrumb items={[{ label: "Shop" }]} />
      <header className="browse-heading">
        <p className="eyebrow">SHOP</p>
        <h1>Natural pieces.<br /><em>Everyday moments.</em></h1>
        <p>A little color, a quiet detail. Find a piece that feels like you.</p>
      </header>
      <nav className="category-filters" aria-label="Filter by category">
        <Link href={shopHref(undefined, sort)} scroll={false} aria-current={!category ? "page" : undefined}>All</Link>
        {collections.map((item) => (
          <Link key={item.slug} href={shopHref(item.slug, sort)} scroll={false} aria-current={category === item.slug ? "page" : undefined}>{item.name}</Link>
        ))}
      </nav>
      <div className="catalog-toolbar">
        <p aria-live="polite">{selection.length} {selection.length === 1 ? "Piece" : "Pieces"}</p>
        <ShopSort category={category} sort={sort} />
      </div>
      <p className="catalog-disclaimer">Sample collection · Illustrative images · Demo prices in USD</p>
      {selection.length > 0
        ? <div className="product-grid">{selection.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        : <div className="empty-catalog"><h2>More pieces are on their way.</h2><Link className="text-link" href="/shop">Explore all pieces</Link></div>}
    </main>
  );
}
