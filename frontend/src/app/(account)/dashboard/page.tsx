import { ArrowRight, BadgeCheck, Columns2, ExternalLink, Layers, Plus, Search, ShieldCheck, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppShell, UnreadBell, type ShellLink } from "@/components/account/app-shell";
import { GroupPill, Monogram, Tag } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { bestFit, sampleStudent } from "@/lib/data";
import { cn, daysUntil, formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "My dashboard", robots: { index: false } };

const links: { items: ShellLink[] }[] = [
  {
    items: [
      { href: "/dashboard", label: "Overview", icon: "LayoutGrid" },
      { href: "/merit-calculator", label: "My marks & profile", icon: "User" },
      { href: "/best-fit", label: "Best Fit", icon: "Target" },
      { href: "/compare", label: "Saved programs", icon: "Bookmark" },
      { href: "/merit-calculator", label: "Calculations", icon: "Calculator" },
      { href: "/admissions-calendar", label: "Deadlines", icon: "CalendarDays", badge: "3" },
      { href: "/scholarships", label: "Scholarships", icon: "Award" },
      { href: "/dashboard#settings", label: "Settings", icon: "Settings" },
    ],
  },
];

const SAVED = ["northstar-bs-computer-science", "northstar-bs-electrical-engineering", "highland-bs-software-engineering", "northstar-bs-artificial-intelligence"];

export default function DashboardPage() {
  const s = sampleStudent;
  const { results } = bestFit(s);
  const count = (g: string) => results.filter((r) => r.group === g).length;
  const saved = SAVED.map((slug) => results.find((r) => r.program.slug === slug)!).filter(Boolean);
  const next = saved.map((r) => r.program.deadline).sort()[0];

  return (
    <AppShell
      title="Dashboard"
      links={links}
      footer={
        <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-sm font-bold text-brand-800">Need help choosing?</p>
          <p className="mt-1 text-xs text-ink-600">Build a balanced list of Safe, Target and Reach programs.</p>
          <Link href="/best-fit" className="mt-2 inline-flex text-xs font-semibold text-brand-700">Open Best Fit →</Link>
        </div>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-500">Thursday, 8 July 2027</p>
          <h1 className="text-[2rem] leading-tight font-extrabold tracking-[-0.03em]">Good evening, {s.name}</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <label className="hidden h-11 items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 md:flex">
            <Search className="size-4 text-ink-400" aria-hidden /><span className="sr-only">Search</span>
            <input placeholder="Search programs" className="w-48 bg-transparent text-sm outline-none" />
          </label>
          <UnreadBell />
          <span className="grid size-11 place-items-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-800" aria-label={`Signed in as ${s.name}`}>{s.initials}</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="space-y-4 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6">
          <div className="flex justify-between"><h2 className="font-display font-bold">Your profile</h2><b className="text-sm">80%</b></div>
          <div className="h-2 overflow-hidden rounded-full bg-ink-100"><div className="h-full w-4/5 rounded-full bg-linear-to-r from-brand-400 to-brand-600" /></div>
          <ul className="space-y-2.5 text-sm">
            {[["Matric marks", true], ["FSc Part-I marks", true], ["Entry test (expected)", true], ["Domicile — needed for quota seats", false]].map(([t, done]) => (
              <li key={t as string} className="flex items-center gap-2.5">
                <span className={cn("grid size-5 place-items-center rounded-md", done ? "bg-brand-50 text-brand-700" : "bg-gold-100 text-gold-700")}>{done ? <BadgeCheck className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}</span>
                {t as string}
              </li>
            ))}
          </ul>
          <ButtonLink href="/merit-calculator" variant="light" size="sm">Add domicile</ButtonLink>
        </section>

        <section className="space-y-4 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6">
          <div className="flex justify-between"><h2 className="font-display font-bold">Best fit</h2><Link href="/best-fit" className="text-sm font-semibold text-brand-700">View all</Link></div>
          <div className="grid grid-cols-3 gap-2.5">
            {([["safe", "bg-safe-bg text-safe"], ["target", "bg-target-bg text-target"], ["reach", "bg-reach-bg text-reach"]] as const).map(([g, cls]) => (
              <Link key={g} href="/best-fit" className={cn("rounded-2xl p-4 transition hover:-translate-y-0.5", cls)}>
                <p className="text-[11px] font-extrabold tracking-[0.08em] uppercase">{g}</p>
                <p className="tabular mt-1 font-display text-3xl font-extrabold">{count(g)}</p>
              </Link>
            ))}
          </div>
          <p className="text-xs text-ink-500">Based on an expected test score of {s.testPercent}%. Update it after your test.</p>
        </section>

        <section className="relative isolate space-y-3 overflow-hidden rounded-3xl bg-ink-900 p-6 text-white shadow-lift">
          <div aria-hidden className="absolute -top-28 -right-24 -z-10 size-72 rounded-full bg-brand-500/30 blur-3xl" />
          <p className="text-xs font-bold tracking-[0.1em] text-brand-400 uppercase">Next deadline</p>
          <p className="flex items-end gap-2"><span className="tabular font-display text-6xl leading-none font-extrabold">{daysUntil(next)}</span><span className="pb-1.5 text-ink-300">days left</span></p>
          <p className="text-sm text-ink-200">Applications close on <b>{formatDate(next)}</b> for your saved programs.</p>
          <ButtonLink href={`/programs/${SAVED[0]}`} size="sm">Open application <ExternalLink className="size-3.5" aria-hidden /></ButtonLink>
        </section>
      </div>

      <section className="space-y-4 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold">Saved programs</h2><ButtonLink href="/compare" variant="light" size="sm"><Columns2 className="size-4" aria-hidden />Compare saved</ButtonLink></div>
        <div className="overflow-x-auto rounded-2xl border border-ink-200">
          <table className="w-full min-w-[680px] text-[14.5px]">
            <caption className="sr-only">Saved programs</caption>
            <thead><tr className="bg-ink-50 text-left text-xs font-bold tracking-[0.06em] text-ink-500 uppercase"><th scope="col" className="px-4 py-3">Program</th><th scope="col" className="px-4 py-3">Group</th><th scope="col" className="px-4 py-3 text-right">You</th><th scope="col" className="px-4 py-3 text-right">Closing ’25</th><th scope="col" className="px-4 py-3 text-right">Apply by</th></tr></thead>
            <tbody>
              {saved.map((r) => (
                <tr key={r.program.slug} className="border-t border-ink-100 hover:bg-ink-50/60">
                  <th scope="row" className="px-4 py-3 text-left font-normal">
                    <Link href={`/programs/${r.program.slug}`} className="flex items-center gap-3"><Monogram text={r.university.mono} tone={r.university.tone} size="sm" /><span><b className="block">{r.program.title}</b><span className="text-xs text-ink-500">{r.university.shortName} · {r.program.city}</span></span></Link>
                  </th>
                  <td className="px-4 py-3"><GroupPill group={r.group} size="sm" /></td>
                  <td className="tabular px-4 py-3 text-right font-bold">{r.aggregate.toFixed(2)}</td>
                  <td className="tabular px-4 py-3 text-right">{r.program.history[0]?.open[2].toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">{formatDate(r.program.deadline)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-3.5 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6 sm:p-7">
          <h2 className="text-xl font-bold">Saved calculations</h2>
          {[["BS Computer Science · Northstar", "Formula v2027.1 · saved 6 Jul 2027 · expected test score", "86.8636", ""], ["BS Software Engineering · Highland", "Formula v2027.1 · saved 2 Jul 2027", "88.1445", "Formula updated to v2027.2 — this snapshot keeps v2027.1"], ["BS Artificial Intelligence · Greenfield", "Formula v2027.1 · saved 28 Jun 2027", "88.5364", ""]].map(([t, m, a, note]) => (
            <div key={t} className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 p-4">
              <div className="min-w-0 space-y-1"><p className="text-sm font-bold">{t}</p><p className="text-xs text-ink-500">{m}</p>{note && <Tag tone="gold">{note}</Tag>}</div>
              <p className="tabular font-display text-2xl font-extrabold tracking-tight">{a}</p>
            </div>
          ))}
        </section>
        <section className="space-y-1 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6 sm:p-7">
          <h2 className="pb-2 text-xl font-bold">Updates</h2>
          {[[TrendingUp, "bg-target-bg text-target", "Merit list 1 published for BS Electrical Engineering, Northstar.", "2 hours ago"], [ShieldCheck, "bg-brand-50 text-brand-700", "Fee schedule 2027–28 verified for Highland Institute of Computing.", "Yesterday"], [Layers, "bg-gold-100 text-gold-700", "Highland updated its merit formula (v2027.2). Your saved result is unchanged.", "3 days ago"]].map(([Icon, cls, t, w]) => {
            const I = Icon as typeof TrendingUp;
            return (
              <div key={t as string} className="flex items-start gap-3 border-t border-ink-100 py-3.5">
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", cls as string)}><I className="size-4" aria-hidden /></span>
                <div><p className="text-sm">{t as string}</p><p className="text-xs text-ink-500">{w as string}</p></div>
              </div>
            );
          })}
          <Link href="/admissions-calendar" className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-700">All deadlines <ArrowRight className="size-4" aria-hidden /></Link>
        </section>
      </div>
    </AppShell>
  );
}
