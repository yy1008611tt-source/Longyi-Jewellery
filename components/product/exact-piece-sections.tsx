import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { ProductOptions } from "./product-options";
import { ProductFacts } from "./product-editorial-sections";

export function exactPieceFacts(p: Product): [string, string][] {
  return [["Material", p.material!], ["Bail", p.bail!], ["Cord", p.cord!], ["Product Type", "One of a Kind · Exact Piece"], ["SKU", p.sku], ["Price", `${formatPrice(p.price)} USD`]];
}

export function ExactPieceInformation({ product: p }: { product: Product }) {
  return <div className="product-information pdp-editorial-information">
    <p className="eyebrow">Pendants · ONE OF A KIND</p>
    <h1>{p.name}</h1><p className="pdp-subtitle">{p.subtitle}</p>
    <p className="detail-price">{formatPrice(p.price)} <span>USD</span></p>
    <p className="small">SKU {p.sku}</p>
    <p className="detail-description">{p.shortDescription}</p>
    <ProductOptions product={p} showMeasurements={false}>
      <div className="pdp-core-attributes"><ProductFacts rows={exactPieceFacts(p)} /></div>
    </ProductOptions>
    <section className="pdp-trade" aria-label="Trade and wholesale">
      <h2 className="section-label">TRADE &amp; WHOLESALE</h2>
      <p>{p.tradeCopy?.contact}</p><p>{p.tradeCopy?.pricing}</p>
      <div className="inquiry-contact-links">
        <Link className="pdp-wholesale-button" href="/contact?type=trade&interest=feizhoucui-pendants">WHOLESALE INQUIRY</Link>
        {p.whatsapp?.tradeMessage && <a className="text-link" href={whatsappLink(p.whatsapp.number, p.whatsapp.tradeMessage)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>}
      </div>
    </section>
  </div>;
}

export function ExactPieceStory({ product: p }: { product: Product }) {
  return <section className="pdp-story pdp-natural" aria-labelledby="exact-piece-title"><div className="pdp-story-copy">
    <h2 id="exact-piece-title">ONE OF A KIND</h2>
    <h3>The exact piece shown is yours.</h3><p>{p.description}</p>
  </div></section>;
}

export function ExactPieceAccordions({ product: p }: { product: Product }) {
  const rows: [string, string][] = [["Product", p.name], ["SKU", p.sku], ["Category", "Pendants"], ...exactPieceFacts(p).filter(([key]) => key !== "SKU" && key !== "Price")];
  return <div className="product-accordions pdp-editorial-accordions">
    <details><summary>DETAILS</summary><div><ProductFacts rows={rows} /></div></details>
    <details><summary>MATERIALS &amp; FINISH</summary><div>{p.materialsFinish?.map(line => <p key={line}>{line}</p>)}</div></details>
    <details><summary>EXACT PIECE</summary><div>{p.exactPiece?.map(line => <p key={line}>{line}</p>)}</div></details>
    <details><summary>CARE</summary><div>{p.care?.split("\n").map(line => <p key={line}>{line}</p>)}</div></details>
    <details><summary>SHIPPING &amp; RETURNS</summary><div>
      <h3 className="section-label">SHIPPING</h3>{p.shippingPolicy?.map(line => <p key={line}>{line}</p>)}
      <h3 className="section-label">{p.exchangePolicy?.title}</h3>{p.exchangePolicy?.paragraphs.map(line => <p key={line}>{line}</p>)}
    </div></details>
  </div>;
}
