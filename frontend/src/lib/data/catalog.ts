// ⚠️ SAMPLE DATA — fictional institutions and numbers for the design prototype.
// Real data will come from the verified API (docs/DATA_COLLECTION_STRATEGY.md).

import type { EligibilityRule, Formula, MeritYear, Program, University } from "@/lib/types";

export const formulas: Formula[] = [
  {
    id: "northstar-2027", version: "2027.1", session: "Fall 2027",
    source: { title: "Northstar Prospectus, Fall 2027", locator: "p. 41" },
    testName: "Northstar Entry Test", testTotal: 200,
    components: [
      { key: "ssc", label: "Matric (SSC)", weight: 10 },
      { key: "hssc", label: "FSc / HSSC", weight: 40 },
      { key: "test", label: "Northstar Entry Test", weight: 50 },
    ],
    base: 100, finalDecimals: 4,
    rules: [
      "FSc: full result if available, otherwise Part-I marks (provisional admission).",
      "Entry test: the best of up to two attempts in this admission cycle.",
      "No bonus or deduction marks apply to this formula.",
      "The final aggregate is rounded to 4 decimal places.",
    ],
  },
  {
    id: "highland-2027", version: "2027.2", session: "Fall 2027",
    source: { title: "Highland Admissions Guide 2027", locator: "p. 12" },
    testName: "Highland admission test", testTotal: 100,
    components: [
      { key: "ssc", label: "Matric (SSC)", weight: 17 },
      { key: "hssc", label: "FSc / HSSC", weight: 50 },
      { key: "test", label: "Highland admission test", weight: 33 },
    ],
    base: 100, finalDecimals: 4,
    rules: [
      "FSc counts for half of the aggregate.",
      "NTS NAT or SAT may replace the Highland test.",
      "Part-I marks accepted until the final result.",
      "The final aggregate is rounded to 4 decimal places.",
    ],
  },
  {
    id: "greenfield-2027", version: "2027.1", session: "Fall 2027",
    source: { title: "Greenfield Prospectus 2027", locator: "p. 9" },
    testName: "NTS NAT", testTotal: 100,
    components: [
      { key: "hssc", label: "FSc / HSSC", weight: 70 },
      { key: "test", label: "NTS NAT", weight: 30 },
    ],
    base: 100, finalDecimals: 4,
    rules: [
      "Matric is used for eligibility only, not for merit.",
      "NAT score must be from the current admission cycle.",
      "Part-I marks accepted until the final result.",
      "The final aggregate is rounded to 4 decimal places.",
    ],
  },
  {
    id: "bluewater-2027", version: "2027.1", session: "Fall 2027",
    source: { title: "Bluewater Admissions Handbook 2027", locator: "p. 6" },
    testName: "Bluewater test", testTotal: 100,
    components: [
      { key: "ssc", label: "Matric (SSC)", weight: 10 },
      { key: "hssc", label: "FSc / HSSC", weight: 40 },
      { key: "test", label: "Bluewater test", weight: 50 },
    ],
    base: 100, finalDecimals: 4,
    rules: ["SAT accepted in place of the Bluewater test.", "The final aggregate is rounded to 4 decimal places."],
  },
  {
    id: "skyline-2027", version: "2027.1", session: "Fall 2027",
    source: { title: "Skyline Prospectus 2027", locator: "p. 14" },
    testName: "Skyline test", testTotal: 100,
    components: [
      { key: "ssc", label: "Matric (SSC)", weight: 20 },
      { key: "hssc", label: "FSc / HSSC", weight: 50 },
      { key: "test", label: "Skyline test", weight: 30 },
    ],
    base: 100, finalDecimals: 4,
    rules: ["Women-only university.", "The final aggregate is rounded to 4 decimal places."],
  },
  {
    id: "crescent-2027", version: "2027.1", session: "Fall 2027",
    source: { title: "Central medical admissions prospectus 2027", locator: "p. 22" },
    testName: "MDCAT", testTotal: 200,
    components: [
      { key: "ssc", label: "Matric (SSC)", weight: 10 },
      { key: "hssc", label: "FSc Pre-Medical", weight: 40 },
      { key: "test", label: "MDCAT", weight: 50 },
    ],
    base: 100, finalDecimals: 4,
    rules: ["Admission through the provincial central admission process.", "Provincial domicile required for public seats."],
  },
];

export const universities: University[] = [
  {
    slug: "northstar-university", name: "Northstar University of Engineering & Technology", shortName: "Northstar University",
    mono: "NU", tone: "brand", city: "Lahore", province: "Punjab", sector: "Public", charteredBy: "Government of Punjab",
    about: "A public-sector university in Lahore offering undergraduate programs in engineering, computing and applied sciences across three campuses. Admission to most programs is through the Northstar Entry Test, with merit calculated from Matric, FSc and test scores.",
    tags: ["Engineering", "Computing", "Applied sciences", "Morning & evening shifts", "Hostel available"],
    campuses: [
      { name: "Main campus", address: "Canal Road, Lahore", status: "approved", note: "HEC-approved" },
      { name: "City campus", address: "Mall Road, Lahore", status: "approved-until", note: "HEC-approved · valid to Jun 2028" },
      { name: "Kasur sub-campus", address: "Kasur", status: "admissions-closed", note: "Admissions closed from Fall 2024" },
    ],
    programsOnSccuni: 18, tuitionFrom: 64000, testName: "Northstar Entry Test", formulaId: "northstar-2027", lastVerified: "12 Nov 2026",
  },
  {
    slug: "highland-institute", name: "Highland Institute of Computing", shortName: "Highland Institute",
    mono: "HI", tone: "blue", city: "Islamabad", province: "Islamabad (ICT)", sector: "Private", charteredBy: "Federal Government",
    about: "A private institute in Islamabad focused on computing degrees, with industry projects in every year of study.",
    tags: ["Computing", "Industry projects", "Morning shift"],
    campuses: [{ name: "Islamabad campus", address: "Sector H-9, Islamabad", status: "approved", note: "HEC-approved" }],
    programsOnSccuni: 6, tuitionFrom: 165000, testName: "Highland admission test", formulaId: "highland-2027", lastVerified: "10 Nov 2026",
  },
  {
    slug: "greenfield-university", name: "Greenfield University", shortName: "Greenfield University",
    mono: "GU", tone: "gold", city: "Peshawar", province: "Khyber Pakhtunkhwa", sector: "Public", charteredBy: "Government of Khyber Pakhtunkhwa",
    about: "A public university in Peshawar with growing programs in artificial intelligence, software and robotics.",
    tags: ["Computing", "Engineering", "Evening programs"],
    campuses: [{ name: "Main campus", address: "University Road, Peshawar", status: "approved", note: "HEC-approved" }],
    programsOnSccuni: 9, tuitionFrom: 64000, testName: "NTS NAT", formulaId: "greenfield-2027", lastVerified: "9 Nov 2026",
  },
  {
    slug: "bluewater-university", name: "Bluewater University", shortName: "Bluewater University",
    mono: "BW", tone: "sky", city: "Karachi", province: "Sindh", sector: "Private", charteredBy: "Government of Sindh",
    about: "A private university in Karachi known for data science and business analytics programs.",
    tags: ["Data science", "Business"],
    campuses: [{ name: "Clifton campus", address: "Clifton, Karachi", status: "approved", note: "HEC-approved" }],
    programsOnSccuni: 7, tuitionFrom: 198000, testName: "Bluewater test", formulaId: "bluewater-2027", lastVerified: "8 Nov 2026",
  },
  {
    slug: "skyline-university", name: "Skyline University for Women", shortName: "Skyline University",
    mono: "SW", tone: "rose", city: "Rawalpindi", province: "Punjab", sector: "Public", charteredBy: "Government of Punjab", womenOnly: true,
    about: "A public women-only university in Rawalpindi offering computing, sciences and social sciences.",
    tags: ["Women-only", "Computing", "Sciences"],
    campuses: [{ name: "Main campus", address: "Satellite Town, Rawalpindi", status: "approved", note: "HEC-approved" }],
    programsOnSccuni: 11, tuitionFrom: 58000, testName: "Skyline test", formulaId: "skyline-2027", lastVerified: "11 Nov 2026",
  },
  {
    slug: "crescent-medical-college", name: "Crescent Medical College", shortName: "Crescent Medical College",
    mono: "CM", tone: "ink", city: "Faisalabad", province: "Punjab", sector: "Public", charteredBy: "Government of Punjab",
    about: "A public medical college in Faisalabad. MBBS seats are filled through the provincial central admission process.",
    tags: ["Medicine", "Central admissions"],
    campuses: [{ name: "College campus", address: "Jail Road, Faisalabad", status: "approved", note: "Recognised by the medical council" }],
    programsOnSccuni: 2, tuitionFrom: 30000, testName: "MDCAT", formulaId: "crescent-2027", lastVerified: "12 Nov 2026",
  },
];

/** Builds three years of merit lists from final-list closing aggregates (sample helper). */
function history(finals: [number, number, number], selfGap = 6.35): MeritYear[] {
  const r = (n: number) => Math.round(n * 100) / 100;
  return finals.map((f, i) => ({
    year: 2025 - i,
    open: [r(f + 1.51), r(f + 0.69), f],
    self: [r(f - selfGap + 1.25), r(f - selfGap + 0.6), r(f - selfGap)],
  }));
}

const computing: EligibilityRule[] = [
  { title: "HSSC Pre-Engineering or ICS with Mathematics", note: "A-Level (Maths, Physics) and DAE holders apply through their own route." },
  { title: "At least 60% in HSSC", note: "Part-I marks are accepted for provisional admission until the final result." },
  { title: "At least 60% in Matric (SSC)", note: "Checked before any bonus or deduction." },
  { title: "Entry test: minimum 33%", note: "Candidates below the pass mark are not placed on the merit list." },
  { title: "Pre-Medical students: conditional", note: "Eligible only after a short Mathematics deficiency course.", conditional: true },
];
const engineering: EligibilityRule[] = [
  { title: "HSSC Pre-Engineering (Physics, Chemistry, Mathematics)", note: "DAE holders compete on reserved DAE seats." },
  { title: "At least 60% in HSSC", note: "Required by the engineering accreditation council." },
  { title: "At least 60% in Matric (SSC)", note: "Checked before any bonus or deduction." },
  { title: "Entry test: minimum 33%", note: "Candidates below the pass mark are not placed on the merit list." },
];
const medicine: EligibilityRule[] = [
  { title: "FSc Pre-Medical (Biology, Chemistry, Physics)", note: "Pre-Engineering students are not eligible." },
  { title: "At least 60% in HSSC", note: "As set by the medical council." },
  { title: "MDCAT pass mark", note: "Only candidates who pass MDCAT are placed on the merit list." },
  { title: "Provincial domicile for public seats", note: "Other provinces apply on reciprocal or reserved seats." },
];

type P = Omit<Program, "eligibility" | "highlights"> & { highlights?: string[] };
const base = (p: P, rules: EligibilityRule[]): Program => ({ highlights: [], ...p, eligibility: rules });

export const programs: Program[] = [
  base({ slug: "northstar-bs-computer-science", title: "BS Computer Science", universitySlug: "northstar-university", campus: "Main campus", city: "Lahore", province: "Punjab", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 60, feePerSemester: 72500, test: "Northstar Entry Test", deadline: "2027-07-14", status: "open", formulaId: "northstar-2027", history: history([87.41, 86.02, 84.9]), highlights: ["HEC-approved campus", "Accredited program"], requiresGroup: "pre-engineering" }, computing),
  base({ slug: "northstar-bs-electrical-engineering", title: "BS Electrical Engineering", universitySlug: "northstar-university", campus: "Main campus", city: "Lahore", province: "Punjab", shift: "Morning", field: "engineering", durationYears: 4, creditHours: 136, seats: 120, feePerSemester: 78000, test: "Northstar Entry Test", deadline: "2027-07-14", status: "open", formulaId: "northstar-2027", history: history([83.12, 82.4, 81.75]), highlights: ["Accredited program"], requiresGroup: "pre-engineering" }, engineering),
  base({ slug: "northstar-bs-artificial-intelligence", title: "BS Artificial Intelligence", universitySlug: "northstar-university", campus: "Main campus", city: "Lahore", province: "Punjab", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 50, feePerSemester: 78000, test: "Northstar Entry Test", deadline: "2027-07-14", status: "open", formulaId: "northstar-2027", history: history([89.3, 88.4, 87.05]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "northstar-bs-computer-engineering", title: "BS Computer Engineering", universitySlug: "northstar-university", campus: "Main campus", city: "Lahore", province: "Punjab", shift: "Morning", field: "engineering", durationYears: 4, creditHours: 136, seats: 60, feePerSemester: 78000, test: "Northstar Entry Test", deadline: "2027-07-14", status: "open", formulaId: "northstar-2027", history: history([86.5, 85.7, 84.95]), highlights: ["Accredited program"], requiresGroup: "pre-engineering" }, engineering),
  base({ slug: "northstar-bs-information-technology", title: "BS Information Technology", universitySlug: "northstar-university", campus: "Main campus", city: "Lahore", province: "Punjab", shift: "Evening", field: "computing", durationYears: 4, creditHours: 130, seats: 60, feePerSemester: 69000, test: "Northstar Entry Test", deadline: "2027-07-14", status: "open", formulaId: "northstar-2027", history: history([82.1, 81.35, 80.5]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "northstar-bs-mechatronics-engineering", title: "BS Mechatronics Engineering", universitySlug: "northstar-university", campus: "City campus", city: "Lahore", province: "Punjab", shift: "Morning", field: "engineering", durationYears: 4, creditHours: 136, seats: 40, feePerSemester: 78000, test: "Northstar Entry Test", deadline: "2027-07-14", status: "open", formulaId: "northstar-2027", history: history([89.95, 88.7, 88.1]), requiresGroup: "pre-engineering" }, engineering),
  base({ slug: "highland-bs-software-engineering", title: "BS Software Engineering", universitySlug: "highland-institute", campus: "Islamabad campus", city: "Islamabad", province: "Islamabad (ICT)", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 100, feePerSemester: 165000, test: "HIC test, NAT or SAT", deadline: "2027-07-21", status: "open", formulaId: "highland-2027", history: history([74.3, 73.1, 72.65]), highlights: ["HEC-approved campus"], requiresGroup: "pre-engineering" }, computing),
  base({ slug: "highland-bs-cyber-security", title: "BS Cyber Security", universitySlug: "highland-institute", campus: "Islamabad campus", city: "Islamabad", province: "Islamabad (ICT)", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 50, feePerSemester: 165000, test: "HIC test, NAT or SAT", deadline: "2027-07-21", status: "open", formulaId: "highland-2027", history: history([87.6, 86.3, 85.1]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "highland-bs-computer-science", title: "BS Computer Science", universitySlug: "highland-institute", campus: "Islamabad campus", city: "Islamabad", province: "Islamabad (ICT)", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 100, feePerSemester: 165000, test: "HIC test, NAT or SAT", deadline: "2027-07-21", status: "open", formulaId: "highland-2027", history: history([90.85, 89.9, 88.4]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "greenfield-bs-artificial-intelligence", title: "BS Artificial Intelligence", universitySlug: "greenfield-university", campus: "Main campus", city: "Peshawar", province: "Khyber Pakhtunkhwa", shift: "Evening", field: "computing", durationYears: 4, creditHours: 133, seats: 60, feePerSemester: 64000, test: "NTS NAT", deadline: "2027-07-28", status: "open", formulaId: "greenfield-2027", history: history([79.6, 78.2, 76.95]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "greenfield-bs-software-engineering", title: "BS Software Engineering", universitySlug: "greenfield-university", campus: "Main campus", city: "Peshawar", province: "Khyber Pakhtunkhwa", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 60, feePerSemester: 64000, test: "NTS NAT", deadline: "2027-07-28", status: "open", formulaId: "greenfield-2027", history: history([88.0, 86.9, 85.7]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "greenfield-bs-robotics", title: "BS Robotics", universitySlug: "greenfield-university", campus: "Main campus", city: "Peshawar", province: "Khyber Pakhtunkhwa", shift: "Morning", field: "engineering", durationYears: 4, creditHours: 136, seats: 40, feePerSemester: 64000, test: "NTS NAT", deadline: "2027-07-28", status: "open", formulaId: "greenfield-2027", history: [], highlights: ["New in Fall 2027"], requiresGroup: "pre-engineering" }, engineering),
  base({ slug: "bluewater-bs-data-science", title: "BS Data Science", universitySlug: "bluewater-university", campus: "Clifton campus", city: "Karachi", province: "Sindh", shift: "Morning", field: "computing", durationYears: 4, creditHours: 130, seats: 80, feePerSemester: 198000, test: "Bluewater test or SAT", deadline: "2027-08-05", status: "upcoming", opensOn: "2027-07-01", formulaId: "bluewater-2027", history: history([71.85, 70.9, 69.4]), requiresGroup: "pre-engineering" }, computing),
  base({ slug: "skyline-bs-computer-science", title: "BS Computer Science", universitySlug: "skyline-university", campus: "Main campus", city: "Rawalpindi", province: "Punjab", shift: "Morning", field: "computing", durationYears: 4, creditHours: 133, seats: 80, feePerSemester: 58000, test: "Skyline test", deadline: "2027-07-10", status: "open", formulaId: "skyline-2027", history: history([76.25, 75.1, 74.2]), highlights: ["Women-only"], womenOnly: true, requiresGroup: "pre-engineering" }, computing),
  base({ slug: "crescent-mbbs", title: "MBBS", universitySlug: "crescent-medical-college", campus: "College campus", city: "Faisalabad", province: "Punjab", shift: "Morning", field: "medicine", durationYears: 5, creditHours: 0, seats: 150, feePerSemester: 30000, test: "MDCAT", deadline: "2027-07-18", status: "open", formulaId: "crescent-2027", history: history([92.87, 92.4, 91.95], 0), highlights: ["Central admissions"], requiresGroup: "pre-medical" }, medicine),
];
