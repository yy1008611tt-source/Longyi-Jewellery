import { contact } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

export function TradeInquiry() {
  return <section id="trade" className="container home-trade" aria-labelledby="trade-heading">
    <div><p className="eyebrow">{contact.trade.label}</p><h2 id="trade-heading">{contact.trade.title}</h2></div>
    <div className="home-trade-copy"><p>{contact.trade.minimumOrder}</p><p>{contact.trade.pricing}</p><p>{contact.trade.description}</p>
      <a className="text-link" href={whatsappLink(contact.whatsappNumber,contact.wholesaleMessage)} target="_blank" rel="noopener noreferrer">WHOLESALE INQUIRY <span aria-hidden="true">→</span></a>
    </div>
  </section>;
}
