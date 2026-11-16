"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {

      /* ── Reveal on scroll ── */
      gsap.utils.toArray<HTMLElement>(
        "[data-reveal], .listing-card, .journal-card, .content-panel, .contact-form"
      ).forEach((el) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          duration: 0.92,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      /* ── Image clip reveal ── */
      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(12% 0% 12% 0%)",
          scale: 0.985,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      /* ── Parallax soft (-8 to +8 yPercent range) ── */
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      if (!isMobile) {
        gsap.utils.toArray<HTMLElement>("[data-parallax-soft]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        /* ── Parallax medium (-14 to +14) ── */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax ?? "14");
          gsap.fromTo(
            el,
            { yPercent: speed },
            {
              yPercent: -speed,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        });
      }

      /* ── Section heading stagger ── */
      gsap.utils.toArray<HTMLElement>(".eyebrow + *, .section .headline, .section .title-serif").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.88,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* ── Horizontal scroll progress on .section-intro ── */
      gsap.utils.toArray<HTMLElement>(".section-intro").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      /* ── Scale-in for why-choose cards ── */
      gsap.utils.toArray<HTMLElement>(".why-choose__item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          scale: 0.97,
          duration: 0.78,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          delay: (i % 3) * 0.08,
        });
      });

    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
