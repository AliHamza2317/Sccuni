import { Target } from "lucide-react";
import type { Metadata } from "next";
import { MeritCalculator, type CalcProgram } from "@/components/merit/merit-calculator";
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
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-6 px-5 pt-10 pb-8 sm:px-7">
          <div className="max-w-2xl space-y-3">
            <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Merit calculator</p>
            <h1 className="text-[clamp(2rem,3.6vw,3rem)] leading-tight font-extrabold tracking-[-0.035em]">Your aggregate, calculated the official way</h1>
            <p className="text-lg text-ink-500">Each university uses its own formula. Pick a program, enter your marks, and see every step — with the source.</p>
          </div>
          <ButtonLink href="/best-fit" variant="light"><Target className="size-4" aria-hidden />Check all programs at once</ButtonLink>
        </div>
      </section>
      <MeritCalculator programs={programs} />
    </>
  );
}
