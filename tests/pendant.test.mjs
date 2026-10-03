import assert from "node:assert/strict";
import test from "node:test";
import { sku010 } from "../data/sku010.ts";
import { products, sku001, categoryName } from "../data/catalog.ts";
import { galleryImages } from "../lib/product.ts";
import { inquiryPrefill, inquiryEmail, validateInquiry, emptyInquiry } from "../lib/inquiry.ts";
import { whatsappLink } from "../lib/whatsapp.ts";

test("retail prices and both live product shipping policies stay consistent", () => {
  assert.equal(sku001.price + sku010.price, 214);
  for (const product of [sku001, sku010]) {
    assert.equal(product.shippingNote, "$20 shipping · Free shipping on orders $200+");
    assert.deepEqual(product.shippingPolicy, [
      "A flat $20 USD shipping fee applies to orders under $200 USD.",
      "Orders of $200 USD or more qualify for free shipping.",
    ]);
    assert.equal(product.tradeMOQ, 10);
    assert.equal(product.tradePricingType, "inquiry");
  }
});

test("SKU 010 is the only pendant, with confirmed price and exactly three supplied images", () => {
  assert.deepEqual(products.filter(p => p.category === "pendants").map(p => p.sku), ["010"]);
  assert.equal(categoryName(sku010.category), "Pendants");
  assert.equal(sku010.price, 75);
  assert.equal(sku001.price, 139);
  assert.equal(sku010.productType, "exact-piece");
  assert.deepEqual(galleryImages(sku010.images).map(i => i.src), ["/images/products/010/01-main.png", "/images/products/010/02-on-body.png", "/images/products/010/03-lifestyle.png"]);
  assert.equal(sku010.bail, "925 Sterling Silver");
  assert.equal(sku010.cord, "Adjustable cord included");
  for (const field of ["size", "wristSizes", "beadSize", "braceletLength", "necklaceLength", "treatment", "certificate", "origin", "naturalVariation"]) assert.equal(sku010[field], undefined, field);
  assert.equal(sku010.exchangePolicy.title, "FINAL SALE");
  assert.ok(!sku010.exchangePolicy.paragraphs.join(" ").match(/exchange|fit|size/i));
});

test("pendant product help round-trips its exact-piece WhatsApp and canonical email context", () => {
  const url = new URL(whatsappLink(sku010.whatsapp.number, sku010.whatsapp.productMessage));
  assert.equal(url.pathname, "/8618825229842");
  assert.equal(url.searchParams.get("text"), "Hi Tong, I'm interested in the Verdant Orb Pendant (SKU 010). I have a question about this exact piece.");
  const choices = products.map(p => ({slug:p.slug, name:p.name, sku:p.sku, url:`/products/${p.slug}`}));
  const initial = inquiryPrefill({type:"product",product:sku010.slug}, choices);
  const result = validateInquiry({...initial,name:"Customer",email:"customer@example.com",message:"Question about this pendant."}, choices);
  assert.equal(result.ok, true);
  const mail = inquiryEmail(result.data, result.product, "test");
  assert.match(mail.text, /SKU:\n010/);
  assert.match(mail.text, /Product URL:\n\/products\/verdant-orb-pendant/);
});

test("pendant trade prefill asks for similar pieces without assigning a quantity of SKU 010", () => {
  const initial = inquiryPrefill({type:"trade",interest:"feizhoucui-pendants"}, []);
  assert.equal(initial.productsInterested, "Feizhoucui Pendants");
  assert.equal(initial.product, "");
  assert.equal(initial.quantity, "");
  assert.match(sku010.whatsapp.tradeMessage, /similar Feizhoucui pendants/);
  assert.equal(inquiryPrefill({type:"trade",interest:"untrusted"}, []).productsInterested, emptyInquiry.productsInterested);
});
