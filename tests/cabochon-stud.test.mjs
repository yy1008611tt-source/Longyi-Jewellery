import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { sku105, sku105Schema } from "../data/sku105.ts";
import { products } from "../data/catalog.ts";
import { filterAndSortProducts } from "../lib/catalog.ts";
import { naturalMaterialNotice, showsNaturalMaterialNotice } from "../lib/product-notice.ts";
import { inquiryHref, inquiryPrefill } from "../lib/inquiry.ts";

test("SKU 105 has confirmed materials, pair pricing and three separate gallery assets", async () => {
  assert.equal(sku105.name, "Verdant Cabochon Stud Earrings");
  assert.equal(sku105.slug, "verdant-cabochon-stud-earrings");
  assert.equal(sku105.sku, "105");
  assert.equal(sku105.price, 75);
  assert.equal(sku105.material, "Natural Feizhoucui");
  assert.equal(sku105.metalComponents, "925 Sterling Silver");
  assert.equal(sku105.accentStones, undefined);
  assert.equal(sku105.treatment, "No artificial enhancement");
  assert.equal(sku105.soldAs, "One Pair");
  assert.equal(sku105.productType, "natural-variation");
  assert.deepEqual(sku105.images.map(i => i.src), ["01-main", "02-on-ear", "03-detail"].map(n => "/images/products/105/" + n + ".png"));
  for (const image of sku105.images) assert.ok((await readFile(new URL("../public" + image.src, import.meta.url))).length > 0);
  for (const key of ["size", "beadSize", "braceletLength", "necklaceLength", "wristSizes", "exactPiece", "fulfillment"]) assert.equal(sku105[key], undefined);
  assert.equal(sku105Schema.offers.price, 75);
  assert.equal(sku105Schema.offers.priceCurrency, "USD");
  assert.equal(sku105Schema.offers.availability, undefined);
  assert.doesNotMatch(sku105.seoDescription, /zircon|unique|exact|same design|random/i);
});

test("SKU 105 inherits the single shared notice and hides only its optional photo note", async () => {
  assert.equal(showsNaturalMaterialNotice(sku105), true);
  assert.equal(naturalMaterialNotice.heading, "Natural Variation");
  assert.equal(naturalMaterialNotice.body, "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.");
  const sections = await readFile(new URL("../components/product/cabochon-stud-sections.tsx", import.meta.url), "utf8");
  assert.match(sections, /showPhotoNote={false}/);
  assert.match(sections, /Sold as a pair./);
  assert.doesNotMatch(sections, /Accent Stones|Zircon/);
  assert.doesNotMatch(sections, /SIZE &amp; FIT|SIZE GUIDE|Naturally Unique|Exact Pair|Exact Piece|The photographs represent/);
});

test("SKU 105 is discoverable with canonical inquiry prefill and existing shipping rules", () => {
  assert.equal(products.find(p => p.sku === "105"), sku105);
  assert.ok(filterAndSortProducts(products, "earrings").includes(sku105));
  assert.equal(sku105.newArrival, true);
  assert.equal(sku105.featured, false);
  assert.ok(products.some(p => p.sku === "100"));
  assert.ok(products.some(p => p.sku === "101"));
  const choices = products.map(p => ({slug:p.slug,name:p.name,sku:p.sku,url:"/products/" + p.slug}));
  for (const type of ["product", "trade"]) {
    const href = inquiryHref(type, sku105.slug);
    const initial = inquiryPrefill(Object.fromEntries(new URL(href, "http://localhost").searchParams), choices);
    assert.equal(initial.type, type);
    assert.equal(initial.product, sku105.slug);
    if (type === "trade") assert.equal(initial.productsInterested, sku105.name);
  }
  assert.equal(sku105.tradeMOQ, 10);
  assert.equal(sku105.tradePricingType, "inquiry");
  assert.equal(sku105.whatsapp.number, "8618825229842");
  assert.match(sku105.whatsapp.productMessage, /SKU 105/);
  assert.match(sku105.whatsapp.tradeMessage, /10 pieces or more/);
  assert.equal(sku105.shippingNote, "$20 shipping · Free shipping on orders $200+");
  assert.deepEqual(sku105.shippingPolicy, ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."]);
  assert.equal(sku105.exchangePolicy.title, "FINAL SALE");
  assert.doesNotMatch(sku105.exchangePolicy.paragraphs.join(" "), /fit exchange|size exchange/i);
});

