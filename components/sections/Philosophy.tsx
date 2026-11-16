import ImagePanel from "@/components/ui/ImagePanel";
import { collections } from "@/data/site";

export default function Philosophy() {
  return (
    <section id="philosophy" className="section philosophy">
      <div className="container grid-2 philosophy__grid">
        <div data-reveal>
          <p className="eyebrow">Design philosophy</p>
          <h2 className="headline">A space should do more than look beautiful. It should feel like yours.</h2>
          <div className="philosophy__pillars">
            <span>Planning</span>
            <span>Materials</span>
            <span>Execution</span>
          </div>
        </div>
        <div className="philosophy__copy">
          <ImagePanel image={collections[0].image} shape="wide" className="philosophy__image" sizes="(max-width: 1024px) 90vw, 42vw" />
          <p className="lead" data-reveal>
            INDIS Interiors combines practical planning, elegant materials, and careful execution to create homes that support real daily life.
          </p>
          <blockquote data-reveal>“Good interiors are felt first, then noticed in the details.”</blockquote>
        </div>
      </div>
    </section>
  );
}
