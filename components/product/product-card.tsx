import Image from "next/image";
import Link from "next/link";
import {categoryName} from "@/data/catalog";
import {formatPrice} from "@/lib/format";
import type {Product} from "@/types/product";
export function ProductCard({product}:{product:Product}){return <Link className="product-card" href={`/products/${product.slug}`}><div className="product-image"><Image src={product.image} alt={`Illustrative placeholder for ${product.name}`} fill sizes="(max-width: 599px) 90vw, (max-width: 959px) 45vw, 23vw"/><span className="image-note">ILLUSTRATION</span></div><p className="product-category">{categoryName(product.category)}</p><div className="product-title"><h3>{product.name}</h3><span>{formatPrice(product.price)}</span></div></Link>;}
