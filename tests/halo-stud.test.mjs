import assert from "node:assert/strict";
import test from "node:test";
import { sku101, sku101Schema } from "../data/sku101.ts";
import { products } from "../data/catalog.ts";
import { sku100 } from "../data/sku100.ts";

test("SKU 101 is a standard design with natural variation, distinct from SKU 100", () => {
  assert.equal(products.find(p => p.sku === "101"), sku101);
  assert.equal(sku101.productType, "natural-variation");
  assert.equal(sku101.price, 75);
  assert.equal(sku101.soldAs, "One Pair");
  assert.equal(sku101.exactPiece, undefined);
  assert.deepEqual(sku101.images.map(i => i.src), ["/images/products/101/01-main.png", "/images/products/101/02-on-ear.png", "/images/products/101/03-detail.png"]);
  assert.equal(sku101.newArrival, true);
  assert.equal(sku101.featured, false);
  assert.equal(sku100.productType, "exact-pair");
  assert.equal(sku101Schema.offers.price, 75);
  assert.equal(sku101Schema.offers.priceCurrency, "USD");
  assert.match(sku101.naturalVariation, /internal structure/);
});
