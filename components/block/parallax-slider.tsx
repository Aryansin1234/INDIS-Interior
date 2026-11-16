"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./parallax-slider.css";

export interface ParallaxSlide {
  title: string;
  image: string;
  alt?: string;
  href?: string;
  focus?: string;
}

export type ParallaxSliderOrientation = "portrait" | "landscape";

export interface ParallaxSliderProps {
  slides?: ParallaxSlide[];
  orientation?: ParallaxSliderOrientation;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  parallax?: number;
  zoom?: number;
  scrollOnWheel?: boolean;
  label?: string;
  className?: string;
}

export const defaultParallaxSlides: ParallaxSlide[] = [
  { title: "Missing Piece",  image: "https://cdn-new.obsidianui.dev/parallax-slider-images/missing-piece.webp",  alt: "A hand placing the last puzzle piece",            focus: "50% 75%" },
  { title: "Enter",          image: "https://cdn-new.obsidianui.dev/parallax-slider-images/enter.webp",          alt: "A finger pressing the Enter key",                  focus: "66% 75%" },
  { title: "Opening Move",   image: "https://cdn-new.obsidianui.dev/parallax-slider-images/opening-move.webp",   alt: "Two hands moving chess pieces",                    focus: "34% 60%" },
  { title: "Hand Off",       image: "https://cdn-new.obsidianui.dev/parallax-slider-images/hand-off.webp",       alt: "One hand passing a glowing sphere to another",     focus: "50% 50%" },
  { title: "Fine Tune",      image: "https://cdn-new.obsidianui.dev/parallax-slider-images/fine-tune.webp",      alt: "A hand turning a large control dial",              focus: "55% 70%" },
];

const LERP            = 0.05;
const WHEEL_SPEED     = 1.75;
const MAX_WHEEL_STEP  = 150;
const MOUSE_DRAG      = 2;
const TOUCH_DRAG      = 1.5;
const DRAG_THRESHOLD  = 5;
const SETTLE_MS       = 200;
const LEAD_COPIES     = 2;
const MIN_COPIES      = 6;

function parseFocus(focus: string | undefined): [number, number] {
  const [x, y = x] = (focus ?? "").trim().split(/\s+/).map((p) => parseFloat(p) / 100);
  const clamp = (v: number | undefined) => (v === undefined || Number.isNaN(v) ? 0.5 : Math.min(1, Math.max(0, v)));
  return [clamp(x), clamp(y)];
}

export function ParallaxSlider({
  slides = defaultParallaxSlides,
  orientation = "portrait",
  eyebrow, title, description,
  parallax = 0.2,
  zoom,
  scrollOnWheel = true,
  label = "Gallery",
  className,
}: ParallaxSliderProps) {
  const rootRef     = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number | null>(null);
  const [copies, setCopies] = useState(MIN_COPIES);
  const count    = slides.length;
  const hasHeader = Boolean(eyebrow || title || description);
  const scale     = Math.max(1, zoom ?? (orientation === "landscape" ? 1.3 : 1));

  useEffect(() => {
    const root     = rootRef.current;
    const viewport = viewportRef.current;
    const track    = trackRef.current;
    if (!root || !viewport || !track || count === 0) return;

    const slideElements = Array.from(track.children) as HTMLElement[];
    const images = slideElements.map((s) => s.querySelector<HTMLImageElement>("img[data-parallax-image]"));
    const room   = images.map(() => ({ left: 0, right: 0 }));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = {
      current: 0, target: 0, width: 0, slideWidth: 0, slideHeight: 0,
      offset: 0, pitch: 0, sequence: 0, lastInput: 0, moving: false,
      frame: 0, pointer: null as number | null, pointerX: 0,
      dragDistance: 0, dragged: false, reduce: motionQuery.matches,
    };
    let releaseTimer = 0;

    const setMoving = (moving: boolean) => {
      if (moving === state.moving) return;
      state.moving = moving;
      root.dataset.moving = String(moving);
    };

    const wrap = () => {
      if (!state.sequence) return;
      while (state.current > -state.sequence)      { state.current -= state.sequence; state.target -= state.sequence; }
      while (state.current < -state.sequence * 4)  { state.current += state.sequence; state.target += state.sequence; }
    };

    const paintImage = (i: number) => {
      const image = images[i];
      if (!image) return;
      const dist  = state.current + state.offset + i * state.pitch + state.slideWidth / 2 - state.width / 2;
      if (Math.abs(dist) > state.width / 2 + state.slideWidth + 500) return;
      const drift = state.reduce ? 0 : dist * -parallax;
      const shift = Math.max(-room[i].right, Math.min(room[i].left, drift));
      image.style.transform = `translate3d(${shift}px,0,0)`;
    };

    const paint = () => {
      track.style.transform = `translate3d(${state.current}px,0,0)`;
      images.forEach((_, i) => paintImage(i));
    };

    const fit = (i: number) => {
      const image = images[i];
      if (!image?.naturalWidth || !state.slideWidth || !state.slideHeight) return;
      const ratio  = image.naturalWidth / image.naturalHeight;
      const width  = Math.max(state.slideWidth, state.slideHeight * ratio) * scale;
      const height = Math.max(state.slideHeight, state.slideWidth / ratio) * scale;
      const [fx, fy] = parseFocus(image.dataset.focus);
      Object.assign(image.style, {
        width: `${width}px`, height: `${height}px`,
        left: `${(state.slideWidth  - width)  * fx}px`,
        top:  `${(state.slideHeight - height) * fy}px`,
      });
      room[i] = { left: (width - state.slideWidth) * fx, right: (width - state.slideWidth) * (1 - fx) };
      paintImage(i);
    };

    const step = () => {
      state.frame  = 0;
      const delta  = (state.target - state.current) * (state.reduce ? 1 : LERP);
      state.current = Math.abs(state.target - state.current - delta) < 0.05 ? state.target : state.current + delta;
      wrap();
      const recent = performance.now() - state.lastInput < SETTLE_MS;
      setMoving(state.dragged || Math.abs(delta) >= 0.1 || recent);
      paint();
      if (state.current !== state.target || recent || state.dragged || state.pointer !== null) {
        state.frame = requestAnimationFrame(step);
      } else { setMoving(false); }
    };

    const tick  = () => { if (!state.frame) state.frame = requestAnimationFrame(step); };
    const nudge = (amount: number) => { state.target += amount; state.lastInput = performance.now(); tick(); };

    const measure = () => {
      const prev = state.pitch;
      state.width       = viewport.clientWidth;
      state.slideWidth  = slideElements[0].offsetWidth;
      state.slideHeight = slideElements[0].offsetHeight;
      state.offset      = slideElements[0].offsetLeft;
      state.pitch       = slideElements.length > 1 ? slideElements[1].offsetLeft - slideElements[0].offsetLeft : state.slideWidth;
      state.sequence    = state.pitch * count;
      if (!state.sequence) return;
      if (prev) { state.current *= state.pitch / prev; state.target *= state.pitch / prev; }
      else { const start = positionRef.current ?? -count * LEAD_COPIES; state.current = state.target = start * state.pitch; }
      const needed = Math.max(MIN_COPIES, 5 + Math.ceil(state.width / state.sequence));
      if (needed > copies) setCopies(needed);
      wrap(); paint(); images.forEach((_, i) => fit(i));
    };

    const onImageLoad  = (e: Event) => { const i = images.indexOf(e.currentTarget as HTMLImageElement); if (i >= 0) fit(i); };
    const onWheel      = (e: WheelEvent) => {
      const h    = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? state.width : 1;
      const d    = (h ? e.deltaX : e.deltaY) * unit;
      if (!d) return;
      e.preventDefault();
      nudge(-Math.max(-MAX_WHEEL_STEP, Math.min(MAX_WHEEL_STEP, d * WHEEL_SPEED)));
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || state.pointer !== null) return;
      window.clearTimeout(releaseTimer);
      state.pointer = e.pointerId; state.pointerX = e.clientX;
      state.dragDistance = 0; state.dragged = false; state.lastInput = performance.now();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== state.pointer) return;
      const d = (e.clientX - state.pointerX) * (e.pointerType === "mouse" ? MOUSE_DRAG : TOUCH_DRAG);
      state.pointerX = e.clientX; state.dragDistance += Math.abs(d);
      if (!state.dragged && state.dragDistance > DRAG_THRESHOLD) { state.dragged = true; root.dataset.dragging = "true"; }
      nudge(d);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== state.pointer) return;
      state.pointer = null; root.dataset.dragging = "false";
      if (!state.dragged) return;
      releaseTimer = window.setTimeout(() => { state.dragged = false; tick(); }, 100);
    };
    const onClick  = (e: MouseEvent) => { if (!state.dragged) return; e.preventDefault(); e.stopPropagation(); };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault(); nudge(e.key === "ArrowLeft" ? state.pitch : -state.pitch);
    };
    const onFocusIn = (e: FocusEvent) => {
      viewport.scrollLeft = 0;
      const slide = (e.target as HTMLElement).closest<HTMLElement>("[data-parallax-slide]");
      const i = slide ? slideElements.indexOf(slide) : -1;
      if (i < 0) return;
      state.target = state.width / 2 - (state.offset + i * state.pitch + state.slideWidth / 2);
      state.lastInput = performance.now(); tick();
    };
    const onMotionChange = () => { state.reduce = motionQuery.matches; paint(); };

    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    images.forEach((img) => img?.addEventListener("load", onImageLoad));
    if (scrollOnWheel) viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("click", onClick, true);
    viewport.addEventListener("keydown", onKeyDown);
    viewport.addEventListener("focusin", onFocusIn);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      if (state.pitch) positionRef.current = state.current / state.pitch;
      cancelAnimationFrame(state.frame);
      window.clearTimeout(releaseTimer);
      ro.disconnect();
      images.forEach((img) => img?.removeEventListener("load", onImageLoad));
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("click", onClick, true);
      viewport.removeEventListener("keydown", onKeyDown);
      viewport.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [count, copies, parallax, scale, orientation, scrollOnWheel]);

  return (
    <section
      ref={rootRef}
      className={cn("obsidian-parallax-slider", className)}
      aria-label={hasHeader ? undefined : label}
      data-orientation={orientation}
      data-moving="false"
    >
      <div className="obsidian-parallax-slider__inner">
        {hasHeader && (
          <div className="obsidian-parallax-slider__header">
            <div>
              {eyebrow    && <p  className="obsidian-parallax-slider__eyebrow">{eyebrow}</p>}
              {title      && <h2 className="obsidian-parallax-slider__title">{title}</h2>}
            </div>
            {description && <p className="obsidian-parallax-slider__description">{description}</p>}
          </div>
        )}
        <div
          ref={viewportRef}
          className="obsidian-parallax-slider__viewport"
          role="group"
          aria-roledescription="carousel"
          aria-label={`${label}. Drag, scroll, or use the arrow keys to browse.`}
          tabIndex={0}
        >
          <div ref={trackRef} className="obsidian-parallax-slider__track">
            {Array.from({ length: copies }, (_, copy) =>
              slides.map((slide, index) => {
                const readable = copy === LEAD_COPIES;
                const content  = (
                  <>
                    <span className="obsidian-parallax-slider__frame">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        data-parallax-image=""
                        data-focus={slide.focus}
                        className="obsidian-parallax-slider__image"
                        src={slide.image}
                        alt={readable ? (slide.alt ?? slide.title) : ""}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: slide.focus }}
                      />
                    </span>
                    <span className="obsidian-parallax-slider__caption">
                      <span>{slide.title}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </>
                );
                return (
                  <div
                    key={`${copy}-${index}`}
                    data-parallax-slide=""
                    className="obsidian-parallax-slider__slide"
                    role={readable ? "group" : undefined}
                    aria-roledescription={readable ? "slide" : undefined}
                    aria-label={readable ? `${index + 1} of ${count}: ${slide.title}` : undefined}
                    aria-hidden={readable ? undefined : true}
                  >
                    {slide.href ? (
                      <a className="obsidian-parallax-slider__link" href={slide.href} draggable={false} tabIndex={readable ? undefined : -1}>
                        {content}
                      </a>
                    ) : content}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ParallaxSlider;
