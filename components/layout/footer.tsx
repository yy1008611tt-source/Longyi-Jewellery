import Link from "next/link";
import { shopCategories as collections } from "@/data/navigation";
import { CustomerHelp } from "./customer-help";
const groups = [
  { title: "SHOP", links: collections.map(c=>[c.name,`/collections/${c.slug}`]) },
  { title: "DISCOVER", links: [["Discover Feizhoucui","/about-feizhoucui"]] },
  { title: "OUR SERVICES", links: [["Shipping","/shipping-returns"],["Returns","/shipping-returns"],["Care Guide","/care-guide"],["Size Guide","/size-guide"]] },
  { title: "CONTACT", links: [["Contact Us","/contact"],["Email Us","/contact"],["Visit Us","/visit-us"],["Trade & Wholesale","/#trade"]] },
];
export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-intro"><Link href="/" className="wordmark">LONGYI<span>JEWELLERY</span></Link><p>Natural stone. Naturally unique.</p></div>
    <div className="footer-grid">{groups.map(group=><nav key={group.title} aria-label={group.title}><h2>{group.title}</h2>{group.links.map(([label,href])=><Link href={href} key={label}>{label}</Link>)}</nav>)}<div><h2>SOCIAL</h2><span>Instagram</span><p className="small">Account details to follow.</p></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Longyi Jewellery</span><span>Development preview · Demo products & prices · USD</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms-conditions">Terms</Link></div></div>
    <CustomerHelp />
  </div></footer>;
}
