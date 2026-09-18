import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import { categoryName } from "@/data/catalog";
import { beadDiameter } from "@/lib/product";

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
      {p.productType === "natural-variation" && p.naturalVariation && <p>{p.naturalVariation}</p>}
      <Link className="text-link" href="/about-feizhoucui">About Feizhoucui ↗</Link>
    </div></details>
    <details id="size-fit"><summary>SIZE &amp; FIT</summary><div>
      {beadDiameter(p) && <p>Bead diameter: {beadDiameter(p)}</p>}
      {p.wristFitCm && <p>Wrist fit: {p.wristFitCm} cm{p.wristFitIn ? ` / ${p.wristFitIn} in` : ""}</p>}
      {!p.wristFitCm && p.wristFitIn && <p>Wrist fit: {p.wristFitIn} in</p>}
    </div></details>
    <details><summary>CARE</summary><div>{p.care?.split("\n").map(line => <p key={line}>{line}</p>)}</div></details>
    <details><summary>SHIPPING &amp; RETURNS</summary><div>
      {p.shippingNote && <p>{p.shippingNote}</p>}
      <Link className="text-link" href="/shipping-returns">Shipping &amp; Returns ↗</Link>
    </div></details>
  </div>;
}

export function NaturallyUnique({ product: p }: { product: Product }) {
  if (p.productType !== "natural-variation" || !p.naturalVariation) return null;
  return <section className="pdp-story pdp-natural" aria-labelledby="natural-title">
    <div className="pdp-story-copy">
      <h2 id="natural-title">Naturally Unique</h2>
      {p.naturalVariationSubtitle && <h3>{p.naturalVariationSubtitle}</h3>}
      <p>{p.naturalVariation}</p>
    </div>
  </section>;
}


