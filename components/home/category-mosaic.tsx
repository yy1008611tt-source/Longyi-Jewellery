import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/catalog";
import { homeCategoryImages } from "@/data/brand";

export function CategoryMosaic() {
  return (
    <section className="section wide-container home-categories" aria-labelledby="category-heading">
      <div className="section-heading"><h2 id="category-heading" className="section-label">Explore the Collection</h2></div>
      <div className="category-mosaic">
        {collections.map((collection) => {
          const photo = homeCategoryImages[collection.slug];
          return (
            <Link className={`mosaic-card mosaic-${collection.slug} mosaic-tone-${photo.tone}`} href={`/collections/${collection.slug}`} key={collection.slug}>
              <Image src={photo.src} alt={photo.alt} fill sizes={collection.slug === "bangles" ? "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, (max-width: 1440px) 46vw, 662px" : "(max-width: 767px) 50vw, (max-width: 1199px) 25vw, (max-width: 1440px) 23vw, 323px"} />
              <div className="mosaic-caption">
                <h3>{collection.name}</h3>
                <span className="mosaic-cta">SHOP NOW <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
