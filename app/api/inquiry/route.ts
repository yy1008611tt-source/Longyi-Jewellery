import { products } from "@/data/catalog";
import { createInquiryHandler } from "@/lib/server/inquiry-handler";
import { sendInquiryMail } from "@/lib/server/inquiry-mail";
export const runtime="nodejs";
export const POST=createInquiryHandler({
  products:products.map(p=>({slug:p.slug,name:p.name,sku:p.sku,url:`/products/${p.slug}`})),
  send:sendInquiryMail,
});
