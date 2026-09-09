"use client";
import {useState} from "react";
export function Newsletter(){
const [message,setMessage]=useState("");
return <section className="newsletter" aria-labelledby="newsletter-heading"><div className="container newsletter-inner"><div><p className="eyebrow">LET’S STAY CLOSE</p><h2 id="newsletter-heading">A little nature in your inbox.</h2><p>Join our newsletter for new pieces and stories.</p></div><form onSubmit={(e)=>{e.preventDefault();setMessage("Subscriptions are not open yet. Your email has not been saved.");}}><label htmlFor="newsletter-email">Email address</label><div className="subscribe-row"><input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Your email address" required aria-describedby="newsletter-status"/><button type="submit">Subscribe <span aria-hidden="true">↗</span></button></div><p id="newsletter-status" className="small" role="status">{message||"Preview only — we are not collecting email addresses yet."}</p></form></div></section>;
}
