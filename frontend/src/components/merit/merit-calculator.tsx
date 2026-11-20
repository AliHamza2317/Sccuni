"use client";

import { Bookmark, CircleAlert, Info, Target } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GroupPill, SourceChip, Tag, Verified } from "@/components/ui/badges";
import { Button, ButtonLink } from "@/components/ui/button";
import { Segmented } from "@/components/ui/controls";
import { MeritMeter } from "@/components/ui/merit-meter";
import { calculateAggregate, classify, requiredTestMarks } from "@/lib/merit/engine";
import { cn, formulaSummary, signed } from "@/lib/format";
import type { Formula, Group } from "@/lib/types";

export interface CalcProgram {
  slug: string;
  label: string;
  short: string;
  formula: Formula;
  closings: { year: number; value: number }[];
}

const REASONS: Record<Group, string> = {
  safe: "At least 2 marks above the closing merit in each of the last three years.",
  target: "Close to recent closing merits — a realistic but uncertain chance.",
  reach: "A little below the latest closing merit. Possible, but harder.",
  below: "Well below recent closing merits for this program.",
  none: "No past merits to compare with yet.",
};

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      aria-label={label}
      value={Number.isFinite(value) ? value : ""}
      onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
      className="tabular h-12 w-full min-w-0 rounded-xl border border-ink-300 bg-white px-3.5 text-[15px] font-semibold outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
    />
  );
}

export function MeritCalculator({ programs }: { programs: CalcProgram[] }) {
  const [slug, setSlug] = useState(programs[0].slug);
  const program = programs.find((p) => p.slug === slug)!;
  const f = program.formula;
  const [ssc, setSsc] = useState({ obtained: 1080, total: 1200 });
  const [part, setPart] = useState<"part1" | "full">("part1");
  const [hssc, setHssc] = useState({ obtained: 500, total: 550 });
  const [testPct, setTestPct] = useState(0.83);
  const [expected, setExpected] = useState(true);
  const testObtained = Math.round(testPct * f.testTotal);

  const result = calculateAggregate(f, { ssc, hssc, test: { obtained: testObtained, total: f.testTotal } });
  const aggregate = result.ok ? Number(result.aggregate) : null;
  const group: Group = aggregate === null ? "none" : classify(aggregate, program.closings.map((c) => c.value));
  const usesSsc = f.components.some((c) => c.key === "ssc");

  const changeProgram = (next: string) => {
    setSlug(next);
  };
  const changePart = (v: "part1" | "full") => {
    setPart(v);
    setHssc(v === "part1" ? { obtained: 500, total: 550 } : { obtained: 1010, total: 1100 });
  };

  return (
    <div className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-7 px-5 py-10 sm:px-7">
      {/* Inputs */}
      <form className="min-w-0 flex-[1_1_400px] space-y-6 rounded-[28px] border border-ink-200 bg-white p-6 shadow-soft sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="program" className="text-sm font-semibold">Program</label>
          <select id="program" value={slug} onChange={(e) => changeProgram(e.target.value)} className="h-12 w-full rounded-xl border border-ink-300 bg-white px-3.5 text-[15px] outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15">
            {programs.map((p) => <option key={p.slug} value={p.slug}>{p.label}</option>)}
          </select>
          <div className="flex flex-wrap gap-2 pt-1">
            <Tag tone="brand">{formulaSummary(f.components, true)}</Tag>
            <Tag>{f.session} · v{f.version}</Tag>
          </div>
        </div>

        <hr className="border-ink-100" />

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Matric (SSC)</legend>
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5">
            <NumberField label="Matric marks obtained" value={ssc.obtained} onChange={(n) => setSsc({ ...ssc, obtained: n })} />
            <span className="text-[13px] text-ink-500">out of</span>
            <NumberField label="Matric total marks" value={ssc.total} onChange={(n) => setSsc({ ...ssc, total: n })} />
          </div>
          {!usesSsc && <p className="text-[13px] text-ink-500">Not part of this program’s formula — still used to check eligibility.</p>}
        </fieldset>

        <fieldset className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <legend className="text-sm font-semibold">FSc / HSSC</legend>
            <Segmented size="sm" label="Which FSc marks" value={part} onChange={changePart} options={[{ value: "part1", label: "Part-I" }, { value: "full", label: "Full result" }]} />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5">
            <NumberField label="FSc marks obtained" value={hssc.obtained} onChange={(n) => setHssc({ ...hssc, obtained: n })} />
            <span className="text-[13px] text-ink-500">out of</span>
            <NumberField label="FSc total marks" value={hssc.total} onChange={(n) => setHssc({ ...hssc, total: n })} />
          </div>
          <p className="text-[13px] text-ink-500">{part === "part1" ? "This program uses Part-I marks while your full result isn’t out." : "Your complete FSc result (Part-I + Part-II)."}</p>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">{f.testName}</legend>
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5">
            <NumberField label="Test marks obtained" value={testObtained} onChange={(n) => setTestPct(Number.isFinite(n) ? n / f.testTotal : NaN)} />
            <span className="text-[13px] text-ink-500">out of</span>
            <input aria-label="Test total marks" readOnly value={f.testTotal} className="tabular h-12 w-full rounded-xl border border-ink-200 bg-ink-50 px-3.5 text-[15px] font-semibold text-ink-600" />
          </div>
          <input type="range" min={0} max={f.testTotal} value={Number.isFinite(testObtained) ? testObtained : 0} onChange={(e) => setTestPct(Number(e.target.value) / f.testTotal)} aria-label="Test marks slider" className="w-full accent-brand-600" />
          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-700">
            <input type="checkbox" checked={expected} onChange={(e) => setExpected(e.target.checked)} className="size-[18px] accent-brand-600" />
            This is an expected score — I haven’t taken the test yet
          </label>
        </fieldset>

        <label className="flex items-center gap-3 text-sm text-ink-400">
          <input type="checkbox" disabled className="size-[18px]" />
          Hafiz-e-Quran <span className="text-xs">— no extra marks in this formula</span>
        </label>

        {!result.ok && (
          <p role="alert" className="flex items-start gap-3 rounded-2xl border border-[#f3c4c9] bg-danger-bg p-4 text-sm text-[#8f1d1d]">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />{result.error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <ButtonLink href="/sign-in" variant="dark"><Bookmark className="size-4" aria-hidden />Save this calculation</ButtonLink>
          <Button variant="ghost" onClick={() => { setSsc({ obtained: 1080, total: 1200 }); changePart("part1"); setTestPct(0.83); setExpected(true); }}>Reset</Button>
        </div>
        <p className="text-xs text-ink-500">Saved calculations are snapshots: they never change, even if the formula is updated next year.</p>
      </form>

      {/* Results */}
      <div className="min-w-0 flex-[999_1_560px] space-y-5">
        <section aria-label="Your result" className="relative isolate overflow-hidden rounded-[30px] bg-ink-900 p-7 text-white shadow-lift sm:p-9">
          <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 opacity-50" />
          <div aria-hidden className="absolute -top-44 -right-32 -z-10 size-[460px] rounded-full bg-brand-500/30 blur-[100px]" />
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="space-y-2">
              <p className="text-sm text-ink-300">Your aggregate · {program.short}</p>
              <p className="tabular font-display text-[clamp(3rem,7vw,4.6rem)] leading-none font-extrabold tracking-[-0.045em]" aria-live="polite">
                {result.ok ? result.aggregate : "—"}<span className="text-[0.4em] text-ink-400">%</span>
              </p>
              {expected && <Tag tone="ondark">Based on an expected test score</Tag>}
            </div>
            <div className="flex max-w-[280px] flex-col items-end gap-2 text-right">
              {result.ok ? <GroupPill group={group} /> : <Tag tone="ondark">Check marks</Tag>}
              <p className="text-sm text-ink-300">{result.ok ? REASONS[group] : "Fix the highlighted entries to see your result."}</p>
            </div>
          </div>
          <MeritMeter className="mt-9" dark value={aggregate} marks={[...program.closings].reverse().map((c) => ({ label: String(c.year), value: c.value }))} caption="Final-list closing aggregates · Open merit" />
        </section>

        <section className="space-y-4 rounded-[28px] border border-ink-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold">How we got this number</h2>
            <Verified>Verified formula</Verified>
          </div>
          {result.ok && result.components.map((c) => (
            <div key={c.key} className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_90px] items-center gap-4 border-b border-ink-100 py-3">
              <div><p className="font-bold">{c.label}</p><p className="text-xs text-ink-500 tabular">{c.obtained.toLocaleString("en-US")} / {c.total.toLocaleString("en-US")} ({c.percent}%) × {c.weight}%</p></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-ink-100"><div className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-[width] duration-500" style={{ width: `${Math.min(100, Number(c.percent))}%` }} /></div>
              <p className="tabular text-right font-bold">{c.points}</p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <span className="text-ink-500">Aggregate (rounded to {f.finalDecimals} decimals)</span>
            <b className="tabular font-display text-2xl font-extrabold">{result.ok ? `${result.aggregate}%` : "—"}</b>
          </div>
          <SourceChip title={f.source.title} locator={`${f.source.locator} · formula v${f.version}`} />
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="space-y-3 rounded-[24px] border border-ink-200 bg-white p-6">
            <h2 className="font-display font-bold">Compared with past merits</h2>
            <ul className="divide-y divide-ink-100 text-sm">
              {program.closings.map((c) => {
                const m = aggregate === null ? null : aggregate - c.value;
                return (
                  <li key={c.year} className="flex items-center justify-between py-2.5">
                    <span><b>{c.year}</b> <span className="text-ink-500">· final list {c.value.toFixed(2)}%</span></span>
                    <b className={cn("tabular", m === null ? "text-ink-400" : m >= 0 ? "text-safe" : "text-reach")}>{m === null ? "—" : signed(m)}</b>
                  </li>
                );
              })}
            </ul>
            <p className="text-xs text-ink-500">Same program, campus, shift and category. Each year uses that year’s verified formula.</p>
          </section>
          <section className="space-y-3 rounded-[24px] border border-ink-200 bg-white p-6">
            <h2 className="flex items-center gap-2 font-display font-bold"><Target className="size-[18px] text-target" aria-hidden />What test score do I need?</h2>
            {program.closings.slice(0, 2).map((c) => {
              const need = requiredTestMarks(f, { ssc, hssc }, c.value);
              const text = !need ? "—" : need.kind === "any" ? "Any passing score" : need.kind === "impossible" ? "Not reachable with these FSc marks" : `At least ${need.marks} / ${f.testTotal} marks`;
              return (
                <div key={c.year} className="rounded-2xl bg-ink-50 px-4 py-3">
                  <p className="text-xs text-ink-500">To match the {c.year} closing ({c.value.toFixed(2)}%)</p>
                  <p className="text-[17px] font-bold">{text}</p>
                </div>
              );
            })}
            <p className="text-xs text-ink-500">Keeps your Matric and FSc marks as entered.</p>
          </section>
        </div>

        <p className="flex items-start gap-3 rounded-2xl border border-[#f6e2ba] bg-gold-50 p-4 text-sm text-[#5c3d07]">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span><b>Past merit is a guide, not a guarantee.</b> Closing merits change every year with the number of applicants and seats. Always confirm on the official website before applying. Want every program at once? <Link href="/best-fit" className="font-semibold underline underline-offset-4">Try Best Fit Finder</Link>.</span>
        </p>
      </div>
    </div>
  );
}
