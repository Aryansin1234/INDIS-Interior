import { CheckCircle2 } from "lucide-react";
import { business } from "@/data/site";
import SectionIntro from "@/components/ui/SectionIntro";

const descriptions = [
  "Specified with durability, finish quality, and daily use in mind.",
  "Execution stays connected to checkpoints instead of disappearing after design approval.",
  "Support continues after the final walkthrough and handover.",
  "The studio states that complete home interiors are handled by its own team."
];

export default function WhyChoose() {
  return (
    <section className="section why-choose">
      <div className="container">
        <SectionIntro eyebrow="Why choose INDIS" title="Confidence built through materials, timelines, support, and in-house execution." />
        <div className="why-choose__list">
          {business.differentiators.map((item, index) => (
            <div className="why-choose__item" key={item}>
              <span>0{index + 1}</span>
              <CheckCircle2 aria-hidden />
              <div>
                <h3>{item}</h3>
                <p>{descriptions[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
