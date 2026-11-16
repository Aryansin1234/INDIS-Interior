import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import ContactForm from "@/components/pages/ContactForm";
import { business } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact INDIS Interiors in Hyderabad for a free consultation, 3D design discussion, quote, or interior design enquiry."
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Start with a conversation about your home." text="Share your project type, location, budget range, and requirements. Use WhatsApp or email fallback unless a backend endpoint is configured later." />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-details">
            <article>
              <h2>Speak to INDIS</h2>
              <p><a href={business.phoneHref}>{business.phone}</a></p>
              <p><a href={business.emailHref}>{business.email}</a></p>
              <p><a href={business.whatsappHref} target="_blank" rel="noreferrer">Open WhatsApp consultation</a></p>
            </article>
            <article>
              <h3>Office</h3>
              <p>{business.office.map((line) => <span key={line}>{line}<br /></span>)}</p>
            </article>
            <article>
              <h3>Factory</h3>
              <p>{business.factory.map((line) => <span key={line}>{line}<br /></span>)}</p>
            </article>
            <article>
              <h3>Service region</h3>
              <p>{business.serviceRegion}</p>
            </article>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
