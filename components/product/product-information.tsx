import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { brand } from "@/data/brand";
import { ProductOptions } from "./product-options";
import { coreAttributes } from "@/lib/product";
import { categoryName } from "@/data/catalog";
import { ProductFacts } from "./product-editorial-sections";

export function ProductInformation({product:p}: {product:Product}) {
  if (p.pdpLayout === "editorial") return <div className="product-information pdp-editorial-information">
    <p className="eyebrow">{categoryName(p.category)}</p>
    <h1>{p.name}</h1>
    {p.subtitle && <p className="pdp-subtitle">{p.subtitle}</p>}
    {p.reviews && p.reviews.count > 0 && <p className="review-line">★ {p.reviews.rating.toFixed(1)} ({p.reviews.count})</p>}
    <p className="detail-price">{formatPrice(p.price)}{p.price !== null && <span>USD</span>}</p>
    <p className="detail-description">{p.shortDescription}</p>
    <div className="pdp-core-attributes"><ProductFacts rows={coreAttributes(p)} /></div>
    <ProductOptions product={p} showMeasurements={false} />
  </div>;
  const facts = [
    ["Stone / gemological identity",p.stone ?? "Verified material identity to be added"],
    ["Trade name",p.tradeName],["Colour",p.colour],["Stone origin",p.origin],
    ["Treatment",p.treatment ?? "Treatment information to be confirmed"],
    ["Finish",p.finish],["Craftsmanship",p.craftsmanship],["Workshop / finishing location",p.workshop],["SKU",p.sku],
  ].filter(([,value])=>value);
  return <div className="product-information">
    <h1>{p.name}</h1>
    <div className="review-line">{p.reviews && p.reviews.count>0 ? <p aria-label={`Rated ${p.reviews.rating} out of 5 from ${p.reviews.count} reviews`}>★ {p.reviews.rating.toFixed(1)} ({p.reviews.count})</p>:<p className="small">No reviews yet.</p>}</div>
    <p className="detail-price">{formatPrice(p.price)} {p.price !== null && <><span>USD</span><small>Demo price</small></>}</p>
    <p className="detail-description">{p.shortDescription}</p>
    <ProductOptions product={p} />
    <div className="product-accordions">
      <details open><summary>DESCRIPTION</summary><div><p>{p.description}</p><h2 className="section-label naturally-heading">NATURALLY UNIQUE</h2><p>{p.naturalVariation ?? brand.naturalVariation}</p></div></details>
      <details><summary>MATERIAL &amp; CRAFTSMANSHIP</summary><div><dl className="product-facts">{facts.map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
        {p.certificate && <p className="certificate">CERTIFICATE AVAILABLE · {p.certificate.label}{p.certificate.reference ? ` · ${p.certificate.reference}` : ""}</p>}
        <Link className="text-link" href="/about-feizhoucui">About Feizhoucui ↗</Link>
      </div></details>
      <details id="size-fit"><summary>SIZE &amp; FIT</summary><div>{p.category==="bangles"?<><p>Inner diameter: {p.size?.length ? p.size.map(n=>`${n} mm`).join(", ") : "to be confirmed for this piece"}.</p><p>A rigid bangle must pass over your hand. Hand measurement and product-specific fitting guidance will be added before launch.</p></>:<p>{p.braceletLength ? `Bracelet length: ${p.braceletLength} cm. ` : ""}{p.necklaceLength ? `Necklace length: ${p.necklaceLength} cm. ` : ""}{p.beadSize ? `Bead size: ${p.beadSize} mm. ` : ""}{p.clasp ? `Clasp: ${p.clasp}. ` : ""}Final size and fit guidance will be supplied with verified product measurements.</p>}</div></details>
      <details><summary>SHIPPING &amp; RETURNS</summary><div><p>{p.shippingNote ?? "Destinations, delivery estimates, shipping fees and return terms will be published before purchasing opens."}</p><Link href="/shipping-returns" className="text-link">Shipping &amp; Returns ↗</Link></div></details>
      <details><summary>CARE GUIDE</summary><div><p>{p.care ?? "Care guidance will be confirmed for the material, treatment, finish and construction of this specific piece before launch."}</p></div></details>
    </div>
  </div>;
}
