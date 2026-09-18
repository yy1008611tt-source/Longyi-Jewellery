import type { Product, ProductImage } from "@/types/product";

export const availableImages = (images: readonly ProductImage[]) =>
  images.filter((image): image is ProductImage & { src: string } => !!image.src?.trim());

export const galleryImages = (images: readonly ProductImage[]) =>
  availableImages(images).filter(image => image.role !== "size-guide");

export const hasPrice = (price: Product["price"]): price is number =>
  price !== null && Number.isFinite(price) && price >= 0;

export const beadDiameter = (product: Product) => product.beadSize == null
  ? undefined
  : `${product.beadSizeApproximate ? "Approx. " : ""}${product.beadSize} mm`;

export function coreAttributes(product: Product): [string, string][] {
  const fields = [
    ["Material", product.material],
    ["Bead Size", beadDiameter(product)],
    ["Construction", product.construction],
    ["Metal Components", product.metalComponents],
    ["Treatment", product.treatment],
    ["Wrist Fit", product.wristFitCm ? `${product.wristFitCm} cm${product.wristFitIn ? ` / ${product.wristFitIn} in` : ""}` : product.wristFitIn ? `${product.wristFitIn} in` : undefined],
  ];
  return fields.filter((field): field is [string, string] => !!field[1]);
}
