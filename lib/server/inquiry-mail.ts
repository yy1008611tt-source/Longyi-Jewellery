import "server-only";
import nodemailer from "nodemailer";
import { validEmail } from "../inquiry";

export async function sendInquiryMail(email:{subject:string;replyTo:string;text:string}):Promise<boolean> {
  const from=process.env.EMAIL_USER?.trim();
  const to=process.env.INQUIRY_TO_EMAIL?.trim();
  const pass=process.env.EMAIL_APP_PASSWORD?.replace(/\s/g,"");
  if(!from || !to || !pass || !validEmail(from) || !validEmail(to)) return false;
  const transport=nodemailer.createTransport({
    host:"smtp.gmail.com", port:465, secure:true,
    auth:{user:from,pass}, connectionTimeout:10_000, greetingTimeout:10_000, socketTimeout:15_000,
    disableFileAccess:true, disableUrlAccess:true, logger:false, debug:false,
  });
  try {
    const result=await transport.sendMail({
      from:{name:"Longyi Jewellery",address:from}, to,
      replyTo:email.replyTo, subject:email.subject, text:email.text,
    });
    return result.accepted.some(address=>String(address).toLowerCase()===to.toLowerCase()) && result.rejected.length===0;
  } finally {transport.close();}
}
