"use client";

import { Bookmark, Columns2, Info, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GroupPill, Monogram, Verified } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/controls";
import { cn, signed } from "@/lib/format";
import type { Group, Tone } from "@/lib/types";

export interface FitCard {
  slug: string;
  title: string;
  where: string;
  mono: string;
  tone: Tone;
  aggregate: string;
  formula: string;
  group: Group;
  margins: { year: number; margin: number }[];
  feePerYear: string;
  deadline: string;
  inBudget: boolean;
}

const META: Record<"safe" | "target" | "reach" | "none", { title: (n: number) => string; desc: string }> = {
  safe: { title: (n) => `${n} Safe ${n === 1 ? "program" : "programs"}`, desc: "Your aggregate was clearly above the closing merit in every recent year." },
  target: { title: (n) => `${n} Target ${n === 1 ? "program" : "programs"}`, desc: "Close to recent closing merits — realistic, but not certain." },
  reach: { title: (n) => `${n} Reach ${n === 1 ? "program" : "programs"}`, desc: "A little below recent closing merits — possible, but harder." },
  none: { title: (n) => `${n} without comparable data`, desc: "Eligible, but there’s no past aggregate we can compare fairly." },
};

function reason(c: FitCard): string {
  if (c.group === "none") return "New program — no past merits to compare with yet.";
  const latest = c.margins[0];
  if (c.group === "safe") return `Above the final-list closing merit in all ${c.margins.length} recent years, by at least ${Math.min(...c.margins.map((m) => m.margin)).toFixed(2)} marks.`;
  if (c.group === "target") return latest.margin < 0 ? `${Math.abs(latest.margin).toFixed(2)} below the ${latest.year} final list, but above earlier years. A realistic, uncertain chance.` : `Just above recent closing merits — less than 2 marks of margin in at least one year.`;
  return `${Math.abs(latest.margin).toFixed(2)} below the ${latest.year} closing merit. Possible on later merit lists, but harder.`;
}

export function BestFitResults({ cards, notEligible, needsInfo }: { cards: FitCard[]; notEligible: { title: string; why: string }[]; needsInfo: { title: string; why: string }[] }) {
  const [group, setGroup] = useState<"safe" | "target" | "reach" | "none">("target");
  const [budgetOnly, setBudgetOnly] = useState(false);
  const counts = { safe: 0, target: 0, reach: 0, none: 0 } as Record<"safe" | "target" | "reach" | "none", number>;
  cards.forEach((c) => { if (c.group in counts) counts[c.group as keyof typeof counts]++; });
  const list = cards.filter((c) => c.group === group && (!budgetOnly || c.inBudget));

  return (
    <>
      <div className="sticky top-[72px] z-20 border-b border-ink-200 bg-white/90 backdrop-blur-xl">
        <div role="tablist" aria-label="Result groups" className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-5 sm:px-7">
          {(["safe", "target", "reach", "none"] as const).map((g) => (
            <button
              key={g}
              role="tab"
              type="button"
              aria-selected={g === group}
              onClick={() => setGroup(g)}
              className={cn("flex items-center gap-2.5 border-b-2 px-3 py-3.5 font-semibold whitespace-nowrap transition-colors", g === group ? "border-ink-900 text-ink-900" : "border-transparent text-ink-500 hover:text-ink-900")}
            >
              <GroupPill group={g} size="sm" />
              <span className="rounded-full bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-700">{counts[g]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-8 px-5 py-10 sm:px-7">
        <div className="min-w-0 flex-[999_1_560px] space-y-4" role="tabpanel">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold">{META[group].title(list.length)}</h2>
              <p className="text-sm text-ink-500">{META[group].desc}</p>
            </div>
            <Chip active={budgetOnly} onClick={() => setBudgetOnly((v) => !v)}>Within my budget</Chip>
          </div>

          {list.map((c) => (
            <article key={c.slug} className="space-y-4 rounded-[26px] border border-ink-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 flex-[1_1_320px] items-start gap-4">
                  <Monogram text={c.mono} tone={c.tone} />
                  <div className="min-w-0">
                    <Link href={`/programs/${c.slug}`} className="font-display text-xl font-bold tracking-tight hover:text-brand-700">{c.title}</Link>
                    <p className="text-sm text-ink-500">{c.where}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-500">Your aggregate</p>
                  <p className="tabular font-display text-[26px] leading-tight font-extrabold tracking-tight">{c.aggregate}%</p>
                  <p className="text-xs text-ink-500">{c.formula}</p>
                </div>
              </div>
              <p className="flex items-start gap-2.5 rounded-2xl bg-ink-50 px-4 py-3 text-sm"><Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />{reason(c)}</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {c.margins.map((m) => (
                    <span key={m.year} className="inline-flex h-8 items-center gap-2 rounded-lg border border-ink-200 bg-white px-2.5 text-[13px]">
                      <span className="text-ink-500">{m.year}</span>
                      <b className={cn("tabular", m.margin >= 0 ? "text-safe" : "text-reach")}>{signed(m.margin)}</b>
                    </span>
                  ))}
                </div>
                <p className="flex gap-5 text-sm">
                  <span><span className="text-ink-500">Tuition / yr</span> <b>{c.feePerYear}</b></span>
                  <span><span className="text-ink-500">Apply by</span> <b>{c.deadline}</b></span>
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-4">
                <Verified>Formula & merits verified</Verified>
                <div className="flex gap-2">
                  <ButtonLink href="/compare" variant="light" size="sm"><Columns2 className="size-4" aria-hidden />Compare</ButtonLink>
                  <ButtonLink href="/dashboard" variant="light" size="icon-sm" aria-label="Save program"><Bookmark className="size-4" aria-hidden /></ButtonLink>
                  <ButtonLink href={`/programs/${c.slug}`} variant="dark" size="sm">View program</ButtonLink>
                </div>
              </div>
            </article>
          ))}
          {list.length === 0 && <p className="rounded-3xl border border-ink-200 bg-white p-8 text-center text-ink-500">No programs in this group with the current filter.</p>}
        </div>

        <aside className="w-full space-y-4 lg:sticky lg:top-[140px] lg:w-[360px]">
          <div className="space-y-3.5 rounded-3xl border border-ink-200 bg-white p-6">
            <p className="font-display font-bold">How the groups work</p>
            {([["safe", "At least 2.00 above the closing merit in each of the last 3 years."], ["target", "Within 1.50 of the latest closing merit, or above it."], ["reach", "1.50 to 4.00 below the latest closing merit."], ["none", "No comparable past aggregate — new programs, or merits published as positions."]] as const).map(([g, t]) => (
              <div key={g} className="flex items-start gap-3"><GroupPill group={g} size="sm" className="mt-0.5" /><span className="text-sm text-ink-500">{t}</span></div>
            ))}
            <p className="border-t border-ink-100 pt-3 text-xs text-ink-500">Recommendation policy v1 · placeholder thresholds, to be approved. Paid placements never change these groups.</p>
          </div>

          {needsInfo.length > 0 && (
            <div className="space-y-2 rounded-3xl border border-gold-100 bg-gold-50 p-6">
              <p className="font-display font-bold">Needs more information</p>
              {needsInfo.map((n) => (
                <div key={n.title} className="border-t border-gold-100 pt-2.5"><p className="text-sm font-bold">{n.title}</p><p className="text-xs text-gold-700">{n.why}</p></div>
              ))}
            </div>
          )}

          <div className="space-y-2 rounded-3xl border border-ink-200 bg-white p-6">
            <div className="flex items-center justify-between"><p className="font-display font-bold">Not eligible</p><span className="rounded-lg bg-danger-bg px-2 py-0.5 text-xs font-bold text-danger">{notEligible.length}</span></div>
            <p className="text-sm text-ink-500">Hidden from your results — here’s why.</p>
            {notEligible.map((n) => (
              <div key={n.title} className="border-t border-ink-100 pt-2.5"><p className="text-sm font-bold">{n.title}</p><p className="flex items-start gap-1.5 text-xs text-danger"><X className="mt-px size-3.5 shrink-0" aria-hidden />{n.why}</p></div>
            ))}
          </div>

          <p className="flex items-start gap-3 rounded-2xl border border-[#f6e2ba] bg-gold-50 p-4 text-sm text-[#5c3d07]">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span><b>A guide, not a guarantee.</b> Merits change every year. Plan a balanced list — a few Safe, several Target, a couple of Reach.</span>
          </p>
        </aside>
      </div>
    </>
  );
}
