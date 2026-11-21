import { GroupPill, Monogram } from "@/components/ui/badges";
import { MeritMeter } from "@/components/ui/merit-meter";
import { cn, signed } from "@/lib/format";
import type { Group, Tone } from "@/lib/types";

export interface WindowRow {
  slug: string;
  mono: string;
  tone: Tone;
  title: string;
  where: string;
  aggregate: string;
  margin: number | null;
  group: Group;
}

/**
 * A calm, framed preview of the Best Fit Finder, shown under the home hero.
 * Purely visual (aria-hidden content is summarised by the caption).
 */
export function ProductWindow({
  rows,
  counts,
  eligible,
  marks,
  focus,
}: {
  rows: WindowRow[];
  counts: { safe: number; target: number; reach: number };
  eligible: number;
  marks: [string, string][];
  focus: { title: string; aggregate: number; closings: { label: string; value: number }[] };
}) {
  return (
    <figure className="relative">
      <div className="rounded-[30px] bg-white/[0.08] p-2 shadow-[0_50px_120px_-20px_rgb(0_10_26/0.55)] ring-1 ring-white/[0.14] backdrop-blur-xl sm:p-2.5">
        <div className="overflow-hidden rounded-[22px] bg-white text-ink-900 ring-1 ring-ink-900/[0.06]">
          {/* Title bar */}
          <div className="flex h-11 items-center gap-3 border-b border-ink-100 bg-ink-50/70 px-4">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-ink-200" />
              <span className="size-2.5 rounded-full bg-ink-200" />
              <span className="size-2.5 rounded-full bg-ink-200" />
            </span>
            <span className="mx-auto text-[12.5px] font-medium text-ink-500">Best Fit Finder</span>
            <span className="rounded-full bg-gold-50 px-2 py-0.5 text-[11px] font-semibold text-gold-700 ring-1 ring-gold-100">Sample</span>
          </div>

          <div className="grid lg:grid-cols-[290px_minmax(0,1fr)]">
            {/* Profile */}
            <aside className="hidden border-r border-ink-100 bg-paper/60 p-6 lg:block">
              <p className="text-[11.5px] font-semibold tracking-[0.08em] text-ink-500 uppercase">Your marks</p>
              <dl className="mt-3 space-y-2.5 text-[13.5px]">
                {marks.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-ink-100">
                <p className="truncate text-[12.5px] text-ink-500">{focus.title}</p>
                <p className="tabular mt-1 font-display text-[34px] leading-none font-extrabold tracking-[-0.04em]">
                  {focus.aggregate.toFixed(2)}
                  <span className="text-base text-ink-500">%</span>
                </p>
                <MeritMeter className="mt-5" value={focus.aggregate} lo={82} hi={90} marks={focus.closings} />
              </div>
            </aside>

            {/* Results */}
            <div className="min-w-0 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-[17px] font-bold tracking-[-0.02em]">{eligible} programs you’re eligible for</p>
                <div className="flex gap-1 rounded-full bg-ink-50 p-1 ring-1 ring-ink-100">
                  {([["safe", "Safe", counts.safe], ["target", "Target", counts.target], ["reach", "Reach", counts.reach]] as const).map(([g, l, n], i) => (
                    <span
                      key={g}
                      className={cn(
                        "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold",
                        i === 0 ? "bg-white text-ink-900 shadow-xs" : "text-ink-500",
                      )}
                    >
                      {l}
                      <span className={cn("tabular text-[11.5px]", g === "safe" ? "text-safe" : g === "target" ? "text-target" : "text-reach")}>{n}</span>
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-4 divide-y divide-ink-100 rounded-2xl ring-1 ring-ink-100">
                {rows.map((r) => (
                  <li key={r.slug} className="flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4">
                    <Monogram text={r.mono} tone={r.tone} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[14.5px] leading-snug font-semibold sm:truncate">{r.title}</p>
                      <p className="text-[12.5px] leading-snug text-ink-500 sm:truncate">{r.where}</p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="tabular text-[14px] font-bold">{r.aggregate}%</p>
                      <p className="text-[11.5px] text-ink-500">your aggregate</p>
                    </div>
                    <div className="hidden w-[74px] text-right md:block">
                      <p className={cn("tabular text-[14px] font-bold", r.margin === null ? "text-ink-500" : r.margin >= 0 ? "text-safe" : "text-reach")}>
                        {r.margin === null ? "—" : signed(r.margin)}
                      </p>
                      <p className="text-[11.5px] text-ink-500">vs last year</p>
                    </div>
                    <GroupPill group={r.group} size="sm" className="w-[84px] justify-center" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Preview of the Best Fit Finder with sample data: {eligible} eligible programs, {counts.safe} safe, {counts.target} target and {counts.reach} reach.
      </figcaption>
    </figure>
  );
}
