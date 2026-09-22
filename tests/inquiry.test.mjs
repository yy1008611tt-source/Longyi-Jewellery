import assert from "node:assert/strict";
import test from "node:test";
import { products } from "../data/catalog.ts";
import { emptyInquiry, inquiryTypes, inquiryHref, inquiryPrefill, validateInquiry, inquiryEmail } from "../lib/inquiry.ts";
import { createInquiryHandler } from "../lib/server/inquiry-handler.ts";

const choices=products.map(p=>({slug:p.slug,name:p.name,sku:p.sku,url:`/products/${p.slug}`}));
const sku=choices.find(p=>p.sku==="001");
const valid={...emptyInquiry,type:"product",name:"Inquiry QA",email:"customer@example.com",message:"Could you tell me more?",product:sku.slug};
const request=(body,headers={})=>new Request("http://localhost/api/inquiry",{method:"POST",headers:{origin:"http://localhost","content-type":"application/json",...headers},body:JSON.stringify(body)});
const factory=(send=async()=>true,now=()=>Date.UTC(2026,8,21))=>createInquiryHandler({products:choices,send,now});

test("origin validation uses the actual Host when Next normalizes its internal URL",async()=>{
  let calls=0;
  const handler=factory(async()=>{calls++;return true;});
  const headers={host:"127.0.0.1:3000",origin:"http://127.0.0.1:3000"};
  assert.equal((await handler(request(valid,headers))).status,200);
  assert.equal((await handler(request(valid,{...headers,origin:"http://evil.example"}))).status,403);
  assert.equal((await handler(request(valid,{...headers,"sec-fetch-site":"cross-site"}))).status,403);
  assert.equal(calls,1);
});

test("inquiry validates all required fields and rejects invalid email/header injection",()=>{
  const result=validateInquiry({},choices);
  assert.equal(result.ok,false);
  for(const key of ["type","name","email","message"]) assert.ok(result.errors[key]);
  for(const email of ["not-an-email","a@example.com,b@example.com","a@example.com\r\nBcc: b@example.com"])
    assert.ok(validateInquiry({...valid,email},choices).errors.email);
  assert.ok(validateInquiry({...valid,name:"A\r\nBcc: x"},choices).errors.name);
  assert.ok(validateInquiry({...valid,message:"x".repeat(5001)},choices).errors.message);
  assert.equal(validateInquiry({...valid,email:["a@example.com"]},choices).ok,false);
  assert.equal(validateInquiry({...valid,product:"unknown"},choices).ok,false);
});
test("six types validate their dynamic fields without leaking inactive fields",()=>{
  for(const type of inquiryTypes.map(t=>t.value)) {
    const data={...valid,type};
    if(type==="exchange") data.orderNumber="QA-001";
    if(type==="trade") Object.assign(data,{company:"Sample Shop",country:"UK",productsInterested:"Bracelets",quantity:"10"});
    assert.equal(validateInquiry(data,choices).ok,true,type);
  }
  const exchange=validateInquiry({...valid,type:"exchange",product:""},choices);
  assert.ok(exchange.errors.orderNumber); assert.ok(exchange.errors.product);
  assert.equal(validateInquiry({...valid,type:"sizing",wristSize:"Not sure",wristMeasurement:"16.5 cm"},choices).ok,true);
  assert.ok(validateInquiry({...valid,type:"sizing",wristSize:"invalid"},choices).errors.wristSize);
  const cleared=validateInquiry({...valid,type:"other",company:"hidden",quantity:"9",wristSize:"invalid",orderNumber:"hidden"},choices);
  assert.equal(cleared.ok,true); assert.equal(cleared.data.company,"");assert.equal(cleared.data.orderNumber,"");assert.equal(cleared.data.wristSize,"");
});
test("trade requires business fields and whole-number MOQ of ten",()=>{
  const trade={...valid,type:"trade",company:"Shop",country:"US",productsInterested:"Bracelets"};
  for(const quantity of ["","9","9.9","10.1","1e2","NaN","-10"]) {
    const result=validateInquiry({...trade,quantity},choices);
    assert.equal(result.ok,false);assert.ok(result.errors.quantity);
  }
  assert.equal(validateInquiry({...trade,quantity:"10"},choices).ok,true);
  const missing=validateInquiry({...valid,type:"trade"},choices);
  for(const key of ["company","country","productsInterested","quantity"])assert.ok(missing.errors[key]);
});
test("product and trade prefill use only canonical catalog metadata",()=>{
  assert.equal(inquiryPrefill({},choices).type,"");
  for(const type of ["product","trade"]) {
    const href=inquiryHref(type,sku.slug);
    const initial=inquiryPrefill(Object.fromEntries(new URL(href,"http://localhost").searchParams),choices);
    assert.equal(initial.type,type);assert.equal(initial.product,sku.slug);
    assert.equal(initial.productsInterested,type==="trade"?sku.name:"");
  }
  assert.equal(inquiryPrefill({type:"trade"},choices).product,"");
  assert.equal(inquiryPrefill({type:"evil",product:"https://evil.example"},choices).type,"");
  assert.equal(inquiryPrefill({product:["a",sku.slug]},choices).product,"");
  const result=validateInquiry({...valid,sku:"fake",productUrl:"https://evil.example"},choices);
  const mail=inquiryEmail(result.data,result.product,"2026-09-21T00:00:00.000Z");
  assert.ok(mail.text.includes("SKU:\n001"));assert.ok(mail.text.includes(sku.url));assert.ok(!mail.text.includes("evil.example"));
});
test("email subjects, Reply-To and optional fields are accurate for each inquiry",()=>{
  for(const type of inquiryTypes.map(t=>t.value)) {
    const mail=inquiryEmail({...valid,type,orderNumber:["order","exchange"].includes(type)?"QA-123":""},sku,"2026-09-21T00:00:00.000Z");
    assert.equal(mail.replyTo,"customer@example.com");
    assert.ok(mail.subject.startsWith("[LONGYI] "));
    if(["order","exchange"].includes(type))assert.ok(mail.subject.endsWith("Order #QA-123"));
    if(type==="other")assert.equal(mail.subject,"[LONGYI] General Inquiry");
    assert.ok(!mail.text.includes("undefined"));assert.ok(!mail.text.includes("null"));
    assert.ok(!mail.text.includes("Company:"));
  }
});
test("server success waits for delivery confirmation and transmits canonical product and trade fields",async()=>{
  let delivered;const handler=factory(async mail=>{delivered=mail;return true;});
  const res=await handler(request({...valid,type:"trade",company:"QA Shop",country:"US",quantity:"10",productsInterested:sku.name,website:"example.com"}));
  assert.equal(res.status,200);assert.deepEqual(await res.json(),{ok:true});
  assert.ok(delivered.subject.includes("Trade Inquiry — Verdant Beaded Bracelet"));
  for(const text of ["Company:\nQA Shop","Estimated Quantity:\n10","SKU:\n001","Submitted Time:"])assert.ok(delivered.text.includes(text));
  assert.equal(delivered.replyTo,valid.email);
});
test("provider rejection or exception never produces false success or leaks details",async()=>{
  for(const send of [async()=>false,async()=>{throw Error("smtp secret stack");}]) {
    const res=await factory(send)(request(valid));
    assert.ok(res.status>=500);const body=await res.json();assert.equal(body.ok,false);
    assert.ok(!JSON.stringify(body).includes("smtp"));assert.ok(!JSON.stringify(body).includes("secret"));
  }
});
test("server rejects malformed, oversized, cross-origin and honeypot requests without sending",async()=>{
  let count=0;const handler=factory(async()=>{count++;return true;});
  assert.equal((await handler(request({...valid,companyWebsite:"spam"}))).status,400);
  assert.equal((await handler(request(valid,{origin:"https://evil.example"}))).status,403);
  assert.equal((await handler(request(valid,{"content-type":"text/plain"}))).status,415);
  assert.equal((await handler(request({...valid,message:"x".repeat(33000)}))).status,413);
  assert.equal((await handler(new Request("http://localhost/api/inquiry",{method:"POST",headers:{origin:"http://localhost","content-type":"application/json"},body:"{"}))).status,400);
  assert.equal((await handler(request({}))).status,422);assert.equal(count,0);
});
test("per-sender throttle expires and duplicate successful inquiries are not sent twice",async()=>{
  let time=0,count=0;const handler=factory(async()=>{count++;return true;},()=>time);
  assert.equal((await handler(request(valid))).status,200);
  assert.equal((await handler(request(valid))).status,409);
  assert.equal(count,1);
  for(let i=1;i<=2;i++)assert.equal((await handler(request({...valid,message:"Question "+i}))).status,200);
  assert.equal((await handler(request({...valid,message:"Question 3"}))).status,429);
  time=16*60_000;assert.equal((await handler(request(valid))).status,200);
});
test("concurrent duplicate is rejected while the first request awaits the provider",async()=>{
  let finish;let started;
  const ready=new Promise(resolve=>{started=resolve;});
  const handler=factory(()=>{started();return new Promise(resolve=>{finish=resolve;});});
  const first=handler(request(valid));await ready;
  assert.equal((await handler(request(valid))).status,409);
  finish(true);assert.equal((await first).status,200);
});
