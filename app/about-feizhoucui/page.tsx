import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/breadcrumb";
export const metadata:Metadata={title:"About Feizhoucui",description:"Discover the natural character of Feizhoucui and our approach to clear, product-specific material information."};
const topics=[
["What is Feizhoucui?","Feizhoucui is the trade name at the heart of our collection. A trade name and a stone’s gemological identity are different kinds of information. Verified stone identity will be listed for each product."],
["The stone","Our material guide is taking shape. Specific composition, stone origin and supporting documentation will be added only when verified."],
["Its natural character","Colour, texture and translucency can vary from one natural stone to another."],
["Colour & translucency","Real product photographs will show individual pieces in balanced light, with attention to accurate colour."],
["How we select it","Our selection story will show the people and process behind the jewelry. Workshop information will be presented separately from stone origin."],
["How each piece is different","Individual product descriptions will explain the natural variation visible in that exact piece."],
["Care","Care advice will follow the verified material, finish and construction of each product."],
["Material transparency","Stone identity, trade name, treatment and any available certificate will be presented separately. Unconfirmed information will not be described as a guarantee."],
];
export default function AboutFeizhoucui(){
  return <main id="main-content" className="container education-page"><Breadcrumb items={[{label:"About Feizhoucui"}]} />
    <header className="browse-heading"><p className="eyebrow">DISCOVER FEIZHOUCUI</p><h1>A stone with<br />its own character.</h1><p>Natural stone. Clear information. An individual story.</p></header>
    <div className="education-image"><Image src="/images/bangles.svg" alt="Placeholder for a true-to-colour Feizhoucui close-up" fill sizes="90vw" /><span className="concept-label">Stone close-up photography to follow</span></div>
    <div className="education-topics">{topics.map(([title,text],i)=><section key={title}><p className="eyebrow">0{i+1}</p><h2>{title}</h2><p>{text}</p></section>)}</div>
    <Link className="button" href="/shop">EXPLORE THE COLLECTION</Link>
  </main>;
}
