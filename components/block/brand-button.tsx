"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import "./brand-button.css";

/* ── BrandButton ──────────────────────────────────────────── */

export interface BrandButtonProps {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  external?: boolean;
  /** "default" | "dark" | "clay" | "olive" */
  variant?: "default" | "dark" | "clay" | "olive";
}

export function BrandButton({
  label,
  href,
  onClick,
  className,
  external = false,
  variant = "default",
}: BrandButtonProps) {
  const variantClass = variant !== "default" ? `brand-btn--${variant}` : "";

  const face = (
    <>
      <span className="brand-btn__fill" aria-hidden />
      <span className="brand-btn__icon" aria-hidden>
        <ArrowRight size={19} strokeWidth={2.3} />
      </span>
      <span className="brand-btn__text">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        className={cn("brand-btn", variantClass, className)}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {face}
      </a>
    );
  }

  return (
    <button
      className={cn("brand-btn", variantClass, className)}
      type="button"
      onClick={onClick}
    >
      {face}
    </button>
  );
}

/* ── EditorialLink ────────────────────────────────────────── */

export interface EditorialLinkProps {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  external?: boolean;
  /** "default" | "light" */
  variant?: "default" | "light";
}

export function EditorialLink({
  label,
  href,
  onClick,
  className,
  external = false,
  variant = "default",
}: EditorialLinkProps) {
  const variantClass = variant === "light" ? "editorial-link--light" : "";

  const face = (
    <>
      {label}
      <span className="editorial-link__arrow" aria-hidden>
        <ArrowUpRight size={16} strokeWidth={2} />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        className={cn("editorial-link", variantClass, className)}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {face}
      </a>
    );
  }

  return (
    <button
      className={cn("editorial-link", variantClass, className)}
      type="button"
      onClick={onClick}
    >
      {face}
    </button>
  );
}
