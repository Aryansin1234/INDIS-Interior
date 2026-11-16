import type { Metadata } from "next";
import ImagePanel from "@/components/ui/ImagePanel";
import PageHero from "@/components/pages/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import { business, collections } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about INDIS Interiors, a Hyderabad-based interior design studio serving Andhra Pradesh and Telangana."
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About INDIS" title="A Hyderabad interior design studio focused on homes that feel personal and practical." text="The website preserves confirmed business details only: location, service region, over 15 years of experience, process, and differentiators from the existing INDIS presence." cta={{ href: "/contact", label: "Start a Conversation" }} />
      <section className="section">
        <div className="container grid-2">
          <div>
            <p className="eyebrow">Studio profile</p>
            <h2 className="title-serif">Elegant, functional, innovative, sustainable, and personalized interior spaces.</h2>
            <p className="lead">INDIS Interiors is based in {business.location} and serves {business.serviceRegion}. The studio communicates a focus on quality materials, execution discipline, and support after handover.</p>
            <div className="studio-section__facts">
              <span>{business.experience}</span>
              <span>{business.location}</span>
              <span>Service region: {business.serviceRegion}</span>
            </div>
            <ButtonLink href="/services">Explore Services</ButtonLink>
          </div>
          <ImagePanel image={collections[0].image} shape="tall" />
        </div>
      </section>
      <section className="section-tight">
        <div className="container detail-body__grid">
          <h2>Confirmed differentiators</h2>
          <div className="content-panel">
            <ul className="detail-list">
              {business.differentiators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container detail-body__grid">
          <h2>Business addresses</h2>
          <div className="content-panel detail-body__grid">
            <article>
              <p className="eyebrow">Office</p>
              <p>{business.office.map((line) => <span key={line}>{line}<br /></span>)}</p>
            </article>
            <article>
              <p className="eyebrow">Factory</p>
              <p>{business.factory.map((line) => <span key={line}>{line}<br /></span>)}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
