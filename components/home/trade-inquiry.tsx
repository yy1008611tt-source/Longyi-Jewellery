import { contact } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";
import Link from "next/link";
import { inquiryHref } from "@/lib/inquiry";

export function TradeInquiry() {
  return <section id="trade" className="container home-trade" aria-labelledby="trade-heading">
    <div><p className="eyebrow">{contact.trade.label}</p><h2 id="trade-heading">{contact.trade.title}</h2></div>
    <div className="home-trade-copy"><p>{contact.trade.minimumOrder}</p><p>{contact.trade.pricing}</p><p>{contact.trade.description}</p>
      <div className="inquiry-contact-links"><Link className="text-link" href={inquiryHref("trade")}>WHOLESALE INQUIRY <span aria-hidden="true">→</span></Link>
      <a className="text-link" href={whatsappLink(contact.whatsappNumber,contact.wholesaleMessage)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div>
    </div>
  </section>;
}
