"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const POPULAR = ["Computer Science", "MBBS", "Electrical Engineering", "Software Engineering", "Artificial Intelligence"];
const CITIES = ["Any city", "Lahore", "Islamabad", "Karachi", "Peshawar", "Rawalpindi", "Faisalabad"];

/** One calm command bar: what you want to study, where, and go. */
export function HeroSearch() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/programs");
        }}
        className="mx-auto max-w-[760px] rounded-[30px] bg-white/[0.07] p-1.5 shadow-[0_24px_70px_rgb(0_0_0/0.4)] ring-1 ring-white/[0.12] backdrop-blur-xl transition focus-within:ring-brand-400/50 sm:rounded-full"
      >
        <div className="flex flex-wrap items-center gap-1 rounded-[24px] bg-white p-1.5 text-ink-900 sm:flex-nowrap sm:rounded-full">
          <label className="flex h-12 min-w-0 flex-[1_1_100%] items-center gap-3 pr-2 pl-4 sm:flex-1">
            <Search className="size-[18px] shrink-0 text-ink-400" aria-hidden />
            <span className="sr-only">What do you want to study?</span>
            <input
              className="h-full w-full min-w-0 bg-transparent text-[15.5px] outline-none placeholder:text-ink-400"
              placeholder="What do you want to study?"
            />
          </label>
          <span aria-hidden className="hidden h-7 w-px bg-ink-200 sm:block" />
          <label className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full bg-ink-50 px-4 sm:w-[168px] sm:flex-none sm:bg-transparent">
            <MapPin className="size-[18px] shrink-0 text-ink-400" aria-hidden />
            <span className="sr-only">City</span>
            <select className="h-full w-full min-w-0 cursor-pointer bg-transparent text-[15px] text-ink-700 outline-none">
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_8px_22px_rgb(0_126_103/0.35)] transition hover:bg-brand-700"
          >
            Search
            <ArrowRight className="size-[18px]" aria-hidden />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 text-[13px] text-ink-400">Popular</span>
        {POPULAR.map((p) => (
          <Link
            key={p}
            href="/programs"
            className="inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[13px] text-ink-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
