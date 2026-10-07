import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { sku011, sku011Schema } from "../data/sku011.ts";
import { products } from "../data/catalog.ts";
import { filterAndSortProducts } from "../lib/catalog.ts";
import { naturalMaterialNotice, showsNaturalMaterialNotice } from "../lib/product-notice.ts";
import { inquiryHref, inquiryPrefill } from "../lib/inquiry.ts";

test("SKU 011 has confirmed materials, cord inclusion and four separate gallery assets", async () => {
  assert.equal(sku011.name, "Verdant Guanyin Pendant");
  assert.equal(sku011.slug, "verdant-guanyin-pendant");
  assert.equal(sku011.sku, "011");
  assert.equal(sku011.price, 179);
  assert.equal(sku011.material, "Natural Feizhoucui");
  assert.equal(sku011.metalComponents, undefined);
  assert.equal(sku011.cord, "Adjustable cord included");
  assert.equal(sku011.accentStones, undefined);
  assert.equal(sku011.treatment, "No artificial enhancement");
  assert.equal(sku011.soldAs, undefined);
  assert.equal(sku011.productType, "natural-variation");
  assert.deepEqual(sku011.images.map(i => i.src), ["01-main", "02-female-on-body", "03-male-on-body", "04-detail"].map(n => "/images/products/011/" + n + ".png"));
  for (const image of sku011.images) assert.ok((await readFile(new URL("../public" + image.src, import.meta.url))).length > 0);
  for (const key of ["size", "beadSize", "braceletLength", "necklaceLength", "wristSizes", "exactPiece", "fulfillment"]) assert.equal(sku011[key], undefined);
  assert.equal(sku011Schema.offers.price, 179);
  assert.equal(sku011Schema.offers.priceCurrency, "USD");
  assert.equal(sku011Schema.offers.availability, undefined);
  assert.doesNotMatch(sku011.seoDescription, /zircon|silver|unique|exact|same design|random|healing|protection|luck|blessing/i);
});

test("SKU 011 inherits the single shared notice and hides only its optional photo note", async () => {
  assert.equal(showsNaturalMaterialNotice(sku011), true);
  assert.equal(naturalMaterialNotice.heading, "Natural Variation");
  assert.equal(naturalMaterialNotice.body, "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.");
  const sections = await readFile(new URL("../components/product/guanyin-pendant-sections.tsx", import.meta.url), "utf8");
  assert.match(sections, /showPhotoNote={false}/);
  assert.match(sections, /Adjustable cord included./);
  assert.doesNotMatch(sections, /Accent Stones|Zircon/);
  assert.doesNotMatch(sections, /SIZE &amp; FIT|SIZE GUIDE|Naturally Unique|Exact Pair|Exact Piece|The photographs represent/);
});

test("SKU 011 is discoverable with canonical inquiry prefill and existing shipping rules", () => {
  assert.equal(products.find(p => p.sku === "011"), sku011);
  assert.ok(filterAndSortProducts(products, "pendants").includes(sku011));
  assert.equal(sku011.newArrival, true);
  assert.equal(sku011.featured, false);
  assert.ok(products.some(p => p.sku === "100"));
  assert.ok(products.some(p => p.sku === "101"));
  const choices = products.map(p => ({slug:p.slug,name:p.name,sku:p.sku,url:"/products/" + p.slug}));
  for (const type of ["product", "trade"]) {
    const href = inquiryHref(type, sku011.slug);
    const initial = inquiryPrefill(Object.fromEntries(new URL(href, "http://localhost").searchParams), choices);
    assert.equal(initial.type, type);
    assert.equal(initial.product, sku011.slug);
    if (type === "trade") assert.equal(initial.productsInterested, sku011.name);
  }
  assert.equal(sku011.tradeMOQ, 10);
  assert.equal(sku011.tradePricingType, "inquiry");
  assert.equal(sku011.whatsapp.number, "8618825229842");
  assert.match(sku011.whatsapp.productMessage, /SKU 011/);
  assert.match(sku011.whatsapp.tradeMessage, /10 pieces or more/);
  assert.equal(sku011.shippingNote, "$20 shipping · Free shipping on orders $200+");
  assert.deepEqual(sku011.shippingPolicy, ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."]);
  assert.equal(sku011.exchangePolicy.title, "FINAL SALE");
  assert.doesNotMatch(sku011.exchangePolicy.paragraphs.join(" "), /fit exchange|size exchange/i);
});

