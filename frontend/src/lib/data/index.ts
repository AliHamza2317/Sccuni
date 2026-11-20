// Data access layer. Today it reads SAMPLE data in memory; in Phase 6+ these
// functions will call the Sccuni API, so pages and components won't need to change.

import { calculateAggregate, classify } from "@/lib/merit/engine";
import type { Formula, Group, Program, StudentProfile, University } from "@/lib/types";
import { formulas, programs, universities } from "./catalog";
import { sampleStudent } from "./calendar";

export { events, scholarships, sampleStudent, DEMO_TODAY } from "./calendar";

export function getUniversities(): University[] {
  return universities;
}
export function getUniversity(slug: string): University | undefined {
  return universities.find((u) => u.slug === slug);
}
export function getPrograms(): Program[] {
  return programs;
}
export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
export function getProgramsByUniversity(slug: string): Program[] {
  return programs.filter((p) => p.universitySlug === slug);
}
export function getFormula(id: string): Formula {
  const f = formulas.find((x) => x.id === id);
  if (!f) throw new Error(`Unknown formula ${id}`);
  return f;
}
export function getFormulas(): Formula[] {
  return formulas;
}

/** Latest final-list closing aggregate (open merit), if any. */
export function latestClosing(p: Program): number | undefined {
  return p.history[0]?.open[2];
}

export interface FeeItem {
  item: string;
  when: string;
  amount: number;
  refundable?: boolean;
}
export function feeItems(p: Program): FeeItem[] {
  return [
    { item: "Admission fee", when: "One time", amount: 25000 },
    { item: "Tuition fee", when: "Per semester", amount: p.feePerSemester },
    { item: "Registration & examination", when: "Per semester", amount: 8000 },
    { item: "Library & laboratory", when: "Per semester", amount: 4500 },
    { item: "Security deposit", when: "One time", amount: 10000, refundable: true },
  ];
}
export function firstYearCost(p: Program): number {
  return 25000 + 2 * (p.feePerSemester + 8000 + 4500) + 10000;
}

export type Eligibility = { status: "eligible" } | { status: "not-eligible" | "needs-info"; reason: string };

export function checkEligibility(p: Program, s: StudentProfile): Eligibility {
  if (p.requiresGroup && p.requiresGroup !== s.group) {
    return { status: "not-eligible", reason: p.requiresGroup === "pre-medical" ? "Requires FSc Pre-Medical. Your group is Pre-Engineering." : "Requires FSc Pre-Engineering or ICS with Mathematics." };
  }
  if (p.womenOnly && !s.gender) {
    return { status: "needs-info", reason: "Women-only university. Add your gender in your profile so we can check." };
  }
  if (p.womenOnly && s.gender !== "female") {
    return { status: "not-eligible", reason: "Women-only university." };
  }
  if (s.ssc.obtained / s.ssc.total < 0.6 || s.hssc.obtained / s.hssc.total < 0.6) {
    return { status: "not-eligible", reason: "Requires at least 60% in Matric and FSc." };
  }
  return { status: "eligible" };
}

export interface FitResult {
  program: Program;
  university: University;
  formula: Formula;
  aggregate: number;
  aggregateText: string;
  group: Group;
  margins: { year: number; closing: number; margin: number }[];
}

export function studentAggregate(formula: Formula, s: StudentProfile): { value: number; text: string } {
  const test = Math.round((s.testPercent / 100) * formula.testTotal);
  const r = calculateAggregate(formula, {
    ssc: s.ssc,
    hssc: { obtained: s.hssc.obtained, total: s.hssc.total },
    test: { obtained: test, total: formula.testTotal },
  });
  if (!r.ok) throw new Error(r.error);
  return { value: Number(r.aggregate), text: r.aggregate };
}

export function bestFit(s: StudentProfile = sampleStudent) {
  const results: FitResult[] = [];
  const notEligible: { program: Program; university: University; reason: string }[] = [];
  const needsInfo: { program: Program; university: University; reason: string }[] = [];

  for (const p of programs) {
    const u = getUniversity(p.universitySlug)!;
    const e = checkEligibility(p, s);
    if (e.status === "not-eligible") { notEligible.push({ program: p, university: u, reason: e.reason }); continue; }
    if (e.status === "needs-info") { needsInfo.push({ program: p, university: u, reason: e.reason }); continue; }
    const formula = getFormula(p.formulaId);
    const agg = studentAggregate(formula, s);
    const closings = p.history.map((h) => h.open[2]);
    results.push({
      program: p, university: u, formula,
      aggregate: agg.value, aggregateText: agg.text,
      group: classify(agg.value, closings),
      margins: p.history.map((h) => ({ year: h.year, closing: h.open[2], margin: agg.value - h.open[2] })),
    });
  }
  return { results, notEligible, needsInfo };
}
