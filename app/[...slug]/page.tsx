import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {collections,products} from "@/data/catalog";
const pages:Record<string,string>={
shop:"Shop All",collections:"Collections","our-jade":"Our Jade",about:"About Us",contact:"Contact",craftsmanship:"Craftsmanship",faq:"Frequently Asked Questions","shipping-returns":"Shipping & Returns","privacy-policy":"Privacy Policy","terms-conditions":"Terms & Conditions","new-arrivals":"New Arrivals",
...Object.fromEntries(collections.map(c=>[`collections/${c.slug}`,c.name])),
...Object.fromEntries(products.map(p=>[`products/${p.slug}`,p.name]))};
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(pages).map(path=>({slug:path.split("/")}));}
type Props={params:Promise<{slug:string[]}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;return {title:pages[slug.join("/")]||"Page not found",robots:{index:false,follow:false}};}
export default async function Placeholder({params}:Props){
const {slug}=await params;const title=pages[slug.join("/")];if(!title)notFound();
return <main id="main-content" className="container placeholder"><p className="eyebrow">COMING SOON</p><h1>{title}</h1><p>This part of our website is taking shape. Explore our homepage for a first look at the collection.</p><p className="small">Preview only. Products are not available for purchase yet.</p><Link className="button" href="/">Back to homepage <span aria-hidden="true">↗</span></Link></main>;
}
