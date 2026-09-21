"use client";
import { useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import { hasPrice } from "@/lib/product";
import { whatsappLink } from "@/lib/whatsapp";
import Link from "next/link";
import { inquiryHref } from "@/lib/inquiry";
export function ProductOptions({product,showMeasurements=true,children,sizeGuide}: {product:Product;showMeasurements?:boolean;children?:ReactNode;sizeGuide?:ReactNode}) {
  const [size,setSize]=useState<number|undefined>();
  const [wristSize,setWristSize]=useState<string>();
  const [message,setMessage]=useState("");
  const sizingLink=product.whatsapp ? whatsappLink(product.whatsapp.number,product.whatsapp.sizingMessage) : undefined;
  if (!hasPrice(product.price)) return <div className="purchase-area"><button type="button" className="button purchase-button" disabled>COMING SOON</button></div>;
  return <div className="purchase-area">
    {!!product.wristSizes?.length && <div className="pdp-wrist-options">
      <fieldset><legend>Wrist Size</legend><div className="size-options">{product.wristSizes.map(option=><button key={option.id} type="button" aria-pressed={wristSize===option.id} onClick={()=>{setWristSize(option.id);setMessage("");}}>{option.label}</button>)}</div></fieldset>
      {product.sizingDescription && <p className="small">{product.sizingDescription}</p>}
    </div>}
    {sizeGuide}
    {sizingLink && <div className="pdp-sizing-help"><p>Not sure about your size or need a different fit?</p><a className="text-link" href={sizingLink} target="_blank" rel="noopener noreferrer">Chat with {product.whatsapp!.name} on WhatsApp →</a></div>}
    {children}
    {showMeasurements && product.category==="bangles" && <div className="option-group"><div className="option-heading"><span>Inner diameter {size ? `· ${size} mm` : ""}</span><a href="#size-fit" onClick={()=>{const guide=document.getElementById("size-fit");if(guide instanceof HTMLDetailsElement)guide.open=true;}}>Size Guide</a></div>
      {product.size?.length ? <div className="size-options" role="group" aria-label="Inner diameter in millimetres">{product.size.map(value=><button type="button" key={value} aria-pressed={size===value} onClick={()=>setSize(value)}>{value} mm</button>)}</div>:<p className="small">Measurements will be added for each piece.</p>}
    </div>}
    {showMeasurements && product.category!=="bangles" && <div className="option-group"><p className="small">{product.braceletLength ? `Bracelet length: ${product.braceletLength} cm` : product.necklaceLength ? `Necklace length: ${product.necklaceLength} cm` : "Size and fit details will be added for each piece."}{product.beadSize ? ` · Bead size: ${product.beadSize} mm` : ""}</p></div>}
    <button type="button" className="button purchase-button" aria-describedby="purchase-status" onClick={()=>setMessage(product.wristSizes?.length && !wristSize ? "Please select your wrist size." : "Online shopping is coming soon. No item has been added to a bag.")}>ADD TO BAG</button>
    <p id="purchase-status" className="purchase-status" role="status">{message || "Preview only · Online purchasing is coming soon."}</p>
    <p className="shipping-note">{product.shippingNote ?? "Shipping and returns terms will be confirmed before launch."}</p>
    {product.whatsapp?.productMessage && <div className="pdp-product-help"><p>Need help with this product?</p><div className="inquiry-contact-links"><a className="text-link" href={whatsappLink(product.whatsapp.number,product.whatsapp.productMessage)} target="_blank" rel="noopener noreferrer">Chat with {product.whatsapp.name} →</a><Link className="text-link" href={inquiryHref("product",product.slug)}>Email Us</Link></div></div>}
  </div>;
}
