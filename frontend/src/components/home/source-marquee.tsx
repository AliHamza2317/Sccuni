import { ArrowLeftRight, BadgeCheck, CalendarDays, FileText, GraduationCap, Landmark, TrendingUp, Wallet } from "lucide-react";

const SOURCES = [
  { icon: FileText, label: "University prospectuses" },
  { icon: TrendingUp, label: "Official merit lists" },
  { icon: Landmark, label: "HEC recognition lists" },
  { icon: Wallet, label: "Fee schedules" },
  { icon: CalendarDays, label: "Entry-test notices" },
  { icon: ArrowLeftRight, label: "IBCC equivalence rules" },
  { icon: BadgeCheck, label: "Accreditation lists" },
  { icon: GraduationCap, label: "Scholarship notices" },
];

/**
 * A slow, endless strip of the official source types Sccuni uses.
 * Pauses on hover; stands still under reduced motion. The second copy is hidden from screen readers.
 */
export function SourceMarquee() {
  return (
    <div className="mx-auto max-w-[980px]">
      <p className="text-[13px] text-white">Every number traced to an official source</p>
      <div className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]">
        <ul className="animate-marquee flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].flatMap((copy) =>
            SOURCES.map(({ icon: Icon, label }) => (
              <li
                key={`${copy}-${label}`}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-center gap-2.5 pr-12 font-display text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-white"
              >
                <Icon className="size-[18px] text-brand-300" aria-hidden />
                {label}
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
