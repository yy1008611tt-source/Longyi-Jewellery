import Link from "next/link";
import type { Product } from "@/types/product";
import { categoryName } from "@/data/catalog";
import { availableImages, beadDiameter } from "@/lib/product";
import { ProductImageZoom } from "./product-image-zoom";

export function ProductFacts({ rows }: { rows: [string, string][] }) {
  return <dl className="product-facts">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
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
  const image = availableImages(p.images).find(image => image.role === "natural-variation" || image.role === "detail");
  if (p.productType !== "natural-variation" || !p.naturalVariation) return null;
  return <section className="pdp-story pdp-natural" aria-labelledby="natural-title">
    {image && <figure className="pdp-story-image"><ProductImageZoom image={image} sizes="(max-width: 959px) 90vw, 42vw" /></figure>}
    <div className="pdp-story-copy">
      <h2 id="natural-title">Naturally Unique</h2>
      {p.naturalVariationSubtitle && <h3>{p.naturalVariationSubtitle}</h3>}
      <p>{p.naturalVariation}</p>
    </div>
  </section>;
}

export function SizeAndScale({ product: p }: { product: Product }) {
  const image = availableImages(p.images).find(image => image.role === "size-guide");
  if (!p.beadSize || !image) return null;
  return <section className="pdp-story pdp-scale" aria-labelledby="scale-title">
    <div className="pdp-story-copy">
      <p className="eyebrow">Size &amp; Scale</p>
      <h2 id="scale-title">{p.beadSize} mm Bead Size</h2>
      {p.sizeScaleDescription && <p>{p.sizeScaleDescription}</p>}
      <div className="pdp-diameter"><span>BEAD DIAMETER</span><strong>{p.beadSize} mm</strong><span>≈ {(p.beadSize / 25.4).toFixed(2)} in</span></div>
      {p.sizeGuideCaption && <p className="small">{p.sizeGuideCaption}</p>}
    </div>
    <figure className="pdp-story-image"><ProductImageZoom image={image} sizes="(max-width: 959px) 90vw, 42vw" /></figure>
  </section>;
}

