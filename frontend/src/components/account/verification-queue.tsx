"use client";

import { ArrowRight, Check, CircleCheck, Clock, ExternalLink, FileText, Flag, Info, ListChecks, Lock, ShieldCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Tag } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/controls";
import { cn } from "@/lib/format";

/** Sample change requests — illustrates the four-eyes publishing workflow (docs/DATA_COLLECTION_STRATEGY.md §6). */
const ITEMS = [
  { id: "CR-1042", kind: "Merit formula", target: "Northstar University · BS programs · Fall 2027", tier: 1, who: "Hamza T.", when: "2 hours ago", source: "Prospectus Fall 2027 · p. 41",
    diffs: [["FSc weight", "45%", "40%"], ["Entry test weight", "45%", "50%"], ["Final rounding", "2 decimals", "4 decimals"]],
    lines: [["Section 7 — Merit calculation", false], ["The aggregate shall be computed as: Matric 10%, FSc 40% and Entry Test 50%.", true], ["The final aggregate shall be rounded to four decimal places.", true]],
    checks: [["Worked example on p. 42 reproduced exactly: 81.6250 = 81.6250", true], ["No overlapping formula assignments in Fall 2027", true]] },
  { id: "CR-1039", kind: "Closing merits", target: "Northstar · BS Computer Science · 2025 · List 3", tier: 1, who: "CSV import", when: "5 hours ago", source: "Third merit list 2025 (PDF)",
    diffs: [["Closing aggregate · Open merit", "—", "87.41"], ["Closing aggregate · Self-finance", "—", "81.06"]],
    lines: [["Third merit list — BS Computer Science (Morning)", false], ["Last candidate admitted (Open merit): 87.41000", true], ["Last candidate admitted (Self-finance): 81.06000", true]],
    checks: [["Metric is an aggregate, not a position", true], ["No names or ID numbers captured from the list", true]] },
  { id: "CR-1036", kind: "Fee schedule", target: "Highland Institute · BS programs · 2027–28", tier: 1, who: "Bilal A.", when: "1 day ago", source: "Fee schedule 2027–28 (PDF)",
    diffs: [["Tuition / semester", "PKR 155,000", "PKR 165,000"]],
    lines: [["Fee schedule 2027–28 — BS programs", false], ["Tuition fee per semester: Rs. 165,000", true], ["Admission fee (one time): Rs. 30,000", false]],
    checks: [["Academic year matches the source (2027–28)", true], ["Tuition rose more than 5% — please double-check", false]] },
  { id: "CR-1031", kind: "Admission dates", target: "Greenfield University · Fall 2027", tier: 1, who: "Hamza T.", when: "1 day ago", source: "Admissions notice, Fall 2027",
    diffs: [["Applications close", "—", "28 Jul 2027"], ["Entry test (NAT)", "—", "26 Jul 2027 · expected"]],
    lines: [["Admissions Fall 2027 — public notice", false], ["Last date for submission of forms: 28 July 2027", true], ["NAT result is required at the time of interview.", false]],
    checks: [["Test date marked “expected” until the test body confirms", true]] },
  { id: "CR-1027", kind: "Campus status", target: "Northstar · Kasur sub-campus", tier: 2, who: "Source monitor", when: "2 days ago", source: "HEC recognised campuses list",
    diffs: [["HEC campus status", "Approved", "Admissions closed from Fall 2024"]],
    lines: [["HEC — recognised campuses (page changed 18 Nov)", false], ["Kasur: Admissions banned w.e.f. Fall 2024", true]],
    checks: [["Change detected automatically on the official page", true]] },
] as const;

const CHECKLIST = ["Session and scope match the source document", "Every value matches the highlighted source text", "Automatic checks reviewed", "I did not submit this change"];

export function VerificationQueue() {
  const [sel, setSel] = useState<string>(ITEMS[0].id);
  const [tier, setTier] = useState<"all" | "1">("all");
  const [ticks, setTicks] = useState<Record<string, number[]>>({});
  const [approved, setApproved] = useState<string[]>([]);
  const cur = ITEMS.find((i) => i.id === sel)!;
  const mine = ticks[sel] ?? [];
  const ready = mine.length === CHECKLIST.length;
  const done = approved.includes(sel);
  const list = ITEMS.filter((i) => tier === "all" || i.tier === 1);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-500">Data verification · Fall 2027 session</p>
          <h1 className="text-[2rem] leading-tight font-extrabold tracking-[-0.03em]">Verification queue</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <Tag tone="outline"><Lock className="size-3.5" aria-hidden />Signed in with 2-step login</Tag>
          <span className="grid size-11 place-items-center rounded-full bg-target-bg font-display text-sm font-bold text-target" aria-label="Reviewer: Sana R.">SR</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {[[ShieldCheck, "Tier-1 verified", "92%", "Launch cohort · Fall 2027"], [ListChecks, "Waiting for review", String(12 - approved.length), "Oldest: 3 days"], [Clock, "Outdated records", "7", "Need re-checking"], [Flag, "Reports from users", "4", "Fix within 48 h"]].map(([Icon, k, v, n]) => {
          const I = Icon as typeof ShieldCheck;
          return (
            <div key={k as string} className="rounded-[20px] bg-white ring-1 ring-ink-200/70 p-5">
              <p className="flex items-center gap-2 text-xs text-ink-500"><I className="size-4" aria-hidden />{k as string}</p>
              <p className="tabular mt-2 font-display text-3xl font-extrabold tracking-tight">{v as string}</p>
              <p className="text-xs text-ink-500">{n as string}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-start gap-5">
        <section aria-label="Pending review" className="w-full overflow-hidden rounded-3xl bg-white ring-1 ring-ink-200/70 lg:w-[380px]">
          <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
            <h2 className="font-display font-bold">Pending review</h2>
            <Segmented size="sm" label="Tier" value={tier} onChange={setTier} options={[{ value: "all", label: "All" }, { value: "1", label: "Tier 1" }]} />
          </div>
          <ul>
            {list.map((i) => {
              const on = i.id === sel;
              const ok = approved.includes(i.id);
              return (
                <li key={i.id}>
                  <button type="button" onClick={() => setSel(i.id)} aria-current={on} className={cn("w-full space-y-1.5 border-b border-ink-100 px-5 py-4 text-left transition-colors", on ? "bg-brand-50 shadow-[inset_3px_0_0_var(--color-brand-600)]" : "hover:bg-ink-50")}>
                    <span className="flex items-center justify-between gap-2"><b className="text-sm">{i.kind}</b><Tag tone={i.tier === 1 ? "danger" : "gold"} className="h-[22px] text-[11.5px]">Tier {i.tier}</Tag></span>
                    <span className="block text-sm text-ink-600">{i.target}</span>
                    <span className="flex justify-between text-xs text-ink-500"><span>{i.who} · {i.when}</span>{ok ? <span className="font-bold text-safe">Approved</span> : <span>Pending</span>}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-label="Review" className="min-w-0 flex-[999_1_520px] space-y-6 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs text-ink-500">{cur.id} · submitted by {cur.who} · {cur.when}</p>
              <h2 className="text-[22px] leading-snug font-bold">{cur.kind} — {cur.target}</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 py-1.5 pr-3 pl-1.5 text-[13px] text-ink-600 hover:border-ink-300">
              <span className="grid size-6 place-items-center rounded-lg border border-ink-200 bg-white text-brand-700"><FileText className="size-3.5" aria-hidden /></span>
              <b className="font-semibold text-ink-900">{cur.source}</b><ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2.5">
              <p className="text-xs font-bold tracking-[0.08em] text-ink-500 uppercase">Proposed change</p>
              <ul className="overflow-hidden rounded-2xl border border-ink-200">
                {cur.diffs.map(([f, from, to]) => (
                  <li key={f} className="space-y-1.5 border-b border-ink-100 px-4 py-3 last:border-0">
                    <p className="text-xs text-ink-500">{f}</p>
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-md bg-danger-bg px-1.5 py-0.5 text-[#8f1d1d] line-through">{from}</span>
                      <ArrowRight className="size-3.5 text-ink-400" aria-hidden />
                      <span className="rounded-md bg-brand-50 px-1.5 py-0.5 font-bold text-brand-800">{to}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2.5">
              <p className="text-xs font-bold tracking-[0.08em] text-ink-500 uppercase">Source excerpt</p>
              <div className="space-y-2 rounded-2xl border border-ink-200 bg-[#fcfcfa] p-5 font-serif text-[13.5px] leading-relaxed text-ink-700 shadow-xs">
                {cur.lines.map(([t, hl]) => <p key={t as string}>{hl ? <mark className="rounded bg-[#fff1b8] px-1 text-ink-900">{t as string}</mark> : (t as string)}</p>)}
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-bold tracking-[0.08em] text-ink-500 uppercase">Automatic checks</p>
            {cur.checks.map(([t, ok]) => (
              <p key={t as string} className="flex items-center gap-2.5 text-sm">
                <span className={cn("grid size-6 place-items-center rounded-lg", ok ? "bg-brand-50 text-brand-700" : "bg-gold-100 text-gold-700")}>{ok ? <Check className="size-3.5" aria-hidden /> : <TriangleAlert className="size-3.5" aria-hidden />}</span>{t as string}
              </p>
            ))}
          </div>

          <fieldset className="space-y-2.5 rounded-2xl bg-ink-50 p-5">
            <legend className="sr-only">Reviewer checklist</legend>
            <p className="text-sm font-bold">Reviewer checklist</p>
            {CHECKLIST.map((label, i) => (
              <label key={label} className="flex cursor-pointer items-center gap-3 text-sm text-ink-700">
                <input type="checkbox" disabled={done} checked={mine.includes(i) || done} onChange={() => setTicks((t) => ({ ...t, [sel]: mine.includes(i) ? mine.filter((x) => x !== i) : [...mine, i] }))} className="size-[18px] accent-brand-600" />
                {label}
              </label>
            ))}
          </fieldset>

          {done ? (
            <p role="status" className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden /><span><b>Approved and published.</b> A new revision was saved, the audit log was updated and affected pages are refreshing.</span>
            </p>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-xs text-ink-500"><Info className="size-4" aria-hidden />Four-eyes rule: you can’t approve changes you submitted.</p>
              <div className="flex gap-2">
                <Button variant="danger">Reject with reason</Button>
                <Button disabled={!ready} onClick={() => setApproved((a) => [...a, sel])}><Check className="size-4" aria-hidden />Approve &amp; publish</Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
