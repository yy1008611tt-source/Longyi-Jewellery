import type { Metadata } from "next";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { products } from "@/data/catalog";
import { inquiryPrefill } from "@/lib/inquiry";
export const metadata:Metadata={title:"Contact Us",description:"Contact Longyi Jewellery for product, sizing, order and trade inquiries."};
export default async function ContactPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const choices=products.map(p=>({slug:p.slug,name:p.name,sku:p.sku,url:`/products/${p.slug}`}));
  const initial=inquiryPrefill(await searchParams,choices);
  return <main id="main-content" className="inquiry-page">
    <header className="inquiry-heading"><p className="eyebrow">CONTACT LONGYI</p><h1>How Can We Help?</h1><p>Send us a message and we’ll get back to you as soon as possible.</p></header>
    <InquiryForm key={`${initial.type}:${initial.product}`} initial={initial} products={choices} />
  </main>;
}
