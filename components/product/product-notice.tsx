import type { Product } from "@/types/product";
import { naturalMaterialNotice, showsNaturalMaterialNotice, productPhotoNote } from "@/lib/product-notice";

export function ProductNotice({ product }: { product: Product }) {
  if (!showsNaturalMaterialNotice(product)) return null;
  return <section className="pdp-material-notice" aria-label={naturalMaterialNotice.heading}>
    <h2 className="section-label">{naturalMaterialNotice.heading}</h2>
    <p className="small">{naturalMaterialNotice.body}</p>
    <p className="small pdp-photo-note">{productPhotoNote(product)}</p>
  </section>;
}
