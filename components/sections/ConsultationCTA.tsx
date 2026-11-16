import type { CSSProperties } from "react";
import { business, heroImage } from "@/data/site";
import { BrandButton, EditorialLink } from "@/components/block/brand-button";

export default function ConsultationCTA() {
  return (
    <section id="consultation" className="consultation-cta" style={{ "--cta-image": `url(${heroImage.src})` } as CSSProperties}>
      <div className="container consultation-cta__content">
        <p className="eyebrow">Begin</p>
        <h2 className="headline">Your next chapter begins at home.</h2>
        <p className="lead">Let&apos;s create a space that reflects the way you live.</p>
        <div className="button-row">
          <BrandButton href="/contact" label="Start Your Project" variant="dark" />
          <EditorialLink href={business.whatsappHref} label="Free Consultation" variant="light" external />
        </div>
      </div>
    </section>
  );
}
