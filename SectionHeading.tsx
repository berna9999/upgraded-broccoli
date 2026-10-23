import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  inverted = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  /** Da usare su sfondi colorati (bg-primary): testi secondari in tinta col testo invece che `muted`. */
  inverted?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", inverted && "!text-current opacity-80")}>{eyebrow}</p>}
      <h2 id={id} className="mt-3 font-heading text-4xl font-medium leading-tight text-balance sm:text-5xl">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={cn("mt-5 block h-px w-16 bg-accent", align === "center" && "mx-auto")}
      />
      {intro && (
        <p className={cn("mt-5 text-lg leading-relaxed text-pretty", inverted ? "opacity-90" : "text-muted")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
