import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../data/catalog.ts";
import { showsNaturalMaterialNotice, naturalMaterialNotice } from "../lib/product-notice.ts";

test("all catalog Feizhoucui products and future identities inherit the notice", () => {
  for (const product of products) assert.equal(showsNaturalMaterialNotice(product), true, product.sku);
  assert.equal(showsNaturalMaterialNotice({material:"Natural Feizhoucui"}), true);
  assert.equal(showsNaturalMaterialNotice({tradeName:"Feizhoucui"}), true);
  assert.equal(showsNaturalMaterialNotice({stone:"Natural Quartzite"}), false);
  assert.equal(naturalMaterialNotice.heading, "Naturally Unique");
  assert.equal(naturalMaterialNotice.body, "Natural materials are not perfectly uniform. Subtle variations in color, texture, translucency and natural characteristics are part of what makes each piece unique.");
});
