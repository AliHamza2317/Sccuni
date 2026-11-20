import {
  ArrowRight, BadgeCheck, Bell, Briefcase, Calculator, CalendarDays, ChevronRight, Cpu, FileText, Landmark,
  Pill, Scale, ShieldCheck, Sprout, Stethoscope, Target, TrendingUp, Users, Wallet, Wrench,
} from "lucide-react";
import Link from "next/link";
import { HeroSearch } from "@/components/home/hero-search";
import { DateTile, GroupPill, Monogram, SourceChip, Tag, Verified } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/controls";
import { MeritMeter } from "@/components/ui/merit-meter";
import { events, getProgram, getUniversity, latestClosing } from "@/lib/data";
import { formatDate, pkr, relativeDays } from "@/lib/format";

const steps = [
  { icon: Calculator, title: "Enter your marks once", text: "Matric, FSc Part-I or full, A-Level equivalence and your entry test score — real or expected." },
  { icon: ShieldCheck, title: "See where you’re eligible", text: "We check each program’s official rules first. Ineligible programs are explained, never recommended." },
  { icon: Target, title: "Compare and shortlist", text: "Your aggregate under each university’s own formula, against verified past merits — with reminders for every deadline." },
];

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

const cities = [
  { name: "Lahore", region: "Punjab", bg: "from-ink-800 to-ink-900" },
  { name: "Islamabad", region: "Islamabad Capital Territory", bg: "from-brand-800 to-brand-900" },
  { name: "Karachi", region: "Sindh", bg: "from-[#1b2a6b] to-ink-900" },
  { name: "Peshawar", region: "Khyber Pakhtunkhwa", bg: "from-[#4a3412] to-[#2a1c08]" },
  { name: "Quetta", region: "Balochistan", bg: "from-brand-700 to-ink-900" },
  { name: "Multan", region: "Punjab", bg: "from-[#28407a] to-ink-950" },
];

const featuredSlugs = ["northstar-bs-computer-science", "highland-bs-software-engineering", "greenfield-bs-artificial-intelligence"];

export default function HomePage() {
  const featured = featuredSlugs.map((s) => getProgram(s)!).map((p) => ({ p, u: getUniversity(p.universitySlug)! }));
  const soon = events.filter((e) => e.date >= "2027-07-08").slice(0, 4);

  return (
    <>
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative isolate overflow-hidden bg-ink-900 text-white">
        <div aria-hidden className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden className="animate-aurora absolute -top-56 right-[-12%] -z-10 size-[760px] rounded-full bg-brand-500/30 blur-[120px]" />
        <div aria-hidden className="animate-aurora absolute top-40 left-[-18%] -z-10 size-[620px] rounded-full bg-[#2c5bd8]/20 blur-[120px] [animation-delay:-9s]" />

        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 pt-16 pb-24 sm:px-7 lg:grid-cols-[1.08fr_0.92fr] lg:pt-20 lg:pb-28">
          <div className="space-y-7">
            <span className="animate-rise inline-flex h-9 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] pr-4 pl-1.5 text-[13.5px] text-ink-100 backdrop-blur">
              <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-bold text-white">2027</span>
              Admissions season · every fact checked against official sources
            </span>
            <h1 className="animate-rise font-display text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.04em] [animation-delay:80ms]">
              Know where you’ll get admission —{" "}
              <span className="relative whitespace-nowrap text-brand-400">
                before you apply.
                <svg aria-hidden viewBox="0 0 300 12" className="absolute -bottom-2 left-0 h-3 w-full text-brand-500/70" preserveAspectRatio="none">
                  <path d="M2 9 C 80 2, 200 2, 298 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="animate-rise max-w-[560px] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-ink-300 [animation-delay:160ms]">
              Sccuni brings every university’s official merit formula, verified past closing merits, fees and deadlines into one place. Enter your marks once and see your real options.
            </p>
            <div className="animate-rise [animation-delay:240ms]">
              <HeroSearch />
            </div>
            <ul className="animate-rise flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink-300 [animation-delay:320ms]">
              {["Official sources only", "Checked by two people", "Free for students"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <BadgeCheck className="size-4 text-brand-400" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Product preview */}
          <div className="animate-rise relative mx-auto w-full max-w-[540px] [animation-delay:200ms] lg:min-h-[590px]">
            <div className="ring-gradient relative rounded-[28px] bg-white/[0.05] p-7 shadow-[0_40px_100px_rgb(0_0_0/0.45)] backdrop-blur-xl lg:absolute lg:top-12 lg:right-6 lg:left-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Monogram text="NU" tone="brand" />
                  <div>
                    <p className="font-display text-[17px] font-bold">BS Computer Science</p>
                    <p className="text-[13px] text-ink-300">Northstar University · Lahore · Morning</p>
                  </div>
                </div>
                <GroupPill group="target" />
              </div>
              <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[13px] text-ink-300">Your aggregate</p>
                  <p className="tabular font-display text-[56px] leading-none font-extrabold tracking-[-0.04em]">
                    86.86<span className="text-2xl text-ink-400">%</span>
                  </p>
                </div>
                <Tag tone="ondark" className="mb-1.5">Matric 10% · FSc 40% · Test 50%</Tag>
              </div>
              <MeritMeter className="mt-8" dark value={86.86} lo={80} hi={90} marks={[{ label: "2023", value: 84.9 }, { label: "2024", value: 86.02 }, { label: "2025", value: 87.41 }]} />
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[["2025", "87.41", "−0.55", false], ["2024", "86.02", "+0.84", true], ["2023", "84.90", "+1.96", true]].map(([y, c, m, up]) => (
                  <div key={y as string} className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3">
                    <p className="text-xs text-ink-300">{y} closing</p>
                    <p className="tabular mt-1 font-bold">{c}%</p>
                    <p className={up ? "text-[12.5px] font-bold text-brand-400" : "text-[12.5px] font-bold text-[#ff9b6b]"}>{m}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-float absolute -top-2 right-0 hidden rounded-2xl bg-white p-3.5 text-ink-900 shadow-float lg:block">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-700"><ShieldCheck className="size-[18px]" aria-hidden /></span>
                <div>
                  <p className="text-[13.5px] font-bold">Formula verified</p>
                  <p className="text-xs text-ink-500">Prospectus 2027 · p. 41</p>
                </div>
              </div>
            </div>
            <div className="animate-float absolute bottom-0 -left-10 hidden rounded-2xl bg-white p-3.5 text-ink-900 shadow-float [animation-delay:-3.5s] lg:block">
              <div className="flex items-center gap-3">
                <DateTile iso="2027-07-14" />
                <div>
                  <p className="text-sm font-bold">Applications close</p>
                  <p className="text-[13px] font-semibold text-gold-700">In 6 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── SOURCE STRIP ───────────────── */}
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-5 px-5 py-10 sm:px-7">
          <p className="text-xs font-bold tracking-[0.12em] text-ink-500 uppercase">Every number traced to an official source</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
            {[[FileText, "University prospectuses"], [TrendingUp, "Official merit lists"], [Landmark, "HEC recognition lists"], [Wallet, "Fee schedules"], [CalendarDays, "Entry-test bodies"]].map(([Icon, label]) => {
              const I = Icon as typeof FileText;
              return (
                <li key={label as string} className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink-600">
                  <I className="size-5 text-brand-600" aria-hidden />
                  {label as string}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-7">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">How Sccuni works</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-0.03em]">From marks to a confident shortlist in three steps</h2>
          </div>
          <ButtonLink href="/best-fit" variant="light">Try Best Fit Finder <ArrowRight className="size-4" aria-hidden /></ButtonLink>
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-200 bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span aria-hidden className="absolute top-6 right-7 font-display text-[64px] leading-none font-extrabold text-ink-100 transition-colors group-hover:text-brand-100">0{i + 1}</span>
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-ink-900 text-brand-400 shadow-[0_10px_24px_rgb(0_26_58/0.25)]">
                    <s.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-ink-500">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────────────── FEATURES (BENTO) ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-7">
        <div className="mb-12 max-w-2xl space-y-3">
          <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Built for real decisions</p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-0.03em]">Everything you need to choose — and nothing you can’t check</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-6">
          <Reveal className="lg:col-span-4">
            <div className="relative h-full overflow-hidden rounded-[28px] bg-ink-900 p-8 text-white shadow-lift">
              <div aria-hidden className="absolute -top-40 -right-32 size-[440px] rounded-full bg-brand-500/25 blur-[90px]" />
              <div className="relative flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-md space-y-2">
                  <h3 className="text-2xl font-bold">A merit calculator that shows its work</h3>
                  <p className="text-ink-300">Each university’s own formula, weights and rounding rules — with the official source and session on every result.</p>
                </div>
                <ButtonLink href="/merit-calculator" variant="ondark">Open calculator <ArrowRight className="size-4" aria-hidden /></ButtonLink>
              </div>
              <div className="relative mt-8 space-y-4 rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6">
                {[["Matric", "1,080 / 1,200 · weight 10%", 90, "9.00"], ["FSc Part-I", "500 / 550 · weight 40%", 90.9, "36.36"], ["Entry test", "166 / 200 · weight 50%", 83, "41.50"]].map(([l, d, pct, pts]) => (
                  <div key={l as string} className="grid grid-cols-[minmax(0,150px)_minmax(0,1fr)_64px] items-center gap-4">
                    <div><p className="text-sm font-bold">{l}</p><p className="text-xs text-ink-400">{d}</p></div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-linear-to-r from-brand-500 to-brand-400" style={{ width: `${pct}%` }} /></div>
                    <p className="tabular text-right font-bold">{pts}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-ink-300">Aggregate</span>
                  <span className="tabular font-display text-3xl font-extrabold tracking-tight">86.8636%</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={80}>
            <div className="flex h-full flex-col gap-5 rounded-[28px] border border-ink-200 bg-white p-7 shadow-soft">
              <span className="grid size-11 place-items-center rounded-2xl bg-target-bg text-target"><Target className="size-5" aria-hidden /></span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Best Fit Finder</h3>
                <p className="text-sm text-ink-500">Programs you’re eligible for, grouped by how your aggregate compares with verified past merits.</p>
              </div>
              <div className="mt-auto space-y-2.5">
                {([["safe", "5 programs"], ["target", "4 programs"], ["reach", "3 programs"]] as const).map(([g, n]) => (
                  <div key={g} className="flex items-center justify-between rounded-2xl bg-ink-50 px-3.5 py-2.5"><GroupPill group={g} size="sm" /><span className="text-sm font-semibold">{n}</span></div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5 rounded-[28px] border border-brand-100 bg-brand-50 p-7">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-brand-700 shadow-xs"><TrendingUp className="size-5" aria-hidden /></span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Past merits, done right</h3>
                <p className="text-sm text-ink-600">By year, merit list, category and shift. Positions and aggregates are never mixed.</p>
              </div>
              <div className="mt-auto overflow-hidden rounded-2xl border border-brand-100 bg-white text-[13.5px]">
                {[["2025", "List 3 · Open merit", "87.41"], ["2025", "List 3 · Self-finance", "81.06"], ["2024", "Final · Open merit", "86.02"]].map(([y, d, v]) => (
                  <div key={d + y} className="flex justify-between border-b border-brand-50 px-4 py-2.5 last:border-0"><span><b>{y}</b> <span className="text-ink-500">· {d}</span></span><b className="tabular">{v}</b></div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={80}>
            <div className="flex h-full flex-col gap-5 rounded-[28px] border border-ink-200 bg-white p-7 shadow-soft">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-700"><ShieldCheck className="size-5" aria-hidden /></span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Every fact has a source</h3>
                <p className="text-sm text-ink-500">Two people check each formula, merit and fee against the official document before it goes live.</p>
              </div>
              <div className="mt-auto flex flex-col items-start gap-2.5">
                <SourceChip title="Prospectus 2027" locator="p. 41" />
                <Verified>Verified 12 Nov 2026</Verified>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={160}>
            <div className="flex h-full flex-col gap-5 rounded-[28px] border border-ink-200 bg-white p-7 shadow-soft">
              <span className="grid size-11 place-items-center rounded-2xl bg-gold-100 text-gold-700"><Bell className="size-5" aria-hidden /></span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Never miss a deadline</h3>
                <p className="text-sm text-ink-500">Applications, entry tests and merit lists for the programs you save — with email reminders.</p>
              </div>
              <div className="mt-auto flex gap-2.5">
                <DateTile iso="2027-07-14" tone="brand" />
                <DateTile iso="2027-07-20" tone="blue" />
                <DateTile iso="2027-08-02" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── FEATURED PROGRAMS ───────────────── */}
      <section className="border-y border-ink-200 bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-7">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Popular this season</p>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-0.03em]">Programs students are checking now</h2>
            </div>
            <Link href="/programs" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800">Browse all programs <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map(({ p, u }, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link href={`/programs/${p.slug}`} className="group flex h-full flex-col gap-5 rounded-3xl border border-ink-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                  <div className="flex items-center gap-3">
                    <Monogram text={u.mono} tone={u.tone} />
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold">{p.title}</p>
                      <p className="truncate text-[13px] text-ink-500">{u.shortName} · {p.city}</p>
                    </div>
                  </div>
                  <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-ink-50 p-4 text-sm">
                    <div><dt className="text-xs text-ink-500">Last closing</dt><dd className="tabular font-bold">{latestClosing(p)?.toFixed(2)}%</dd></div>
                    <div><dt className="text-xs text-ink-500">Tuition / sem</dt><dd className="tabular font-bold">{pkr(p.feePerSemester)}</dd></div>
                    <div><dt className="text-xs text-ink-500">Entry test</dt><dd className="font-bold">{p.test}</dd></div>
                    <div><dt className="text-xs text-ink-500">Apply by</dt><dd className="font-bold">{formatDate(p.deadline)}</dd></div>
                  </dl>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    View program <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── FIELDS & CITIES ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-7">
        <div className="mb-10 space-y-3">
          <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Explore</p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-0.03em]">Start with a field you love</h2>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((f) => (
            <Link key={f.name} href="/programs" className="group flex items-center gap-4 rounded-[20px] border border-ink-200 bg-white p-4.5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink-50 text-ink-700 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700"><f.icon className="size-[22px]" aria-hidden /></span>
              <span className="min-w-0">
                <span className="block font-bold">{f.name}</span>
                <span className="block truncate text-[13px] text-ink-500">{f.sub}</span>
              </span>
              <ChevronRight className="ml-auto size-4 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
            </Link>
          ))}
        </div>

        <div className="mt-20 mb-8 space-y-3">
          <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Study near home</p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-0.03em]">Browse by city</h2>
        </div>
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-6">
          {cities.map((c) => (
            <Link key={c.name} href="/programs" className={`group relative isolate flex h-40 flex-col justify-end overflow-hidden rounded-[22px] bg-linear-to-br p-4.5 text-white transition duration-300 hover:-translate-y-1 hover:shadow-lift ${c.bg}`}>
              <span aria-hidden className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.05)_0_2px,transparent_2px_14px)]" />
              <span aria-hidden className="absolute -top-16 -right-14 -z-10 size-40 rounded-full bg-brand-400/25 transition-transform duration-500 group-hover:scale-125" />
              <span className="font-display text-xl font-extrabold tracking-tight">{c.name}</span>
              <span className="text-[13px] text-ink-200">{c.region}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────────── CLOSING SOON ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-7">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Admission calendar</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] leading-tight font-extrabold tracking-[-0.03em]">Closing soon</h2>
            <p className="text-lg leading-relaxed text-ink-500">Deadlines move fast in admission season. Track the dates that matter to you — and get a reminder before each one.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/admissions-calendar" variant="dark">Open calendar</ButtonLink>
              <ButtonLink href="/sign-in" variant="light"><Bell className="size-4" aria-hidden />Get reminders</ButtonLink>
            </div>
          </div>
          <ul className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-soft">
            {soon.map((e) => (
              <li key={e.id} className="border-b border-ink-100 last:border-0">
                <Link href={e.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink-50">
                  <DateTile iso={e.date} tone={e.type === "test" ? "blue" : e.type === "scholarship" ? "brand" : "reach"} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{e.title}</p>
                    <p className="truncate text-sm text-ink-500">{e.where}</p>
                  </div>
                  <span className="hidden text-[13px] font-semibold text-gold-700 sm:block">{relativeDays(e.date)}</span>
                  <ChevronRight className="size-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-ink-600" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── TRUST ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-7">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-ink-900 p-[clamp(2rem,5vw,4rem)] text-white">
          <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 opacity-60" />
          <div aria-hidden className="absolute -top-48 -right-40 -z-10 size-[560px] rounded-full bg-brand-500/25 blur-[110px]" />
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <p className="text-[13px] font-bold tracking-[0.12em] text-brand-400 uppercase">Our promise</p>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">Merit is a guide,<br />not a guarantee.</h2>
              <p className="max-w-lg text-lg leading-relaxed text-ink-300">We show how past closing merits compare with your aggregate — clearly, with sources. We never promise admission, and paid placements never change your results.</p>
            </div>
            <ul className="space-y-3">
              {[[FileText, "Official sources only", "Prospectuses, notices and regulator lists — never blogs or other portals."], [ShieldCheck, "Checked by two people", "One person enters each fact; a different person verifies it."], [CalendarDays, "Outdated data is labelled", "Every page shows when it was last verified."]].map(([Icon, t, d]) => {
                const I = Icon as typeof FileText;
                return (
                  <li key={t as string} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-4 backdrop-blur">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-400"><I className="size-5" aria-hidden /></span>
                    <span><b className="block">{t as string}</b><span className="text-sm text-ink-300">{d as string}</span></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-7">
        <div className="relative isolate flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[32px] border border-brand-100 bg-linear-to-br from-brand-50 via-white to-brand-50 p-[clamp(2rem,5vw,3.5rem)]">
          <div aria-hidden className="bg-grid-light absolute inset-0 -z-10 opacity-70" />
          <div className="max-w-xl space-y-3">
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-extrabold tracking-[-0.03em]">Find your best-fit programs in two minutes.</h2>
            <p className="text-lg text-ink-500">Enter your marks once. We check eligibility and compare you with verified past merits across every program we cover.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/best-fit" size="lg">Start Best Fit Finder <ArrowRight className="size-5" aria-hidden /></ButtonLink>
            <ButtonLink href="/merit-calculator" variant="light" size="lg">Merit calculator</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
