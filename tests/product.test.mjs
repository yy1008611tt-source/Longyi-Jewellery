import assert from "node:assert/strict";
import test from "node:test";
import { sku001, products } from "../data/catalog.ts";
import { availableImages, coreAttributes, hasPrice } from "../lib/product.ts";
import { formatPrice } from "../lib/format.ts";

test("SKU 001 retains unknown commercial fields without inheriting demo claims", () => {
  assert.equal(products.filter(p => p.id !== "001").length, 10);
  assert.equal(sku001.price, null);
  assert.equal(formatPrice(sku001.price), "Price coming soon");
  assert.equal(hasPrice(sku001.price), false);
  assert.equal(hasPrice(168), true);
  assert.equal(hasPrice(NaN), false);
  assert.equal(sku001.stone, undefined);
  assert.equal(sku001.certificate, undefined);
  assert.equal(sku001.origin, undefined);
  assert.equal(sku001.reviews, undefined);
  assert.equal(sku001.productType, "natural-variation");
});

test("product facts omit unknown wrist measurements and preserve confirmed material data", () => {
  assert.deepEqual(coreAttributes(sku001), [
    ["Material", "Natural Feizhoucui"], ["Bead Size", "Approx. 8 mm"],
    ["Construction", "Flexible elastic cord"], ["Metal Components", "None"],
    ["Treatment", "No artificial enhancement"],
  ]);
  assert.ok(coreAttributes({...sku001, wristFitCm:"15–17"}).some(([k,v]) => k === "Wrist Fit" && v === "15–17 cm"));
});

test("gallery displays only supplied images in order and accepts future image roles", () => {
  assert.deepEqual(availableImages(sku001.images).map(i => i.role), ["main","detail","size-guide"]);
  assert.equal(availableImages([...sku001.images, {role:"on-wrist",alt:"Pending"}, {role:"packaging",src:" ",alt:"Pending"}]).length, 3);
});
