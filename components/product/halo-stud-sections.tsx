import type { Product } from "@/types/product";
import { ProductOptions } from "./product-options";
import { ProductFacts } from "./product-editorial-sections";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";

function facts(p: Product): [string, string][] {
  return [["Main Stone", p.material!], ["Metal", p.metalComponents!], ["Accent Stones", p.accentStones!], ["Treatment", p.treatment!], ["Sold As", p.soldAs!], ["Product Type", "Natural Variation"], ["SKU", p.sku]];
}

export function HaloStudInformation({product:p}: {product:Product}) {
  return <div className="product-information pdp-editorial-information">
    <p className="eyebrow">Earrings</p><h1>{p.name}</h1>
    <p className="pdp-subtitle">{p.subtitle}</p><p className="detail-price">{formatPrice(p.price)} <span>USD</span></p>
    <p className="small">SKU {p.sku}</p><p className="detail-description">{p.shortDescription}</p>
    <ProductOptions product={p} showMeasurements={false}><div className="pdp-core-attributes"><ProductFacts rows={facts(p)} /></div></ProductOptions>
    <section className="pdp-trade" aria-label="Trade and wholesale"><h2 className="section-label">TRADE &amp; WHOLESALE</h2>
      <p>{p.tradeCopy?.contact}</p><p>{p.tradeCopy?.pricing}</p><div className="inquiry-contact-links">
      <Link className="pdp-wholesale-button" href="/contact?type=trade&interest=feizhoucui-earrings">WHOLESALE INQUIRY</Link>
      {p.whatsapp?.tradeMessage && <a className="text-link" href={whatsappLink(p.whatsapp.number,p.whatsapp.tradeMessage)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>}</div>
    </section>
  </div>;
}

export function HaloStudSections({product:p}: {product:Product}) {
  return <div className="product-accordions pdp-editorial-accordions">
    <details><summary>DETAILS</summary><div><p>{p.description}</p><ProductFacts rows={facts(p)} /></div></details>
    <details><summary>MATERIALS &amp; FINISH</summary><div><p>Natural Feizhoucui set in 925 sterling silver with zircon accents.</p><p>Treatment: {p.treatment}.</p><Link className="text-link" href="/about-feizhoucui">Discover Feizhoucui ↗</Link></div></details>
    <details><summary>CARE</summary><div>{p.care?.split("\n").map(line=><p key={line}>{line}</p>)}</div></details>
    <details><summary>SHIPPING &amp; RETURNS</summary><div><h3 className="section-label">SHIPPING</h3>{p.shippingPolicy?.map(line=><p key={line}>{line}</p>)}<h3 className="section-label">{p.exchangePolicy?.title}</h3>{p.exchangePolicy?.paragraphs.map(line=><p key={line}>{line}</p>)}</div></details>
  </div>;
}
