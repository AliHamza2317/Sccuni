"use client";

import { Bookmark, Check, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Segmented, Switch } from "@/components/ui/controls";
import { cn } from "@/lib/format";
import type { MeritYear } from "@/lib/types";

export function SaveButton({ initial = false, onDark = false }: { initial?: boolean; onDark?: boolean }) {
  const [saved, setSaved] = useState(initial);
  const variant = onDark ? (saved ? "light" : "ondark") : saved ? "dark" : "light";
  return (
    <Button variant={variant} aria-pressed={saved} onClick={() => setSaved((s) => !s)}>
      <Bookmark className={cn("size-4", saved && "fill-current")} aria-hidden />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}

export function ShareButton({ onDark = false }: { onDark?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant={onDark ? "ondark" : "light"}
      size="icon"
      aria-label={copied ? "Link copied" : "Copy link to this page"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
        } catch {
          /* clipboard can be blocked; the button still confirms the action */
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
    >
      {copied ? <Check className="size-4 text-brand-600" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
    </Button>
  );
}

export function RemindSwitch() {
  const [on, setOn] = useState(false);
  return <Switch checked={on} onChange={setOn}>{on ? "Reminders on" : "Remind me"}</Switch>;
}

export function MeritHistory({ history }: { history: MeritYear[] }) {
  const [cat, setCat] = useState<"open" | "self">("open");
  const rows = history.map((h) => ({ year: h.year, lists: h[cat] }));
  const finals = rows.map((r) => r.lists[2]);
  const lo = Math.min(...finals) - 3;
  const hi = Math.max(...finals) + 1;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-ink-500">Closing aggregate (%) of the last admitted student in each merit list. These are aggregates, not positions.</p>
        <Segmented size="sm" label="Seat category" value={cat} onChange={setCat} options={[{ value: "open", label: "Open merit" }, { value: "self", label: "Self-finance" }]} />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-x-auto rounded-2xl border border-ink-200">
          <table className="w-full min-w-[420px] text-[14.5px]">
            <caption className="sr-only">Past closing merits, {cat === "open" ? "open merit" : "self-finance"}</caption>
            <thead>
              <tr className="bg-ink-50 text-left text-xs font-bold tracking-[0.06em] text-ink-500 uppercase">
                <th scope="col" className="px-4 py-3">Session</th>
                <th scope="col" className="px-4 py-3 text-right">List 1</th>
                <th scope="col" className="px-4 py-3 text-right">List 2</th>
                <th scope="col" className="px-4 py-3 text-right">Final list</th>
              </tr>
            </thead>
            <tbody className="tabular">
              {rows.map((r) => (
                <tr key={r.year} className="border-t border-ink-100 transition-colors hover:bg-ink-50/60">
                  <th scope="row" className="px-4 py-3.5 text-left font-bold">{r.year}</th>
                  <td className="px-4 py-3.5 text-right">{r.lists[0].toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-right">{r.lists[1].toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-right font-bold">{r.lists[2].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col rounded-2xl border border-ink-200 p-5">
          <p className="text-xs font-bold tracking-[0.08em] text-ink-500 uppercase">Final-list trend</p>
          <div className="mt-4 flex flex-1 items-end justify-around gap-4" aria-hidden>
            {[...rows].reverse().map((r, i, arr) => {
              const h = 30 + ((r.lists[2] - lo) / (hi - lo)) * 110;
              return (
                <div key={r.year} className="flex flex-1 flex-col items-center gap-2">
                  <span className="tabular text-xs font-bold">{r.lists[2].toFixed(2)}</span>
                  <div className={cn("w-full max-w-12 rounded-t-xl rounded-b-md transition-[height] duration-500", i === arr.length - 1 ? "bg-linear-to-t from-brand-600 to-brand-400" : "bg-brand-200")} style={{ height: `${h}px` }} />
                  <span className="text-xs text-ink-500">{r.year}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
