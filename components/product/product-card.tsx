import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";
export function ProductCard({product}:{product:Product}) {
  const cover=product.images[0];
  const alternate=product.images.slice(1).find(image=>image.src);
  return <Link className="product-card" href={`/products/${product.slug}`}>
    <div className="product-image">
      {cover.src && <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 359px) 90vw, (max-width: 959px) 45vw, 23vw" />}
      {alternate?.src && <Image className="product-hover-image" src={alternate.src} alt="" fill sizes="(max-width: 959px) 45vw, 23vw" />}
      {cover.placeholder && <span className="image-note">Image placeholder</span>}
    </div><h3>{product.name}</h3><p className="card-material">{product.material ?? product.stone ?? "Material details pending"}</p><p className="card-price">{formatPrice(product.price)} {product.price !== null && <span>USD</span>}</p>
  </Link>;
}
