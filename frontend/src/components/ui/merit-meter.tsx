import { cn } from "@/lib/format";

interface Mark {
  label: string;
  value: number;
}

/**
 * Sccuni's signature component: your aggregate (dot) against past closing
 * aggregates (ticks) for the same list and category. Never shows positions.
 */
export function MeritMeter({
  value,
  marks,
  lo,
  hi,
  dark = false,
  caption,
  className,
}: {
  value: number | null;
  marks: Mark[];
  lo?: number;
  hi?: number;
  dark?: boolean;
  caption?: string;
  className?: string;
}) {
  const all = marks.map((m) => m.value).concat(value === null ? [] : [value]);
  const min = lo ?? Math.floor(Math.min(...all) - 2);
  const max = hi ?? Math.ceil(Math.max(...all) + 2);
  const pos = (v: number) => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));
  // When ticks sit close together, alternate their labels over two rows so they never collide.
  const sorted = [...marks].sort((a, b) => a.value - b.value);
  const crowded = sorted.some((m, i) => i > 0 && pos(m.value) - pos(sorted[i - 1].value) < 12);
  const secondRow = new Set(crowded ? sorted.filter((_, i) => i % 2 === 1).map((m) => m.label) : []);
  const label =`Your aggregate ${value ?? "not available"} compared with ${marks.map((m) => `${m.label} ${m.value}`).join(", ")}`;

  return (
    <div className={className} role="img" aria-label={label}>
      <div className={cn("relative h-3 rounded-full", dark ? "bg-white/10" : "bg-ink-100")}>
        {value !== null && (
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-[width] duration-700 ease-out"
            style={{ width: `${pos(value)}%` }}
          />
        )}
        {marks.map((m) => (
          <div key={m.label} className={cn("absolute -top-[7px] h-[26px] w-0.5 -ml-px rounded-full", dark ? "bg-white" : "bg-ink-900")} style={{ left: `${pos(m.value)}%` }}>
            <span className={cn("absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11.5px] font-bold", secondRow.has(m.label) ? "top-[46px]" : "top-[30px]", dark ? "text-ink-300" : "text-ink-600")}>
              {m.label}
            </span>
          </div>
        ))}
        {value !== null && (
          <div
            className={cn(
              "absolute top-1/2 size-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 shadow-soft transition-[left] duration-700 ease-out",
              dark ? "border-brand-400 bg-ink-900" : "border-brand-600 bg-white",
            )}
            style={{ left: `${pos(value)}%` }}
          />
        )}
      </div>
      <div className={cn("flex justify-between text-[11.5px]", crowded ? "mt-[60px]" : "mt-10", dark ? "text-ink-400" : "text-ink-500")}>
        <span>{min}%</span>
        {caption ? <span className="text-center">{caption}</span> : null}
        <span>{max}%</span>
      </div>
    </div>
  );
}
