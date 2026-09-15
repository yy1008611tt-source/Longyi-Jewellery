"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { ProductImage } from "@/types/product";

export function ProductImageZoom({ image, sizes, preload = false }: {
  image: ProductImage & { src: string }; sizes: string; preload?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  return <>
    <button className="pdp-image-trigger" type="button" aria-label={`Enlarge image: ${image.alt}`} aria-haspopup="dialog" aria-controls={id} onClick={() => { setExpanded(true); dialog.current?.showModal(); }}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} unoptimized loading="eager" fetchPriority={preload ? "high" : undefined} />
      <span className="pdp-image-hint" aria-hidden="true">View larger ↗</span>
    </button>
    <dialog className="pdp-image-dialog" ref={dialog} id={id} aria-label={image.alt} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="pdp-zoom-toolbar">
        <a href={image.src} target="_blank" rel="noreferrer">Open original image ↗</a>
        <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close enlarged image">Close ×</button>
      </div>
      <div className="pdp-zoom-media">{expanded && <Image src={image.src} alt={image.alt} fill sizes="95vw" unoptimized loading="eager" />}</div>
    </dialog>
  </>;
}
