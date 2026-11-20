// Domain types for the Sccuni web app.
// They mirror docs/DATABASE_DESIGN.md in a simplified, read-only form.

export type Sector = "Public" | "Private";
export type Shift = "Morning" | "Evening";
export type FieldId = "computing" | "engineering" | "medicine" | "business" | "sciences";
export type Tone = "brand" | "blue" | "gold" | "rose" | "sky" | "ink";
export type AdmissionStatus = "open" | "upcoming" | "closed";
export type Group = "safe" | "target" | "reach" | "below" | "none";

export interface Source {
  title: string;
  locator?: string;
}

export interface Campus {
  name: string;
  address: string;
  status: "approved" | "approved-until" | "admissions-closed";
  note: string;
}

export interface University {
  slug: string;
  name: string;
  shortName: string;
  mono: string;
  tone: Tone;
  city: string;
  province: string;
  sector: Sector;
  charteredBy: string;
  womenOnly?: boolean;
  about: string;
  tags: string[];
  campuses: Campus[];
  programsOnSccuni: number;
  tuitionFrom: number;
  testName: string;
  formulaId: string;
  lastVerified: string;
}

export interface FormulaComponent {
  key: "ssc" | "hssc" | "test";
  label: string;
  weight: number; // percent of the aggregate
}

export interface Formula {
  id: string;
  version: string;
  session: string;
  source: Source;
  testName: string;
  testTotal: number;
  components: FormulaComponent[];
  /** Calculation base: 100 for percentage formulas, or a marks base such as 1200. */
  base: number;
  /** Optional rounding of each component's points before they are added up. */
  componentDecimals?: number;
  finalDecimals: number;
  rules: string[];
}

export interface MeritYear {
  year: number;
  /** Closing aggregates for merit lists 1, 2 and the final list. */
  open: [number, number, number];
  self: [number, number, number];
}

export interface EligibilityRule {
  title: string;
  note: string;
  conditional?: boolean;
}

export interface Program {
  slug: string;
  title: string;
  universitySlug: string;
  campus: string;
  city: string;
  province: string;
  shift: Shift;
  field: FieldId;
  durationYears: number;
  creditHours: number;
  seats?: number;
  feePerSemester: number;
  test: string;
  deadline: string; // ISO date
  status: AdmissionStatus;
  opensOn?: string;
  formulaId: string;
  history: MeritYear[];
  highlights: string[];
  eligibility: EligibilityRule[];
  requiresGroup?: "pre-engineering" | "pre-medical";
  womenOnly?: boolean;
}

export interface AdmissionEvent {
  id: string;
  date: string; // ISO date
  type: "application" | "test" | "merit" | "scholarship";
  label: string;
  title: string;
  where: string;
  href: string;
  tentative?: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  kinds: ("need" | "merit" | "regional" | "women")[];
  coverage: string;
  rules: string[];
  open: boolean;
  status: string;
  icon: "government" | "need" | "award";
}

export interface StudentProfile {
  name: string;
  initials: string;
  group: "pre-engineering" | "pre-medical";
  ssc: { obtained: number; total: number };
  hssc: { obtained: number; total: number; part: "part1" | "full" };
  testPercent: number;
  testExpected: boolean;
  fields: string[];
  budgetPerYear: number;
  gender?: "female" | "male";
}
