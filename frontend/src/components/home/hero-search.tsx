"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/format";

const TABS = [
  { id: "programs", label: "Programs", placeholder: "Program or field — e.g. Computer Science" },
  { id: "universities", label: "Universities", placeholder: "University name — e.g. Northstar University" },
  { id: "scholarships", label: "Scholarships", placeholder: "Scholarship — e.g. need-based, merit" },
] as const;

const POPULAR = ["Computer Science", "MBBS", "Electrical Engineering", "Software Engineering", "Artificial Intelligence"];

export function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("programs");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="space-y-4">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(tab === "scholarships" ? "/scholarships" : "/programs");
        }}
        className="rounded-[26px] bg-white p-2 text-ink-900 shadow-[0_30px_80px_rgb(0_0_0/0.35)] ring-1 ring-white/10"
      >
        <div className="flex gap-1 px-1 pt-1 pb-2" role="tablist" aria-label="Search for">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === tab}
              onClick={() => setTab(t.id)}
              className={cn(
                "h-9 rounded-[11px] px-3.5 text-sm font-semibold transition-colors",
                t.id === tab ? "bg-ink-100 text-ink-900" : "text-ink-500 hover:text-ink-900",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="flex h-14 min-w-0 flex-[1_1_180px] items-center gap-3 rounded-2xl bg-ink-50 px-4 ring-brand-500/30 transition focus-within:bg-white focus-within:ring-4">
            <Search className="size-5 shrink-0 text-ink-400" aria-hidden />
            <span className="sr-only">Search</span>
            <input className="h-full w-full min-w-0 bg-transparent text-[15.5px] outline-none placeholder:text-ink-400" placeholder={current.placeholder} />
          </label>
          <label className="flex h-14 min-w-0 flex-[0_1_165px] items-center gap-3 rounded-2xl bg-ink-50 px-4 ring-brand-500/30 transition focus-within:bg-white focus-within:ring-4">
            <MapPin className="size-5 shrink-0 text-ink-400" aria-hidden />
            <span className="sr-only">City</span>
            <select className="h-full w-full min-w-0 bg-transparent text-[15.5px] outline-none">
              <option>Any city</option>
              <option>Lahore</option>
              <option>Islamabad</option>
              <option>Karachi</option>
              <option>Peshawar</option>
              <option>Quetta</option>
              <option>Multan</option>
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex h-14 flex-[1_0_auto] items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 font-semibold text-white shadow-[0_10px_26px_rgb(0_126_103/0.4)] transition hover:bg-brand-700 sm:flex-none"
          >
            Search
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </form>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[13px] text-ink-400">Popular:</span>
        {POPULAR.map((p) => (
          <Link
            key={p}
            href="/programs"
            className="inline-flex h-8 items-center rounded-full border border-white/15 bg-white/[0.06] px-3.5 text-[13px] font-medium text-ink-100 transition hover:border-white/30 hover:bg-white/[0.12] hover:text-white"
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
