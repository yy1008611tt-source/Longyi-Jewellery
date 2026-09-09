import Link from "next/link";
import {collections} from "@/data/catalog";
import {Newsletter} from "./newsletter";
const groups=[
{title:"SHOP",links:[["Shop All","/shop"],...collections.map(c=>[c.name,`/collections/${c.slug}`])]},
{title:"ABOUT",links:[["About Us","/about"],["Our Jade","/our-jade"],["Craftsmanship","/craftsmanship"]]},
{title:"CUSTOMER CARE",links:[["FAQ","/faq"],["Shipping & Returns","/shipping-returns"],["Contact","/contact"]]},
{title:"LEGAL",links:[["Privacy Policy","/privacy-policy"],["Terms & Conditions","/terms-conditions"]]}
];
export function Footer(){return <><Newsletter/><footer className="site-footer"><div className="container"><div className="footer-intro"><Link href="/" className="wordmark">BRAND NAME</Link><p>Natural beauty. An everyday companion.</p></div><div className="footer-grid">{groups.map(group=><nav key={group.title} aria-label={group.title}><h2>{group.title}</h2>{group.links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav>)}<div><h2>SOCIAL</h2><span>Instagram</span><span>TikTok</span><span>Pinterest</span><p className="small">Our social pages are coming soon.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} BRAND NAME</span><span>Website preview · Sample products & prices · USD</span></div></div></footer></>;}
