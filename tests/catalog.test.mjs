import assert from "node:assert/strict";
import test from "node:test";
import { collections, products } from "../data/catalog.ts";
import { filterAndSortProducts, relatedProducts, shopHref, shopSelection } from "../lib/catalog.ts";

test("five distinct categories, including bangles, have complete unique products", () => {
  assert.equal(collections.length, 5);
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  assert.equal(new Set(products.map(p => p.slug)).size, products.length);
  for (const collection of collections) {
    const selected = filterAndSortProducts(products, collection.slug);
    assert.ok(selected.length >= 2, collection.slug);
    assert.ok(selected.every(p => p.category === collection.slug));
  }
  assert.ok(products.every(p => p.images.length >= 1 && p.sku && p.description && p.tradeName));
});

test("all four sorts are correct and never mutate the source catalog", () => {
  const original = JSON.stringify(products);
  const asc = filterAndSortProducts(products, undefined, "price-asc");
  const desc = filterAndSortProducts(products, undefined, "price-desc");
  const names = filterAndSortProducts(products, undefined, "name-asc");
  const featured = filterAndSortProducts(products);
  assert.deepEqual(asc.map(p => p.price), products.map(p => p.price).sort((a,b) => a-b));
  assert.deepEqual(desc.map(p => p.price), products.map(p => p.price).sort((a,b) => b-a));
  assert.deepEqual(names.map(p => p.name), products.map(p => p.name).sort((a,b) => a.localeCompare(b,"en")));
  const featuredCount = products.filter(p => p.featured).length;
  assert.ok(featured.slice(0, featuredCount).every(p => p.featured));
  assert.equal(JSON.stringify(products), original);
});

test("filter and sort work together, and links retain the selection", () => {
  const selected = filterAndSortProducts(products, "bangles", "price-desc");
  assert.equal(selected.length, 2);
  assert.deepEqual(selected.map(p => p.price), [229, 189]);
  assert.equal(shopHref("bangles", "price-desc"), "/shop?category=bangles&sort=price-desc");
  assert.equal(shopHref(undefined, "price-desc"), "/shop?sort=price-desc");
  assert.equal(shopHref(), "/shop");
});

test("unknown and repeated query parameters safely fall back", () => {
  assert.deepEqual(shopSelection({ category: "unknown", sort: "<script>" }, collections), { category: undefined, sort: "featured" });
  assert.deepEqual(shopSelection({ category: ["bangles","rings"], sort: ["price-asc"] }, collections), { category: undefined, sort: "featured" });
  assert.deepEqual(shopSelection({ category: "beaded-necklaces", sort: "name-asc" }, collections), { category: "beaded-necklaces", sort: "name-asc" });
});

test("related products prioritize the category, exclude the current item and fill to four", () => {
  for (const current of products) {
    const related = relatedProducts(products, current);
    assert.equal(related.length, 4);
    assert.equal(new Set(related.map(p => p.id)).size, 4);
    assert.ok(related.every(p => p.id !== current.id));
    assert.equal(related[0].category, current.category);
  }
});

test("an empty or very small catalog does not duplicate recommendations", () => {
  assert.deepEqual(filterAndSortProducts([]), []);
  assert.deepEqual(relatedProducts([products[0]], products[0]), []);
  assert.equal(relatedProducts(products.slice(0,2), products[0]).length, 1);
});
