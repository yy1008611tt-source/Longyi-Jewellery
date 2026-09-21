"use client";
import { useRef } from "react";
import { contact } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";
import Link from "next/link";

export function CustomerHelp() {
  const panel = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (panel.current) {
      panel.current.open = false;
      panel.current.querySelector("summary")?.focus();
    }
  };
  return <details className="customer-help" ref={panel} onKeyDown={event=>{if(event.key==="Escape")close();}}>
    <summary>Need Help?</summary>
    <div className="customer-help-panel">
      <button type="button" className="customer-help-close" aria-label="Close customer service" onClick={close}>×</button>
      <h2>Hi, I’m {contact.name}.</h2>
      <p>Need help with a product or your order?</p>
      <a href={whatsappLink(contact.whatsappNumber,contact.helpMessage)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
      <Link href="/contact" onClick={close}>Email Us</Link>
    </div>
  </details>;
}
