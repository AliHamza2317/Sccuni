import {
  ArrowRight, ArrowUpRight, Ban, Bell, Briefcase, Check, Cpu, FileCheck, MapPin, Pill, Scale, Sprout, Stethoscope, UserRound, Users, Wrench, X,
} from "lucide-react";
import Link from "next/link";
import { GroupPill, Monogram } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/controls";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { SilkBackdrop } from "@/components/site/silk-backdrop";
import { bestFit, DEMO_TODAY, events, getPrograms, getProgram, getUniversity, latestClosing } from "@/lib/data";
import { cn, formatDate, pkr, relativeDays } from "@/lib/format";
import type { AdmissionEvent, FieldId } from "@/lib/types";

/* ────────────────────────────── How it works ────────────────────────────── */

export function HowItWorks() {
  const { results } = bestFit();
  const count = (g: "safe" | "target" | "reach") => results.filter((r) => r.group === g).length;
  const groups = [
    { g: "safe" as const, n: count("safe"), bar: "bg-safe" },
    { g: "target" as const, n: count("target"), bar: "bg-target" },
    { g: "reach" as const, n: count("reach"), bar: "bg-reach" },
  ];
  const most = Math.max(...groups.map((x) => x.n), 1);

  const steps = [
    {
      title: "Enter your marks once",
      text: "Matric, FSc Part-I or full, and your entry-test score — real or expected.",
      visual: (
        <div className="space-y-2.5">
          {[["Matric", "1,080 / 1,200"], ["FSc Part-I", "500 / 550"], ["Entry test", "83% · expected"]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-xs ring-1 ring-ink-200/70">
              <span className="text-[13px] font-medium text-ink-500">{k}</span>
              <span className="flex items-center gap-2 text-[13.5px] font-semibold text-ink-900">
                {v}
                <span className="grid size-5 place-items-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100"><Check className="size-3" strokeWidth={3} aria-hidden /></span>
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "See where you’re eligible",
      text: "Each program’s official rules are checked first. Ineligible programs are explained, never recommended.",
      visual: (
        <div className="space-y-2.5">
          {[
            ["BS Computer Science", "Eligible", true],
            ["BS Electrical Engineering", "Eligible", true],
            ["MBBS", "Needs Pre-Medical", false],
          ].map(([t, s, ok]) => (
            <div key={t as string} className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-xs ring-1 ring-ink-200/70">
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", ok ? "bg-brand-50 text-brand-700" : "bg-danger-bg text-danger")}>
                {ok ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : <X className="size-3.5" strokeWidth={3} aria-hidden />}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-ink-900">{t}</span>
              <span className={cn("shrink-0 text-[12px] font-semibold", ok ? "text-brand-700" : "text-danger")}>{s}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Shortlist with confidence",
      text: "Your aggregate under each formula, against verified past merits — with a reminder for every deadline.",
      visual: (
        <div className="flex h-full items-end justify-center gap-5 px-2 pt-2">
          {groups.map(({ g, n, bar }) => (
            <div key={g} className="flex flex-1 flex-col items-center gap-2.5">
              <span className="font-display text-xl font-extrabold tracking-[-0.03em] text-ink-900">{n}</span>
              <span className={cn("w-full max-w-[56px] rounded-t-xl opacity-90", bar)} style={{ height: `${28 + (n / most) * 74}px` }} />
              <GroupPill group={g} size="sm" />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-28">
      <div aria-hidden className="absolute top-0 left-1/2 -z-10 h-[520px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_152_124/0.09),transparent)]" />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From marks to a shortlist in three steps"
          description="No guesswork and no hidden rules — every step uses the official documents."
        />
        <ol className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((st, i) => (
            <li key={st.title}>
              <Reveal delay={i * 100} className="h-full">
                <div className="group flex h-full flex-col rounded-[30px] bg-white p-2 shadow-soft ring-1 ring-ink-200/70 transition duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative isolate h-[210px] overflow-hidden rounded-[24px] bg-linear-to-b from-ink-50 to-white p-5 ring-1 ring-ink-100">
                    <div aria-hidden className="bg-lines-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_75%)]" />
                    <div aria-hidden className="absolute -top-16 -right-16 -z-10 size-44 rounded-full bg-brand-300/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    {st.visual}
                  </div>
                  <div className="space-y-3 px-5 pt-6 pb-5">
                    <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-brand-700">
                      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-ink-950 px-1.5 font-display text-[11px] font-bold text-white">0{i + 1}</span>
                      Step {i + 1}
                    </span>
                    <h3 className="text-[21px] leading-snug font-bold tracking-[-0.025em] text-ink-900">{st.title}</h3>
                    <p className="leading-relaxed text-ink-500">{st.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/best-fit" variant="dark" size="lg">Try Best Fit Finder <ArrowRight className="size-5" aria-hidden /></ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────── Popular this season ────────────────────────────── */

/** Three past closing merits as a small line, oldest to newest. */
function Sparkline({ values }: { values: number[] }) {
  const w = 132;
  const h = 46;
  const min = Math.min(...values) - 0.6;
  const max = Math.max(...values) + 0.6;
  const pts = values.map((v, i) => [6 + (i * (w - 12)) / Math.max(values.length - 1, 1), h - 6 - ((v - min) / (max - min)) * (h - 12)]);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden className="overflow-visible">
      <polyline points={line} fill="none" stroke="rgb(127 217 194)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 4 : 2.75} fill={i === pts.length - 1 ? "#ffffff" : "rgb(127 217 194)"} stroke={i === pts.length - 1 ? "rgb(45 186 152)" : "none"} strokeWidth="2.5" />
      ))}
    </svg>
  );
}

const FEATURED = [
  { slug: "northstar-bs-computer-science", position: "30% 30%" },
  { slug: "highland-bs-software-engineering", position: "65% 55%" },
  { slug: "greenfield-bs-artificial-intelligence", position: "85% 25%" },
];

export function PopularPrograms() {
  const items = FEATURED.map(({ slug, position }) => {
    const p = getProgram(slug)!;
    return { p, u: getUniversity(p.universitySlug)!, position };
  });

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-7">
      <SectionHeading
        eyebrow="Popular this season"
        title="Programs students are checking now"
        action={
          <Link href="/programs" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-ink-900 shadow-xs ring-1 ring-ink-200/80 transition hover:shadow-soft">
            Browse all programs <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        }
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map(({ p, u, position }, i) => {
          const closings = [...p.history].reverse().map((h) => h.open[2]);
          const last = latestClosing(p);
          return (
            <Reveal key={p.slug} delay={i * 100} className="h-full">
              <Link
                href={`/programs/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[30px] bg-white shadow-soft ring-1 ring-ink-200/70 transition duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative isolate flex h-[200px] flex-col justify-between p-5 text-white">
                  <SilkBackdrop position={position} shade="bottom" drift={false} sizes="(min-width: 768px) 33vw, 100vw" imageClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                  <div className="flex items-start justify-between">
                    <Monogram text={u.mono} tone={u.tone} className="ring-4 ring-white/15" />
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.12] px-2.5 py-1 text-[12px] font-semibold text-white ring-1 ring-white/20 backdrop-blur">
                      <span className="size-1.5 rounded-full bg-brand-300" aria-hidden />
                      {p.status === "open" ? "Applications open" : "Opening soon"}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[12.5px] text-white/80">Last closing merit</p>
                      <p className="tabular font-display text-[34px] leading-none font-extrabold tracking-[-0.04em]">
                        {last?.toFixed(2)}<span className="text-lg text-white/70">%</span>
                      </p>
                    </div>
                    {closings.length > 1 && <Sparkline values={closings} />}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-xl font-bold tracking-[-0.025em] text-ink-900">{p.title}</p>
                  <p className="mt-1 truncate text-[13.5px] text-ink-500">{u.shortName} · {p.city}</p>
                  <dl className="mt-5 grid grid-cols-3 divide-x divide-ink-100 rounded-2xl bg-ink-50/70 py-3 text-center ring-1 ring-ink-100">
                    <div className="px-2"><dt className="text-[11.5px] text-ink-500">Tuition / sem</dt><dd className="tabular mt-0.5 text-[13.5px] font-semibold text-ink-900">{pkr(p.feePerSemester)}</dd></div>
                    <div className="px-2"><dt className="text-[11.5px] text-ink-500">Seats</dt><dd className="tabular mt-0.5 text-[13.5px] font-semibold text-ink-900">{p.seats ?? "—"}</dd></div>
                    <div className="px-2"><dt className="text-[11.5px] text-ink-500">Apply by</dt><dd className="mt-0.5 text-[13.5px] font-semibold text-ink-900">{formatDate(p.deadline)}</dd></div>
                  </dl>
                  <span className="mt-auto flex items-center justify-between pt-6 text-[14.5px] font-semibold text-ink-900">
                    View program
                    <span className="grid size-9 place-items-center rounded-full ring-1 ring-ink-200 transition group-hover:bg-ink-950 group-hover:text-white group-hover:ring-ink-950">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────── Explore ────────────────────────────── */

const FIELDS: { icon: typeof Cpu; name: string; sub: string; id?: FieldId }[] = [
  { icon: Cpu, name: "Computer Science & IT", sub: "CS, AI, Data Science, Software Engineering", id: "computing" },
  { icon: Wrench, name: "Engineering", sub: "Electrical, Civil, Mechanical, Computer", id: "engineering" },
  { icon: Stethoscope, name: "Medicine & Dentistry", sub: "MBBS, BDS, DPT", id: "medicine" },
  { icon: Briefcase, name: "Business & Management", sub: "BBA, Accounting & Finance" },
  { icon: Pill, name: "Pharmacy & Allied Health", sub: "Pharm-D, Nursing, MLT" },
  { icon: Scale, name: "Law", sub: "LLB (5 years)" },
  { icon: Users, name: "Social Sciences", sub: "Psychology, Economics, Media" },
  { icon: Sprout, name: "Agriculture & Food", sub: "Agriculture, Food Science, DVM" },
];

export function ExploreFields() {
  const programs = getPrograms();
  const countFor = (id?: FieldId) => (id ? programs.filter((p) => p.field === id).length : 0);
  const cities = Object.entries(programs.reduce<Record<string, number>>((acc, p) => ({ ...acc, [p.city]: (acc[p.city] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  const [big, wide, ...rest] = FIELDS;
  const BigIcon = big.icon;
  const WideIcon = wide.icon;

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-7">
      <SectionHeading eyebrow="Explore" title="Start with a field you love" description="Every field, with the programs, formulas and past merits behind it." />

      <div className="mt-12 grid auto-rows-[minmax(150px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Featured: the largest field */}
        <Link href="/programs" className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[30px] p-7 text-white sm:col-span-2 lg:row-span-2">
          <SilkBackdrop position="25% 45%" shade="bottom" sizes="(min-width: 1024px) 50vw, 100vw" imageClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
          <span className="grid size-14 place-items-center rounded-2xl bg-white/[0.12] ring-1 ring-white/20 backdrop-blur"><BigIcon className="size-7" aria-hidden /></span>
          <div className="mt-16">
            <p className="text-[13px] font-semibold text-brand-200">{countFor(big.id)} programs on Sccuni</p>
            <p className="mt-2 font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">{big.name}</p>
            <p className="mt-2 max-w-sm text-white/80">{big.sub}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-ink-950 transition group-hover:bg-brand-50">
              Explore programs <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </Link>

        {/* Featured: second field */}
        <Link href="/programs" className="group relative isolate flex items-center gap-5 overflow-hidden rounded-[30px] bg-ink-950 p-7 text-white sm:col-span-2">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_100%_0%,rgb(0_152_124/0.35),transparent_60%)]" />
          <div aria-hidden className="bg-lines-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_80%_20%,#000_10%,transparent_70%)]" />
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/[0.08] ring-1 ring-white/15"><WideIcon className="size-7 text-brand-300" aria-hidden /></span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-brand-200">{countFor(wide.id)} programs on Sccuni</p>
            <p className="mt-1 font-display text-2xl font-extrabold tracking-[-0.035em]">{wide.name}</p>
            <p className="truncate text-[14px] text-white/75">{wide.sub}</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15 transition group-hover:bg-white group-hover:text-ink-950">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </Link>

        {rest.map((f) => {
          const n = countFor(f.id);
          return (
            <Link key={f.name} href="/programs" className="group flex flex-col justify-between gap-4 rounded-[26px] bg-white p-6 shadow-xs ring-1 ring-ink-200/70 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-brand-50 to-ink-50 text-ink-800 ring-1 ring-ink-100 transition group-hover:from-ink-950 group-hover:to-ink-800 group-hover:text-brand-300">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <ArrowUpRight className="size-4 text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" aria-hidden />
              </div>
              <div>
                <p className="font-semibold tracking-[-0.01em] text-ink-900">{f.name}</p>
                <p className="mt-0.5 text-[13px] text-ink-500">{n > 0 ? `${n} ${n === 1 ? "program" : "programs"} · ` : ""}{f.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        <span className="mr-2 text-sm font-medium text-ink-500">Browse by city</span>
        {cities.map(([city, n]) => (
          <Link
            key={city}
            href="/programs"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-white pr-2 pl-3.5 text-[14.5px] font-medium text-ink-800 shadow-xs ring-1 ring-ink-200/80 transition hover:shadow-soft hover:ring-ink-300"
          >
            <MapPin className="size-4 text-brand-600" aria-hidden />
            {city}
            <span className="tabular grid h-7 min-w-7 place-items-center rounded-full bg-ink-50 px-2 text-[12px] font-semibold text-ink-600 transition group-hover:bg-ink-950 group-hover:text-white">{n}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────── Closing soon ────────────────────────────── */

const TYPE_STYLE: Record<AdmissionEvent["type"], { dot: string; label: string }> = {
  application: { dot: "bg-reach", label: "Applications" },
  test: { dot: "bg-target", label: "Entry tests" },
  merit: { dot: "bg-brand-500", label: "Merit lists" },
  scholarship: { dot: "bg-gold-500", label: "Scholarships" },
};

function addDaysIso(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function ClosingSoon() {
  const days = Array.from({ length: 14 }, (_, i) => addDaysIso(DEMO_TODAY, i));
  const upcoming = events.filter((e) => e.date >= DEMO_TODAY).slice(0, 4);
  const lastDay = days[days.length - 1];

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-28 sm:px-7">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="min-w-0 space-y-8">
          <SectionHeading
            eyebrow="Admission calendar"
            title="Closing soon"
            description="Deadlines move fast in admission season. Track the dates that matter to you — and get a reminder before each one."
          />
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Event types">
            {Object.values(TYPE_STYLE).map((t) => (
              <li key={t.label} className="inline-flex items-center gap-2 text-[13.5px] text-ink-600">
                <span className={cn("size-2.5 rounded-full", t.dot)} aria-hidden />
                {t.label}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/admissions-calendar" variant="dark">Open calendar</ButtonLink>
            <ButtonLink href="/sign-in" variant="light"><Bell className="size-4" aria-hidden />Get reminders</ButtonLink>
          </div>
        </div>

        <Reveal className="min-w-0">
          <div className="rounded-[32px] bg-white p-2 shadow-lift ring-1 ring-ink-200/70">
            {/* Two-week strip */}
            <div className="rounded-[26px] bg-linear-to-b from-ink-50 to-white p-5 ring-1 ring-ink-100">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-[17px] font-bold tracking-[-0.02em] text-ink-900">Next two weeks</p>
                <p className="text-[12.5px] text-ink-500">{formatDate(DEMO_TODAY)} – {formatDate(lastDay)}</p>
              </div>
              <ol className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-14" aria-label="Days with admission events">
                {days.map((iso, i) => {
                  const d = new Date(iso + "T00:00:00Z");
                  const dayEvents = events.filter((e) => e.date === iso);
                  const today = i === 0;
                  return (
                    <li
                      key={iso}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-2xl py-2",
                        today ? "bg-ink-950 text-white shadow-[0_8px_20px_rgb(0_26_58/0.25)]" : dayEvents.length ? "bg-white ring-1 ring-ink-200/80" : "",
                      )}
                    >
                      <span className="sr-only">{`${formatDate(iso)}${today ? " (today)" : ""}: ${dayEvents.length ? dayEvents.map((e) => e.title).join(", ") : "no events"}`}</span>
                      <span aria-hidden className={cn("text-[10.5px] font-semibold uppercase", today ? "text-white/70" : "text-ink-500")}>{"SMTWTFS"[d.getUTCDay()]}</span>
                      <span aria-hidden className="tabular font-display text-[15px] font-bold">{d.getUTCDate()}</span>
                      <span aria-hidden className="flex h-1.5 gap-0.5">
                        {dayEvents.slice(0, 3).map((e) => <span key={e.id} className={cn("size-1.5 rounded-full", TYPE_STYLE[e.type].dot)} />)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Timeline */}
            <ol className="relative px-5 pt-5 pb-3">
              <span aria-hidden className="absolute top-8 bottom-8 left-[39px] w-px bg-linear-to-b from-ink-200 via-ink-200 to-transparent" />
              {upcoming.map((e) => (
                <li key={e.id}>
                  <Link href={e.href} className="group relative flex items-center gap-4 rounded-2xl py-3 pr-2 pl-0 transition-colors hover:bg-ink-50/70">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-ink-200">
                      <span className={cn("size-2.5 rounded-full", TYPE_STYLE[e.type].dot)} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold tracking-[0.04em] text-ink-500 uppercase">{formatDate(e.date)} · {TYPE_STYLE[e.type].label.replace(/s$/, "")}</p>
                      <p className="truncate font-semibold text-ink-900">{e.title}</p>
                      <p className="truncate text-[13px] text-ink-500">{e.where}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-full bg-gold-50 px-3 py-1 text-[12.5px] font-semibold text-gold-700 ring-1 ring-gold-100 sm:inline">{relativeDays(e.date)}</span>
                    <ArrowRight className="size-4 shrink-0 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-ink-700" aria-hidden />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────── Our promise ────────────────────────────── */

const STANDARDS = [
  { icon: Users, value: "2", label: "people check every fact before it goes live" },
  { icon: Ban, value: "0", label: "paid placements inside your results" },
  { icon: FileCheck, value: "100%", label: "of numbers linked to an official source" },
  { icon: UserRound, value: "1", label: "profile, checked against every formula" },
];

export function PromiseSection() {
  return (
    <section className="px-3 pb-28 sm:px-5">
      <div className="relative isolate mx-auto max-w-[1280px] overflow-hidden rounded-[40px] px-6 py-20 text-white sm:px-12 lg:py-28">
        <SilkBackdrop position="50% 55%" shade="center" sizes="(min-width: 1280px) 1280px, 100vw" />
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow dark>Our promise</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.3rem,5.2vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-white">
            Merit is a guide,
            <br />
            <span className="text-gradient-emerald">not a guarantee.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-100">
            We show how past closing merits compare with your aggregate — clearly, with sources. We never promise admission, and paid placements never change your results.
          </p>
        </div>
        <dl className="mx-auto mt-14 grid max-w-[1040px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((s) => (
            <div key={s.label} className="rounded-[26px] bg-white/[0.07] p-6 ring-1 ring-white/15 backdrop-blur-xl transition duration-300 hover:bg-white/[0.11]">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="grid size-10 place-items-center rounded-xl bg-white/[0.1] ring-1 ring-white/15"><s.icon className="size-5 text-brand-200" aria-hidden /></span>
                <span className="tabular mt-5 block font-display text-[clamp(2.3rem,3.6vw,3rem)] leading-none font-extrabold tracking-[-0.04em] text-white">{s.value}</span>
                <span className="mt-2 block text-[14.5px] leading-snug text-ink-100">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
