"use client";

import { ArrowRight, Bookmark, Check, ChevronLeft, ChevronRight, Columns2, MapPin, Plus, Search, SlidersHorizontal, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Monogram, StatusDot, Tag } from "@/components/ui/badges";
import { PageHeader } from "@/components/site/page-header";
import { Button, ButtonLink } from "@/components/ui/button";
import { Chip, Segmented, Switch } from "@/components/ui/controls";
import { cn, formatDate, pkr } from "@/lib/format";
import type { FieldId, Program, University } from "@/lib/types";

export interface ExplorerItem {
  program: Program;
  university: University;
  closing?: number;
}

const FIELDS: { id: FieldId | "all"; label: string }[] = [
  { id: "all", label: "All fields" },
  { id: "computing", label: "Computer Science & IT" },
  { id: "engineering", label: "Engineering" },
  { id: "medicine", label: "Medicine" },
  { id: "business", label: "Business" },
];

type Sort = "match" | "fee" | "deadline" | "merit";

/**
 * Applies ?field= and ?q= from the URL once (for links such as "Browse programs" on the home page).
 * Reading the URL sits in its own <Suspense>, so the program list itself still prerenders.
 */
function UrlFilters({ onApply }: { onApply: (f: { field: FieldId | null; q: string | null }) => void }) {
  const params = useSearchParams();
  const applied = useRef(false);
  useEffect(() => {
    if (applied.current) return;
    applied.current = true;
    const f = params.get("field");
    const known = FIELDS.find((x) => x.id === f && x.id !== "all");
    onApply({ field: known ? (known.id as FieldId) : null, q: params.get("q") });
  }, [params, onApply]);
  return null;
}

export function ProgramExplorer({ items }: { items: ExplorerItem[] }) {
  const [field, setField] = useState<FieldId | "all">("all");
  const [sector, setSector] = useState<"all" | "Public" | "Private">("all");
  const [feeMax, setFeeMax] = useState(500000);
  const [openOnly, setOpenOnly] = useState(false);
  const [province, setProvince] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("match");
  const [compare, setCompare] = useState<string[]>(["northstar-bs-computer-science", "highland-bs-software-engineering"]);
  const [saved, setSaved] = useState<string[]>(["northstar-bs-computer-science"]);

  const provinces = useMemo(() => Array.from(new Set(items.map((i) => i.program.province))), [items]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter(({ program: p, university: u }) =>
      (field === "all" || p.field === field) &&
      (sector === "all" || u.sector === sector) &&
      p.feePerSemester * 2 <= feeMax &&
      (!openOnly || p.status === "open") &&
      (province.length === 0 || province.includes(p.province)) &&
      (!q || `${p.title} ${u.name} ${u.shortName} ${p.city}`.toLowerCase().includes(q)),
    );
    if (sort === "fee") list = [...list].sort((a, b) => a.program.feePerSemester - b.program.feePerSemester);
    if (sort === "deadline") list = [...list].sort((a, b) => a.program.deadline.localeCompare(b.program.deadline));
    if (sort === "merit") list = [...list].sort((a, b) => (b.closing ?? 0) - (a.closing ?? 0));
    return list;
  }, [items, field, sector, feeMax, openOnly, province, query, sort]);

  const toggle = (arr: string[], id: string, max: number) => (arr.includes(id) ? arr.filter((x) => x !== id) : arr.length >= max ? arr : [...arr, id]);
  const reset = () => { setField("all"); setSector("all"); setFeeMax(500000); setOpenOnly(false); setProvince([]); setQuery(""); };
  const compared = items.filter((i) => compare.includes(i.program.slug));

  return (
    <>
      <Suspense fallback={null}>
        <UrlFilters
          onApply={({ field: f, q }) => {
            if (f) setField(f);
            if (q) setQuery(q);
          }}
        />
      </Suspense>
      <PageHeader
        corners={["tr", "bl"]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
        eyebrow="Explore programs"
        title="Find your program"
        description="Undergraduate programs with verified fees, formulas and past merits."
        actions={<ButtonLink href="/best-fit" variant="light"><Target className="size-4" aria-hidden />Match programs to my marks</ButtonLink>}
      >
        <div className="space-y-5">
          <div role="search" className="flex flex-wrap items-center gap-1 rounded-[24px] bg-white p-1.5 shadow-lift ring-1 ring-ink-200/80 transition focus-within:ring-brand-500/40 sm:flex-nowrap sm:rounded-full">
            <label className="flex h-12 min-w-0 flex-[1_1_100%] items-center gap-3 pr-2 pl-4 sm:flex-1">
              <Search className="size-[18px] shrink-0 text-ink-400" aria-hidden />
              <span className="sr-only">Search programs</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a program, university or city" className="h-full w-full min-w-0 bg-transparent text-[15.5px] outline-none placeholder:text-ink-400" />
            </label>
            <span aria-hidden className="hidden h-7 w-px bg-ink-200 sm:block" />
            <label className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full bg-ink-50 px-4 sm:w-[200px] sm:flex-none sm:bg-transparent">
              <MapPin className="size-[18px] shrink-0 text-ink-400" aria-hidden />
              <span className="sr-only">City</span>
              <select className="h-full w-full cursor-pointer bg-transparent text-[15px] text-ink-700 outline-none"><option>Any city</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Peshawar</option><option>Rawalpindi</option></select>
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {FIELDS.map((f) => <Chip key={f.id} active={field === f.id} onClick={() => setField(f.id)}>{f.label}</Chip>)}
          </div>
        </div>
      </PageHeader>

      <section className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-8 px-5 py-10 sm:px-7">
        {/* Filters */}
        <aside aria-label="Filters" className="w-full rounded-3xl bg-white ring-1 ring-ink-200/70 p-6 shadow-xs lg:sticky lg:top-24 lg:w-[280px]">
          <div className="flex items-center justify-between pb-3">
            <span className="flex items-center gap-2 font-display font-bold"><SlidersHorizontal className="size-[18px]" aria-hidden />Filters</span>
            <Button variant="ghost" size="sm" onClick={reset}>Clear all</Button>
          </div>
          <FilterGroup title="Sector">
            <Segmented label="Sector" value={sector} onChange={setSector} options={[{ value: "all", label: "All" }, { value: "Public", label: "Public" }, { value: "Private", label: "Private" }]} />
          </FilterGroup>
          <FilterGroup title="Annual tuition">
            <input aria-label="Maximum annual tuition" type="range" min={100000} max={500000} step={10000} value={feeMax} onChange={(e) => setFeeMax(Number(e.target.value))} className="w-full accent-brand-600" />
            <div className="mt-1 flex justify-between text-xs text-ink-500"><span>PKR 100k</span><b className="text-ink-900">{feeMax >= 500000 ? "Any fee" : `Up to ${pkr(feeMax)}`}</b></div>
          </FilterGroup>
          <FilterGroup title="Province">
            {provinces.map((p) => (
              <label key={p} className="flex min-h-9 cursor-pointer items-center gap-3 text-[14.5px] text-ink-700">
                <input type="checkbox" className="size-[18px] accent-brand-600" checked={province.includes(p)} onChange={() => setProvince((cur) => toggle(cur, p, 99))} />
                {p}
                <span className="ml-auto text-xs text-ink-500">{items.filter((i) => i.program.province === p).length}</span>
              </label>
            ))}
          </FilterGroup>
          <FilterGroup title="Admission" last>
            <div className="space-y-3">
              <Switch checked={openOnly} onChange={setOpenOnly}>Open now only</Switch>
              <Switch checked onChange={() => {}}>HEC-approved campuses</Switch>
            </div>
          </FilterGroup>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-[999_1_560px] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-lg font-bold" aria-live="polite">{results.length} {results.length === 1 ? "program" : "programs"}</p>
              <p className="text-xs text-ink-500">Sample data · only verified records are shown</p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-ink-500">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 rounded-xl border border-ink-200 bg-white px-3 font-medium outline-none focus:border-brand-500">
                <option value="match">Best match</option>
                <option value="fee">Lowest fee</option>
                <option value="deadline">Nearest deadline</option>
                <option value="merit">Closing merit (high to low)</option>
              </select>
            </label>
          </div>

          {results.map(({ program: p, university: u, closing }) => {
            const picked = compare.includes(p.slug);
            const isSaved = saved.includes(p.slug);
            return (
              <article key={p.slug} className={cn("flex flex-col gap-5 rounded-3xl border bg-white p-5 shadow-xs transition duration-300 hover:shadow-lift sm:flex-row sm:p-6", picked ? "border-brand-500 ring-4 ring-brand-500/10" : "border-ink-200 hover:border-ink-300")}>
                <Monogram text={u.mono} tone={u.tone} />
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1.5">
                      <Link href={`/programs/${p.slug}`} className="font-display text-xl font-bold tracking-tight hover:text-brand-700">{p.title}</Link>
                      <Link href={`/universities/${u.slug}`} className="block text-sm text-ink-500 hover:text-ink-800">{u.name} · {p.campus}, {p.city}</Link>
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        <Tag>{u.sector}</Tag>
                        <Tag>{p.shift}</Tag>
                        {p.highlights.map((h) => <Tag key={h} tone="brand">{h}</Tag>)}
                      </div>
                    </div>
                    <StatusDot status={p.status}>{p.status === "open" ? "Applications open" : p.opensOn ? `Opens ${formatDate(p.opensOn)}` : "Closed"}</StatusDot>
                  </div>
                  <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <Fact k="Tuition / semester" v={pkr(p.feePerSemester)} />
                    <Fact k="Duration" v={`${p.durationYears} years`} />
                    <Fact k="Entry test" v={p.test} />
                    <Fact k="Apply by" v={formatDate(p.deadline)} />
                  </dl>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-4">
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <TrendingUp className="size-4 text-brand-600" aria-hidden />
                      {closing !== undefined ? (
                        <><span className="text-ink-500">Last closing</span><b className="tabular">{closing.toFixed(2)}%</b><span className="text-xs text-ink-500">2025 · Open merit · Final list</span></>
                      ) : (
                        <span className="text-ink-500">New program — no past merits yet</span>
                      )}
                    </p>
                    <div className="flex gap-2">
                      <Button variant={isSaved ? "primary" : "light"} size="icon-sm" aria-label={isSaved ? "Remove from saved" : "Save program"} aria-pressed={isSaved} onClick={() => setSaved((s) => toggle(s, p.slug, 99))}>
                        <Bookmark className={cn("size-4", isSaved && "fill-current")} aria-hidden />
                      </Button>
                      <Button variant={picked ? "dark" : "light"} size="sm" aria-pressed={picked} onClick={() => setCompare((c) => toggle(c, p.slug, 4))}>
                        {picked ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}{picked ? "Added" : "Compare"}
                      </Button>
                      <ButtonLink href={`/programs/${p.slug}`} variant="dark" size="sm">View</ButtonLink>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {results.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-3xl bg-white ring-1 ring-ink-200/70 px-6 py-16 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-ink-100 text-ink-600"><Search className="size-5" aria-hidden /></span>
              <h2 className="text-xl font-bold">No programs match these filters</h2>
              <p className="max-w-md text-ink-500">Try another field or widen the fee range. Searches with no results help our data team decide which programs to verify next.</p>
              <Button variant="dark" className="mt-2" onClick={reset}>Clear filters</Button>
            </div>
          )}

          <nav aria-label="Pagination" className="flex justify-center gap-1.5 pt-2">
            <Button variant="light" size="sm" disabled><ChevronLeft className="size-4" aria-hidden />Previous</Button>
            <Button variant="dark" size="sm" aria-current="page">1</Button>
            <Button variant="light" size="sm" disabled>Next<ChevronRight className="size-4" aria-hidden /></Button>
          </nav>

          {compared.length > 0 && (
            <div className="sticky bottom-5 z-30 flex flex-wrap items-center gap-4 rounded-[22px] bg-ink-900 py-3 pr-3 pl-5 text-white shadow-float">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-500/20 text-brand-400"><Columns2 className="size-5" aria-hidden /></span>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{compared.length} {compared.length === 1 ? "program" : "programs"} selected</p>
                <p className="text-xs text-ink-300">Compare up to 4 programs side by side</p>
              </div>
              <div className="flex gap-1.5">{compared.map((c) => <Monogram key={c.program.slug} text={c.university.mono} tone={c.university.tone} size="sm" />)}</div>
              <Button variant="ondark" size="sm" onClick={() => setCompare([])}>Clear</Button>
              <ButtonLink href="/compare">Compare now <ArrowRight className="size-4" aria-hidden /></ButtonLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("py-5", !last && "border-b border-ink-100")}>
      <p className="mb-3 text-xs font-bold tracking-[0.08em] text-ink-600 uppercase">{title}</p>
      {children}
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-ink-500">{k}</dt>
      <dd className="truncate text-[14.5px] font-bold">{v}</dd>
    </div>
  );
}
