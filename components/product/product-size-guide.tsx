"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { ProductImage } from "@/types/product";

export function ProductSizeGuide({ image, beadSize }: { image: ProductImage & { src: string }; beadSize: number }) {
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
        <h2 id={`${id}-title`}>Bead Size Guide</h2>
        <button type="button" autoFocus aria-label="Close size guide" onClick={() => dialog.current?.close()}>× Close</button>
      </div>
      <div className="pdp-size-dialog-content">
        <p className="pdp-size-selected">{beadSize} mm selected</p>
        <p className="pdp-size-measurement">{beadSize} mm <span>≈ {(beadSize / 25.4).toFixed(2)} in</span></p>
        <p className="pdp-size-reference">For bead-size comparison only.<br />This bracelet is offered with approximately {beadSize} mm beads.<br />Other bracelet designs shown are for scale reference.</p>
        {open && <div className="pdp-size-guide-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 90vw, 540px" unoptimized loading="eager" /></div>}
      </div>
    </dialog>
  </>;
}
