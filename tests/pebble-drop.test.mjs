import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { sku102, sku102Schema } from "../data/sku102.ts";
import { products } from "../data/catalog.ts";
import { filterAndSortProducts } from "../lib/catalog.ts";
import { naturalMaterialNotice, showsNaturalMaterialNotice } from "../lib/product-notice.ts";
import { inquiryHref, inquiryPrefill } from "../lib/inquiry.ts";

test("SKU 102 has confirmed materials, pair pricing and three separate gallery assets", async () => {
  assert.equal(sku102.name, "Verdant Pebble Drop Earrings");
  assert.equal(sku102.slug, "verdant-pebble-drop-earrings");
  assert.equal(sku102.sku, "102");
  assert.equal(sku102.price, 75);
  assert.equal(sku102.material, "Natural Feizhoucui");
  assert.equal(sku102.metalComponents, "925 Sterling Silver");
  assert.equal(sku102.accentStones, "Zircon");
  assert.equal(sku102.treatment, "No artificial enhancement");
  assert.equal(sku102.soldAs, "One Pair");
  assert.equal(sku102.productType, "natural-variation");
  assert.deepEqual(sku102.images.map(i => i.src), ["01-main", "02-on-ear", "03-detail"].map(n => "/images/products/102/" + n + ".png"));
  for (const image of sku102.images) assert.ok((await readFile(new URL("../public" + image.src, import.meta.url))).length > 0);
  for (const key of ["size", "beadSize", "braceletLength", "necklaceLength", "wristSizes", "exactPiece", "fulfillment"]) assert.equal(sku102[key], undefined);
  assert.equal(sku102Schema.offers.price, 75);
  assert.equal(sku102Schema.offers.priceCurrency, "USD");
  assert.equal(sku102Schema.offers.availability, undefined);
  assert.doesNotMatch(sku102.seoDescription, /unique|exact|same design|random/i);
});

test("SKU 102 inherits the single shared notice and hides only its optional photo note", async () => {
  assert.equal(showsNaturalMaterialNotice(sku102), true);
  assert.equal(naturalMaterialNotice.heading, "Natural Variation");
  assert.equal(naturalMaterialNotice.body, "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.");
  const sections = await readFile(new URL("../components/product/pebble-drop-sections.tsx", import.meta.url), "utf8");
  assert.match(sections, /showPhotoNote={false}/);
  assert.match(sections, /Sold as a pair./);
  assert.doesNotMatch(sections, /SIZE &amp; FIT|SIZE GUIDE|Naturally Unique|Exact Pair|Exact Piece|The photographs represent/);
});

test("SKU 102 is discoverable with canonical inquiry prefill and existing shipping rules", () => {
  assert.equal(products.find(p => p.sku === "102"), sku102);
  assert.ok(filterAndSortProducts(products, "earrings").includes(sku102));
  assert.equal(sku102.newArrival, true);
  assert.equal(sku102.featured, false);
  assert.ok(products.some(p => p.sku === "100"));
  assert.ok(products.some(p => p.sku === "101"));
  const choices = products.map(p => ({slug:p.slug,name:p.name,sku:p.sku,url:"/products/" + p.slug}));
  for (const type of ["product", "trade"]) {
    const href = inquiryHref(type, sku102.slug);
    const initial = inquiryPrefill(Object.fromEntries(new URL(href, "http://localhost").searchParams), choices);
    assert.equal(initial.type, type);
    assert.equal(initial.product, sku102.slug);
    if (type === "trade") assert.equal(initial.productsInterested, sku102.name);
  }
  assert.equal(sku102.tradeMOQ, 10);
  assert.equal(sku102.tradePricingType, "inquiry");
  assert.equal(sku102.whatsapp.number, "8618825229842");
  assert.match(sku102.whatsapp.productMessage, /SKU 102/);
  assert.match(sku102.whatsapp.tradeMessage, /10 pieces or more/);
  assert.equal(sku102.shippingNote, "$20 shipping · Free shipping on orders $200+");
  assert.deepEqual(sku102.shippingPolicy, ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."]);
  assert.equal(sku102.exchangePolicy.title, "FINAL SALE");
  assert.doesNotMatch(sku102.exchangePolicy.paragraphs.join(" "), /fit exchange|size exchange/i);
});
