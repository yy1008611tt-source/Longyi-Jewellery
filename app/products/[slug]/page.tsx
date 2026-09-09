import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInformation } from "@/components/product/product-information";
import { products } from "@/data/catalog";
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
  return <main id="main-content" className="wide-container product-page">
    <Breadcrumb items={[{label:"Shop",href:"/shop"},{label:p.name}]} />
    <div className="product-detail"><ProductGallery images={p.images} name={p.name} /><ProductInformation key={p.slug} product={p} /></div>
    <section className="related-section"><div className="section-heading"><h2 className="section-label">MORE TO EXPLORE</h2><Link className="text-link" href="/shop">Shop All ↗</Link></div><div className="product-grid">{relatedProducts(products,p).map(item=><ProductCard key={item.id} product={item} />)}</div></section>
  </main>;
}
