"use client";

import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DateTile } from "@/components/ui/badges";
import { Button, ButtonLink } from "@/components/ui/button";
import { Chip, Segmented, Switch } from "@/components/ui/controls";
import { cn, formatDate, relativeDays } from "@/lib/format";
import type { AdmissionEvent } from "@/lib/types";

type Kind = AdmissionEvent["type"];
const TYPES: { id: Kind | "all"; label: string; dot: string }[] = [
  { id: "all", label: "All dates", dot: "bg-ink-900" },
  { id: "application", label: "Applications", dot: "bg-brand-500" },
  { id: "test", label: "Entry tests", dot: "bg-target" },
  { id: "merit", label: "Merit lists", dot: "bg-gold-500" },
  { id: "scholarship", label: "Scholarships", dot: "bg-[#932042]" },
];
const PILL: Record<Kind, string> = {
  application: "bg-brand-50 text-brand-800",
  test: "bg-target-bg text-target",
  merit: "bg-gold-100 text-gold-700",
  scholarship: "bg-[#fbe4ea] text-[#932042]",
};
const TILE: Record<Kind, "reach" | "blue" | "gold" | "brand"> = { application: "reach", test: "blue", merit: "gold", scholarship: "brand" };

export function AdmissionCalendar({ events, today }: { events: AdmissionEvent[]; today: string }) {
  const [type, setType] = useState<Kind | "all">("all");
  const [view, setView] = useState<"month" | "list">("month");
  const [reminders, setReminders] = useState<string[]>(["nu-close", "nu-test"]);
  const shown = events.filter((e) => type === "all" || e.type === type);

  // Month grid (weeks start on Monday) for the month containing `today`.
  const [ty, tm] = today.split("-").map(Number);
  const first = new Date(Date.UTC(ty, tm - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(ty, tm, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((lead + daysInMonth) / 7) * 7 }, (_, i) => {
    const d = new Date(Date.UTC(ty, tm - 1, 1 - lead + i));
    const iso = d.toISOString().slice(0, 10);
    return { iso, day: d.getUTCDate(), inMonth: d.getUTCMonth() === tm - 1 };
  });
  const monthName = first.toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  const upcoming = shown.filter((e) => e.date >= today);
  const soon = events.filter((e) => e.date >= today && e.type !== "scholarship").slice(0, 3);
  const toggle = (id: string) => setReminders((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));

  return (
    <div className="mx-auto max-w-[1240px] space-y-7 px-5 py-10 sm:px-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Chip key={t.id} active={type === t.id} onClick={() => setType(t.id)}>
              <span className={cn("size-2 rounded-full", t.dot, type === t.id && t.id === "all" && "bg-white")} aria-hidden />{t.label}
            </Chip>
          ))}
        </div>
        <div className="flex gap-2">
          <select aria-label="City" className="h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm font-medium"><option>All cities</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Peshawar</option></select>
          <select aria-label="Field" className="h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm font-medium"><option>All fields</option><option>Computer Science &amp; IT</option><option>Engineering</option><option>Medicine</option></select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {soon.map((e) => (
          <Link key={e.id} href={e.href} className="group flex items-center gap-4 rounded-3xl bg-white ring-1 ring-ink-200/70 p-5 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <DateTile iso={e.date} tone={TILE[e.type]} />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gold-700">{relativeDays(e.date)}</p>
              <p className="font-bold">{e.title}</p>
              <p className="truncate text-xs text-ink-500">{e.where}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <section aria-label={monthName} className="min-w-0 flex-[999_1_600px] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button variant="light" size="icon-sm" aria-label="Previous month" disabled><ChevronLeft className="size-4" aria-hidden /></Button>
              <h2 className="min-w-[150px] text-center text-xl font-bold">{monthName}</h2>
              <Button variant="light" size="icon-sm" aria-label="Next month" disabled><ChevronRight className="size-4" aria-hidden /></Button>
            </div>
            <Segmented label="View" value={view} onChange={setView} options={[{ value: "month", label: "Month" }, { value: "list", label: "List" }]} />
          </div>

          {view === "month" ? (
            <div className="overflow-hidden rounded-3xl border border-ink-200 bg-ink-200 shadow-xs">
              <div className="grid grid-cols-7 gap-px" role="grid">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} role="columnheader" className="bg-ink-50 px-2.5 py-2.5 text-xs font-bold tracking-[0.06em] text-ink-500 uppercase">{d}</div>
                ))}
                {cells.map((c) => {
                  const evs = c.inMonth ? shown.filter((e) => e.date === c.iso) : [];
                  const isToday = c.iso === today;
                  return (
                    <div key={c.iso} role="gridcell" aria-label={`${c.day}${evs.length ? `, ${evs.length} events` : ""}`} className={cn("flex min-h-[72px] flex-col gap-1 p-1.5 sm:min-h-[112px] sm:p-2", c.inMonth ? "bg-white" : "bg-ink-50/70 text-ink-400")}>
                      <span className={cn("grid size-7 place-items-center rounded-[9px] text-[13px] font-bold", isToday && "bg-ink-900 text-white")}>{c.day}</span>
                      {evs.map((e) => (
                        <Link key={e.id} href={e.href} title={e.title} className={cn("truncate rounded-md px-1.5 py-1 text-[11.5px] leading-tight font-semibold transition-opacity hover:opacity-80 max-sm:h-1.5 max-sm:p-0 max-sm:text-[0px]", PILL[e.type])}>
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-ink-100 rounded-3xl bg-white ring-1 ring-ink-200/70">
              {shown.map((e) => (
                <li key={e.id} className="flex items-center gap-4 px-5 py-4">
                  <DateTile iso={e.date} tone={TILE[e.type]} />
                  <div className="min-w-0 flex-1"><p className="font-bold">{e.title}{e.tentative && <span className="ml-2 text-xs font-semibold text-gold-700">expected</span>}</p><p className="truncate text-sm text-ink-500">{e.where}</p></div>
                  <span className="hidden text-sm text-ink-500 sm:block">{formatDate(e.date, true)}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-ink-500">All dates are Pakistan Standard Time. Tentative dates are marked “expected” until the official notice is published.</p>
        </section>

        <aside className="w-full space-y-3 rounded-3xl bg-white ring-1 ring-ink-200/70 p-6 shadow-xs lg:sticky lg:top-24 lg:w-[360px]">
          <div className="flex items-center justify-between"><p className="font-display text-lg font-bold">Upcoming</p><span className="rounded-lg bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-700">{reminders.length} reminders on</span></div>
          <ul className="divide-y divide-ink-100">
            {upcoming.slice(0, 7).map((e) => (
              <li key={e.id} className="flex items-center gap-3 py-3">
                <DateTile iso={e.date} tone={TILE[e.type]} className="h-[52px] w-12 rounded-[13px]" />
                <div className="min-w-0 flex-1"><p className="text-sm font-bold">{e.title}</p><p className="truncate text-xs text-ink-500">{e.where}</p></div>
                <Switch checked={reminders.includes(e.id)} onChange={() => toggle(e.id)}><span className="sr-only">Remind me about {e.title}</span></Switch>
              </li>
            ))}
          </ul>
          <ButtonLink href="/sign-in" variant="light" className="w-full"><Bell className="size-4" aria-hidden />Email me before each date</ButtonLink>
        </aside>
      </div>
    </div>
  );
}
