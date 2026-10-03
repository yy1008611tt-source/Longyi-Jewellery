import assert from "node:assert/strict";
import test from "node:test";
import { sku100, sku100Schema } from "../data/sku100.ts";
import { products, sku001 } from "../data/catalog.ts";
import { sku010 } from "../data/sku010.ts";
import { galleryImages } from "../lib/product.ts";
import { inquiryPrefill, inquiryEmail, validateInquiry } from "../lib/inquiry.ts";
import { whatsappLink } from "../lib/whatsapp.ts";

test("earrings preserve confirmed pair identity, price, material and three original image paths", () => {
  assert.equal(products.find(p => p.slug === "verdant-drop-earrings"), sku100);
  assert.equal(sku100.category, "earrings");
  assert.equal(sku100.price, 75);
  assert.equal(sku100.productType, "exact-pair");
  assert.equal(sku100.soldAs, "One Pair");
  assert.equal(sku100.material, "Natural Feizhoucui");
  assert.equal(sku100.metalComponents, "925 Sterling Silver");
  assert.equal(sku100.accentStones, "Zircon");
  assert.equal(sku100.treatment, "No artificial enhancement");
  assert.deepEqual(galleryImages(sku100.images).map(i => i.src), ["/images/products/100/01-main.png", "/images/products/100/02-on-ear.png", "/images/products/100/03-detail.png"]);
  for (const key of ["wristSizes", "size", "beadSize", "necklaceLength", "braceletLength", "bail", "cord", "origin", "certificate"]) assert.equal(sku100[key], undefined, key);
  assert.equal(sku100.newArrival, true);
  assert.equal(sku100.featured, false);
  assert.equal(sku001.price, 139);
  assert.equal(sku010.price, 75);
  assert.deepEqual(sku100.shippingPolicy, sku010.shippingPolicy);
  assert.equal(sku100.exchangePolicy.title, "FINAL SALE");
  assert.deepEqual(sku100Schema.offers, {"@type":"Offer",price:75,priceCurrency:"USD"});
});

test("earring help uses canonical SKU context and similar-earring trade interest", () => {
  const choices = products.map(p => ({slug:p.slug,name:p.name,sku:p.sku,url:`/products/${p.slug}`}));
  const initial = inquiryPrefill({type:"product",product:sku100.slug}, choices);
  const result = validateInquiry({...initial,name:"Customer",email:"customer@example.com",message:"Question about this pair."}, choices);
  assert.equal(result.ok, true);
  assert.match(inquiryEmail(result.data,result.product,"test").text, /SKU:\n100/);
  const trade = inquiryPrefill({type:"trade",interest:"feizhoucui-earrings"}, choices);
  assert.equal(trade.productsInterested, "Feizhoucui Earrings");
  assert.equal(trade.product, "");
  assert.equal(trade.quantity, "");
  assert.equal(sku100.tradeMOQ, 10);
  for (const message of [sku100.whatsapp.productMessage,sku100.whatsapp.tradeMessage]) {
    const url = new URL(whatsappLink(sku100.whatsapp.number,message));
    assert.equal(url.pathname,"/8618825229842");
    assert.equal(url.searchParams.get("text"),message);
  }
});
