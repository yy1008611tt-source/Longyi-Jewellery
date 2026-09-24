"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryLinks, shopCategories } from "@/data/navigation";
import { Icon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const shopToggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const closeNavigation = () => { setOpen(false); setShopOpen(false); setMobileShopOpen(false); };
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) { setOpen(false); setMobileShopOpen(false); toggle.current?.focus(); }
        if (shopOpen) { setShopOpen(false); shopToggle.current?.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth >= 1100) { setOpen(false); setMobileShopOpen(false); } else setShopOpen(false); };
    window.addEventListener("keydown", close); window.addEventListener("resize", resize);
    return () => { window.removeEventListener("keydown", close); window.removeEventListener("resize", resize); };
  }, [open, shopOpen]);
  const navLink = ([label, href]: readonly [string, string]) => <Link key={href} href={href} onClick={closeNavigation} aria-current={pathname === href ? "page" : undefined}>{label}</Link>;
  const categories = () => <><Link href="/shop" onClick={closeNavigation}>Shop All</Link>{shopCategories.map(c => <Link href={`/collections/${c.slug}`} key={c.slug} onClick={closeNavigation}>{c.name}</Link>)}</>;
  return <header className="site-header"><div className="header-row wide-container">
    <button className="icon-button mobile-toggle" ref={toggle} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => { setOpen(!open); setMobileShopOpen(false); }}><Icon name={open ? "close" : "menu"} /></button>
    <Link href="/" className="wordmark" aria-label="Longyi Jewellery home" onClick={closeNavigation}>LONGYI<span>JEWELLERY</span></Link>
    <nav className="desktop-navigation" aria-label="Main navigation">{primaryLinks.slice(0, 2).map(navLink)}
      <div className="shop-dropdown" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setShopOpen(false); }}>
        <div className="shop-navigation-row"><Link href="/shop" onClick={closeNavigation} aria-current={pathname === "/shop" ? "page" : undefined}>SHOP</Link><button type="button" ref={shopToggle} className="shop-toggle" aria-label="Toggle shop categories" aria-expanded={shopOpen} aria-controls="desktop-shop-categories" onClick={() => setShopOpen(!shopOpen)}><span aria-hidden="true">⌄</span></button></div>
        <div id="desktop-shop-categories" className="shop-dropdown-links" hidden={!shopOpen}>{categories()}</div>
      </div>{navLink(primaryLinks[2])}
    </nav>
    <div className="header-actions">{(["search", "account", "bag"] as const).map(name => <button key={name} className="icon-button" type="button" aria-label={`${name === "bag" ? "Cart" : name === "account" ? "Account" : "Search"} — coming soon`} aria-disabled="true" title="Coming soon"><Icon name={name} /></button>)}</div>
  </div><nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
    {primaryLinks.slice(0, 2).map(navLink)}
    <div className="shop-navigation-row"><Link href="/shop" onClick={closeNavigation}>SHOP</Link><button type="button" className="shop-toggle" aria-label="Toggle mobile shop categories" aria-expanded={mobileShopOpen} aria-controls="mobile-shop-categories" onClick={() => setMobileShopOpen(!mobileShopOpen)}><span aria-hidden="true">{mobileShopOpen ? "−" : "+"}</span></button></div>
    <div id="mobile-shop-categories" className="mobile-categories" hidden={!mobileShopOpen}>{categories()}</div>
    {navLink(primaryLinks[2])}
  </nav></header>;
}
