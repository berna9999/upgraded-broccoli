"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { ResolvedLink } from "@/lib/booking";
import type { NavLink } from "@/lib/sections";
import type { GeneralConfig, Labels } from "@/types/restaurant";
import { Icon } from "./ui/Icon";

interface NavbarProps {
  brand: Pick<GeneralConfig, "name" | "logo">;
  links: NavLink[];
  booking: ResolvedLink | null;
  ctaLabel?: string;
  /** True se in home c'è una hero a tutto schermo: la barra parte trasparente. */
  overHero: boolean;
  labels: Pick<Labels, "openMenu" | "closeMenu" | "mainNavigation">;
}

export function Navbar({ brand, links, booking, ctaLabel, overHero, labels }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const transparent = overHero && pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1280px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const logoSrc = transparent ? brand.logo.srcOnDark || brand.logo.src : brand.logo.src;
  const externalProps = booking?.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        transparent && "bg-transparent text-white",
        // Niente backdrop-blur a menu aperto: creerebbe un containing block per il pannello `fixed`.
        open && "bg-background text-foreground",
        !transparent &&
          !open &&
          "bg-background/95 text-foreground shadow-[0_1px_0_rgb(var(--color-border))] backdrop-blur-md",
      )}
    >
      <nav aria-label={labels.mainNavigation} className="container flex h-20 items-center justify-between gap-6">
        <a href="/" className="relative z-10 flex items-center" onClick={() => setOpen(false)}>
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={brand.logo.alt}
              width={brand.logo.width}
              height={brand.logo.height}
              priority
              className="h-10 w-auto"
            />
          ) : (
            <span className="font-heading text-2xl font-semibold tracking-wide sm:text-3xl">{brand.name}</span>
          )}
        </a>

        <ul className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link whitespace-nowrap text-sm uppercase tracking-[0.16em]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {booking && (
            <a
              href={booking.href}
              {...externalProps}
              className={cn(
                "hidden min-h-11 items-center whitespace-nowrap rounded-theme px-5 text-xs font-medium uppercase tracking-[0.16em] transition-colors sm:inline-flex",
                transparent
                  ? "border border-white/70 hover:bg-white hover:text-overlay"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {ctaLabel ?? booking.label}
            </a>
          )}
          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-theme xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-background text-foreground xl:hidden"
      >
        <ul className="container flex flex-col py-6">
          {links.map((link) => (
            <li key={link.href} className="border-b border-border">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-5 font-heading text-3xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {booking && (
          <div className="container pb-10">
            <a
              href={booking.href}
              {...externalProps}
              onClick={() => setOpen(false)}
              className="flex min-h-12 w-full items-center justify-center rounded-theme bg-primary px-6 text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground"
            >
              {ctaLabel ?? booking.label}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
