"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface CoverImageProps {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Immagine a riempimento del contenitore (che deve essere `relative`).
 * Se l'URL manca o non si carica mostra un placeholder nei colori del tema, senza rompere il layout.
 */
export function CoverImage({ src, alt, sizes, priority, className }: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/70"
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgb(var(--color-primary-foreground))_1px,transparent_0)] [background-size:18px_18px]" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
