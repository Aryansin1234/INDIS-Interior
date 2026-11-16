"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ClipboardCheck, DraftingCompass, Handshake } from "lucide-react";
import { business } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const processVisuals = [
  { icon: Handshake,       label: "Discover", accent: "clay"  },
  { icon: DraftingCompass, label: "Design",   accent: "olive" },
  { icon: ClipboardCheck,  label: "Deliver",  accent: "sand"  },
];

export default function ProcessLine() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.from(".process-line__step", {
      y: 32, opacity: 0, stagger: 0.15, duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 74%", once: true },
    });

    gsap.from(".process-line__connector", {
      opacity: 0, stagger: 0.15, duration: 0.5,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 74%", once: true },
      delay: 0.3,
    });
  }, { scope: root });

  return (
    <section id="process" className="section process-line" ref={root}>
      <div className="container">
        <p className="eyebrow">Our approach</p>
        <h2 className="headline">A clear path from first conversation to handover.</h2>
        <p className="lead process-line__intro">
          Listen carefully, design with discipline, then execute with quality checks.
        </p>

        <div className="process-line__wrap">
          {business.process.map((step, index) => {
            const visual = processVisuals[index];
            const Icon   = visual?.icon ?? Handshake;

            return (
              <Fragment key={step.title}>
                <article className={`process-line__step process-line__step--${visual?.accent ?? "clay"}`}>
                  <span className="process-line__bg-num" aria-hidden>0{index + 1}</span>

                  <div className="process-line__topline">
                    <span className="process-line__icon" aria-hidden>
                      <Icon size={17} strokeWidth={2} />
                    </span>
                    <small className="process-line__phase">{visual?.label}</small>
                    <span className="process-line__num" aria-hidden>0{index + 1}</span>
                  </div>

                  <hr className="process-line__divider" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>

                {index < business.process.length - 1 && (
                  <div className="process-line__connector" aria-hidden>
                    <span className="process-line__connector-dot" />
                    <span className="process-line__connector-line" />
                    <span className="process-line__connector-arrow">
                      <ArrowRight size={13} strokeWidth={2.4} />
                    </span>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
