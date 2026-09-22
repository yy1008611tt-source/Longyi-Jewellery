import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Longyi",
  description: "From source to selection to store. Discover the approach behind Longyi Jewellery.",
};

export default function AboutPage() {
  return <main id="main-content" className={styles.page}>
    <header className={styles.intro}>
      <p className="eyebrow">OUR APPROACH</p>
      <h1>From Source to Selection to Store.</h1>
      <p className={styles.lead}>We stay close to the details that shape every piece — from understanding the materials we work with to careful selection and the way our jewelry is experienced in person.</p>
    </header>

    <section className={styles.source} aria-labelledby="source-heading">
      <Image className={styles.sourceImage} src="/images/about/source-workshop.png" alt="Feizhoucui material processing workshop" width={1448} height={1086} sizes="(max-width: 1440px) 92vw, 1312px" quality={95} preload />
      <div className={styles.sourceCopy}>
        <div><p className={styles.label}>01 / SOURCE</p><h2 id="source-heading">Closer to the Source</h2></div>
        <p>We stay close to the sourcing and production process, allowing us to better understand the materials we work with and remain involved throughout the journey from material to finished jewelry.</p>
      </div>
    </section>

    <section className={styles.row} aria-labelledby="selection-heading">
      <Image className={styles.image} src="/images/about/selection-by-hand.png" alt="Beads being carefully selected by hand" width={1448} height={1086} sizes="(max-width: 959px) 92vw, (max-width: 1440px) 52vw, 736px" quality={95} />
      <div className={styles.copy}><p className={styles.label}>02 / SELECTION</p><h2 id="selection-heading">Selected with Care</h2><p>Color, texture, shape and overall harmony all matter. We pay attention to the natural character of each bead so the finished piece feels balanced while preserving the variations that make natural stone unique.</p></div>
    </section>

    <section className={`${styles.row} ${styles.store}`} aria-labelledby="store-heading">
      <Image className={styles.image} src="/images/about/longyi-store.jpg" alt="Longyi Jewellery physical store and jewelry display" width={2000} height={1333} sizes="(max-width: 959px) 92vw, (max-width: 1440px) 52vw, 736px" quality={95} />
      <div className={styles.copy}><p className={styles.label}>03 / STORE</p><h2 id="store-heading">A Real Place, A Real Presence</h2><p>Our physical store is where Longyi Jewellery comes to life — a space where customers can see our pieces up close, appreciate their natural character, and connect with the people behind the brand.</p></div>
    </section>

    <section className={styles.closing} aria-labelledby="closing-heading"><h2 id="closing-heading">From Source to Selection to Store.</h2><p>We stay close to the details that shape every piece.</p></section>
  </main>;
}
