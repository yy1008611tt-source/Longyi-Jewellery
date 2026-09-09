import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { collections } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Collections",
  description: "Find your everyday favorites across five jewelry collections, including bangles and beaded necklaces.",
};

export default function Collections() {
  return (
    <main id="main-content" className="container browse-page">
      <Breadcrumb items={[{ label: "Collections" }]} />
      <header className="browse-heading">
        <p className="eyebrow">OUR COLLECTIONS</p>
        <h1>A natural fit.<br /><em>In every form.</em></h1>
        <p>Five ways to bring a little nature into your everyday.</p>
      </header>
      <div className="collections-directory">
        {collections.map((collection) => (
          <Link className="directory-card" key={collection.slug} href={`/collections/${collection.slug}`}>
            <div className="collection-image">
              <Image src={collection.image} alt={`${collection.name} illustration placeholder`} fill sizes="(max-width: 599px) 45vw, 30vw" />
            </div>
            <h2>{collection.name}</h2>
            <p>{collection.description}</p>
            <span className="text-link">Explore Collection <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>
    </main>
  );
}
