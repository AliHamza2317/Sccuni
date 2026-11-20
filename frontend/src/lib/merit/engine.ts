import Decimal from "decimal.js";
import type { Formula, Group } from "@/lib/types";

/**
 * Sccuni merit engine (frontend edition).
 *
 * Formulas are data, never code: weights, calculation base and rounding come from
 * the formula definition. Exact decimal arithmetic is used because official
 * results are published to 4–5 decimal places and some formulas round each
 * component before adding (e.g. UHS 2025-26, Annexure-IV).
 *
 * This module will move to packages/merit-engine when the backend starts.
 */

export const ENGINE_VERSION = "0.1.0";

export interface MarksInput {
  obtained: number;
  total: number;
}

export type ComponentInputs = Partial<Record<"ssc" | "hssc" | "test", MarksInput>>;

export interface ComponentResult {
  key: string;
  label: string;
  weight: number;
  obtained: number;
  total: number;
  percent: string;
  points: string;
}

export type AggregateResult =
  | { ok: true; aggregate: string; components: ComponentResult[] }
  | { ok: false; error: string };

export function calculateAggregate(formula: Formula, inputs: ComponentInputs): AggregateResult {
  const base = new Decimal(formula.base);
  let sum = new Decimal(0);
  const components: ComponentResult[] = [];

  for (const c of formula.components) {
    const m = inputs[c.key];
    if (!m || !Number.isFinite(m.obtained) || !Number.isFinite(m.total)) return { ok: false, error: `Enter your marks for ${c.label}.` };
    if (!(m.total > 0)) return { ok: false, error: `Total marks for ${c.label} must be more than zero.` };
    if (m.obtained < 0) return { ok: false, error: `Marks for ${c.label} can’t be negative.` };
    if (m.obtained > m.total) return { ok: false, error: `Obtained marks for ${c.label} can’t be more than total marks.` };

    const ratio = new Decimal(m.obtained).div(m.total);
    let points = ratio.mul(base).mul(c.weight).div(100);
    if (formula.componentDecimals !== undefined) {
      points = points.toDecimalPlaces(formula.componentDecimals, Decimal.ROUND_HALF_UP);
    }
    sum = sum.plus(points);
    components.push({
      key: c.key,
      label: c.label,
      weight: c.weight,
      obtained: m.obtained,
      total: m.total,
      percent: ratio.mul(100).toFixed(2),
      // Points are shown as a contribution to a 100-point aggregate.
      points: points.div(base).mul(100).toFixed(4),
    });
  }

  const aggregate = sum.div(base).mul(100).toDecimalPlaces(formula.finalDecimals, Decimal.ROUND_HALF_UP);
  return { ok: true, aggregate: aggregate.toFixed(formula.finalDecimals), components };
}

/**
 * Entry-test marks needed to reach a target aggregate, keeping the other components fixed.
 * Returns null when the formula has no entry-test component.
 */
export function requiredTestMarks(
  formula: Formula,
  inputs: ComponentInputs,
  target: number,
): { kind: "any" | "impossible" | "marks"; marks?: number } | null {
  const test = formula.components.find((c) => c.key === "test");
  if (!test) return null;
  let others = new Decimal(0);
  for (const c of formula.components) {
    if (c.key === "test") continue;
    const m = inputs[c.key];
    if (!m || !(m.total > 0)) return null;
    others = others.plus(new Decimal(m.obtained).div(m.total).mul(c.weight));
  }
  const needed = new Decimal(target).minus(others).div(test.weight).mul(formula.testTotal);
  if (needed.lte(0)) return { kind: "any" };
  if (needed.gt(formula.testTotal)) return { kind: "impossible" };
  return { kind: "marks", marks: needed.ceil().toNumber() };
}

export interface Policy {
  safeMinMargin: number; // every comparable year at least this far above
  targetLatestMargin: number; // latest year margin at least this
  reachLatestMargin: number; // latest year margin at least this
}

/** Placeholder thresholds — to be approved by the founder (REQUIREMENTS FIT-03). */
export const DEFAULT_POLICY: Policy = { safeMinMargin: 2, targetLatestMargin: -1.5, reachLatestMargin: -4 };

/** Classify against past closing aggregates, latest year first. */
export function classify(aggregate: number, closings: number[], policy: Policy = DEFAULT_POLICY): Group {
  if (closings.length === 0) return "none";
  // Decimal margins: 86.86 − 84.86 must be exactly 2, not 1.9999999999999858.
  const margins = closings.map((c) => new Decimal(aggregate).minus(c));
  const latest = margins[0];
  if (Decimal.min(...margins).gte(policy.safeMinMargin)) return "safe";
  if (latest.gte(policy.targetLatestMargin)) return "target";
  if (latest.gte(policy.reachLatestMargin)) return "reach";
  return "below";
}
