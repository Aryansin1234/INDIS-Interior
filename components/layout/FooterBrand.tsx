"use client";

import Link from "next/link";
import { useRef, useCallback, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = "INDIS".split("");       // 5 letters
const LINE2 = "Interiors".split("");   // 9 letters

const RADIUS = 300;
const PULL   = 0.52;

export default function FooterBrand() {
  const rootRef   = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* ── GSAP scroll-triggered blur+slide reveal ── */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".footer-display__char-inner", { opacity: 1 });
      return;
    }

    gsap.fromTo(
      ".footer-display__char-inner",
      { opacity: 0, yPercent: 80, filter: "blur(20px)" },
      {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power4.out",
        stagger: { each: 0.055, from: "start" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, { scope: rootRef });

  /* ── Mouse move: cursor glow + magnetic pull (desktop only) ── */
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    container.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    container.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);

    outerRefs.current.forEach((el) => {
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d  = Math.hypot(dx, dy);
      const f  = d < RADIUS ? (1 - d / RADIUS) * PULL : 0;
      el.style.setProperty("--tx", `${dx * f}px`);
      el.style.setProperty("--ty", `${dy * f}px`);
    });
  }, []);

  const onLeave = useCallback(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty("--glow-x", "-9999px");
      rootRef.current.style.setProperty("--glow-y", "-9999px");
    }
    outerRefs.current.forEach((el) => {
      if (!el) return;
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    });
  }, []);

  function renderChar(char: string, idx: number) {
    return (
      <span
        key={idx}
        ref={(el) => { outerRefs.current[idx] = el; }}
        className="footer-display__char"
        style={{ "--i": idx } as CSSProperties}
      >
        <span className="footer-display__char-inner">{char}</span>
      </span>
    );
  }

  return (
    <div
      ref={rootRef}
      className="footer-display"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link
        href="/"
        className="footer-display__link"
        aria-label="INDIS Interiors — home"
      >
        <span className="footer-display__word" aria-label="INDIS">
          {LINE1.map((char, i) => renderChar(char, i))}
        </span>
        <span className="footer-display__word" aria-label="Interiors">
          {LINE2.map((char, i) => renderChar(char, i + LINE1.length))}
        </span>
      </Link>

      <div className="footer-display__meta">
        <span>{new Date().getFullYear()}</span>
        <span aria-hidden>·</span>
        <span>Hyderabad, India</span>
        <span aria-hidden>·</span>
        <span>Over 15 years</span>
      </div>
    </div>
  );
}
