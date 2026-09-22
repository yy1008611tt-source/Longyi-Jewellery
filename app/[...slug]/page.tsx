import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
const pages:Record<string,string>={craftsmanship:"Craftsmanship",faq:"FAQ","shipping-returns":"Shipping & Returns","privacy-policy":"Privacy Policy","terms-conditions":"Terms & Conditions","care-guide":"Care Guide","size-guide":"Size Guide","visit-us":"Visit Us"};
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(pages).map(slug=>({slug:[slug]}));}
type Props={params:Promise<{slug:string[]}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{return {title:pages[(await params).slug.join("/")]??"Not Found"};}
export default async function Placeholder({params}:Props){
 const slug=(await params).slug.join("/");const title=pages[slug];if(!title)notFound();
 return <main id="main-content" className="container placeholder"><p className="eyebrow">TAKING SHAPE</p><h1>{title}</h1><p>{slug==="visit-us"?"We look forward to welcoming you in person. Verified store details and opening hours will be added before launch.":"The details for this page will be added before launch."}</p><Link className="text-link" href="/shop">Explore the collection ↗</Link></main>;
}
