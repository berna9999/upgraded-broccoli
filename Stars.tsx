import { StarShape } from "./Icon";

/** Valutazione a stelle con riempimento parziale (es. 4,5). */
export function Stars({ rating, label, className = "h-4 w-4" }: { rating: number; label: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className={`relative inline-block ${className}`}>
            <StarShape className={`absolute inset-0 text-border ${className}`} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarShape className={`max-w-none text-accent ${className}`} />
            </span>
          </span>
        );
      })}
    </span>
  );
}
