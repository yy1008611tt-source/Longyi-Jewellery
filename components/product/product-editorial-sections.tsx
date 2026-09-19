import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { categoryName } from "@/data/catalog";
import { availableImages, beadDiameter } from "@/lib/product";
import { whatsappLink } from "@/lib/whatsapp";

export function ProductFacts({ rows, sizeGuide }: { rows: [string, string][]; sizeGuide?: ReactNode }) {
  return <dl className="product-facts">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}{label === "Bead Size" && sizeGuide}</dd></div>)}</dl>;
}

export function ProductAccordions({ product: p }: { product: Product }) {
  const detailRows: [string, string][] = [
    ["Product Code", p.sku], ["Category", categoryName(p.category)],
    ...(beadDiameter(p) ? [["Bead Size", beadDiameter(p)!] as [string, string]] : []),
    ...(p.construction ? [["Construction", p.construction] as [string, string]] : []),
    ...(p.metalComponents ? [["Metal Components", p.metalComponents] as [string, string]] : []),
  ];
  const materialRows: [string, string][] = [
    ...(p.material ? [["Material", p.material] as [string, string]] : []),
    ...(p.treatment ? [["Treatment", p.treatment] as [string, string]] : []),
  ];
  return <div className="product-accordions pdp-editorial-accordions">
    <details><summary>DETAILS</summary><div><p>{p.description}</p><ProductFacts rows={detailRows} /></div></details>
    <details><summary>MATERIALS &amp; STONE</summary><div>
      <ProductFacts rows={materialRows} />
      {p.productType === "natural-variation" && p.naturalVariation && <p>{p.materialVariation ?? p.naturalVariation}</p>}
      <Link className="text-link" href="/about-feizhoucui">About Feizhoucui ↗</Link>
    </div></details>
    <details id="size-fit"><summary>SIZE &amp; FIT</summary><div>
      {beadDiameter(p) && <p>Bead Diameter: {beadDiameter(p)}{p.beadSize ? ` / ${(p.beadSize / 25.4).toFixed(2)} in` : ""}</p>}
      {!!p.wristSizes?.length && <><p>Wrist Size Options</p><ul>{p.wristSizes.map(option=><li key={option.id}>{option.label}</li>)}</ul></>}
      {p.construction && <p>Construction: {p.construction}</p>}
      {p.customSizing && p.fitAdjustment && <p>{p.fitAdjustment}</p>}
      {p.wristFitCm && <p>Wrist fit: {p.wristFitCm} cm{p.wristFitIn ? ` / ${p.wristFitIn} in` : ""}</p>}
      {!p.wristFitCm && p.wristFitIn && <p>Wrist fit: {p.wristFitIn} in</p>}
    </div></details>
    <details><summary>CARE</summary><div>{p.care?.split("\n").map(line => <p key={line}>{line}</p>)}</div></details>
    <details><summary>SHIPPING &amp; RETURNS</summary><div>
      {p.shippingPolicy?.length ? <><h3 className="section-label">SHIPPING</h3>{p.shippingPolicy.map(line=><p key={line}>{line}</p>)}</> : p.shippingNote && <p>{p.shippingNote}</p>}
      {p.exchangePolicy ? <><h3 className="section-label">RETURNS &amp; EXCHANGES</h3><h4>{p.exchangePolicy.title}</h4>{p.exchangePolicy.paragraphs.map(line=><p key={line}>{line}</p>)}</> : <Link className="text-link" href="/shipping-returns">Shipping &amp; Returns ↗</Link>}
      {p.whatsapp && <a className="text-link" href={whatsappLink(p.whatsapp.number,p.whatsapp.sizingMessage)} target="_blank" rel="noopener noreferrer">Contact {p.whatsapp.name} on WhatsApp for sizing help</a>}
    </div></details>
  </div>;
}

export function NaturallyUnique({ product: p }: { product: Product }) {
  if (p.productType !== "natural-variation" || !p.naturalVariation) return null;
  const image=availableImages(p.images).find(image=>image.role==="natural-variation");
  return <section className={`pdp-story pdp-natural${image ? " pdp-natural-with-image" : ""}`} aria-labelledby="natural-title">
    {image && <div className="pdp-natural-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 959px) 100vw, 50vw" unoptimized /></div>}
    <div className="pdp-story-copy">
      <h2 id="natural-title">Naturally Unique</h2>
      {p.naturalVariationSubtitle && <h3>{p.naturalVariationSubtitle}</h3>}
      <p>{p.naturalVariation}</p>
    </div>
  </section>;
}


