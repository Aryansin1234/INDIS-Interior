import ImagePanel from "@/components/ui/ImagePanel";
import { BrandButton, EditorialLink } from "@/components/block/brand-button";
import { business, collections } from "@/data/site";

export default function Studio() {
  return (
    <section className="section studio-section">
      <div className="container grid-2">
        <ImagePanel image={collections[2].image} shape="wide" />
        <div>
          <p className="eyebrow">The studio</p>
          <h2 className="headline">Hyderabad-based. Over 15 years of interior design experience.</h2>
          <p className="lead">
            INDIS Interiors serves homeowners across {business.serviceRegion}, focusing on elegant, functional, innovative, sustainable, and personalized interior spaces.
          </p>
          <div className="studio-section__facts">
            <span><strong>Base</strong>{business.location}</span>
            <span><strong>Experience</strong>{business.experience}</span>
            <span><strong>Region</strong>{business.serviceRegion}</span>
          </div>
          <div className="button-row">
            <BrandButton href="/about" label="About the Studio" variant="clay" />
            <EditorialLink href="/contact" label="Contact INDIS" />
          </div>
        </div>
      </div>
    </section>
  );
}
