import { Info } from "lucide-react";
import type { Metadata } from "next";
import { ScholarshipDirectory } from "@/components/calendar/scholarship-directory";
import { PageHeader } from "@/components/site/page-header";
import { Eyebrow } from "@/components/ui/section-heading";
import { scholarships } from "@/lib/data";

export const metadata: Metadata = {
  title: "Scholarships",
  description: "Need-based, merit and regional scholarships for undergraduate students in Pakistan — with eligibility, coverage and deadlines.",
};

export default function ScholarshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Scholarships & financial aid"
        title="Money shouldn’t decide your future"
        description="Need-based, merit and regional scholarships for undergraduate students — with eligibility, coverage and deadlines checked against official notices."
        aside={
          <div className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 p-7 text-white shadow-lift">
            <div aria-hidden className="absolute -top-28 -right-24 -z-10 size-72 rounded-full bg-brand-500/30 blur-3xl" />
            <div aria-hidden className="bg-noise absolute inset-0 -z-10 opacity-[0.18] mix-blend-soft-light" />
            <Eyebrow dark><Info className="size-3.5" aria-hidden />How need-based aid works</Eyebrow>
            <ol className="mt-5 space-y-4">
              {["Get admission first — most need-based awards are given after you join.", "Collect income documents: salary slips, utility bills, guardian CNIC.", "Apply through your university’s financial aid office before its deadline."].map((t, i) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink-200">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.08] font-display text-[13px] font-bold text-white ring-1 ring-white/10">{i + 1}</span>{t}
                </li>
              ))}
            </ol>
          </div>
        }
      />
      <ScholarshipDirectory items={scholarships} />
    </>
  );
}
