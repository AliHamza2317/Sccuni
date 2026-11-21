import {
  ArrowRight, ArrowUpRight, Bell, Briefcase, Calculator, Check, ChevronRight, Cpu, Pill, Scale, ShieldCheck, Sprout, Stethoscope, Target, Users, Wrench,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroBackground } from "@/components/home/hero-background";
import { HeroSearch } from "@/components/home/hero-search";
import { SourceMarquee } from "@/components/home/source-marquee";
import { ProductWindow, type WindowRow } from "@/components/home/product-window";
import { DateTile, GroupPill, Monogram, SourceChip, Verified } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/controls";
import { MeritMeter } from "@/components/ui/merit-meter";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { bestFit, events, getPrograms, getProgram, getUniversity, latestClosing, sampleStudent } from "@/lib/data";
import { cn, formatDate, pkr, relativeDays } from "@/lib/format";

const fields = [
  { icon: Wrench, name: "Engineering", sub: "Electrical, Civil, Mechanical" },
  { icon: Stethoscope, name: "Medicine & Dentistry", sub: "MBBS, BDS, DPT" },
  { icon: Cpu, name: "Computer Science & IT", sub: "CS, AI, Data Science" },
  { icon: Briefcase, name: "Business & Management", sub: "BBA, Accounting & Finance" },
  { icon: Pill, name: "Pharmacy & Allied Health", sub: "Pharm-D, Nursing, MLT" },
  { icon: Scale, name: "Law", sub: "LLB (5 years)" },
  { icon: Users, name: "Social Sciences", sub: "Psychology, Economics, Media" },
  { icon: Sprout, name: "Agriculture & Food", sub: "Agriculture, Food Science, DVM" },
];


const steps = [
  { title: "Enter your marks once", text: "Matric, FSc Part-I or full, and your entry-test score — real or expected." },
  { title: "See where you’re eligible", text: "Each program’s official rules are checked first. Ineligible programs are explained, never recommended." },
  { title: "Shortlist with confidence", text: "Your aggregate under each formula, against verified past merits — with a reminder for every deadline." },
];

const standards = [
  { value: "2", label: "people check every fact before it goes live" },
  { value: "0", label: "paid placements inside your results" },
  { value: "100%", label: "of numbers linked to an official source" },
  { value: "1", label: "profile, checked against every formula" },
];

const featuredSlugs = ["northstar-bs-computer-science", "highland-bs-software-engineering", "greenfield-bs-artificial-intelligence"];

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

  const featured = featuredSlugs.map((slug) => getProgram(slug)!).map((p) => ({ p, u: getUniversity(p.universitySlug)! }));
  const soon = events.filter((e) => e.date >= "2027-07-08").slice(0, 4);
  const cityCounts = Object.entries(
    getPrograms().reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.city]: (acc[p.city] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <>
      {/* ───────────────── HERO ─────────────────
          Full width, directly under the floating header (which sits on top of it), with rounded bottom corners. */}
      <div>
        <section className="relative isolate overflow-hidden rounded-b-[28px] bg-ink-950 text-white sm:rounded-b-[44px]" style={{ paddingBottom: OVERLAP }}>
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

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section className="border-y border-ink-200/70 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-7 lg:py-28">
          <SectionHeading
            eyebrow="How it works"
            title="From marks to a shortlist in three steps"
            action={<ButtonLink href="/best-fit" variant="light">Try Best Fit Finder <ArrowRight className="size-4" aria-hidden /></ButtonLink>}
          />
          <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            <span aria-hidden className="absolute top-5 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-transparent via-ink-200 to-transparent md:block" />
            {steps.map((st, i) => (
              <li key={st.title} className="relative">
                <Reveal delay={i * 90} className="space-y-4 md:text-center">
                  <span className="relative inline-grid size-10 place-items-center rounded-full bg-white font-display text-sm font-bold text-ink-900 shadow-soft ring-1 ring-ink-200 md:mx-auto">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-bold tracking-[-0.02em]">{st.title}</h3>
                  <p className="leading-relaxed text-ink-500 md:mx-auto md:max-w-[300px]">{st.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────── FEATURED PROGRAMS ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 py-28 sm:px-7">
        <SectionHeading
          eyebrow="Popular this season"
          title="Programs students are checking now"
          action={
            <Link href="/programs" className="group inline-flex items-center gap-1.5 font-semibold text-ink-900">
              Browse all programs <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map(({ p, u }, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/programs/${p.slug}`}
                className="group flex h-full flex-col gap-6 rounded-[26px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-ink-300/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <Monogram text={u.mono} tone={u.tone} />
                  <span className="grid size-9 place-items-center rounded-full text-ink-500 ring-1 ring-ink-200 transition group-hover:bg-ink-900 group-hover:text-white group-hover:ring-ink-900">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
                <div>
                  <p className="font-display text-xl font-bold tracking-[-0.02em]">{p.title}</p>
                  <p className="mt-1 truncate text-[13.5px] text-ink-500">{u.shortName} · {p.city}</p>
                </div>
                <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink-100 pt-5 text-sm">
                  <div><dt className="text-xs text-ink-500">Last closing</dt><dd className="tabular font-semibold">{latestClosing(p)?.toFixed(2)}%</dd></div>
                  <div><dt className="text-xs text-ink-500">Tuition / semester</dt><dd className="tabular font-semibold">{pkr(p.feePerSemester)}</dd></div>
                  <div><dt className="text-xs text-ink-500">Entry test</dt><dd className="truncate font-semibold">{p.test}</dd></div>
                  <div><dt className="text-xs text-ink-500">Apply by</dt><dd className="font-semibold">{formatDate(p.deadline)}</dd></div>
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────── EXPLORE ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-7">
        <SectionHeading eyebrow="Explore" title="Start with a field you love" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] bg-ink-200/70 ring-1 ring-ink-200/70 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((f) => (
            <Link key={f.name} href="/programs" className="group flex items-center gap-4 bg-white p-5 transition-colors hover:bg-ink-50/70 lg:flex-col lg:items-start lg:p-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-full text-ink-700 ring-1 ring-ink-200 transition group-hover:bg-ink-900 group-hover:text-brand-300 group-hover:ring-ink-900">
                <f.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold tracking-[-0.01em]">{f.name}</span>
                <span className="block truncate text-[13px] text-ink-500">{f.sub}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-ink-700 lg:hidden" aria-hidden />
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2.5">
          <span className="mr-2 text-sm font-medium text-ink-500">Browse by city</span>
          {cityCounts.map(([city, n]) => (
            <Link
              key={city}
              href="/programs"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white pr-2 pl-4 text-[14.5px] font-medium shadow-xs ring-1 ring-ink-200/80 transition hover:shadow-soft hover:ring-ink-300"
            >
              {city}
              <span className="tabular grid h-6 min-w-6 place-items-center rounded-full bg-ink-50 px-1.5 text-[12px] text-ink-500">{n}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────────── CLOSING SOON ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-7">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Admission calendar"
              title="Closing soon"
              description="Deadlines move fast in admission season. Track the dates that matter to you — and get a reminder before each one."
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/admissions-calendar" variant="dark">Open calendar</ButtonLink>
              <ButtonLink href="/sign-in" variant="light"><Bell className="size-4" aria-hidden />Get reminders</ButtonLink>
            </div>
          </div>
          <ul className="overflow-hidden rounded-[26px] bg-white shadow-soft ring-1 ring-ink-200/70">
            {soon.map((e) => (
              <li key={e.id} className="border-b border-ink-100 last:border-0">
                <Link href={e.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink-50/70">
                  <DateTile iso={e.date} tone={e.type === "test" ? "blue" : e.type === "scholarship" ? "brand" : "reach"} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{e.title}</p>
                    <p className="truncate text-sm text-ink-500">{e.where}</p>
                  </div>
                  <span className="hidden rounded-full bg-gold-50 px-2.5 py-1 text-[12.5px] font-semibold text-gold-700 sm:block">{relativeDays(e.date)}</span>
                  <ChevronRight className="size-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-ink-600" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── PROMISE ───────────────── */}
      <section className="px-3 pb-28 sm:px-7">
        <div className="relative isolate mx-auto max-w-[1240px] overflow-hidden rounded-[36px] bg-ink-950 px-6 py-20 text-center text-white sm:px-12 lg:py-28">
          <div aria-hidden className="bg-lines-dark mask-radial absolute inset-0 -z-10" />
          <div aria-hidden className="absolute top-[-260px] left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_152_124/0.32),transparent)]" />
          <div aria-hidden className="bg-noise absolute inset-0 -z-10 opacity-[0.2] mix-blend-soft-light" />
          <Eyebrow dark>Our promise</Eyebrow>
          <h2 className="text-gradient-light mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.045em]">
            Merit is a guide, not a guarantee.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            We show how past closing merits compare with your aggregate — clearly, with sources. We never promise admission, and paid placements never change your results.
          </p>
          <dl className="mx-auto mt-16 grid max-w-[1000px] grid-cols-2 gap-y-10 lg:grid-cols-4">
            {standards.map((st, i) => (
              <div key={st.label} className={cn("px-4", i > 0 && "lg:border-l lg:border-white/[0.08]", i % 2 === 1 && "border-l border-white/[0.08] lg:border-l")}>
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="text-gradient-brand tabular block font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-extrabold tracking-[-0.04em]">{st.value}</span>
                  <span className="mx-auto mt-3 block max-w-[180px] text-[14px] leading-snug text-ink-300">{st.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

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
