import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInformation } from "@/components/product/product-information";
import { NaturallyUnique, ProductAccordions } from "@/components/product/product-editorial-sections";
import { products, categoryName } from "@/data/catalog";
import { relatedProducts } from "@/lib/catalog";
import { ExactPieceInformation, ExactPieceAccordions } from "@/components/product/exact-piece-sections";
import { sku100Schema } from "@/data/sku100";
import { sku101Schema } from "@/data/sku101";
import { sku102Schema } from "@/data/sku102";
import { sku103Schema } from "@/data/sku103";
import { GourdDropInformation, GourdDropSections } from "@/components/product/gourd-drop-sections";
import { PebbleDropInformation, PebbleDropSections } from "@/components/product/pebble-drop-sections";
import { HaloStudInformation, HaloStudSections } from "@/components/product/halo-stud-sections";
type Props = { params: Promise<{slug:string}> };
export const dynamicParams=false;
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();
  return {title:p.name,description:p.seoDescription ?? p.shortDescription};
}
export default async function ProductPage({params}:Props){
  const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();
  const editorial = p.pdpLayout === "editorial";
  const exactPiece = p.productType === "exact-piece" || p.productType === "exact-pair";
  return <main id="main-content" className={`wide-container product-page ${editorial ? "pdp-editorial" : ""}`}>
    {p.sku === "100" && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sku100Schema).replace(/</g, "\\u003c")}} />}
    {p.sku === "101" && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sku101Schema).replace(/</g, "\\u003c")}} />}
    {p.sku === "102" && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sku102Schema).replace(/</g, "\\u003c")}} />}
    {p.sku === "103" && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(sku103Schema).replace(/</g, "\\u003c")}} />}
    <Breadcrumb items={[{label:"Shop",href:"/shop"},{label:categoryName(p.category),href:`/collections/${p.category}`},{label:`${p.sku} · ${p.name}`}]} />
    <div className={`product-detail ${editorial ? "pdp-editorial-layout" : ""}`}>
      <ProductGallery images={p.images} name={p.name} pdpLayout={p.pdpLayout} />
      {p.sku === "103" ? <GourdDropInformation product={p} /> : p.sku === "102" ? <PebbleDropInformation product={p} /> : p.sku === "101" ? <HaloStudInformation product={p} /> : exactPiece ? <ExactPieceInformation product={p} /> : <ProductInformation key={p.slug} product={p} />}
      {editorial && (p.sku === "103" ? <GourdDropSections product={p} /> : p.sku === "102" ? <PebbleDropSections product={p} /> : p.sku === "101" ? <HaloStudSections product={p} /> : exactPiece ? <ExactPieceAccordions product={p} /> : <><NaturallyUnique product={p} /><ProductAccordions product={p} /></>)}
    </div>
    <section className="related-section"><div className="section-heading"><h2 className="section-label">MORE TO EXPLORE</h2><Link className="text-link" href="/shop">Shop All ↗</Link></div><div className="product-grid">{relatedProducts(products,p).map(item=><ProductCard key={item.id} product={item} />)}</div></section>
  </main>;
}
