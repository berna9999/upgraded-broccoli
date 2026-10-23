"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/restaurant";
import { CoverImage } from "./ui/CoverImage";

/** Sfondo della hero: dissolvenza tra le immagini, disattivata con prefers-reduced-motion. */
export function HeroSlides({ images, interval = 6000 }: { images: ImageAsset[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => window.clearInterval(timer);
  }, [images.length, interval]);

  const slides = images.length > 0 ? images : [{ src: "", alt: "" }];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {slides.map((image, i) => (
        <div
          key={`${image.src}-${i}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className={cn("absolute inset-0", i === index && "motion-safe:animate-slow-zoom")}>
            <CoverImage src={image.src} alt="" sizes="100vw" priority={i === 0} />
          </div>
        </div>
      ))}
    </div>
  );
}
