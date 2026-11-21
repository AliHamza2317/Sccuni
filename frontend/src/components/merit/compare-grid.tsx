"use client";

import { Check, Plus, Share2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GroupPill, Monogram } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/controls";
import { cn, pkr, signed } from "@/lib/format";
import type { Group, Tone } from "@/lib/types";

export interface CompareItem {
  slug: string;
  title: string;
  uni: string;
  mono: string;
  tone: Tone;
  group: Group;
  city: string;
  sector: string;
  shift: string;
  duration: string;
  campus: string;
  fee: number;
  firstYear: number;
  test: string;
  formula: string;
  deadline: string;
  deadlineSort: string;
  aggregate: number;
  closing: number | null;
}

type Row =
  | { section: string }
  | { label: string; value: (c: CompareItem) => string; best?: { key: (c: CompareItem) => number; dir: "min" | "max"; label: string }; tone?: (c: CompareItem) => string };

export function CompareGrid({ items }: { items: CompareItem[] }) {
  const [removed, setRemoved] = useState<string[]>([]);
  const [highlight, setHighlight] = useState(true);
  const [copied, setCopied] = useState(false);
  const cols = items.filter((i) => !removed.includes(i.slug));
  const margin = (c: CompareItem) => (c.closing === null ? Number.NEGATIVE_INFINITY : c.aggregate - c.closing);

  const rows: Row[] = [
    { section: "Overview" },
    { label: "City", value: (c) => c.city },
    { label: "Sector", value: (c) => c.sector },
    { label: "Shift", value: (c) => c.shift },
    { label: "Duration", value: (c) => c.duration },
    { label: "Campus status", value: (c) => c.campus },
    { section: "Costs · 2027–28" },
    { label: "Tuition / semester", value: (c) => pkr(c.fee), best: { key: (c) => c.fee, dir: "min", label: "Lowest" } },
    { label: "First-year estimate", value: (c) => pkr(c.firstYear), best: { key: (c) => c.firstYear, dir: "min", label: "Lowest" } },
    { section: "Admission · Fall 2027" },
    { label: "Entry test", value: (c) => c.test },
    { label: "Merit formula", value: (c) => c.formula },
    { label: "Apply by", value: (c) => c.deadline, best: { key: (c) => Date.parse(c.deadlineSort), dir: "min", label: "Soonest" } },
    { section: "Your chances" },
    { label: "Your aggregate", value: (c) => `${c.aggregate.toFixed(4)}%` },
    { label: "2025 closing (final list)", value: (c) => (c.closing === null ? "No data" : `${c.closing.toFixed(2)}%`) },
    { label: "Your margin", value: (c) => (c.closing === null ? "—" : signed(margin(c))), best: { key: margin, dir: "max", label: "Largest" }, tone: (c) => (c.closing === null ? "" : margin(c) >= 0 ? "text-safe" : "text-reach") },
  ];

  const bestOf = (r: Extract<Row, { label: string }>) => {
    if (!r.best || cols.length < 2 || !highlight) return null;
    const vals = cols.map(r.best.key);
    return r.best.dir === "min" ? Math.min(...vals) : Math.max(...vals);
  };
  const template = `200px repeat(${Math.max(cols.length, 1)}, minmax(190px, 1fr))${cols.length < 4 ? " 190px" : ""}`;

  return (
    <div className="mx-auto max-w-[1240px] space-y-5 px-5 py-10 sm:px-7">
      <div className="flex flex-wrap items-center justify-end gap-4">
        <Switch checked={highlight} onChange={setHighlight}>Highlight the best in each row</Switch>
        <Button
          variant="light"
          onClick={async () => {
            try { await navigator.clipboard.writeText(window.location.href); } catch { /* ignore */ }
            setCopied(true);
          }}
        >
          {copied ? <Check className="size-4 text-brand-600" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
          {copied ? "Link copied" : "Share comparison"}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-[28px] bg-white ring-1 ring-ink-200/70 shadow-soft">
        <div role="table" aria-label="Program comparison" className="min-w-[860px]">
          <div role="row" className="grid border-b border-ink-200" style={{ gridTemplateColumns: template }}>
            <div role="columnheader" className="flex items-end p-5 text-xs text-ink-500">{cols.length} of 4 programs</div>
            {cols.map((c) => (
              <div role="columnheader" key={c.slug} className="space-y-2.5 border-l border-ink-100 p-5">
                <div className="flex items-center justify-between">
                  <Monogram text={c.mono} tone={c.tone} />
                  <Button variant="ghost" size="icon-sm" aria-label={`Remove ${c.title} from comparison`} onClick={() => setRemoved((r) => [...r, c.slug])}><X className="size-4" aria-hidden /></Button>
                </div>
                <Link href={`/programs/${c.slug}`} className="block font-display text-[17px] leading-snug font-bold hover:text-brand-700">{c.title}</Link>
                <p className="text-xs text-ink-500">{c.uni}</p>
                <GroupPill group={c.group} size="sm" />
              </div>
            ))}
            {cols.length < 4 && (
              <div className="border-l border-ink-100 p-5">
                <Link href="/programs" className="flex h-full min-h-36 flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-ink-300 text-sm font-semibold text-ink-500 transition hover:border-brand-500 hover:text-brand-700">
                  <Plus className="size-5" aria-hidden />Add a program
                </Link>
              </div>
            )}
          </div>
          {rows.map((r, i) =>
            "section" in r ? (
              <div role="row" key={r.section} className="border-b border-ink-200 bg-ink-50 px-5 py-2.5 text-xs font-bold tracking-[0.08em] text-ink-600 uppercase">{r.section}</div>
            ) : (
              <div role="row" key={r.label + i} className="grid border-b border-ink-100 text-[14.5px] last:border-0" style={{ gridTemplateColumns: template }}>
                <div role="rowheader" className="px-5 py-3.5 font-medium text-ink-500">{r.label}</div>
                {cols.map((c) => {
                  const b = bestOf(r);
                  const isBest = b !== null && r.best!.key(c) === b;
                  return (
                    <div role="cell" key={c.slug} className={cn("flex flex-wrap items-center gap-2 border-l border-ink-100 px-5 py-3.5", isBest && "bg-brand-50")}>
                      <b className={cn("tabular font-semibold", r.tone?.(c))}>{r.value(c)}</b>
                      {isBest && <span className="rounded-md bg-brand-100 px-1.5 py-0.5 text-[11px] font-bold text-brand-800">{r.best!.label}</span>}
                    </div>
                  );
                })}
                {cols.length < 4 && <div className="border-l border-ink-100" />}
              </div>
            ),
          )}
        </div>
      </div>
      <p className="rounded-2xl border border-ink-200 bg-white p-4 text-sm text-ink-600">
        Aggregates use each university’s verified Fall 2027 formula and your saved marks (expected test score). Fees are for 2027–28, open merit seats. Past merit is a guide, not a guarantee.
      </p>
    </div>
  );
}
