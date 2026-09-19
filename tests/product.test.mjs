import assert from "node:assert/strict";
import test from "node:test";
import { sku001, products } from "../data/catalog.ts";
import { availableImages, galleryImages, coreAttributes, hasPrice } from "../lib/product.ts";
import { formatPrice } from "../lib/format.ts";
import { whatsappLink } from "../lib/whatsapp.ts";

test("SKU 001 retains unknown commercial fields without inheriting demo claims", () => {
  assert.equal(products.filter(p => p.id !== "001").length, 10);
  assert.equal(sku001.price, 150);
  assert.equal(formatPrice(sku001.price), "$150");
  assert.equal(hasPrice(sku001.price), true);
  assert.equal(formatPrice(null), "Price coming soon");
  assert.equal(hasPrice(null), false);
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
  assert.deepEqual(availableImages(sku001.images).map(i => i.role), ["main","detail","on-wrist","on-wrist","natural-variation","macro-detail","size-guide"]);
  assert.equal(availableImages([...sku001.images, {role:"on-wrist",alt:"Pending"}, {role:"packaging",src:" ",alt:"Pending"}]).length, 7);
});

test("concentrated gallery excludes the size guide without mutating product data", () => {
  const original = JSON.stringify(sku001);
  assert.deepEqual(galleryImages(sku001.images).map(i => i.role), ["main", "detail", "on-wrist", "on-wrist", "natural-variation", "macro-detail"]);
  const future = ["product","on-wrist","lifestyle","natural-variation","construction","packaging"].map(role => ({role,src:`/future/${role}.png`,alt:role}));
  assert.equal(galleryImages([...sku001.images, ...future, {role:"detail",src:"",alt:"Pending"}]).length, 12);
  assert.deepEqual(galleryImages([]), []);
  assert.equal(JSON.stringify(sku001), original);
});

test("SKU 001 provides confirmed wrist ranges and inquiry-only trade without changing demo products", () => {
  assert.deepEqual(sku001.wristSizes.map(size=>size.label), ["14–16 cm","16–18 cm","18–20 cm"]);
  assert.equal(new Set(sku001.wristSizes.map(size=>size.id)).size,3);
  assert.equal(sku001.tradeMOQ,10);
  assert.equal(sku001.tradeAvailable,true);
  assert.equal(sku001.tradePricingType,"inquiry");
  assert.equal(sku001.customSizing,true);
  assert.equal(sku001.shippingPolicy.length,2);
  assert.equal(sku001.exchangePolicy.paragraphs.length,6);
  assert.ok(products.filter(p=>p.id!=="001").every(p=>p.wristSizes===undefined && p.tradeAvailable===undefined));
});

test("WhatsApp links preserve country code and round-trip distinct prefilled messages", () => {
  for (const message of [sku001.whatsapp.sizingMessage,sku001.whatsapp.tradeMessage,"A&B + size? 14–16 cm"]) {
    const url=new URL(whatsappLink("+86 188-2522-9842",message));
    assert.equal(url.hostname,"wa.me");
    assert.equal(url.pathname,"/8618825229842");
    assert.equal(url.searchParams.get("text"),message);
    assert.equal([...url.searchParams].length,1);
  }
  assert.notEqual(sku001.whatsapp.sizingMessage,sku001.whatsapp.tradeMessage);
});
