import { Target } from "lucide-react";
import type { Metadata } from "next";
import { MeritCalculator, type CalcProgram } from "@/components/merit/merit-calculator";
import { PageHeader } from "@/components/site/page-header";
import { ButtonLink } from "@/components/ui/button";
import { getFormula, getProgram, getUniversity } from "@/lib/data";

export const metadata: Metadata = {
  title: "Merit calculator",
  description: "Calculate your admission aggregate with each university’s official, verified merit formula — and see what test score you need.",
};

const SLUGS = ["northstar-bs-computer-science", "northstar-bs-electrical-engineering", "highland-bs-software-engineering", "greenfield-bs-artificial-intelligence"];

export default function MeritCalculatorPage() {
  const programs: CalcProgram[] = SLUGS.map((slug) => {
    const p = getProgram(slug)!;
    const u = getUniversity(p.universitySlug)!;
    return {
      slug,
      label: `${p.title} · ${u.shortName.split(" ")[0]}, ${p.city}`,
      short: `${p.title}, ${u.shortName.split(" ")[0]}`,
      formula: getFormula(p.formulaId),
      closings: p.history.map((h) => ({ year: h.year, value: h.open[2] })),
    };
  });

  return (
    <>
      <PageHeader
        corners={["tr", "bl"]}
        eyebrow="Merit calculator"
        title="Your aggregate, calculated the official way"
        description="Each university uses its own formula. Pick a program, enter your marks, and see every step — with the source."
        actions={<ButtonLink href="/best-fit" variant="light"><Target className="size-4" aria-hidden />Check all programs at once</ButtonLink>}
      />
      <MeritCalculator programs={programs} />
    </>
  );
}
