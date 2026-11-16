import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export default function ButtonLink({ href, children, variant = "primary", external = false }: ButtonLinkProps) {
  const className = `btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`;

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
        <ArrowUpRight size={16} aria-hidden />
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </Link>
  );
}
