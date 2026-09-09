import Image from "next/image";
import { brand } from "@/data/brand";
export function WhyChooseUs() {
  return <section className="section container why-section" aria-labelledby="why-heading">
    <div><h2 id="why-heading">Why choose us.</h2><p className="why-intro">Thoughtfully considered.<br />From our hands to yours.</p>
      {brand.advantagesAreDraft && <p className="small draft-note">Brand statements are draft copy pending confirmation.</p>}
      <ol className="advantages">{brand.advantages.map((item,i) => <li key={item.title}><span className="advantage-number">0{i+1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>
    </div>
    <div className="why-image"><Image src={brand.workshopImage} alt="AI concept placeholder: hands inspecting jewelry, not a photograph of the Longyi workshop" fill sizes="(max-width: 959px) 90vw, 50vw" /><span className="concept-label">Workshop concept · Real brand image to follow</span></div>
  </section>;
}
