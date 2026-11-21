"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const POPULAR = ["Computer Science", "MBBS", "Electrical Engineering", "Software Engineering", "Artificial Intelligence"];
const CITIES = ["Any city", "Lahore", "Islamabad", "Karachi", "Peshawar", "Rawalpindi", "Faisalabad"];

/** Example searches typed out in the empty search box. */
const PROMPTS = [
  "BS Computer Science in Lahore",
  "MBBS merit lists in Punjab",
  "Engineering under PKR 150,000 a year",
  "Programs I can get with 85%",
  "Need-based scholarships",
];

/**
 * Types each prompt, pauses, deletes it, then moves to the next.
 * Runs only while `enabled`; shows the first prompt without motion under reduced motion.
 */
function useTypewriter(enabled: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setTimeout(() => setText(PROMPTS[0]), 0);
      return () => clearTimeout(timer);
    }
    let index = 0;
    let length = 0;
    let deleting = false;
    const tick = () => {
      const full = PROMPTS[index];
      if (!deleting) {
        length += 1;
        setText(full.slice(0, length));
        if (length >= full.length) {
          deleting = true;
          timer = setTimeout(tick, 1900);
        } else {
          timer = setTimeout(tick, 45 + Math.random() * 45);
        }
      } else {
        length -= 1;
        setText(full.slice(0, length));
        if (length <= 0) {
          deleting = false;
          index = (index + 1) % PROMPTS.length;
          timer = setTimeout(tick, 380);
        } else {
          timer = setTimeout(tick, 24);
        }
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [enabled]);

  return text;
}

/** One calm command bar: what you want to study, where, and go. */
export function HeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const showHint = !focused && value === "";
  const typed = useTypewriter(showHint);

  return (
    <div className="space-y-5">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/programs");
        }}
        className="mx-auto max-w-[760px] rounded-[30px] bg-white/[0.1] p-1.5 shadow-[0_24px_70px_rgb(0_10_40/0.45)] ring-1 ring-white/20 backdrop-blur-xl transition focus-within:ring-white/40 sm:rounded-full"
      >
        <div className="flex flex-wrap items-center gap-1 rounded-[24px] bg-white p-1.5 text-ink-900 sm:flex-nowrap sm:rounded-full">
          <label className="relative flex h-12 min-w-0 flex-[1_1_100%] items-center gap-3 pr-2 pl-4 sm:flex-1">
            <Search className="size-[18px] shrink-0 text-ink-400" aria-hidden />
            <span className="sr-only">What do you want to study?</span>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="h-full w-full min-w-0 bg-transparent text-[15.5px] outline-none placeholder:text-ink-400"
              placeholder={showHint ? "" : "What do you want to study?"}
            />
            {showHint && (
              <span aria-hidden className="pointer-events-none absolute inset-y-0 right-2 left-[46px] flex items-center overflow-hidden text-[15.5px] whitespace-nowrap">
                <span className="mr-1.5 text-ink-500">Try</span>
                <span className="truncate text-ink-800">{typed}</span>
                <span className="animate-caret ml-0.5 inline-block h-[18px] w-[2px] shrink-0 rounded-full bg-brand-600" />
              </span>
            )}
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
        <span className="mr-1 text-[13px] text-white">Popular</span>
        {POPULAR.map((p) => (
          <Link
            key={p}
            href="/programs"
            className="inline-flex h-8 items-center rounded-full border border-white/15 bg-ink-950/35 px-3.5 text-[13px] text-white backdrop-blur transition hover:border-white/30 hover:bg-ink-950/55"
          >
            {p}
          </Link>
        ))}
      </div>
    </div>
  );
}
