import Image from "next/image";
import type { Product } from "@/types/product";
import { availableImages } from "@/lib/product";
import { ProductImageZoom } from "./product-image-zoom";
export function ProductGallery({images,name,pdpLayout}:Pick<Product,"images"|"name"|"pdpLayout">) {
  if (pdpLayout === "editorial") return <section className="product-gallery pdp-editorial-gallery" aria-label={`${name} images`}>
    {availableImages(images).map((image,index)=><figure className={`gallery-item ${index===0?"gallery-cover":""}`} key={`${image.src}-${index}`}>
      <ProductImageZoom image={image} sizes={index===0?"(max-width: 959px) 95vw, 57vw":"(max-width: 599px) 95vw, (max-width: 959px) 45vw, 28vw"} preload={index===0} />
    </figure>)}
  </section>;
  return <section className="product-gallery" aria-label={`${name} images`}>
    {images.map((image,index)=><figure className={`gallery-item ${index===0?"gallery-cover":""}`} key={image.role}>
      {image.src ? <Image src={image.src} alt={image.alt} fill sizes={index===0?"(max-width: 959px) 100vw, 55vw":"(max-width: 599px) 50vw, 28vw"} loading={index===0?"eager":"lazy"} />:<div className="photo-slot"><span>{String(index+1).padStart(2,"0")}</span><p>{image.role}</p><small>{image.alt}</small></div>}
      {image.placeholder && <figcaption>{image.role} · Photo placeholder</figcaption>}
    </figure>)}
  </section>;
}
