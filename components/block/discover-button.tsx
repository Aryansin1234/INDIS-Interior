"use client";

import { ArrowRight } from "lucide-react";
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import "./discover-button.css";

export interface DiscoverButtonProps {
  label?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  external?: boolean;
}

export function DiscoverButton({
  label = "Discover More",
  href,
  onClick,
  className,
  external = false,
}: DiscoverButtonProps) {
  const face = (
    <>
      <span className="obsidian-discover-button__fill" aria-hidden="true" />
      <span className="obsidian-discover-button__icon" aria-hidden="true">
        <ArrowRight size={22} strokeWidth={2.3} />
      </span>
      <span className="obsidian-discover-button__text">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        className={cn("obsidian-discover-button", className)}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {face}
      </a>
    );
  }

  return (
    <button
      className={cn("obsidian-discover-button", className)}
      type="button"
      onClick={onClick}
    >
      {face}
    </button>
  );
}

export default DiscoverButton;
