"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { contact } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";
import { inquiryTypes, validateInquiry, wristChoices } from "@/lib/inquiry";
import type { InquiryErrors, InquiryProduct, InquiryValues } from "@/lib/inquiry";

function Field({id,label,required,error,children}:{id:string;label:string;required?:boolean;error?:string;children:ReactNode}) {
  return <div className="inquiry-field"><label htmlFor={id}>{label}{required ? " *" : <span className="inquiry-optional">Optional</span>}</label>{children}{error && <p id={`${id}-error`} className="inquiry-error">{error}</p>}</div>;
}
export function InquiryForm({initial,products}:{initial:InquiryValues;products:InquiryProduct[]}) {
  const [values,setValues]=useState(initial);
  const [errors,setErrors]=useState<InquiryErrors>({});
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"failure">("idle");
  const busy=useRef(false);
  const form=useRef<HTMLFormElement>(null);
  const feedback=useRef<HTMLDivElement>(null);
  const product=products.find(p=>p.slug===values.product);
  useEffect(()=>{if(status==="success" || status==="failure") feedback.current?.focus();},[status]);
  function update(key:keyof InquiryValues,value:string) {
    setValues(previous=>({...previous,[key]:value,
      ...(key==="product" && (!previous.productsInterested || previous.productsInterested===products.find(p=>p.slug===previous.product)?.name)
        ? {productsInterested:products.find(p=>p.slug===value)?.name ?? ""} : {})}));
    setErrors(previous=>({...previous,[key]:undefined}));
    if(status==="failure") setStatus("idle");
  }
  const attributes=(key:keyof InquiryValues)=>({id:`inquiry-${key}`,name:key,value:values[key],
    "aria-invalid":!!errors[key],"aria-describedby":errors[key] ? `inquiry-${key}-error` : undefined,
    onChange:(event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>update(key,event.target.value)});
  function input(key:keyof InquiryValues,label:string,required=false,maxLength=100,type="text",placeholder?:string,autoComplete?:string) {
    return <Field key={key} id={`inquiry-${key}`} label={label} required={required} error={errors[key]}>
      <input {...attributes(key)} type={type} required={required} maxLength={maxLength} placeholder={placeholder} autoComplete={autoComplete} />
    </Field>;
  }
  function focusError(next:InquiryErrors) {
    setErrors(next);
    requestAnimationFrame(()=>form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }
  async function submit(event:React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if(busy.current) return;
    const result=validateInquiry(values,products);
    if(!result.ok){focusError(result.errors);return;}
    busy.current=true;setStatus("sending");setErrors({});
    try {
      const response=await fetch("/api/inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(result.data)});
      const body=await response.json();
      if(response.ok && body.ok===true) setStatus("success");
      else if(response.status===422 && body.errors) {setStatus("idle");focusError(body.errors);}
      else setStatus("failure");
    } catch {setStatus("failure");}
    finally {busy.current=false;}
  }
  if(status==="success") return <div className="inquiry-feedback" ref={feedback} tabIndex={-1} role="status">
    <h2>Thank you. Your message has been sent.</h2><p>We’ll get back to you as soon as possible.</p>
    <Link className="button" href="/shop">CONTINUE SHOPPING</Link>
  </div>;
  return <form className="inquiry-form" ref={form} onSubmit={submit} noValidate aria-busy={status==="sending"}>
    <p className="inquiry-required">* Required fields</p>
    <fieldset disabled={status==="sending"}>
      <legend className="sr-only">Your inquiry</legend>
      <Field id="inquiry-type" label="Inquiry Type" required error={errors.type}>
        <select {...attributes("type")} required onChange={event=>{update("type",event.target.value);setErrors({});}}>
          <option value="">Please select</option>{inquiryTypes.map(type=><option key={type.value} value={type.value}>{type.label}</option>)}
        </select>
      </Field>
      <div className="inquiry-pair">{input("name","Name",true,100,"text",undefined,"name")}{input("email","Email",true,254,"email",undefined,"email")}</div>
      {input("whatsapp","WhatsApp",false,40,"tel",undefined,"tel")}
      <Field id="inquiry-product" label="Product" required={values.type==="exchange"} error={errors.product}>
        <select {...attributes("product")} required={values.type==="exchange"}><option value="">Please select</option>{products.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}</select>
      </Field>
      {product && <dl className="inquiry-product-context"><div><dt>SKU</dt><dd>{product.sku}</dd></div><div><dt>Product URL</dt><dd><Link href={product.url}>{product.url}</Link></dd></div></dl>}
      {values.type==="sizing" && <div className="inquiry-dynamic">
        <Field id="inquiry-wristSize" label="Wrist Size" error={errors.wristSize}><select {...attributes("wristSize")}><option value="">Please select</option>{wristChoices.map(value=><option key={value}>{value}</option>)}</select></Field>
        {input("wristMeasurement","Your Wrist Measurement",false,80,"text","e.g. 16.5 cm")}
      </div>}
      {["order","exchange"].includes(values.type) && input("orderNumber","Order Number",values.type==="exchange",100)}
      {values.type==="exchange" && <p className="inquiry-note">Fit exchanges are available for the same product only and must be requested within 3 days of delivery.</p>}
      {values.type==="trade" && <div className="inquiry-dynamic">
        <div className="inquiry-note"><p>Minimum wholesale order: 10 pieces.</p><p>Trade pricing is available by inquiry only.</p></div>
        {input("company","Business / Company Name",true,160,"text",undefined,"organization")}
        {input("country","Country / Region",true,100,"text",undefined,"country-name")}
        {input("productsInterested","Products Interested In",true,1000)}
        <Field id="inquiry-quantity" label="Estimated Quantity" required error={errors.quantity}>
          <input {...attributes("quantity")} type="number" inputMode="numeric" min={10} max={1000000} step={1} required />
        </Field>
        {input("website","Website / Social Media",false,300)}
      </div>}
      <Field id="inquiry-message" label={values.type==="exchange" ? "Reason / Message" : "Message"} required error={errors.message}>
        <textarea {...attributes("message")} required rows={6} maxLength={5000} />
      </Field>
      <div className="inquiry-honeypot" aria-hidden="true">
        <label htmlFor="inquiry-companyWebsite">Leave this field blank</label><input {...attributes("companyWebsite")} tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button inquiry-submit" type="submit" disabled={status==="sending"}>{status==="sending" ? "SENDING..." : "SEND INQUIRY"}</button>
    </fieldset>
    {status==="failure" && <div className="inquiry-feedback inquiry-failure" ref={feedback} tabIndex={-1} role="alert">
      <p>We couldn’t send your message right now.</p><p>Please try again or contact us on WhatsApp.</p>
      <a className="text-link" href={whatsappLink(contact.whatsappNumber,contact.helpMessage)} target="_blank" rel="noopener noreferrer">Chat with Tong on WhatsApp</a>
    </div>}
  </form>;
}
