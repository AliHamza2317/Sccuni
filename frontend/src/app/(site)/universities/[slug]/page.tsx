import { ArrowRight, BadgeCheck, Calculator, ExternalLink, FileText, Flag, Globe, Info, Mail, MapPin, Phone, ShieldCheck, TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SilkBackdrop } from "@/components/site/silk-backdrop";
import { DetailSkeleton } from "@/components/site/skeletons";
import { InquiryForm, UniversityPrograms } from "@/components/programs/university-islands";
import { SaveButton } from "@/components/programs/program-islands";
import { Monogram, Tag, Verified } from "@/components/ui/badges";
import { ButtonLink } from "@/components/ui/button";
import { getFormula, getProgramsByUniversity, getUniversities, getUniversity, latestClosing, scholarships } from "@/lib/data";
import { cn, pkr } from "@/lib/format";

export function generateStaticParams() {
  return getUniversities().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps<"/universities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) return { title: "University not found" };
  return { title: `${u.name}, ${u.city}`, description: `Programs, merit formula, past merits, fees, campuses and admission dates for ${u.name}.` };
}

/** The shell (header, footer) renders instantly; the page streams in behind a skeleton. */
export default function UniversityPage({ params }: PageProps<"/universities/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton dark />}>
      <UniversityContent params={params} />
    </Suspense>
  );
}

async function UniversityContent({ params }: { params: PageProps<"/universities/[slug]">["params"] }) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();
  const programs = getProgramsByUniversity(u.slug);
  const formula = getFormula(u.formulaId);
  const uniScholarships = scholarships.filter((s) => s.provider === u.name).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: u.name,
    address: { "@type": "PostalAddress", addressLocality: u.city, addressRegion: u.province, addressCountry: "PK" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section data-header-theme="dark" className="relative isolate overflow-hidden rounded-b-[28px] bg-ink-950 text-white sm:rounded-b-[40px]">
        <SilkBackdrop eager position="35% 55%" />
        <div className="mx-auto max-w-[1240px] space-y-9 px-5 pt-[112px] pb-12 sm:px-7 lg:pt-[120px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-white/70">
            <Link href="/" className="hover:text-white">Home</Link><span className="text-white/35">/</span><Link href="/programs" className="hover:text-white">Universities</Link><span className="text-white/35">/</span><span aria-current="page" className="font-semibold text-white">{u.shortName}</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex min-w-0 flex-[1_1_560px] items-center gap-5">
              <Monogram text={u.mono} tone={u.tone} size="lg" className="ring-4 ring-white/10" />
              <div className="min-w-0 space-y-3">
                <h1 className="text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.045em] text-white">{u.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <Tag tone="ondark"><MapPin className="size-3.5" aria-hidden />{u.city}, {u.province}</Tag>
                  <Tag tone="ondark">{u.sector}</Tag>
                  <Tag tone="ondark">Chartered by {u.charteredBy}</Tag>
                  <Verified>HEC recognised</Verified>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <SaveButton onDark />
              <ButtonLink href="#contact">Official website <ExternalLink className="size-4" aria-hidden /></ButtonLink>
            </div>
          </div>
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.12] backdrop-blur-xl md:grid-cols-4">
            {[["Programs on Sccuni", `${u.programsOnSccuni} undergraduate`], ["Campuses", `${u.campuses.length} ${u.campuses.length === 1 ? "campus" : "campuses"}`], ["Admission session", `${formula.session} · open`], ["Tuition / semester", `From ${pkr(u.tuitionFrom)}`]].map(([k, v], i) => (
              <div key={k} className={cn("p-5", i > 0 && "md:border-l md:border-white/[0.08]", i % 2 === 1 && "border-l border-white/[0.08]", i > 1 && "border-t border-white/[0.08] md:border-t-0")}>
                <dt className="text-[12.5px] text-ink-200">{k}</dt>
                <dd className="mt-1.5 text-lg font-semibold tracking-[-0.01em]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="sticky top-[76px] z-20 mt-6 px-3">
        <nav aria-label="On this page" className="mx-auto flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-full bg-white/85 p-1 shadow-[0_10px_30px_rgb(0_26_58/0.08)] ring-1 ring-ink-900/[0.07] backdrop-blur-xl">
          {[["#about", "Overview"], ["#programs", "Programs"], ["#admissions", "Admissions"], ["#campuses", "Campuses"], ["#scholarships", "Scholarships"], ["#contact", "Contact"]].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900">{label}</a>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-8 px-5 py-10 sm:px-7">
        <div className="min-w-0 flex-[999_1_560px] space-y-6">
          <Card id="about" title="About">
            <p className="text-[16.5px] leading-relaxed text-ink-600">{u.about}</p>
            <div className="flex flex-wrap gap-2">{u.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </Card>

          <Card id="programs" title={`Programs · ${formula.session}`}>
            <UniversityPrograms total={u.programsOnSccuni} rows={programs.map((p) => ({ slug: p.slug, title: p.title, field: p.field, campus: `${p.campus} · ${p.shift}`, fee: p.feePerSemester, closing: latestClosing(p) }))} />
          </Card>

          <Card id="admissions" title={`Admissions · ${formula.session}`}>
            <div className="grid gap-3.5 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl bg-ink-50 p-5">
                <p className="flex items-center gap-2 font-bold"><FileText className="size-4 text-target" aria-hidden />{u.testName}</p>
                <p className="text-sm text-ink-500">{formula.testTotal} marks · pass mark 33% · check the calendar for registration and test dates.</p>
              </div>
              <div className="space-y-2 rounded-2xl bg-ink-50 p-5">
                <p className="flex items-center gap-2 font-bold"><Calculator className="size-4 text-brand-600" aria-hidden />Merit formula</p>
                <p className="text-sm text-ink-500">{formula.components.map((c) => `${c.label} ${c.weight}%`).join(" · ")}.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/admissions-calendar" variant="light">See all dates</ButtonLink>
              <ButtonLink href="/merit-calculator" variant="dark">Calculate my aggregate <ArrowRight className="size-4" aria-hidden /></ButtonLink>
            </div>
          </Card>

          <Card id="campuses" title="Campuses">
            <ul className="grid gap-3.5 md:grid-cols-3">
              {u.campuses.map((c) => (
                <li key={c.name} className="space-y-2 rounded-2xl border border-ink-200 p-5">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-sm text-ink-500">{c.address}</p>
                  <Tag tone={c.status === "admissions-closed" ? "danger" : "brand"}>
                    {c.status === "admissions-closed" ? <TriangleAlert className="size-3.5" aria-hidden /> : <BadgeCheck className="size-3.5" aria-hidden />}{c.note}
                  </Tag>
                </li>
              ))}
            </ul>
            <p className="flex items-start gap-3 rounded-2xl border border-[#f6e2ba] bg-gold-50 p-4 text-sm text-[#5c3d07]">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />Campus status comes from HEC’s list of recognised campuses. Before you apply to any campus, Sccuni checks that HEC still lists it as approved.
            </p>
          </Card>

          <Card id="scholarships" title="Scholarships" action={<Link href="/scholarships" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">All scholarships <ArrowRight className="size-4" aria-hidden /></Link>}>
            {uniScholarships.length ? (
              <div className="grid gap-3.5 md:grid-cols-2">
                {uniScholarships.map((s) => (
                  <Link key={s.id} href="/scholarships" className="space-y-2 rounded-2xl border border-ink-200 p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
                    <Tag tone={s.kinds.includes("need") ? "brand" : "blue"}>{s.kinds.includes("need") ? "Need-based" : "Merit"}</Tag>
                    <p className="font-bold">{s.name}</p>
                    <p className="text-sm text-ink-500">{s.coverage}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-ink-500">Government and provincial scholarships also apply to students here — see the full scholarship directory.</p>
            )}
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4">
            <p className="flex items-center gap-2 text-sm text-ink-700"><ShieldCheck className="size-4 text-brand-700" aria-hidden />Profile verified on <b>{u.lastVerified}</b> from the official prospectus, fee schedule and HEC lists.</p>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"><Flag className="size-4" aria-hidden />Report incorrect information</a>
          </div>
        </div>

        <aside id="contact" className="w-full space-y-4 lg:sticky lg:top-[140px] lg:w-[360px]">
          <div className="space-y-3.5 rounded-[28px] bg-white p-6 shadow-xs ring-1 ring-ink-200/70">
            <p className="font-display font-bold">Contact</p>
            {[[Globe, "Website", "[official website URL]"], [Mail, "Admissions email", "[admissions email]"], [Phone, "Phone", "[admissions phone]"], [MapPin, "Address", `${u.campuses[0].address}, ${u.province}`]].map(([Icon, k, v]) => {
              const I = Icon as typeof Globe;
              return (
                <div key={k as string} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink-100 text-ink-700"><I className="size-4" aria-hidden /></span>
                  <div className="min-w-0"><p className="text-xs text-ink-500">{k as string}</p><p className="font-semibold break-words">{v as string}</p></div>
                </div>
              );
            })}
          </div>
          <div className="space-y-4 rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70">
            <div>
              <p className="font-display font-bold">Ask the admissions office</p>
              <p className="text-sm text-ink-500">Your question goes to the university only if you agree below.</p>
            </div>
            <InquiryForm universityName={u.shortName} />
          </div>
        </aside>
      </div>
    </>
  );
}

function Card({ id, title, action, children }: { id: string; title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[140px] space-y-6 rounded-[28px] bg-white p-6 shadow-xs ring-1 ring-ink-200/70 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[26px] leading-tight font-extrabold tracking-[-0.03em]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
