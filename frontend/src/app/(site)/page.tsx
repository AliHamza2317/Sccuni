import {
  ArrowRight, Bell, Calculator, Check, ShieldCheck, Target,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroBackground } from "@/components/home/hero-background";
import { HeroSearch } from "@/components/home/hero-search";
import { SourceMarquee } from "@/components/home/source-marquee";
import { ProductWindow, type WindowRow } from "@/components/home/product-window";
import { ClosingSoon, ExploreFields, HowItWorks, PopularPrograms, PromiseSection } from "@/components/home/sections";
import { DateTile, GroupPill, SourceChip, Verified } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/controls";
import { MeritMeter } from "@/components/ui/merit-meter";
import { SectionHeading } from "@/components/ui/section-heading";
import { bestFit, events, sampleStudent } from "@/lib/data";
import { cn, relativeDays } from "@/lib/format";

/** The hero overlaps the product window by this much. */
const OVERLAP = "clamp(150px,20vw,280px)";

export default function HomePage() {
  const s = sampleStudent;
  const { results } = bestFit(s);
  const eligible = results.filter((r) => r.group !== "below");
  const inGroup = (g: "safe" | "target" | "reach") => eligible.filter((r) => r.group === g);
  // Show a varied sample: prefer a different university on each row.
  const used = new Set<string>();
  const take = (g: "safe" | "target" | "reach", n: number) => {
    const list = inGroup(g);
    const fresh = list.filter((r) => !used.has(r.university.slug));
    const chosen = [...fresh, ...list.filter((r) => !fresh.includes(r))].slice(0, n);
    chosen.forEach((r) => used.add(r.university.slug));
    return chosen;
  };
  const pick = [...take("safe", 2), ...take("target", 2), ...take("reach", 1)];
  const rows: WindowRow[] = pick.map((r) => ({
    slug: r.program.slug,
    mono: r.university.mono,
    tone: r.university.tone,
    title: r.program.title,
    where: `${r.university.shortName} · ${r.program.city}`,
    aggregate: r.aggregate.toFixed(2),
    margin: r.margins[0]?.margin ?? null,
    group: r.group,
  }));
  const focus = results.find((r) => r.program.slug === "northstar-bs-computer-science")!;

  const soon = events.filter((e) => e.date >= "2027-07-08").slice(0, 4);

  return (
    <>
      {/* ───────────────── HERO ─────────────────
          Full width, directly under the floating header (which sits on top of it), with rounded bottom corners. */}
      <div>
        <section data-header-theme="dark" className="relative isolate overflow-hidden rounded-b-[28px] bg-ink-950 text-white sm:rounded-b-[44px]" style={{ paddingBottom: OVERLAP }}>
          <HeroBackground />

          <div className="mx-auto max-w-[1240px] px-5 pt-[128px] text-center sm:px-7 sm:pt-[152px] lg:pt-[168px]">
            <Link
              href="/admissions-calendar"
              className="animate-rise group inline-flex h-9 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] pr-3.5 pl-1.5 text-[13.5px] text-white/90 backdrop-blur transition hover:border-white/30 hover:text-white"
            >
              <span className="rounded-full bg-white/[0.12] px-2.5 py-0.5 text-xs font-semibold text-brand-200 ring-1 ring-white/15">2027</span>
              Admission season is open
              <ArrowRight className="size-3.5 text-white/70 transition group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
            </Link>

            <h1 className="animate-rise mx-auto mt-8 max-w-[1100px] font-display text-[clamp(2.75rem,6.4vw,5.1rem)] leading-[1] font-extrabold tracking-[-0.05em] [animation-delay:80ms]">
              <span className="text-white">Know where you’ll get in,</span>
              <br />
              <span className="text-gradient-emerald">before you apply.</span>
            </h1>

            <p className="animate-rise mx-auto mt-7 max-w-[600px] text-[clamp(1.05rem,1.45vw,1.2rem)] leading-relaxed text-ink-200 [animation-delay:160ms]">
              Official merit formulas, verified past merits, fees and deadlines for every program — in one calm place.
            </p>

            <div className="animate-rise mt-10 [animation-delay:240ms]">
              <HeroSearch />
            </div>

            <div className="animate-rise mt-14 [animation-delay:320ms]">
              <SourceMarquee />
            </div>
          </div>
        </section>
      </div>

      {/* ───────────────── PRODUCT WINDOW ───────────────── */}
      <div className="animate-rise relative z-10 mx-auto max-w-[1120px] px-5 [animation-delay:380ms] sm:px-7" style={{ marginTop: `calc(-1 * ${OVERLAP} + 64px)` }}>
        <ProductWindow
          rows={rows}
          counts={{ safe: inGroup("safe").length, target: inGroup("target").length, reach: inGroup("reach").length }}
          eligible={eligible.length}
          marks={[
            ["Matric", `${s.ssc.obtained.toLocaleString("en-US")} / ${s.ssc.total.toLocaleString("en-US")}`],
            ["FSc Part-I", `${s.hssc.obtained} / ${s.hssc.total}`],
            ["Entry test", `${s.testPercent}% expected`],
            ["Group", "Pre-Engineering"],
          ]}
          focus={{
            title: `${focus.program.title} · ${focus.university.shortName}`,
            aggregate: focus.aggregate,
            closings: focus.margins.map((m) => ({ label: `’${String(m.year).slice(2)}`, value: m.closing })),
          }}
        />
      </div>

      {/* ───────────────── FEATURES ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pt-28 pb-28 sm:px-7 lg:pt-32 lg:pb-36">
        <SectionHeading
          align="center"
          eyebrow="Why Sccuni"
          title={<>Everything you need to decide.<br className="hidden sm:block" /> Nothing you can’t check.</>}
          description="Three tools, one honest profile. Built around official documents, not guesses."
        />

        <div className="mt-20 space-y-24 lg:mt-24 lg:space-y-32">
          <FeatureRow
            icon={Calculator}
            title="A merit calculator that shows its work"
            text="Each university uses its own formula. Sccuni applies the official weights and rounding rules — and shows every step, with the source."
            points={["Every weight and rounding rule visible", "Part-I or full FSc, A-Level equivalence", "“What test score do I need?” in one tap"]}
            href="/merit-calculator"
            cta="Open the calculator"
          >
            <div className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-ink-100 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[12.5px] text-ink-500">Northstar University · BS Computer Science</p>
                  <p className="font-display text-lg font-bold tracking-[-0.02em]">How we got this number</p>
                </div>
                <Verified>Verified formula</Verified>
              </div>
              <div className="mt-6 space-y-4">
                {[["Matric", "1,080 / 1,200 × 10%", 90, "9.0000"], ["FSc Part-I", "500 / 550 × 40%", 90.9, "36.3636"], ["Entry test", "166 / 200 × 50%", 83, "41.5000"]].map(([l, d, pct, pts]) => (
                  <div key={l as string} className="grid grid-cols-[minmax(0,130px)_minmax(0,1fr)_auto] items-center gap-4">
                    <div>
                      <p className="text-sm font-semibold">{l}</p>
                      <p className="text-xs text-ink-500">{d}</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="tabular text-right text-sm font-bold">{pts}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-ink-100 pt-5">
                <SourceChip title="Prospectus 2027" locator="p. 41" />
                <p className="tabular font-display text-[34px] leading-none font-extrabold tracking-[-0.04em]">
                  86.8636<span className="text-lg text-ink-500">%</span>
                </p>
              </div>
            </div>
          </FeatureRow>

          <FeatureRow
            reverse
            icon={Target}
            title="Honest groups, not false promises"
            text="Every program you’re eligible for, grouped by how your aggregate compares with verified past closing merits — never with positions or guesses."
            points={["Eligibility checked before anything else", "Safe, Target and Reach — with the reason", "Clear “No data” when merits aren’t published"]}
            href="/best-fit"
            cta="Find my best fit"
          >
            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-ink-100 sm:p-7">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[12.5px] text-ink-500">Your aggregate · BS Computer Science</p>
                    <p className="tabular font-display text-[34px] leading-none font-extrabold tracking-[-0.04em]">
                      {focus.aggregate.toFixed(2)}<span className="text-lg text-ink-500">%</span>
                    </p>
                  </div>
                  <GroupPill group={focus.group} />
                </div>
                <MeritMeter className="mt-7" value={focus.aggregate} lo={82} hi={90} marks={focus.margins.map((m) => ({ label: String(m.year), value: m.closing }))} caption="Past closing merits · open merit" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([["safe", inGroup("safe").length, "2+ above every year"], ["target", inGroup("target").length, "Close to the latest"], ["reach", inGroup("reach").length, "1.5 to 4 below"]] as const).map(([g, n, d]) => (
                  <div key={g} className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-ink-100">
                    <GroupPill group={g} size="sm" />
                    <p className="tabular mt-3 font-display text-2xl font-extrabold tracking-[-0.03em]">{n}</p>
                    <p className="text-[12px] leading-snug text-ink-500">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </FeatureRow>

          <FeatureRow
            icon={Bell}
            title="Every date that matters, in one place"
            text="Applications, entry tests, merit lists and scholarships for the programs you save — with a reminder before each one."
            points={["Verified from official notices", "Month and list views, filtered for you", "Email reminders you control"]}
            href="/admissions-calendar"
            cta="Open the calendar"
          >
            <div className="relative">
              <ul className="overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink-100">
                {soon.slice(0, 3).map((e, i) => (
                  <li key={e.id} className="flex items-center gap-4 border-b border-ink-100 px-5 py-4 last:border-0">
                    <DateTile iso={e.date} tone={e.type === "test" ? "blue" : e.type === "scholarship" ? "brand" : "reach"} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{e.title}</p>
                      <p className="truncate text-[13px] text-ink-500">{e.where}</p>
                    </div>
                    <span
                      aria-hidden
                      className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors", i < 2 ? "bg-brand-600" : "bg-ink-200")}
                    >
                      <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow-xs", i < 2 ? "left-[18px]" : "left-0.5")} />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="absolute -right-3 -bottom-8 hidden items-center gap-3 rounded-2xl bg-ink-950 py-3 pr-5 pl-3 text-white shadow-float sm:flex">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-500/15 text-brand-300"><Bell className="size-[18px]" aria-hidden /></span>
                <span>
                  <span className="block text-[13.5px] font-semibold">Reminder set</span>
                  <span className="block text-[12.5px] text-ink-400">Applications close {relativeDays(soon[0].date).toLowerCase()}</span>
                </span>
              </div>
            </div>
          </FeatureRow>
        </div>
      </section>

      <HowItWorks />
      <PopularPrograms />
      <ExploreFields />
      <ClosingSoon />
      <PromiseSection />

      {/* ───────────────── CTA ───────────────── */}
      <section className="relative isolate overflow-hidden px-5 pb-32 text-center sm:px-7">
        <div aria-hidden className="absolute top-0 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_152_124/0.12),transparent)]" />
        <div className="mx-auto max-w-2xl space-y-6">
          <ShieldCheck className="mx-auto size-10 text-brand-600" strokeWidth={1.5} aria-hidden />
          <h2 className="text-gradient-ink text-[clamp(2rem,4vw,3.25rem)] leading-[1.04] font-extrabold tracking-[-0.045em]">
            Find your best-fit programs in two minutes.
          </h2>
          <p className="text-lg text-ink-500">Enter your marks once. We check eligibility and compare you with verified past merits across every program we cover.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <ButtonLink href="/best-fit" size="lg">Start Best Fit Finder <ArrowRight className="size-5" aria-hidden /></ButtonLink>
            <ButtonLink href="/merit-calculator" variant="light" size="lg">Merit calculator</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  text,
  points,
  href,
  cta,
  reverse = false,
  children,
}: {
  icon: typeof Calculator;
  title: string;
  text: string;
  points: string[];
  href: string;
  cta: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal className={cn("min-w-0 space-y-6", reverse && "lg:order-2")}>
        <span className="grid size-11 place-items-center rounded-2xl bg-ink-950 text-brand-300 shadow-[0_10px_24px_rgb(0_15_36/0.25)]">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="text-gradient-ink text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.08] font-extrabold tracking-[-0.04em]">{title}</h3>
        <p className="max-w-lg text-lg leading-relaxed text-ink-500">{text}</p>
        <ul className="space-y-3">
          {points.map((pt) => (
            <li key={pt} className="flex items-center gap-3 text-[15px] text-ink-700">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
              {pt}
            </li>
          ))}
        </ul>
        <Link href={href} className="group inline-flex items-center gap-1.5 pt-1 font-semibold text-ink-900">
          {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </Reveal>
      <Reveal delay={100} className={cn("min-w-0", reverse && "lg:order-1")}>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-linear-to-b from-white to-ink-50 p-5 ring-1 ring-ink-200/70 sm:p-10">
          <div aria-hidden className="bg-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]" />
          <div aria-hidden className="absolute -top-28 -right-24 -z-10 size-80 rounded-full bg-brand-400/[0.18] blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 -left-24 -z-10 size-72 rounded-full bg-[#2c5bd8]/[0.08] blur-3xl" />
          {children}
        </div>
      </Reveal>
    </div>
  );
}
