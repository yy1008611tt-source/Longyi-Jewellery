import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Longyi" };

export default function AboutPage() {
  return <main id="main-content" className="container placeholder">
    <p className="eyebrow">TAKING SHAPE</p>
    <h1>About Longyi</h1>
    <p>The details for this page will be added before launch.</p>
    <Link className="text-link" href="/shop">Explore the collection ↗</Link>
  </main>;
}
