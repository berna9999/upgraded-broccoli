"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { DayOfWeek, OpeningDay } from "@/types/restaurant";

const WEEK: DayOfWeek[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Tabella orari; il giorno corrente viene evidenziato dopo l'idratazione (niente mismatch SSR). */
export function HoursList({
  days,
  closedLabel,
  todayLabel,
  compact,
}: {
  days: OpeningDay[];
  closedLabel: string;
  todayLabel: string;
  compact?: boolean;
}) {
  const [today, setToday] = useState<DayOfWeek | null>(null);
  useEffect(() => setToday(WEEK[new Date().getDay()]), []);

  return (
    <dl className={cn("divide-y", compact ? "divide-white/10 text-sm" : "divide-border")}>
      {days.map((day) => {
        const isToday = day.dayOfWeek === today;
        const closed = day.closed || day.slots.length === 0;
        return (
          <div
            key={day.dayOfWeek}
            className={cn("flex justify-between gap-4", compact ? "py-1.5" : "py-3", isToday && "font-semibold")}
          >
            <dt className="flex items-center gap-2">
              {day.label}
              {isToday && !compact && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-primary">
                  {todayLabel}
                </span>
              )}
            </dt>
            <dd className={cn("text-right tabular-nums", closed && "opacity-70")}>
              {closed ? closedLabel : day.slots.map((s) => `${s.opens}–${s.closes}`).join(" · ")}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
