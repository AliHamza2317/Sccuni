// ⚠️ SAMPLE DATA — fictional dates and scholarships for the design prototype.

import type { AdmissionEvent, Scholarship, StudentProfile } from "@/lib/types";

/** The prototype is set in the 2027 admission season. */
export const DEMO_TODAY = "2027-07-08";

export const events: AdmissionEvent[] = [
  { id: "bw-open", date: "2027-07-01", type: "application", label: "Bluewater opens", title: "Applications open", where: "Bluewater University · Karachi", href: "/programs/bluewater-bs-data-science" },
  { id: "sch-open", date: "2027-07-05", type: "scholarship", label: "Scholarship opens", title: "Provincial Merit Scholarship opens", where: "All public universities", href: "/scholarships" },
  { id: "sk-close", date: "2027-07-10", type: "application", label: "Skyline closes", title: "Applications close", where: "Skyline University for Women · Rawalpindi", href: "/programs/skyline-bs-computer-science" },
  { id: "nu-reg", date: "2027-07-10", type: "test", label: "NU test reg. ends", title: "Test registration closes", where: "Northstar Entry Test", href: "/universities/northstar-university" },
  { id: "nu-close", date: "2027-07-14", type: "application", label: "Northstar closes", title: "Applications close", where: "Northstar University · Lahore", href: "/programs/northstar-bs-computer-science" },
  { id: "cr-m1", date: "2027-07-18", type: "merit", label: "MBBS list 1", title: "MBBS merit list 1", where: "Crescent Medical College · Faisalabad", href: "/programs/crescent-mbbs" },
  { id: "nu-test", date: "2027-07-20", type: "test", label: "Northstar test", title: "Northstar Entry Test", where: "Lahore and 6 other cities", href: "/universities/northstar-university" },
  { id: "hi-close", date: "2027-07-21", type: "application", label: "Highland closes", title: "Applications close", where: "Highland Institute · Islamabad", href: "/programs/highland-bs-software-engineering" },
  { id: "hi-test", date: "2027-07-21", type: "test", label: "Highland test", title: "Admission test", where: "Highland Institute · Islamabad", href: "/programs/highland-bs-software-engineering" },
  { id: "gu-test", date: "2027-07-26", type: "test", label: "NAT (expected)", title: "NTS NAT — expected date", where: "Accepted by Greenfield University", href: "/programs/greenfield-bs-artificial-intelligence", tentative: true },
  { id: "gu-close", date: "2027-07-28", type: "application", label: "Greenfield closes", title: "Applications close", where: "Greenfield University · Peshawar", href: "/programs/greenfield-bs-artificial-intelligence" },
  { id: "sch-close", date: "2027-07-30", type: "scholarship", label: "Scholarship ends", title: "Provincial Merit Scholarship deadline", where: "Undergraduate · all public universities", href: "/scholarships" },
];

export const scholarships: Scholarship[] = [
  { id: "prov-merit", name: "Provincial Merit Scholarship", provider: "Provincial education endowment fund", kinds: ["merit"], coverage: "Full tuition for the whole degree", rules: ["Provincial domicile", "Top marks in your HSSC board"], open: true, status: "Closes 30 Jul 2027", icon: "government" },
  { id: "nat-need", name: "National Need-based Scholarship", provider: "Federal government programme", kinds: ["need"], coverage: "Tuition plus a monthly stipend of PKR [amount]", rules: ["Family income below the published limit", "Apply through your university’s financial aid office"], open: true, status: "Open after admission", icon: "need" },
  { id: "nu-need", name: "Northstar Need-based Grant", provider: "Northstar University of Engineering & Technology", kinds: ["need"], coverage: "Up to 100% tuition, reviewed each year", rules: ["Enrolled at Northstar", "Income and assets assessment"], open: false, status: "Opens 1 Sep 2027", icon: "need" },
  { id: "nu-excel", name: "Northstar Excellence Award", provider: "Northstar University of Engineering & Technology", kinds: ["merit"], coverage: "50% tuition, renewed on CGPA", rules: ["Top 5% of each program’s merit list", "No separate application"], open: true, status: "Automatic on admission", icon: "award" },
  { id: "hi-women", name: "Women in Computing Award", provider: "Highland Institute of Computing", kinds: ["merit", "women"], coverage: "75% tuition for BS computing programs", rules: ["Female applicants", "Aggregate of 80% or above"], open: true, status: "Closes 21 Jul 2027", icon: "award" },
  { id: "reg-access", name: "Regional Access Scholarship", provider: "Provincial higher education department", kinds: ["regional", "need"], coverage: "Full tuition plus hostel", rules: ["Domicile of a listed less-developed district", "Admission in a public university"], open: true, status: "Closes 15 Aug 2027", icon: "government" },
];

/** Sample signed-in student used by Best Fit, Compare and the dashboard. */
export const sampleStudent: StudentProfile = {
  name: "Ahsan",
  initials: "AK",
  group: "pre-engineering",
  ssc: { obtained: 1080, total: 1200 },
  hssc: { obtained: 500, total: 550, part: "part1" },
  testPercent: 83,
  testExpected: true,
  fields: ["CS & IT", "Engineering"],
  budgetPerYear: 400000,
};
