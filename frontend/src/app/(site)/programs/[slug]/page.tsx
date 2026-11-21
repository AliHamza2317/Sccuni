import { ArrowRight, BadgeCheck, Building2, Calculator, CalendarDays, Clock, Columns2, Download, ExternalLink, Flag, GraduationCap, Info, Layers, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SilkCorners } from "@/components/site/silk-backdrop";
import { DetailSkeleton } from "@/components/site/skeletons";
import { MeritHistory, RemindSwitch, SaveButton, ShareButton } from "@/components/programs/program-islands";
import { Monogram, SourceChip, StatusDot, Tag, Verified } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { MeritMeter } from "@/components/ui/merit-meter";
import { Eyebrow } from "@/components/ui/section-heading";
import { feeItems, firstYearCost, getFormula, getProgram, getPrograms, getUniversity, latestClosing } from "@/lib/data";
import { cn, formatDate, pkr } from "@/lib/format";

export function generateStaticParams() {
  return getPrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) return { title: "Program not found" };
  const u = getUniversity(p.universitySlug)!;
  return {
    title: `${p.title} at ${u.shortName}, ${p.city}`,
    description: `Eligibility, merit formula, past closing merits, fees and admission dates for ${p.title} at ${u.name}.`,
  };
}

function addDays(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const SEGMENT_COLORS = ["bg-ink-600", "bg-brand-600", "bg-ink-900"];

/** The shell (header, footer) renders instantly; the page streams in behind a skeleton. */
export default function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProgramContent params={params} />
    </Suspense>
  );
}

async function ProgramContent({ params }: { params: PageProps<"/programs/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) notFound();
  const u = getUniversity(p.universitySlug)!;
  const formula = getFormula(p.formulaId);
  const closing = latestClosing(p);
  const similar = getPrograms().filter((x) => x.field === p.field && x.universitySlug !== p.universitySlug).slice(0, 3);

  const dates = [
    { when: "1 Jun", what: "Applications open", note: "Online portal", state: "done" },
    { when: formatDate(p.deadline), what: "Last date to apply", note: "Don’t leave it late", state: "now" },
    { when: formatDate(addDays(p.deadline, 6)), what: p.test, note: "Bring your admit card", state: "next" },
    { when: formatDate(addDays(p.deadline, 19)), what: "Merit list 1", note: "Then lists 2 and 3", state: "next" },
    { when: "9 Sep", what: "Classes begin", note: formula.session, state: "next" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: p.title,
    provider: { "@type": "CollegeOrUniversity", name: u.name, address: { "@type": "PostalAddress", addressLocality: p.city, addressCountry: "PK" } },
    timeToComplete: `P${p.durationYears}Y`,
    applicationDeadline: p.deadline,
    educationalCredentialAwarded: "Bachelor's degree",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header: clean and light, with the silk as soft accents in the corners */}
      <section className="relative isolate overflow-hidden border-b border-ink-200/60 bg-linear-to-b from-white to-paper">
        <SilkCorners eager corners={["tr", "bl"]} />
        <div className="mx-auto max-w-[1240px] space-y-9 px-5 pt-[116px] pb-12 sm:px-7 lg:pt-[132px] lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-ink-600">
            <Link href="/" className="hover:text-ink-900">Home</Link><span className="text-ink-300">/</span>
            <Link href="/programs" className="hover:text-ink-900">Programs</Link><span className="text-ink-300">/</span>
            <Link href={`/universities/${u.slug}`} className="hover:text-ink-900">{u.shortName}</Link><span className="text-ink-300">/</span>
            <span aria-current="page" className="font-semibold text-ink-900">{p.title}</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex min-w-0 flex-[1_1_560px] items-start gap-5">
              <Monogram text={u.mono} tone={u.tone} size="lg" className="shadow-soft ring-4 ring-white" />
              <div className="min-w-0 space-y-3">
                <h1 className="text-[clamp(2.3rem,4.4vw,3.75rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-ink-950">{p.title}</h1>
                <Link href={`/universities/${u.slug}`} className="flex items-start gap-2 text-ink-600 hover:text-ink-900">
                  <Building2 className="mt-1 size-4 shrink-0" aria-hidden />{u.name} · {p.campus}, {p.city} · {p.shift}
                </Link>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Tag>{u.sector}</Tag>
                  <Tag>Bachelor · {p.durationYears} years</Tag>
                  {p.highlights.map((h) => <Tag key={h} tone="brand"><BadgeCheck className="size-3.5" aria-hidden />{h}</Tag>)}
                  <span className="ml-1"><StatusDot status={p.status}>{p.status === "open" ? `Applications open · closes ${formatDate(p.deadline)}` : `Opens ${p.opensOn ? formatDate(p.opensOn) : "soon"}`}</StatusDot></span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <SaveButton />
              <ButtonLink href="/compare" variant="light"><Columns2 className="size-4" aria-hidden />Compare</ButtonLink>
              <ShareButton />
              <ButtonLink href="#apply">Apply on official website <ExternalLink className="size-4" aria-hidden /></ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* On-this-page links: a floating pill that stays under the header while you read */}
      <div className="sticky top-[76px] z-20 mt-6 px-3">
        <nav aria-label="On this page" className="mx-auto flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-full bg-white/85 p-1 shadow-[0_10px_30px_rgb(0_26_58/0.08)] ring-1 ring-ink-900/[0.07] backdrop-blur-xl">
          {[["#overview", "Overview"], ["#eligibility", "Eligibility"], ["#formula", "Merit formula"], ["#merits", "Past merits"], ["#fees", "Fees"], ["#dates", "Key dates"], ["#apply", "How to apply"]].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900">{label}</a>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-8 px-5 py-10 sm:px-7">
        <div className="min-w-0 flex-[999_1_560px] space-y-6">
          {/* Overview */}
          <section id="overview" aria-label="Key facts" className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              [Clock, "Duration", `${p.durationYears} years`, `${p.durationYears * 2} semesters`],
              [Layers, "Credit hours", p.creditHours ? String(p.creditHours) : "—", "As published"],
              [CalendarDays, "Session", formula.session, `${p.shift} shift`],
              [Users, "Seats", p.seats ? `${p.seats} open merit` : "Not published", "Officially published"],
              [Calculator, "Entry test", p.test, `${formula.testTotal} marks`],
              [GraduationCap, "Degree", "Bachelor", u.sector + " sector"],
            ].map(([Icon, k, v, n]) => {
              const I = Icon as typeof Clock;
              return (
                <div key={k as string} className="rounded-[22px] bg-white p-5 shadow-xs ring-1 ring-ink-200/70">
                  <p className="flex items-center gap-2 text-xs text-ink-500"><I className="size-4" aria-hidden />{k as string}</p>
                  <p className="mt-2 text-lg font-bold">{v as string}</p>
                  <p className="text-xs text-ink-500">{n as string}</p>
                </div>
              );
            })}
          </section>

          {/* Eligibility */}
          <Panel id="eligibility" eyebrow="Step 1" title="Who can apply" aside={<Verified>Verified for {formula.session}</Verified>}>
            <ul className="overflow-hidden rounded-2xl border border-ink-200">
              {p.eligibility.map((r) => (
                <li key={r.title} className="flex items-start gap-3.5 border-b border-ink-100 px-5 py-4 last:border-0">
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-[10px]", r.conditional ? "bg-gold-100 text-gold-700" : "bg-brand-50 text-brand-700")}>
                    {r.conditional ? <Info className="size-4" aria-hidden /> : <BadgeCheck className="size-4" aria-hidden />}
                  </span>
                  <span><b className="block text-[15px]">{r.title}</b><span className="text-sm text-ink-500">{r.note}</span></span>
                </li>
              ))}
            </ul>
            <p className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-ink-50 p-4 text-sm text-ink-700">
              <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
              Sccuni checks these rules automatically when you enter your marks. If you don’t meet a mandatory rule, we tell you why — and never recommend this program to you.
            </p>
            <SourceChip title={formula.source.title} locator="eligibility section" />
          </Panel>

          {/* Formula */}
          <Panel id="formula" eyebrow="Step 2" title="How your aggregate is calculated" aside={<Tag>Formula v{formula.version}</Tag>}>
            <div className="flex h-12 gap-1 overflow-hidden rounded-2xl" role="img" aria-label={`Weights: ${formula.components.map((c) => `${c.label} ${c.weight}%`).join(", ")}`}>
              {formula.components.map((c, i) => (
                <div key={c.key} className={cn("flex min-w-0 items-center justify-center px-2 text-[13px] font-bold text-white", SEGMENT_COLORS[(i + 3 - formula.components.length) % 3])} style={{ flex: c.weight }}>
                  <span className="truncate">{c.label} · {c.weight}%</span>
                </div>
              ))}
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {formula.rules.map((r) => (
                <li key={r} className="flex gap-2.5 rounded-2xl bg-ink-50 p-4 text-sm"><BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />{r}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SourceChip title={formula.source.title} locator={formula.source.locator} />
              <ButtonLink href="/merit-calculator"><Calculator className="size-4" aria-hidden />Calculate my aggregate</ButtonLink>
            </div>
          </Panel>

          {/* Merits */}
          <Panel id="merits" eyebrow="Step 3" title="Past closing merits">
            {p.history.length ? (
              <MeritHistory history={p.history} />
            ) : (
              <p className="rounded-2xl bg-ink-50 p-5 text-ink-600">This is a new program — the first merit lists will be published after the Fall 2027 intake. Until then, Best Fit shows it under “No data”.</p>
            )}
            <SourceChip title="Official merit lists 2023–2025" locator={`${u.shortName} admissions office`} />
          </Panel>

          {/* Fees */}
          <Panel id="fees" eyebrow="Costs" title="Fee structure · 2027–28" aside={<Tag>Open merit seats</Tag>}>
            <div className="overflow-x-auto rounded-2xl border border-ink-200">
              <table className="w-full min-w-[460px] text-[14.5px]">
                <caption className="sr-only">Fee structure</caption>
                <thead><tr className="bg-ink-50 text-left text-xs font-bold tracking-[0.06em] text-ink-500 uppercase"><th scope="col" className="px-4 py-3">Item</th><th scope="col" className="px-4 py-3">When</th><th scope="col" className="px-4 py-3 text-right">Amount</th></tr></thead>
                <tbody>
                  {feeItems(p).map((f) => (
                    <tr key={f.item} className="border-t border-ink-100">
                      <th scope="row" className="px-4 py-3.5 text-left font-bold">{f.item}{f.refundable && <Tag tone="brand" className="ml-2">Refundable</Tag>}</th>
                      <td className="px-4 py-3.5 text-ink-500">{f.when}</td>
                      <td className="tabular px-4 py-3.5 text-right font-bold">{pkr(f.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink-900 px-6 py-5 text-white">
              <div><p className="text-ink-300">Estimated first-year cost</p><p className="text-xs text-ink-400">Excludes hostel and transport · includes one-time charges</p></div>
              <p className="tabular font-display text-3xl font-extrabold tracking-tight">{pkr(firstYearCost(p))}</p>
            </div>
            <SourceChip title="Fee schedule 2027–28" locator={`${u.shortName} accounts office`} />
          </Panel>

          {/* Dates */}
          <Panel id="dates" eyebrow={formula.session} title="Key dates" aside={<div className="flex flex-wrap items-center gap-3"><ButtonLink href="/admissions-calendar" variant="light" size="sm"><Download className="size-4" aria-hidden />Add to calendar</ButtonLink><RemindSwitch /></div>}>
            <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {dates.map((d) => (
                <li key={d.what} className={cn("space-y-1 border-t-[3px] pt-4", d.state === "done" ? "border-brand-500" : d.state === "now" ? "border-gold-500" : "border-ink-200")}>
                  <p className="text-xs font-bold tracking-[0.06em] text-ink-500 uppercase">{d.when}</p>
                  <p className="font-bold">{d.what}</p>
                  <p className="text-xs text-ink-500">{d.note}</p>
                </li>
              ))}
            </ol>
          </Panel>

          {/* Apply */}
          <Panel id="apply" eyebrow="Apply" title="How to apply">
            <ol className="grid gap-3 sm:grid-cols-2">
              {[["Create an account", `Register on the official ${u.shortName} admissions portal with your CNIC or B-Form.`], ["Fill the form", "Enter academic details and choose programs in order of preference."], ["Pay the fee", "Pay the application fee through the bank challan or online payment."], ["Take the test", "Download your admit card and appear in the entry test on your date."]].map(([t, d], i) => (
                <li key={t} className="space-y-2 rounded-2xl border border-ink-200 p-5">
                  <span className="grid size-8 place-items-center rounded-[10px] bg-ink-900 font-display text-sm font-extrabold text-white">{i + 1}</span>
                  <p className="font-bold">{t}</p>
                  <p className="text-sm text-ink-500">{d}</p>
                </li>
              ))}
            </ol>
            <div className="space-y-2.5">
              <p className="text-sm font-bold">Documents you’ll need</p>
              <div className="flex flex-wrap gap-2">{["CNIC or B-Form", "Matric certificate", "HSSC / Part-I result card", "Domicile certificate", "2 passport photos", "Test admit card"].map((d) => <Tag key={d} tone="outline">{d}</Tag>)}</div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-5">
              <p className="text-sm text-ink-500">Application fee: <b className="text-ink-900">PKR 3,000</b> · paid on the official portal</p>
              <ButtonLink href="#apply" variant="dark">Official admissions portal <ExternalLink className="size-4" aria-hidden /></ButtonLink>
            </div>
          </Panel>

          <a id="report" href="#report" className="flex items-center gap-2.5 px-1 text-sm text-ink-500 hover:text-ink-800">
            <Flag className="size-4" aria-hidden />Something wrong on this page? <span className="font-semibold text-brand-700 underline-offset-4 hover:underline">Report incorrect information</span>
          </a>

          {similar.length > 0 && (
            <section className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold">Similar programs</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {similar.map((s) => {
                  const su = getUniversity(s.universitySlug)!;
                  return (
                    <Link key={s.slug} href={`/programs/${s.slug}`} className="group space-y-4 rounded-3xl bg-white ring-1 ring-ink-200/70 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                      <div className="flex items-center gap-3"><Monogram text={su.mono} tone={su.tone} /><div className="min-w-0"><p className="font-bold">{s.title}</p><p className="truncate text-xs text-ink-500">{su.shortName} · {s.city}</p></div></div>
                      <div className="flex justify-between text-sm"><span className="text-ink-500">Last closing</span><b className="tabular">{latestClosing(s) ? `${latestClosing(s)!.toFixed(2)}%` : "New"}</b></div>
                      <div className="flex justify-between text-sm"><span className="text-ink-500">Tuition / semester</span><b className="tabular">{pkr(s.feePerSemester)}</b></div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Aside */}
        <aside className="w-full space-y-4 lg:sticky lg:top-[140px] lg:w-[360px]">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-ink-950 p-7 text-white shadow-lift">
            <div aria-hidden className="absolute -top-32 -right-28 -z-10 size-80 rounded-full bg-brand-500/30 blur-3xl" />
            <div aria-hidden className="bg-noise absolute inset-0 -z-10 opacity-[0.18] mix-blend-soft-light" />
            <Eyebrow dark>Where do you stand?</Eyebrow>
            <h2 className="text-gradient-light mt-4 text-[24px] leading-tight font-extrabold tracking-[-0.03em]">See your aggregate for this program</h2>
            <p className="mt-2 text-sm text-ink-300">Uses the verified {formula.session} formula and compares you with the last three years of closing merits.</p>
            {p.history.length > 0 && (
              <MeritMeter className="mt-7" dark value={null} marks={p.history.map((h) => ({ label: `’${String(h.year).slice(2)}`, value: h.open[2] })).reverse()} />
            )}
            <div className="mt-6 space-y-2.5">
              <ButtonLink href="/merit-calculator" className="w-full">Calculate my aggregate</ButtonLink>
              <ButtonLink href="/merit-calculator" variant="ondark" className="w-full">What test score do I need?</ButtonLink>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-xs ring-1 ring-ink-200/70">
            <p className="font-display font-bold">Quick facts</p>
            <dl className="mt-3 divide-y divide-ink-100 text-sm">
              {[["Apply by", formatDate(p.deadline, true)], ["Tuition / semester", pkr(p.feePerSemester)], ["Entry test", p.test], ["Application fee", "PKR 3,000"], ["Last closing (final)", closing ? `${closing.toFixed(2)}%` : "New program"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-ink-500">{k}</dt><dd className="text-right font-bold">{v}</dd></div>
              ))}
            </dl>
            <Link href={`/universities/${u.slug}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">About {u.shortName} <ArrowRight className="size-4" aria-hidden /></Link>
          </div>

          <div className="rounded-[28px] bg-brand-50/70 p-6 ring-1 ring-brand-100">
            <p className="flex items-center gap-2 font-bold text-brand-800"><ShieldCheck className="size-5" aria-hidden />Data verified</p>
            <p className="mt-2 text-sm text-ink-700">Every figure on this page was checked against official documents by two reviewers on <b>{u.lastVerified}</b>.</p>
            <ul className="mt-3 space-y-1 text-[13px] text-ink-600">
              <li>· {formula.source.title} (PDF)</li><li>· Fee schedule 2027–28</li><li>· Official merit lists 2023–2025</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function Panel({ id, eyebrow, title, aside, children }: { id: string; eyebrow: string; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[140px] space-y-6 rounded-[28px] bg-white p-6 shadow-xs ring-1 ring-ink-200/70 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-3">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[26px] leading-tight font-extrabold tracking-[-0.03em]">{title}</h2>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
