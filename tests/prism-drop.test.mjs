import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { sku104, sku104Schema } from "../data/sku104.ts";
import { products } from "../data/catalog.ts";
import { filterAndSortProducts } from "../lib/catalog.ts";
import { naturalMaterialNotice, showsNaturalMaterialNotice } from "../lib/product-notice.ts";
import { inquiryHref, inquiryPrefill } from "../lib/inquiry.ts";

test("SKU 104 has confirmed materials, pair pricing and three separate gallery assets", async () => {
  assert.equal(sku104.name, "Verdant Prism Drop Earrings");
  assert.equal(sku104.slug, "verdant-prism-drop-earrings");
  assert.equal(sku104.sku, "104");
  assert.equal(sku104.price, 75);
  assert.equal(sku104.material, "Natural Feizhoucui");
  assert.equal(sku104.metalComponents, "925 Sterling Silver");
  assert.equal(sku104.accentStones, "Zircon");
  assert.equal(sku104.treatment, "No artificial enhancement");
  assert.equal(sku104.soldAs, "One Pair");
  assert.equal(sku104.productType, "natural-variation");
  assert.deepEqual(sku104.images.map(i => i.src), ["01-main", "02-on-ear", "03-detail"].map(n => "/images/products/104/" + n + ".png"));
  for (const image of sku104.images) assert.ok((await readFile(new URL("../public" + image.src, import.meta.url))).length > 0);
  for (const key of ["size", "beadSize", "braceletLength", "necklaceLength", "wristSizes", "exactPiece", "fulfillment"]) assert.equal(sku104[key], undefined);
  assert.equal(sku104Schema.offers.price, 75);
  assert.equal(sku104Schema.offers.priceCurrency, "USD");
  assert.equal(sku104Schema.offers.availability, undefined);
  assert.doesNotMatch(sku104.seoDescription, /unique|exact|same design|random/i);
});

test("SKU 104 inherits the single shared notice and hides only its optional photo note", async () => {
  assert.equal(showsNaturalMaterialNotice(sku104), true);
  assert.equal(naturalMaterialNotice.heading, "Natural Variation");
  assert.equal(naturalMaterialNotice.body, "Natural materials may show subtle differences in color, texture and translucency. These variations are a normal part of the material.");
  const sections = await readFile(new URL("../components/product/prism-drop-sections.tsx", import.meta.url), "utf8");
  assert.match(sections, /showPhotoNote={false}/);
  assert.match(sections, /Sold as a pair./);
  assert.doesNotMatch(sections, /SIZE &amp; FIT|SIZE GUIDE|Naturally Unique|Exact Pair|Exact Piece|The photographs represent/);
});

test("SKU 104 is discoverable with canonical inquiry prefill and existing shipping rules", () => {
  assert.equal(products.find(p => p.sku === "104"), sku104);
  assert.ok(filterAndSortProducts(products, "earrings").includes(sku104));
  assert.equal(sku104.newArrival, true);
  assert.equal(sku104.featured, false);
  assert.ok(products.some(p => p.sku === "100"));
  assert.ok(products.some(p => p.sku === "101"));
  const choices = products.map(p => ({slug:p.slug,name:p.name,sku:p.sku,url:"/products/" + p.slug}));
  for (const type of ["product", "trade"]) {
    const href = inquiryHref(type, sku104.slug);
    const initial = inquiryPrefill(Object.fromEntries(new URL(href, "http://localhost").searchParams), choices);
    assert.equal(initial.type, type);
    assert.equal(initial.product, sku104.slug);
    if (type === "trade") assert.equal(initial.productsInterested, sku104.name);
  }
  assert.equal(sku104.tradeMOQ, 10);
  assert.equal(sku104.tradePricingType, "inquiry");
  assert.equal(sku104.whatsapp.number, "8618825229842");
  assert.match(sku104.whatsapp.productMessage, /SKU 104/);
  assert.match(sku104.whatsapp.tradeMessage, /10 pieces or more/);
  assert.equal(sku104.shippingNote, "$20 shipping · Free shipping on orders $200+");
  assert.deepEqual(sku104.shippingPolicy, ["A flat $20 USD shipping fee applies to orders under $200 USD.", "Orders of $200 USD or more qualify for free shipping."]);
  assert.equal(sku104.exchangePolicy.title, "FINAL SALE");
  assert.doesNotMatch(sku104.exchangePolicy.paragraphs.join(" "), /fit exchange|size exchange/i);
});

test("SKU 104 detail with four earrings does not change the sale unit or card primary image",()=>{assert.equal(sku104.soldAs,"One Pair");assert.equal(sku104.price,75);assert.equal(sku104.images[0].src,"/images/products/104/01-main.png");assert.equal(sku104.images[2].alt,"Natural Feizhoucui prism drop earrings showing natural variation");assert.ok(products.some(p=>p.sku==="103"));});
