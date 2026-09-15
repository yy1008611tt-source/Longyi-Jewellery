import type { Category, Collection, Product } from "@/types/product";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
] as const;
export type SortOrder = (typeof sortOptions)[number]["value"];
type QueryValue = string | string[] | undefined;

// Ignore unknown or repeated parameters instead of letting untrusted input select data.
export function shopSelection(
  query: { category?: QueryValue; sort?: QueryValue },
  categories: readonly Collection[],
): { category: Category | undefined; sort: SortOrder } {
  return {
    category: categories.find((item) => item.slug === query.category)?.slug,
    sort: sortOptions.find((item) => item.value === query.sort)?.value ?? "featured",
  };
}

export function shopHref(category?: Category, sort: SortOrder = "featured") {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort !== "featured") params.set("sort", sort);
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

export function filterAndSortProducts(
  catalog: readonly Product[],
  category?: Category,
  sort: SortOrder = "featured",
): Product[] {
  const selected = catalog.filter((product) => !category || product.category === category);
  switch (sort) {
    case "price-asc": return selected.sort((a, b) => a.price === null ? (b.price === null ? 0 : 1) : b.price === null ? -1 : a.price - b.price);
    case "price-desc": return selected.sort((a, b) => a.price === null ? (b.price === null ? 0 : 1) : b.price === null ? -1 : b.price - a.price);
    case "name-asc": return selected.sort((a, b) => a.name.localeCompare(b.name, "en"));
    default: return selected.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function relatedProducts(catalog: readonly Product[], current: Product): Product[] {
  const others = catalog.filter((product) => product.id !== current.id);
  return [
    ...others.filter((product) => product.category === current.category),
    ...others.filter((product) => product.category !== current.category),
  ].slice(0, 4);
}
