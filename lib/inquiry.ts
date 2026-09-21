export const inquiryTypes = [
  { value: "product", label: "Product Question" },
  { value: "sizing", label: "Sizing Help" },
  { value: "order", label: "Order & Shipping" },
  { value: "exchange", label: "Exchange Request" },
  { value: "trade", label: "Trade / Wholesale" },
  { value: "other", label: "Other" },
] as const;
export type InquiryType = typeof inquiryTypes[number]["value"];
export const wristChoices = ["14–16 cm", "16–18 cm", "18–20 cm", "Not sure", "Other"] as const;
export interface InquiryProduct { slug: string; name: string; sku: string; url: string }
export interface InquiryValues {
  type: string; name: string; email: string; whatsapp: string; product: string; message: string;
  wristSize: string; wristMeasurement: string; orderNumber: string;
  company: string; country: string; productsInterested: string; quantity: string; website: string;
  companyWebsite: string;
}
export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;
export const emptyInquiry: InquiryValues = {
  type: "", name: "", email: "", whatsapp: "", product: "", message: "",
  wristSize: "", wristMeasurement: "", orderNumber: "", company: "", country: "",
  productsInterested: "", quantity: "", website: "", companyWebsite: "",
};
export function inquiryHref(type?: InquiryType, product?: string) {
  const query = new URLSearchParams();
  if (type) query.set("type", type);
  if (product) query.set("product", product);
  return `/contact${query.size ? `?${query}` : ""}`;
}
export function inquiryPrefill(params: Record<string, string | string[] | undefined>, products: InquiryProduct[]): InquiryValues {
  const type = typeof params.type === "string" && inquiryTypes.some(t=>t.value===params.type) ? params.type : "";
  const product = products.find(p=>p.slug===params.product);
  return {...emptyInquiry, type, product: product?.slug ?? "", productsInterested: type==="trade" ? product?.name ?? "" : ""};
}
const limits: Record<keyof InquiryValues, number> = {
  type: 20, name: 100, email: 254, whatsapp: 40, product: 120, message: 5000,
  wristSize: 30, wristMeasurement: 80, orderNumber: 100, company: 160, country: 100,
  productsInterested: 1000, quantity: 7, website: 300, companyWebsite: 200,
};
export function validEmail(email: string) {
  return email.length<=254 && /^[^\s@<>,;:"\\]+@[^\s@<>,;:"\\]+\.[^\s@<>,;:"\\]+$/.test(email);
}
export function validateInquiry(input: unknown, products: InquiryProduct[]): {ok:true; data:InquiryValues; product?:InquiryProduct} | {ok:false; errors:InquiryErrors} {
  const raw = input && typeof input==="object" && !Array.isArray(input) ? input as Record<string,unknown> : {};
  const data = {...emptyInquiry};
  const errors: InquiryErrors = {};
  for (const key of Object.keys(limits) as (keyof InquiryValues)[]) {
    if (raw[key]!==undefined && typeof raw[key]!=="string") { errors[key]="Please enter a valid value."; continue; }
    data[key] = (raw[key] as string | undefined ?? "").trim();
    if (data[key].length>limits[key]) errors[key]=`Please use ${limits[key]} characters or fewer.`;
    if (key!=="message" && /[\r\n\x00-\x1f\x7f]/.test(data[key])) errors[key]="Please enter a valid value.";
    if (key==="message" && /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(data[key])) errors[key]="Please enter a valid message.";
  }
  for (const key of ["type","name","email","message"] as const) if (!data[key]) errors[key]="This field is required.";
  if (!inquiryTypes.some(t=>t.value===data.type)) errors.type="Please select an inquiry type.";
  if (data.email && !validEmail(data.email)) errors.email="Please enter a valid email address.";
  const product = products.find(p=>p.slug===data.product);
  if (data.product && !product) errors.product="Please select a listed product.";
  if (data.companyWebsite) errors.companyWebsite="Unable to send this inquiry.";
  if (data.type==="sizing") {
    if (data.wristSize && !wristChoices.some(w=>w===data.wristSize)) errors.wristSize="Please select a wrist size.";
  } else { data.wristSize=""; data.wristMeasurement=""; delete errors.wristSize; delete errors.wristMeasurement; }
  if (data.type==="exchange") {
    if (!data.orderNumber) errors.orderNumber="This field is required.";
    if (!product) errors.product="Please select a product.";
  }
  if (!["order","exchange"].includes(data.type)) {data.orderNumber=""; delete errors.orderNumber;}
  if (data.type==="trade") {
    for (const key of ["company","country","productsInterested"] as const) if (!data[key]) errors[key]="This field is required.";
    if (!/^\d+$/.test(data.quantity) || Number(data.quantity)<10) errors.quantity="Wholesale orders start from 10 pieces.";
    else if (Number(data.quantity)>1000000) errors.quantity="Please enter a quantity of 1,000,000 or fewer.";
  } else {
    for (const key of ["company","country","productsInterested","quantity","website"] as const) {data[key]=""; delete errors[key];}
  }
  return Object.keys(errors).length ? {ok:false,errors} : {ok:true,data,product};
}
export function inquiryEmail(data: InquiryValues, product: InquiryProduct | undefined, submittedAt: string) {
  const title = {product:"Product Question",sizing:"Sizing Help",order:"Order & Shipping",exchange:"Exchange Request",trade:"Trade Inquiry",other:"General Inquiry"}[data.type as InquiryType];
  const suffix = ["order","exchange"].includes(data.type) && data.orderNumber ? `Order #${data.orderNumber}` : ["product","sizing","trade"].includes(data.type) ? product?.name : undefined;
  const rows = [
    ["Inquiry Type",inquiryTypes.find(t=>t.value===data.type)?.label],["Customer Name",data.name],["Customer Email",data.email],
    ["WhatsApp",data.whatsapp],["Product",product?.name],["SKU",product?.sku],["Product URL",product?.url],
    ["Wrist Size",data.wristSize],["Wrist Measurement",data.wristMeasurement],["Order Number",data.orderNumber],
    ["Company",data.company],["Country / Region",data.country],["Products Interested In",data.productsInterested],
    ["Estimated Quantity",data.quantity],["Website / Social Media",data.website],["Message",data.message],["Submitted Time",submittedAt],
  ];
  return {subject:`[LONGYI] ${title}${suffix ? ` — ${suffix}` : ""}`, replyTo:data.email,
    text:"LONGYI JEWELLERY — NEW INQUIRY\n\n"+rows.filter(([,value])=>value).map(([label,value])=>`${label}:\n${value}`).join("\n\n")};
}
