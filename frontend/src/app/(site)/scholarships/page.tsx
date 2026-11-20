import { Info } from "lucide-react";
import type { Metadata } from "next";
import { ScholarshipDirectory } from "@/components/calendar/scholarship-directory";
import { scholarships } from "@/lib/data";

export const metadata: Metadata = {
  title: "Scholarships",
  description: "Need-based, merit and regional scholarships for undergraduate students in Pakistan — with eligibility, coverage and deadlines.",
};

export default function ScholarshipsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-brand-100 bg-brand-50">
        <div aria-hidden className="bg-grid-light absolute inset-0 -z-10 opacity-80" />
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-10 px-5 py-12 sm:px-7">
          <div className="min-w-0 flex-[999_1_520px] space-y-4">
            <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Scholarships & financial aid</p>
            <h1 className="text-[clamp(2rem,3.8vw,3.2rem)] leading-tight font-extrabold tracking-[-0.035em]">Money shouldn’t decide your future</h1>
            <p className="max-w-xl text-lg text-ink-600">Need-based, merit and regional scholarships for undergraduate students — with eligibility, coverage and deadlines checked against official notices.</p>
          </div>
          <div className="relative isolate w-full flex-[1_1_340px] overflow-hidden rounded-[28px] bg-ink-900 p-7 text-white shadow-lift">
            <div aria-hidden className="absolute -top-28 -right-24 -z-10 size-72 rounded-full bg-brand-500/30 blur-3xl" />
            <p className="flex items-center gap-2 font-bold text-brand-400"><Info className="size-5" aria-hidden />How need-based aid works</p>
            <ol className="mt-5 space-y-4">
              {["Get admission first — most need-based awards are given after you join.", "Collect income documents: salary slips, utility bills, guardian CNIC.", "Apply through your university’s financial aid office before its deadline."].map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink-200">
                  <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-white/10 font-display text-[13px] font-extrabold text-white">{i + 1}</span>{t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <ScholarshipDirectory items={scholarships} />
    </>
  );
}
