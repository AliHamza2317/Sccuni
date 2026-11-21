import { Pencil } from "lucide-react";
import type { Metadata } from "next";
import { BestFitResults, type FitCard } from "@/components/merit/best-fit-results";
import { PageHeader } from "@/components/site/page-header";
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
      <PageHeader
        corners={["tr", "bl"]}
        eyebrow="Best Fit Finder"
        title={`${cards.length} programs you’re eligible for`}
        description="Grouped by how your aggregate — under each university’s own formula — compares with verified past closing merits."
        actions={<ButtonLink href="/merit-calculator" variant="light"><Pencil className="size-4" aria-hidden />Edit marks & preferences</ButtonLink>}
      >
        <ul className="flex flex-wrap gap-2">
          {chips.map(([k, v]) => (
            <li key={k} className="inline-flex h-9 items-center gap-2 rounded-full bg-white/80 px-3.5 text-sm shadow-xs ring-1 ring-ink-200/80 backdrop-blur"><span className="text-ink-500">{k}</span><b className="font-semibold text-ink-900">{v}</b></li>
          ))}
        </ul>
      </PageHeader>
      <BestFitResults
        cards={cards}
        notEligible={notEligible.map((n) => ({ title: `${n.program.title} · ${n.university.shortName}`, why: n.reason }))}
        needsInfo={needsInfo.map((n) => ({ title: `${n.program.title} · ${n.university.shortName}`, why: n.reason }))}
      />
    </>
  );
}
