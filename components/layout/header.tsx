"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {Icon} from "./icons";
const links=[["Shop","/shop"],["Collections","/collections"],["Our Jade","/our-jade"],["About","/about"],["Contact","/contact"]];
export function Header(){
const [open,setOpen]=useState(false);
const toggle=useRef<HTMLButtonElement>(null);
const pathname=usePathname();
useEffect(()=>{
const close=(e:KeyboardEvent)=>{if(e.key==="Escape"&&open){setOpen(false);toggle.current?.focus();}};
const resize=()=>{if(window.innerWidth>=960)setOpen(false);};
window.addEventListener("keydown",close);window.addEventListener("resize",resize);
return()=>{window.removeEventListener("keydown",close);window.removeEventListener("resize",resize);};
},[open]);
return <header className="site-header"><div className="announcement">A little closer to nature. Every day.</div><div className="container header-row">
<button ref={toggle} className="icon-button mobile-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}><Icon name={open?"close":"menu"}/></button>
<Link href="/" className="wordmark" onClick={()=>setOpen(false)} aria-label="BRAND NAME home">BRAND NAME<span>NATURAL JEWELRY</span></Link>
<nav className="desktop-navigation" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</nav>
<div className="header-actions"><button type="button" className="icon-button" aria-label="Search — coming soon" aria-disabled="true" title="Search is coming soon"><Icon name="search"/></button><button type="button" className="icon-button" aria-label="Cart — coming soon" aria-disabled="true" title="Cart is coming soon"><Icon name="bag"/></button></div>
</div><nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={pathname===href?"page":undefined}>{label}<span aria-hidden="true">↗</span></Link>)}</nav></header>;
}
