import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "inverse" | "outline" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  // Per l'uso dentro blocchi bg-primary.
  inverse: "bg-primary-foreground text-primary hover:bg-primary-foreground/90 border border-primary-foreground",
  outline: "border border-current text-current hover:bg-foreground/5",
  // Per l'uso sopra immagini scure (hero).
  light: "border border-white/70 text-white hover:bg-white hover:text-overlay",
};

export function ButtonLink({
  href,
  external,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-theme px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
