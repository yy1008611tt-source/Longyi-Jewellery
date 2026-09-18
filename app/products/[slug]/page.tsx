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
type Props = { params: Promise<{slug:string}> };
export const dynamicParams=false;
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();
  return {title:p.name,description:p.shortDescription};
}
export default async function ProductPage({params}:Props){
  const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();
  const editorial = p.pdpLayout === "editorial";
  return <main id="main-content" className={`wide-container product-page ${editorial ? "pdp-editorial" : ""}`}>
    <Breadcrumb items={[{label:"Shop",href:"/shop"},...(editorial ? [{label:categoryName(p.category),href:`/collections/${p.category}`}] : []),{label:p.name}]} />
    <div className={`product-detail ${editorial ? "pdp-editorial-layout" : ""}`}>
      <ProductGallery images={p.images} name={p.name} pdpLayout={p.pdpLayout} />
      <ProductInformation key={p.slug} product={p} />
      {editorial && <><NaturallyUnique product={p} /><ProductAccordions product={p} /></>}
    </div>
    <section className="related-section"><div className="section-heading"><h2 className="section-label">MORE TO EXPLORE</h2><Link className="text-link" href="/shop">Shop All ↗</Link></div><div className="product-grid">{relatedProducts(products,p).map(item=><ProductCard key={item.id} product={item} />)}</div></section>
  </main>;
}
