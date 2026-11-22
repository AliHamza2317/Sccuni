import Link from "next/link";
import { Logo } from "./logo";

const cols = [
  { title: "Explore", links: [["Programs", "/programs"], ["Universities", "/universities/northstar-university"], ["Merit calculator", "/merit-calculator"], ["Best Fit Finder", "/best-fit"]] },
  { title: "Admissions", links: [["Admission calendar", "/admissions-calendar"], ["Scholarships", "/scholarships"], ["Compare programs", "/compare"], ["How merit works", "/programs/northstar-bs-computer-science#formula"]] },
  { title: "Sccuni", links: [["How we verify data", "/admin/verification"], ["My dashboard", "/dashboard"], ["Sign in", "/sign-in"], ["Report an error", "/programs/northstar-bs-computer-science#report"]] },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] size-[520px] rounded-full bg-brand-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px] px-5 pt-20 pb-8 sm:px-7">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm space-y-4">
            <Logo onDark />
            <p className="text-[15px] leading-relaxed">
              Pakistan’s university admission and merit guide. Official formulas, verified past merits, fees and deadlines — in one place.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="mb-4 text-sm font-bold text-white">{c.title}</h2>
              <ul className="space-y-2.5 text-[15px]">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="transition-colors hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/[0.08] pt-6 text-[13px] text-ink-400">
          <span>© 2026 Sccuni</span>
          <span>Not affiliated with any university. Always confirm details on the official website before applying.</span>
          {/* Sample-data notice (moved here from the top bar at the founder's request). Remove once real, verified data is connected. */}
          <span className="w-full text-ink-400">Prototype: universities, fees and merit figures on this site are sample data, not real.</span>
        </div>
      </div>
    </footer>
  );
}
