import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { ArrowUpRightIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

type ButtonLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "text";
  withArrow?: boolean;
};

export function ButtonLink({ className, variant = "primary", withArrow = true, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "pv-button-link group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        variant === "primary" && "bg-brand text-white hover:-translate-y-0.5 hover:bg-brand-deep",
        variant === "secondary" && "border border-line bg-white text-ink hover:-translate-y-0.5 hover:border-brand hover:text-brand",
        variant === "text" && "min-h-0 px-0 text-ink hover:text-brand",
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <ArrowUpRightIcon size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </Link>
  );
}
