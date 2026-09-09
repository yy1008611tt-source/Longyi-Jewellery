"use client";
import { useState } from "react";
import type { Product } from "@/types/product";
export function ProductOptions({product}: {product:Product}) {
  const [size,setSize]=useState<number|undefined>();
  const [message,setMessage]=useState("");
  return <div className="purchase-area">
    {product.category==="bangles" && <div className="option-group"><div className="option-heading"><span>Inner diameter {size ? `· ${size} mm` : ""}</span><a href="#size-fit" onClick={()=>{const guide=document.getElementById("size-fit");if(guide instanceof HTMLDetailsElement)guide.open=true;}}>Size Guide</a></div>
      {product.size?.length ? <div className="size-options" role="group" aria-label="Inner diameter in millimetres">{product.size.map(value=><button type="button" key={value} aria-pressed={size===value} onClick={()=>setSize(value)}>{value} mm</button>)}</div>:<p className="small">Measurements will be added for each piece.</p>}
    </div>}
    {product.category!=="bangles" && <div className="option-group"><p className="small">{product.braceletLength ? `Bracelet length: ${product.braceletLength} cm` : product.necklaceLength ? `Necklace length: ${product.necklaceLength} cm` : "Size and fit details will be added for each piece."}{product.beadSize ? ` · Bead size: ${product.beadSize} mm` : ""}</p></div>}
    <button type="button" className="button purchase-button" aria-describedby="purchase-status" onClick={()=>setMessage("Online shopping is coming soon. No item has been added to a bag.")}>ADD TO BAG</button>
    <p id="purchase-status" className="purchase-status" role="status">{message || "Preview only · Online purchasing is coming soon."}</p>
    <p className="shipping-note">{product.shippingNote ?? "Shipping and returns terms will be confirmed before launch."}</p>
  </div>;
}
