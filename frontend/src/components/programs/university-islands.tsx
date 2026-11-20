"use client";

import { ChevronRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/controls";
import { pkr } from "@/lib/format";
import type { FieldId } from "@/lib/types";

export interface UniProgramRow {
  slug: string;
  title: string;
  field: FieldId;
  campus: string;
  fee: number;
  closing?: number;
}

const LABELS: Partial<Record<FieldId, string>> = { computing: "Computing", engineering: "Engineering", medicine: "Medicine", sciences: "Sciences", business: "Business" };

export function UniversityPrograms({ rows, total }: { rows: UniProgramRow[]; total: number }) {
  const fields = Array.from(new Set(rows.map((r) => r.field)));
  const [field, setField] = useState<FieldId | "all">("all");
  const list = rows.filter((r) => field === "all" || r.field === field);

  return (
    <div className="space-y-4">
      {fields.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <Chip active={field === "all"} onClick={() => setField("all")}>All</Chip>
          {fields.map((f) => <Chip key={f} active={field === f} onClick={() => setField(f)}>{LABELS[f] ?? f}</Chip>)}
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl border border-ink-200">
        <table className="w-full min-w-[560px] text-[14.5px]">
          <caption className="sr-only">Programs offered</caption>
          <thead>
            <tr className="bg-ink-50 text-left text-xs font-bold tracking-[0.06em] text-ink-500 uppercase">
              <th scope="col" className="px-4 py-3">Program</th>
              <th scope="col" className="px-4 py-3">Campus · shift</th>
              <th scope="col" className="px-4 py-3 text-right">Tuition / sem</th>
              <th scope="col" className="px-4 py-3 text-right">Last closing</th>
              <th scope="col" className="w-10 px-2 py-3"><span className="sr-only">Open</span></th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.slug} className="group border-t border-ink-100 transition-colors hover:bg-ink-50/70">
                <th scope="row" className="px-4 py-3.5 text-left font-bold"><Link href={`/programs/${r.slug}`} className="hover:text-brand-700">{r.title}</Link></th>
                <td className="px-4 py-3.5 text-ink-500">{r.campus}</td>
                <td className="tabular px-4 py-3.5 text-right">{pkr(r.fee)}</td>
                <td className="tabular px-4 py-3.5 text-right font-bold">{r.closing ? `${r.closing.toFixed(2)}%` : "New"}</td>
                <td className="px-2 py-3.5"><ChevronRight className="size-4 text-ink-300 group-hover:text-ink-600" aria-hidden /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-ink-500">Last closing = final-list aggregate, open merit, 2025. Showing {list.length} of {total} programs on Sccuni.</p>
    </div>
  );
}

export function InquiryForm({ universityName }: { universityName: string }) {
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p role="status" className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800">
        <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />Sent. We’ll email you when the university replies.
      </p>
    );
  }
  return (
    <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); if (consent) setSent(true); }}>
      {[["q-name", "Your name", "text", "Full name"], ["q-email", "Email", "email", "you@example.com"]].map(([id, label, type, ph]) => (
        <div key={id} className="space-y-1.5">
          <label htmlFor={id} className="text-sm font-semibold">{label}</label>
          <input id={id} type={type} required placeholder={ph} className="h-11 w-full rounded-xl border border-ink-300 px-3.5 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15" />
        </div>
      ))}
      <div className="space-y-1.5">
        <label htmlFor="q-msg" className="text-sm font-semibold">Question</label>
        <textarea id="q-msg" required rows={3} placeholder="e.g. Is hostel available for first-year students?" className="w-full rounded-xl border border-ink-300 px-3.5 py-2.5 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-[18px] accent-brand-600" />
        I agree to share my name and email with {universityName}.
      </label>
      <Button type="submit" className="w-full" disabled={!consent}>Send question</Button>
    </form>
  );
}
