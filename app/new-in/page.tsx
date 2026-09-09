import type {Metadata} from "next";
import {Breadcrumb} from "@/components/layout/breadcrumb";
import {ProductCard} from "@/components/product/product-card";
import {products} from "@/data/catalog";
export const metadata:Metadata={title:"New In",description:"Explore the latest preview pieces from Longyi Jewellery’s Feizhoucui collection."};
export default function NewIn(){
 const selection=products.filter(p=>p.newArrival);
 return <main id="main-content" className="container browse-page"><Breadcrumb items={[{label:"New In"}]} /><header className="browse-heading"><p className="eyebrow">NEW IN</p><h1>A new everyday.</h1><p>A first look at what’s taking shape.</p></header><p className="catalog-disclaimer">{selection.length} Pieces · Preview collection · Demo prices in USD</p><div className="product-grid">{selection.map(p=><ProductCard product={p} key={p.id} />)}</div></main>;
}
