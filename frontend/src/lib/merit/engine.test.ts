import { describe, expect, it } from "vitest";
import { calculateAggregate, classify, requiredTestMarks } from "./engine";
import type { Formula } from "@/lib/types";

// Official worked example: UHS MBBS/BDS Prospectus, Session 2025-26, Annexure-IV.
// Components are computed on a 1200-mark base, each rounded to 2 decimals, and the
// final percentage is rounded to 4 decimals.
const uhs: Formula = {
  id: "uhs-2025-26-example",
  version: "golden",
  session: "2025-26",
  source: { title: "UHS MBBS/BDS Prospectus 2025-26", locator: "Annexure-IV" },
  testName: "MDCAT",
  testTotal: 200,
  components: [
    { key: "ssc", label: "Matric", weight: 10 },
    { key: "hssc", label: "FSc", weight: 40 },
    { key: "test", label: "MDCAT", weight: 50 },
  ],
  base: 1200,
  componentDecimals: 2,
  finalDecimals: 4,
  rules: [],
};

const percentFormula: Formula = {
  ...uhs,
  id: "sample-10-40-50",
  base: 100,
  componentDecimals: undefined,
  finalDecimals: 4,
};

describe("calculateAggregate — official golden examples", () => {
  it("reproduces UHS Example 1 exactly (93.6033)", () => {
    const r = calculateAggregate(uhs, {
      ssc: { obtained: 1038, total: 1100 },
      hssc: { obtained: 1100, total: 1200 },
      test: { obtained: 190, total: 200 },
    });
    expect(r.ok && r.aggregate).toBe("93.6033");
  });

  it("gives 93.6030 when component rounding is switched off — rounding config is honoured", () => {
    const r = calculateAggregate({ ...uhs, componentDecimals: undefined }, {
      ssc: { obtained: 1038, total: 1100 },
      hssc: { obtained: 1100, total: 1200 },
      test: { obtained: 190, total: 200 },
    });
    expect(r.ok && r.aggregate).toBe("93.6030");
  });

  it("reproduces UHS Example 2 with a 180-mark MDCAT (93.8808)", () => {
    const r = calculateAggregate(uhs, {
      ssc: { obtained: 1038, total: 1100 },
      hssc: { obtained: 1100, total: 1200 },
      test: { obtained: 172, total: 180 },
    });
    expect(r.ok && r.aggregate).toBe("93.8808");
  });
});

describe("calculateAggregate — behaviour", () => {
  const good = { ssc: { obtained: 1080, total: 1200 }, hssc: { obtained: 500, total: 550 }, test: { obtained: 166, total: 200 } };

  it("computes a percentage formula and its breakdown", () => {
    const r = calculateAggregate(percentFormula, good);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.aggregate).toBe("86.8636");
    expect(r.components.map((c) => c.points)).toEqual(["9.0000", "36.3636", "41.5000"]);
  });

  it("rejects obtained marks above the total", () => {
    const r = calculateAggregate(percentFormula, { ...good, test: { obtained: 201, total: 200 } });
    expect(r.ok).toBe(false);
  });

  it("rejects empty (NaN) inputs instead of returning NaN", () => {
    const r = calculateAggregate(percentFormula, { ...good, hssc: { obtained: NaN, total: 550 } });
    expect(r).toEqual({ ok: false, error: "Enter your marks for FSc." });
  });

  it("rejects a zero total and missing components", () => {
    expect(calculateAggregate(percentFormula, { ...good, ssc: { obtained: 0, total: 0 } }).ok).toBe(false);
    expect(calculateAggregate(percentFormula, { ssc: good.ssc, hssc: good.hssc }).ok).toBe(false);
  });

  it("is monotonic: more test marks never lower the aggregate", () => {
    let last = -1;
    for (let t = 0; t <= 200; t += 5) {
      const r = calculateAggregate(percentFormula, { ...good, test: { obtained: t, total: 200 } });
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      const v = Number(r.aggregate);
      expect(v).toBeGreaterThanOrEqual(last);
      last = v;
    }
  });
});

describe("requiredTestMarks", () => {
  const inputs = { ssc: { obtained: 1080, total: 1200 }, hssc: { obtained: 500, total: 550 } };

  it("finds the marks needed, and plugging them back in reaches the target", () => {
    const need = requiredTestMarks(percentFormula, inputs, 87.41);
    expect(need).toEqual({ kind: "marks", marks: 169 });
    const r = calculateAggregate(percentFormula, { ...inputs, test: { obtained: 169, total: 200 } });
    expect(r.ok && Number(r.aggregate)).toBeGreaterThanOrEqual(87.41);
  });

  it("reports impossible and trivially reachable targets", () => {
    expect(requiredTestMarks(percentFormula, inputs, 99.9)).toEqual({ kind: "impossible" });
    expect(requiredTestMarks(percentFormula, inputs, 40)).toEqual({ kind: "any" });
  });
});

describe("classify", () => {
  it("applies the placeholder policy at its boundaries", () => {
    expect(classify(86.86, [84.86, 83, 82])).toBe("safe"); // exactly +2.00 in the tightest year
    expect(classify(86.86, [87.41, 86.02, 84.9])).toBe("target");
    expect(classify(86.86, [88.36, 88, 87])).toBe("target"); // exactly −1.50
    expect(classify(86.86, [89.3, 88.4, 87.05])).toBe("reach");
    expect(classify(80, [90, 89, 88])).toBe("below");
    expect(classify(80, [])).toBe("none");
  });
});
