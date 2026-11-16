"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { business, heroImage } from "@/data/site";
import { BrandButton, EditorialLink } from "@/components/block/brand-button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(".hero__curtain", {
        scaleX: 1, transformOrigin: "left center",
        duration: 1.1, ease: "power4.inOut",
      });
      gsap.from(".hero__image", {
        clipPath: "inset(6% 8% 6% 8%)", scale: 1.1,
        duration: 1.55, ease: "power4.out",
      });
      gsap.from(".hero__eyebrow", {
        y: 18, opacity: 0, duration: 0.9,
        ease: "power3.out", delay: 0.25,
      });
      gsap.from(".hero__line", {
        yPercent: 112, stagger: 0.11,
        duration: 1.12, ease: "power4.out", delay: 0.35,
      });
      gsap.from(".hero__strip", {
        y: 32, opacity: 0, duration: 0.92,
        ease: "power3.out", delay: 0.88,
      });
      gsap.from(".hero__float", {
        x: 28, opacity: 0, duration: 0.85,
        ease: "power3.out", delay: 1.1,
      });
      gsap.to(".hero__image", {
        yPercent: 9, scale: 1.09, ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top", end: "bottom top", scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section id="arrival" className="hero" ref={root} aria-labelledby="hero-title">
      {/* Background */}
      <div className="hero__image" aria-hidden>
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      </div>
      <div className="hero__shade" aria-hidden />
      <div className="hero__curtain" aria-hidden />

      {/* Content */}
      <div className="hero__inner">
        {/* Eyebrow */}
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-dot" aria-hidden />
          Interior designers · Hyderabad, India
        </p>

        {/* Headline */}
        <div className="hero__headline">
          <h1 id="hero-title" className="display hero__title">
            <span className="hero__clip"><span className="hero__line">Spaces shaped</span></span>
            <span className="hero__clip"><span className="hero__line">around the way</span></span>
            <span className="hero__clip"><span className="hero__line">you live.</span></span>
          </h1>
        </div>

        {/* Bottom strip */}
        <div className="hero__strip">
          <p className="hero__statement">
            Premium residential interiors — planned with clarity, crafted with restraint, and shaped around everyday rituals.
          </p>
          <div className="hero__strip-actions">
            <BrandButton href="/contact" label="Start Your Project" variant="dark" />
            <EditorialLink href="/projects" label="View Our Work" variant="light" />
            <a className="hero__scroll-cue" href="#philosophy" aria-label="Scroll to design philosophy">
              <span>Explore</span>
              <span className="hero__scroll-icon" aria-hidden>
                <ArrowDown size={13} strokeWidth={2.2} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="hero__float" aria-hidden>
        <strong>{business.experience}</strong>
        <span>Andhra Pradesh<br />& Telangana</span>
      </div>
    </section>
  );
}
