"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { business, navItems } from "@/data/site";

const homeSections = [
  { href: "#arrival",              label: "Home",        key: "arrival" },
  { href: "#philosophy",           label: "Studio",      key: "philosophy" },
  { href: "#projects-showcase",    label: "Projects",    key: "projects-showcase" },
  { href: "#collections-showcase", label: "Collections", key: "collections-showcase" },
  { href: "#process",              label: "Approach",    key: "process" },
  { href: "#consultation",         label: "Consult",     key: "consultation" },
];

export default function Header() {
  const [open, setOpen]                     = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection]   = useState("arrival");
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const condensed = !isHome || scrolled;

  /* refs for click-outside */
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.dataset.menuOpen = String(open);
    return () => { delete document.body.dataset.menuOpen; };
  }, [open]);

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        drawerRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 72);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActiveSection(hit.target.id);
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    );

    homeSections.forEach(({ key }) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [isHome]);

  useEffect(() => { if (!isHome) setScrolled(true); }, [isHome]);

  /* suppress unused warning — kept for future anchor scroll */
  void activeSection;

  return (
    <header
      className={`site-header ${condensed ? "is-condensed" : "is-arrival"}`}
      style={{ "--scroll-progress": scrollProgress } as CSSProperties}
    >
      {/* ── Bar ─────────────────────────────────────── */}
      <div className="nav-bar">

        <Link className="nav-brand" href="/" aria-label="INDIS Interiors — home">
          <span className="nav-brand__mark">INDIS</span>
          <span className="nav-brand__sep" aria-hidden>✦</span>
          <span className="nav-brand__sub">Interiors</span>
        </Link>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{   rotate:  45,  opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                <X size={18} strokeWidth={2.2} />
              </motion.span>
            ) : (
              <motion.span
                key="m"
                initial={{ rotate: 45,  opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{   rotate: -45,  opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                <Menu size={18} strokeWidth={2.2} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Scroll progress ───────────────────────── */}
      <div className="nav-progress" aria-hidden />

      {/* ── Drawer ────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={drawerRef}
            id="nav-drawer"
            className="nav-drawer"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -14, scale: 0.95, clipPath: "inset(0 0 100% 0 round 24px)" }}
            animate={{ opacity: 1, y: 0,   scale: 1,    clipPath: "inset(0 0 0%   0 round 24px)" }}
            exit={{   opacity: 0, y: -14,  scale: 0.95, clipPath: "inset(0 0 100% 0 round 24px)" }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
          >
            <nav className="nav-drawer__links">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, type: "spring", stiffness: 480, damping: 32 }}
                >
                  <Link
                    href={item.href}
                    className="nav-drawer__item"
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        ? "page"
                        : undefined
                    }
                  >
                    <span className="nav-drawer__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="nav-drawer__name">{item.label}</span>
                    <span className="nav-drawer__arrow" aria-hidden>
                      <ChevronRight size={16} strokeWidth={2.4} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="nav-drawer__foot">
              <a href={business.emailHref} onClick={() => setOpen(false)}>{business.email}</a>
              <a href={business.phoneHref} onClick={() => setOpen(false)}>{business.phone}</a>
              <a
                className="nav-drawer__cta"
                href={business.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <span>Free Consultation</span>
                <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
