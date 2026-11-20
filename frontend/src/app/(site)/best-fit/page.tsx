import { Pencil } from "lucide-react";
import type { Metadata } from "next";
import { BestFitResults, type FitCard } from "@/components/merit/best-fit-results";
import { ButtonLink } from "@/components/ui/button";
import { bestFit, sampleStudent } from "@/lib/data";
import { formatDate, formulaSummary, pkr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Best Fit Finder",
  description: "See every program you’re eligible for, grouped into Safe, Target and Reach using each university’s official formula and verified past merits.",
};

export default function BestFitPage() {
  const s = sampleStudent;
  const { results, notEligible, needsInfo } = bestFit(s);
  const cards: FitCard[] = results
    .filter((r) => r.group !== "below")
    .map((r) => ({
      slug: r.program.slug,
      title: r.program.title,
      where: `${r.university.shortName} · ${r.program.city} · ${r.program.shift}`,
      mono: r.university.mono,
      tone: r.university.tone,
      aggregate: r.aggregateText,
      formula: formulaSummary(r.formula.components),
      group: r.group,
      margins: r.margins.map((m) => ({ year: m.year, margin: m.margin })),
      feePerYear: pkr(r.program.feePerSemester * 2),
      deadline: formatDate(r.program.deadline),
      inBudget: r.program.feePerSemester * 2 <= s.budgetPerYear,
    }));
  const chips = [
    ["Matric", `${s.ssc.obtained.toLocaleString("en-US")} / ${s.ssc.total.toLocaleString("en-US")}`],
    ["FSc Part-I", `${s.hssc.obtained} / ${s.hssc.total}`],
    ["Test", `${s.testPercent}% · expected`],
    ["Group", "Pre-Engineering"],
    ["Fields", s.fields.join(", ")],
    ["Budget", `Up to PKR ${s.budgetPerYear / 1000}k / yr`],
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-900 text-white">
        <div aria-hidden className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden className="animate-aurora absolute -top-72 right-[-10%] -z-10 size-[640px] rounded-full bg-brand-500/30 blur-[110px]" />
        <div className="mx-auto max-w-[1240px] space-y-6 px-5 pt-12 pb-10 sm:px-7">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl space-y-3">
              <p className="text-[13px] font-bold tracking-[0.12em] text-brand-400 uppercase">Best Fit Finder</p>
              <h1 className="text-[clamp(2rem,3.8vw,3.2rem)] leading-tight font-extrabold tracking-[-0.035em]">{cards.length} programs you’re eligible for</h1>
              <p className="text-lg text-ink-300">Grouped by how your aggregate — under each university’s own formula — compares with verified past closing merits.</p>
            </div>
            <ButtonLink href="/merit-calculator" variant="ondark"><Pencil className="size-4" aria-hidden />Edit marks & preferences</ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-2">
            {chips.map(([k, v]) => (
              <li key={k} className="inline-flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 text-sm backdrop-blur"><span className="text-ink-400">{k}</span><b className="font-semibold">{v}</b></li>
            ))}
          </ul>
        </div>
      </section>
      <BestFitResults
        cards={cards}
        notEligible={notEligible.map((n) => ({ title: `${n.program.title} · ${n.university.shortName}`, why: n.reason }))}
        needsInfo={needsInfo.map((n) => ({ title: `${n.program.title} · ${n.university.shortName}`, why: n.reason }))}
      />
    </>
  );
}
