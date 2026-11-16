"use client";

import { useState, useRef, useCallback, type CSSProperties } from "react";
import Image from "next/image";
import { collections } from "@/data/site";

export default function Transformation() {
  const [position, setPosition] = useState(56);
  const [blur, setBlur]         = useState(0);
  const prevPos   = useRef(56);
  const rafRef    = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const decayRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const beforeImage = collections[4].image;
  const afterImage  = collections[3].image;

  const handleChange = useCallback((value: number) => {
    const delta = Math.abs(value - prevPos.current);
    prevPos.current = value;
    setPosition(value);

    /* map drag speed → blur amount (max 12px) */
    const newBlur = Math.min(delta * 1.2, 12);
    setBlur(newBlur);

    /* cancel any running decay */
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (decayRef.current) clearInterval(decayRef.current);

    /* smoothly decay blur back to 0 */
    decayRef.current = setInterval(() => {
      setBlur((prev) => {
        const next = prev * 0.72;
        if (next < 0.05) {
          clearInterval(decayRef.current!);
          return 0;
        }
        return next;
      });
    }, 16);
  }, []);

  return (
    <section className="section-tight transformation">
      <div className="container transformation__grid">
        <div className="transformation__text">
          <p className="eyebrow">Transformation</p>
          <h2 className="title-serif">From references and site realities to a finished home.</h2>
          <p className="lead">
            Genuine before-and-after pairs were not available in the workspace. This section is intentionally presented as a conceptual design progression, not a fabricated project claim.
          </p>
          <div className="transformation__steps">
            <span>01 Listen</span>
            <span>02 Plan</span>
            <span>03 Detail</span>
            <span>04 Handover</span>
          </div>
        </div>

        <div
          className="transformation__compare"
          style={{ "--compare-position": `${position}%` } as CSSProperties}
        >
          {/* after image (base layer) */}
          <div className="transformation__compare-image transformation__compare-image--after">
            <Image
              src={afterImage.src}
              alt={afterImage.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 56vw"
              style={{ filter: `blur(${blur * 0.55}px)`, transition: blur === 0 ? "filter 0.3s ease" : "none" }}
            />
          </div>

          {/* before image (clipped layer) */}
          <div className="transformation__compare-image transformation__compare-image--before" aria-hidden>
            <Image
              src={beforeImage.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 92vw, 56vw"
              style={{ filter: `blur(${blur * 0.55}px)`, transition: blur === 0 ? "filter 0.3s ease" : "none" }}
            />
          </div>

          {/* edge blur overlay — brightens at the divider line while dragging */}
          <div
            className="transformation__compare-edge"
            aria-hidden
            style={{
              opacity: blur / 12,
              transition: blur === 0 ? "opacity 0.35s ease" : "none",
            }}
          />

          <div className="transformation__compare-label transformation__compare-label--before">Reference</div>
          <div className="transformation__compare-label transformation__compare-label--after">Finish direction</div>

          <div className="transformation__compare-handle" aria-hidden>
            <span />
          </div>

          <input
            className="transformation__compare-range"
            type="range"
            min="0"
            max="100"
            value={position}
            aria-label="Compare reference and finish direction"
            onChange={(e) => handleChange(Number(e.target.value))}
          />
        </div>
      </div>
    </section>
  );
}
