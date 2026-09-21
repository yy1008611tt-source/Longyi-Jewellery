import { createHash } from "node:crypto";
import { inquiryEmail, validateInquiry } from "../inquiry.ts";
import type { InquiryProduct } from "../inquiry.ts";

type Email = ReturnType<typeof inquiryEmail>;
const failure = {ok:false, message:"We couldn’t send your message right now. Please try again or contact us on WhatsApp."};
const response = (body: unknown, status=200) => Response.json(body,{status,headers:{"Cache-Control":"no-store"}});

// Basic per-process throttle; use a shared store/edge limit before scaling to multiple instances.
export function createInquiryHandler({products, send, now=Date.now}: {
  products: InquiryProduct[]; send:(email:Email)=>Promise<boolean>; now?:()=>number;
}) {
  const attempts = new Map<string,{count:number;until:number}>();
  const pending = new Set<string>();
  const sent = new Map<string,number>();
  function take(key:string, limit:number) {
    const time=now();
    for (const [k,v] of attempts) if(v.until<=time) attempts.delete(k);
    const item=attempts.get(key) ?? {count:0,until:time+15*60_000};
    if(item.count>=limit) return false;
    item.count++; attempts.set(key,item); return true;
  }
  return async function POST(request: Request): Promise<Response> {
    if(request.headers.get("origin")!==new URL(request.url).origin || request.headers.get("sec-fetch-site")==="cross-site") return response(failure,403);
    if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return response(failure,415);
    if(!take("global",60)) return response(failure,429);
    let input:unknown;
    try {
      // Enforce the actual streamed size as well as the advertised Content-Length.
      if(Number(request.headers.get("content-length"))>32768) return response(failure,413);
      const reader=request.body?.getReader();
      if(!reader) return response(failure,400);
      const chunks:Uint8Array[]=[]; let size=0;
      while(true) {
        const part=await reader.read(); if(part.done) break;
        size+=part.value.byteLength;
        if(size>32768){await reader.cancel();return response(failure,413);}
        chunks.push(part.value);
      }
      input=JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch { return response(failure,400); }
    const result=validateInquiry(input,products);
    if(!result.ok) {
      if(result.errors.companyWebsite) return response(failure,400);
      return response({ok:false,errors:result.errors},422);
    }
    const emailKey=createHash("sha256").update(result.data.email.toLowerCase()).digest("hex");
    const fingerprint=createHash("sha256").update(JSON.stringify({...result.data,email:result.data.email.toLowerCase()})).digest("hex");
    for(const [key,until] of sent) if(until<=now()) sent.delete(key);
    if(pending.has(fingerprint) || sent.has(fingerprint)) return response(failure,409);
    if(!take(emailKey,3)) return response(failure,429);
    pending.add(fingerprint);
    try {
      if(!await send(inquiryEmail(result.data,result.product,new Date(now()).toISOString()))) return response(failure,502);
      sent.set(fingerprint,now()+5*60_000);
      return response({ok:true});
    } catch { return response(failure,503); }
    finally {pending.delete(fingerprint);}
  };
}
