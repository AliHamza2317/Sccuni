"use client";

import { Award, Bookmark, CircleCheck, ExternalLink, HandHeart, Landmark, Search, Wallet } from "lucide-react";
import { useState } from "react";
import { StatusDot, Tag } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { Chip, Switch } from "@/components/ui/controls";
import { cn } from "@/lib/format";
import type { Scholarship } from "@/lib/types";

const KIND: Record<Scholarship["kinds"][number], { label: string; tone: "brand" | "blue" | "gold" | "neutral" }> = {
  need: { label: "Need-based", tone: "brand" },
  merit: { label: "Merit", tone: "blue" },
  regional: { label: "Regional", tone: "gold" },
  women: { label: "For women", tone: "neutral" },
};
const ICON = { government: Landmark, need: HandHeart, award: Award };
const ICON_BG = { government: "bg-ink-900 text-brand-400", need: "bg-brand-50 text-brand-700", award: "bg-target-bg text-target" };

export function ScholarshipDirectory({ items }: { items: Scholarship[] }) {
  const [kind, setKind] = useState<Scholarship["kinds"][number] | "all">("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [q, setQ] = useState("");
  const [saved, setSaved] = useState<string[]>(["prov-merit"]);
  const list = items.filter((s) => (kind === "all" || s.kinds.includes(kind)) && (!openOnly || s.open) && (!q || `${s.name} ${s.provider}`.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="mx-auto max-w-[1240px] space-y-6 px-5 py-10 sm:px-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Chip active={kind === "all"} onClick={() => setKind("all")}>All scholarships</Chip>
          {(Object.keys(KIND) as (keyof typeof KIND)[]).map((k) => <Chip key={k} active={kind === k} onClick={() => setKind(k)}>{KIND[k].label}</Chip>)}
        </div>
        <Switch checked={openOnly} onChange={setOpenOnly}>Open for applications</Switch>
      </div>
      <label className="flex h-12 max-w-xl items-center gap-3 rounded-2xl border border-ink-200 bg-white px-4 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
        <Search className="size-5 text-ink-400" aria-hidden />
        <span className="sr-only">Search scholarships</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, university or provider" className="h-full w-full bg-transparent outline-none placeholder:text-ink-400" />
      </label>
      <p className="text-sm text-ink-500" aria-live="polite">{list.length} sample scholarships · academic year 2027–28</p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => {
          const Icon = ICON[s.icon];
          const isSaved = saved.includes(s.id);
          return (
            <article key={s.id} className="flex flex-col gap-4 rounded-[26px] border border-ink-200 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <span className={cn("grid size-12 place-items-center rounded-2xl", ICON_BG[s.icon])}><Icon className="size-[22px]" aria-hidden /></span>
                <Button variant={isSaved ? "primary" : "light"} size="icon-sm" aria-pressed={isSaved} aria-label={isSaved ? "Remove from saved" : "Save scholarship"} onClick={() => setSaved((cur) => (isSaved ? cur.filter((x) => x !== s.id) : [...cur, s.id]))}>
                  <Bookmark className={cn("size-4", isSaved && "fill-current")} aria-hidden />
                </Button>
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap gap-1.5">{s.kinds.map((k) => <Tag key={k} tone={KIND[k].tone}>{KIND[k].label}</Tag>)}</div>
                <h2 className="font-display text-xl font-bold tracking-tight">{s.name}</h2>
                <p className="text-sm text-ink-500">{s.provider}</p>
              </div>
              <p className="flex items-start gap-2.5 rounded-2xl bg-ink-50 px-4 py-3 text-sm font-bold"><Wallet className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />{s.coverage}</p>
              <ul className="space-y-1.5 text-sm text-ink-600">
                {s.rules.map((r) => <li key={r} className="flex items-start gap-2"><CircleCheck className="mt-0.5 size-4 shrink-0 text-ink-400" aria-hidden />{r}</li>)}
              </ul>
              <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4">
                <StatusDot status={s.open ? "open" : "upcoming"}>{s.status}</StatusDot>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">Official details <ExternalLink className="size-3.5" aria-hidden /></a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="rounded-2xl border border-ink-200 bg-white p-4 text-sm text-ink-600">
        Scholarship rules change every year. Each listing shows the academic year it applies to — always confirm on the provider’s official page before applying.
      </p>
    </div>
  );
}
