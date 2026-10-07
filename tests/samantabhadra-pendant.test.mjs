import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { sku012, sku012Schema, sku012CulturalSymbolism } from "../data/sku012.ts";
import { products } from "../data/catalog.ts";
import { filterAndSortProducts } from "../lib/catalog.ts";
import { naturalMaterialNotice, showsNaturalMaterialNotice } from "../lib/product-notice.ts";
import { inquiryHref, inquiryPrefill } from "../lib/inquiry.ts";

test("SKU 012 has confirmed materials, cord inclusion and four separate gallery assets", async () => {
  assert.equal(sku012.name, "Verdant Samantabhadra Pendant");
  assert.equal(sku012.slug, "verdant-samantabhadra-pendant");
  assert.equal(sku012.sku, "012");
  assert.equal(sku012.price, 179);
  assert.equal(sku012.material, "Natural Feizhoucui");
  assert.equal(sku012.metalComponents, undefined);
  assert.equal(sku012.cord, "Adjustable cord included");
  assert.equal(sku012.accentStones, undefined);
  assert.equal(sku012.treatment, "No artificial enhancement");
  assert.equal(sku012.soldAs, undefined);
  assert.equal(sku012.productType, "natural-variation");
  assert.deepEqual(sku012.images.map(i => i.src), ["01-main", "02-female-on-body", "03-male-on-body", "04-detail"].map(n => "/images/products/012/" + n + ".png"));
  for (const image of sku012.images) assert.ok((await readFile(new URL("../public" + image.src, import.meta.url))).length > 0);
  for (const key of ["size", "beadSize", "braceletLength", "necklaceLength", "wristSizes", "exactPiece", "fulfillment"]) assert.equal(sku012[key], undefined);
  assert.equal(sku012Schema.offers.price, 179);
  assert.equal(sku012Schema.offers.priceCurrency, "USD");
  assert.equal(sku012Schema.offers.availability, undefined);
  assert.doesNotMatch(sku012.seoDescription, /zircon|silver|unique|exact|same design|random|healing|protection|luck|blessing/i);
});

test("SKU 012 inherits the single shared notice and hides only its optional photo note", async () => {
  assert.equal(showsNaturalMaterialNotice(sku012), true);
  assert.equal(naturalMaterialNotice.heading, "Natural Variation");
  assert.equal(naturalMaterialNotice.body, "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.");
  const sections = await readFile(new URL("../components/product/samantabhadra-pendant-sections.tsx", import.meta.url), "utf8");
  assert.match(sections, /showPhotoNote={false}/);
  assert.match(sections, /Adjustable cord included./);
  assert.doesNotMatch(sections, /Accent Stones|Zircon/);
  assert.doesNotMatch(sections, /SIZE &amp; FIT|SIZE GUIDE|Naturally Unique|Exact Pair|Exact Piece|The photographs represent/);
});

test("SKU 012 is discoverable with canonical inquiry prefill and existing shipping rules", () => {
  assert.equal(products.find(p => p.sku === "012"), sku012);
  assert.ok(filterAndSortProducts(products, "pendants").includes(sku012));
  assert.equal(sku012.newArrival, true);
  assert.equal(sku012.featured, false);
  assert.ok(products.some(p => p.sku === "100"));
  assert.ok(products.some(p => p.sku === "101"));
  const choices = products.map(p => ({slug:p.slug,name:p.name,sku:p.sku,url:"/products/" + p.slug}));
  for (const type of ["product", "trade"]) {
    const href = inquiryHref(type, sku012.slug);
    const initial = inquiryPrefill(Object.fromEntries(new URL(href, "http://localhost").searchParams), choices);
    assert.equal(initial.type, type);
    assert.equal(initial.product, sku012.slug);
    if (type === "trade") assert.equal(initial.productsInterested, sku012.name);
  }
  assert.equal(sku012.tradeMOQ, 10);
  assert.equal(sku012.tradePricingType, "inquiry");
  assert.equal(sku012.whatsapp.number, "8618825229842");
  assert.match(sku012.whatsapp.productMessage, /SKU 012/);
  assert.match(sku012.whatsapp.tradeMessage, /10 pieces or more/);
  assert.equal(sku012.shippingNote, "$20 shipping · Free shipping on orders $200+");
  assert.deepEqual(sku012.shippingPolicy, ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."]);
  assert.equal(sku012.exchangePolicy.title, "FINAL SALE");
  assert.doesNotMatch(sku012.exchangePolicy.paragraphs.join(" "), /fit exchange|size exchange/i);
});


test("SKU 012 cultural symbolism is restrained and appears between materials and care", async () => {
 assert.equal(sku012CulturalSymbolism.body, "In Buddhist tradition, Samantabhadra is traditionally associated with wisdom, practice and virtuous action. The elephant motif is also associated with strength and steadiness.");
 const source = await readFile(new URL("../components/product/samantabhadra-pendant-sections.tsx", import.meta.url), "utf8");
 assert.ok(source.indexOf("MATERIALS &amp; FINISH") < source.indexOf("{sku012CulturalSymbolism.heading}"));
 assert.ok(source.indexOf("{sku012CulturalSymbolism.heading}") < source.indexOf("<summary>CARE"));
 assert.doesNotMatch(sku012.seoDescription, /wisdom|virtuous|strength|steadiness/);
});
