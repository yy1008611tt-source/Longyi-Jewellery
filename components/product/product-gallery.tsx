import Image from "next/image";
import type { Product } from "@/types/product";
import { ProductCarousel } from "./product-carousel";
export function ProductGallery({images,name,pdpLayout}:Pick<Product,"images"|"name"|"pdpLayout">) {
  if (pdpLayout === "editorial") return <ProductCarousel images={images} name={name} />;
  return <section className="product-gallery" aria-label={`${name} images`}>
    {images.map((image,index)=><figure className={`gallery-item ${index===0?"gallery-cover":""}`} key={image.role}>
      {image.src ? <Image src={image.src} alt={image.alt} fill sizes={index===0?"(max-width: 959px) 100vw, 55vw":"(max-width: 599px) 50vw, 28vw"} loading={index===0?"eager":"lazy"} />:<div className="photo-slot"><span>{String(index+1).padStart(2,"0")}</span><p>{image.role}</p><small>{image.alt}</small></div>}
      {image.placeholder && <figcaption>{image.role} · Photo placeholder</figcaption>}
    </figure>)}
  </section>;
}
