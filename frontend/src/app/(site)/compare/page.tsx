import type { Metadata } from "next";
import Link from "next/link";
import { CompareGrid, type CompareItem } from "@/components/merit/compare-grid";
import { bestFit, firstYearCost } from "@/lib/data";
import { formatDate, formulaSummary } from "@/lib/format";

export const metadata: Metadata = {
  title: "Compare programs",
  description: "Compare programs side by side — fees, formulas, deadlines and your aggregate under each university’s own formula.",
};

const SLUGS = ["northstar-bs-computer-science", "highland-bs-software-engineering", "greenfield-bs-artificial-intelligence"];

export default function ComparePage() {
  const { results } = bestFit();
  const items: CompareItem[] = SLUGS.map((slug) => results.find((r) => r.program.slug === slug)!).map((r) => ({
    slug: r.program.slug,
    title: r.program.title,
    uni: `${r.university.shortName} · ${r.program.city}`,
    mono: r.university.mono,
    tone: r.university.tone,
    group: r.group,
    city: `${r.program.city}, ${r.program.province}`,
    sector: r.university.sector,
    shift: r.program.shift,
    duration: `${r.program.durationYears} years`,
    campus: "HEC-approved",
    fee: r.program.feePerSemester,
    firstYear: firstYearCost(r.program),
    test: r.program.test,
    formula: formulaSummary(r.formula.components),
    deadline: formatDate(r.program.deadline),
    deadlineSort: r.program.deadline,
    aggregate: r.aggregate,
    closing: r.program.history[0]?.open[2] ?? null,
  }));

  return (
    <>
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-[1240px] space-y-3 px-5 pt-9 pb-8 sm:px-7">
          <nav aria-label="Breadcrumb" className="flex gap-2 text-[13px] text-ink-500">
            <Link href="/" className="hover:text-ink-900">Home</Link><span>/</span><Link href="/programs" className="hover:text-ink-900">Programs</Link><span>/</span><span className="font-semibold text-ink-900">Compare</span>
          </nav>
          <h1 className="text-[clamp(2rem,3.6vw,3rem)] leading-tight font-extrabold tracking-[-0.035em]">Compare programs</h1>
          <p className="text-ink-500">Side by side, with your aggregate under each university’s own formula.</p>
        </div>
      </section>
      <CompareGrid items={items} />
    </>
  );
}
