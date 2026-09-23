"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { collections } from "@/data/catalog";
import { Icon } from "./icons";
const links = [["NEW IN","/new-in"],["COLLECTIONS","/collections"],["ABOUT FEIZHOUCUI","/about-feizhoucui"]];
export function Header() {
  const [open,setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const shop = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        if(open) { setOpen(false); toggle.current?.focus(); }
        if(shop.current?.open) { shop.current.open=false; shop.current.querySelector("summary")?.focus(); }
      }
    };
    const resize = () => { if(window.innerWidth >= 1100) setOpen(false); };
    window.addEventListener("keydown",close); window.addEventListener("resize",resize);
    return () => {window.removeEventListener("keydown",close);window.removeEventListener("resize",resize);};
  },[open]);
  const navLink = ([label,href]: string[]) => <Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={pathname===href?"page":undefined}>{label}</Link>;
  return <header className="site-header"><div className="header-row wide-container">
    <button className="icon-button mobile-toggle" ref={toggle} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Close navigation":"Open navigation"} onClick={()=>setOpen(!open)}><Icon name={open?"close":"menu"} /></button>
    <Link href="/" className="wordmark" aria-label="Longyi Jewellery home" onClick={()=>setOpen(false)}>LONGYI<span>JEWELLERY</span></Link>
    <nav className="desktop-navigation" aria-label="Main navigation">{navLink(links[0])}
      <details className="shop-dropdown" ref={shop} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget)) e.currentTarget.open=false;}}>
        <summary>SHOP <span aria-hidden="true">⌄</span></summary><div className="shop-dropdown-links">
          {collections.map(c=><Link href={`/collections/${c.slug}`} key={c.slug} onClick={()=>{if(shop.current)shop.current.open=false;}}>{c.name}</Link>)}
          <Link href="/shop" onClick={()=>{if(shop.current)shop.current.open=false;}}>Shop All</Link>
        </div>
      </details>{links.slice(1).map(navLink)}
    </nav>
    <div className="header-actions">{(["search","account","bag"] as const).map(name=><button key={name} className="icon-button" type="button" aria-label={`${name==="bag"?"Cart":name==="account"?"Account":"Search"} — coming soon`} aria-disabled="true" title="Coming soon"><Icon name={name} /></button>)}</div>
  </div><nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
    {navLink(links[0])}<Link href="/shop" onClick={()=>setOpen(false)}>SHOP ALL</Link>
    <div className="mobile-categories">{collections.map(c=><Link key={c.slug} href={`/collections/${c.slug}`} onClick={()=>setOpen(false)}>{c.name}</Link>)}</div>
    {links.slice(1).map(navLink)}
  </nav></header>;
}
