"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Product } from "@/types/product";
import { galleryImages } from "@/lib/product";
import { ProductImageZoom } from "./product-image-zoom";

export function ProductCarousel({ images, name }: Pick<Product, "images" | "name">) {
  const photos = galleryImages(images);
  const [index, setIndex] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  if (!photos.length) return null;
  const active = index % photos.length;
  const change = (step: number) => setIndex((active + step + photos.length) % photos.length);
  return <section className="pdp-carousel" aria-label={`${name} images`} aria-roledescription="carousel">
    <div className="pdp-carousel-stage"
      onPointerDown={event => {
        swiped.current = false;
        start.current = event.isPrimary && event.button === 0 ? { x: event.clientX, y: event.clientY } : null;
      }}
      onPointerCancel={() => { start.current = null; }}
      onPointerLeave={event => { if (event.pointerType === "mouse") start.current = null; }}
      onPointerUp={event => {
        if (!start.current) return;
        const dx = event.clientX - start.current.x;
        const dy = event.clientY - start.current.y;
        start.current = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          swiped.current = true;
          change(dx < 0 ? 1 : -1);
        }
      }}
      onClickCapture={event => {
        if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false; }
      }}>
      <ProductImageZoom key={photos[active].src} image={photos[active]} sizes="(max-width: 959px) 95vw, 57vw" preload />
      {photos.length > 1 && <>
        <button type="button" className="pdp-carousel-arrow previous" aria-label="Previous product image" onClick={() => change(-1)}>←</button>
        <button type="button" className="pdp-carousel-arrow next" aria-label="Next product image" onClick={() => change(1)}>→</button>
      </>}
    </div>
    <p className="pdp-carousel-count" aria-live="polite" aria-atomic="true">{active + 1} / {photos.length}</p>
    {photos.length > 1 && <div className="pdp-carousel-navigation" role="group" aria-label="Choose product image">
      {photos.map((image, i) => <button type="button" key={image.src} className="pdp-thumbnail" aria-label={`Show image ${i + 1}: ${image.alt}`} aria-pressed={active === i} onClick={() => setIndex(i)}>
        <Image src={image.src} alt="" fill sizes="64px" unoptimized loading="eager" />
        <span className="pdp-carousel-dot" aria-hidden="true" />
      </button>)}
    </div>}
  </section>;
}
