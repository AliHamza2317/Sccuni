import type { Metadata } from "next";
import { CompareGrid, type CompareItem } from "@/components/merit/compare-grid";
import { PageHeader } from "@/components/site/page-header";
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
      <PageHeader
        corners={["tl", "br"]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: "Compare" }]}
        eyebrow="Compare"
        title="Compare programs"
        description="Side by side, with your aggregate under each university’s own formula."
      />
      <CompareGrid items={items} />
    </>
  );
}
