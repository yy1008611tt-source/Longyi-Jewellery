import Image from "next/image";
import styles from "./why-choose-us.module.css";

const stages = [
  {
    label: "01 / SOURCE", title: "Closer to the Source",
    text: "We stay close to the sourcing and production process, allowing us to better understand the materials we work with and remain involved throughout the journey from material to finished jewelry.",
    src: "/images/about/source-workshop.png", alt: "Feizhoucui material processing workshop", width: 1448, height: 1086,
  },
  {
    label: "02 / SELECTION", title: "Selected with Care",
    text: "Color, texture, shape and overall harmony all matter. We pay attention to the natural character of each bead so the finished piece feels balanced while preserving the variations that make natural stone unique.",
    src: "/images/about/selection-by-hand.png", alt: "Beads being carefully selected by hand", width: 1448, height: 1086,
  },
  {
    label: "03 / STORE", title: "A Real Place, A Real Presence",
    text: "Our physical store is where Longyi Jewellery comes to life — a space where customers can see our pieces up close, appreciate their natural character, and connect with the people behind the brand.",
    src: "/images/about/longyi-store.jpg", alt: "Longyi Jewellery physical store and jewelry display", width: 2000, height: 1333,
  },
];

export function WhyChooseUs() {
  return <section className={`section container ${styles.approach}`} aria-labelledby="why-heading">
    <header className={styles.heading}>
      <p className="eyebrow">OUR APPROACH</p>
      <h2 id="why-heading">From Source to Selection to Store.</h2>
      <p>We stay close to the details that shape every piece — from understanding the materials we work with to careful selection and the way our jewelry is experienced in person.</p>
    </header>
    <div className={styles.stages}>
      {stages.map((stage,index)=><article key={stage.label} className={`${styles.row} ${index===1 ? styles.selection : ""} ${index===2 ? styles.store : ""}`} aria-labelledby={`approach-stage-${index}`}>
        <Image className={styles.image} src={stage.src} alt={stage.alt} width={stage.width} height={stage.height} quality={95} sizes="(max-width: 959px) 90vw, (max-width: 1199px) 48vw, 512px" />
        <div className={styles.copy}><p className={styles.label}>{stage.label}</p><h3 id={`approach-stage-${index}`}>{stage.title}</h3><p>{stage.text}</p></div>
      </article>)}
    </div>
  </section>;
}
