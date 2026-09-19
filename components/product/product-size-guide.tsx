"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { ProductImage } from "@/types/product";
import { whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

export function ProductSizeGuide({ image, beadSize, product }: { image: ProductImage & { src: string }; beadSize: number; product: Product }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  return <>
    <button ref={trigger} className="pdp-size-guide-link" type="button" aria-haspopup="dialog" aria-controls={id} onClick={() => { setOpen(true); dialog.current?.showModal(); }}>Size Guide →</button>
    <dialog ref={dialog} id={id} className="pdp-size-dialog" aria-labelledby={`${id}-title`}
      onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}
      onClick={event => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.current?.close();
      }}>
      <div className="pdp-size-dialog-header">
        <h2 id={`${id}-title`}>Size Guide</h2>
        <button type="button" autoFocus aria-label="Close size guide" onClick={() => dialog.current?.close()}>× Close</button>
      </div>
      <div className="pdp-size-dialog-content">
        <section className="pdp-guide-part" aria-labelledby={`${id}-wrist`}>
          <h3 id={`${id}-wrist`} className="section-label">WRIST SIZE</h3>
          <dl className="pdp-guide-ranges">{product.wristSizes?.map(option=><div key={option.id}><dt>{option.label}</dt><dd>{option.description}</dd></div>)}</dl>
          <h3 className="section-label">HOW TO MEASURE</h3>
          {product.measuringInstructions?.split("\n").map(line=><p key={line}>{line}</p>)}
          <h3 className="section-label">FLEXIBLE FIT</h3><p>{product.fitAdjustment}</p>
          {product.whatsapp?.customSizingMessage && <><h3 className="section-label">NEED A DIFFERENT SIZE?</h3><p>Contact {product.whatsapp.name} on WhatsApp for custom sizing assistance.</p><a className="text-link" href={whatsappLink(product.whatsapp.number,product.whatsapp.customSizingMessage)} target="_blank" rel="noopener noreferrer">Chat with {product.whatsapp.name} →</a></>}
        </section>
        <section className="pdp-guide-part" aria-labelledby={`${id}-bead`}>
        <h3 id={`${id}-bead`} className="section-label">BEAD SIZE</h3>
        <p className="pdp-size-measurement">Approx. {beadSize} mm <span>≈ {(beadSize / 25.4).toFixed(2)} in</span></p>
        <p className="pdp-size-reference">The image is for bead-size comparison only.<br />Other bracelet designs shown are for scale reference and are not included with this product.</p>
        {open && <div className="pdp-size-guide-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 90vw, 540px" unoptimized loading="eager" /></div>}
        </section>
      </div>
    </dialog>
  </>;
}
