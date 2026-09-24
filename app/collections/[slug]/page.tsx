import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/catalog";
import { shopCategories as collections } from "@/data/navigation";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  return { title: collection.name, description: collection.description };
}
export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const selection = products.filter((product) => product.category === collection.slug);
  return (
    <main id="main-content" className="container browse-page">
      <Breadcrumb items={[{ label: "Shop", href: "/shop" }, { label: collection.name }]} />
      <header className="browse-heading">
        <p className="eyebrow">THE COLLECTION</p>
        <h1>{collection.name}</h1>
        <p>{collection.description}</p>
      </header>
      <div className="catalog-toolbar">
        <p>{selection.length} {selection.length === 1 ? "Piece" : "Pieces"}</p>
        <Link className="text-link" href="/shop">Shop All <span aria-hidden="true">↗</span></Link>
      </div>
      <p className="catalog-disclaimer">Sample collection · Illustrative images · Demo prices in USD</p>
      {selection.length > 0
        ? <div className="product-grid">{selection.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        : <div className="empty-catalog"><h2>More pieces are on their way.</h2><Link className="text-link" href="/shop">Explore all pieces</Link></div>}
    </main>
  );
}
