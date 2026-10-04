import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../data/catalog.ts";
import { showsNaturalMaterialNotice, naturalMaterialNotice, naturalMaterialNoticeZh, productPhotoNote } from "../lib/product-notice.ts";

test("all catalog Feizhoucui products and future identities inherit the notice", () => {
  for (const product of products) assert.equal(showsNaturalMaterialNotice(product), true, product.sku);
  assert.equal(showsNaturalMaterialNotice({material:"Natural Feizhoucui"}), true);
  assert.equal(showsNaturalMaterialNotice({tradeName:"Feizhoucui"}), true);
  assert.equal(showsNaturalMaterialNotice({stone:"Natural Quartzite"}), false);
  assert.equal(naturalMaterialNotice.heading, "Natural Variation");
  assert.equal(naturalMaterialNotice.body, "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.");
});

test("photo notes preserve fulfilment modes and neutral Chinese copy", () => {
  assert.equal(productPhotoNote({productType:"exact-piece"}), "The item shown in the photographs is the item you will receive.");
  assert.equal(productPhotoNote({productType:"exact-pair"}), "The pair shown in the photographs is the pair you will receive.");
  assert.equal(productPhotoNote({productType:"natural-variation"}), "The photographs represent the design and overall appearance. Natural variations in color, texture and translucency may occur.");
  assert.equal(naturalMaterialNoticeZh.heading, "天然差异");
  for (const p of products.filter(p => ["001","010","100","101"].includes(p.sku))) {
    assert.doesNotMatch(p.shortDescription + p.description + (p.seoDescription ?? ""), /one.of.a.kind|exact.pair|exact.piece|individually distinctive/i);
  }
});
