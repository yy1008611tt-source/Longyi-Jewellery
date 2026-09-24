import assert from "node:assert/strict";
import test from "node:test";
import { shopCategories, primaryLinks } from "../data/navigation.ts";
import { products } from "../data/catalog.ts";
import { filterAndSortProducts, shopSelection } from "../lib/catalog.ts";

test("all six shopping categories are distinct and include Pendants", () => {
  assert.deepEqual(shopCategories.map(c => c.slug), ["bangles", "beaded-bracelets", "beaded-necklaces", "pendants", "earrings", "rings"]);
  assert.ok(products.every(p => shopCategories.some(c => c.slug === p.category)));
  assert.deepEqual(primaryLinks.map(([, href]) => href), ["/", "/new-in", "/about-feizhoucui"]);
});

test("Pendants resolves as a category with an honest empty selection", () => {
  const result = shopSelection({category: "pendants"}, shopCategories);
  assert.equal(result.category, "pendants");
  assert.deepEqual(filterAndSortProducts(products, result.category), []);
});
