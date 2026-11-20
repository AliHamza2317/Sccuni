import { clsx, type ClassValue } from "clsx";
import { DEMO_TODAY } from "@/lib/data/calendar";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Short component names for formula summaries: "Matric 10 · FSc 40 · Test 50". */
export const COMPONENT_SHORT = { ssc: "Matric", hssc: "FSc", test: "Test" } as const;

export function formulaSummary(components: { key: "ssc" | "hssc" | "test"; weight: number }[], withPercent = false): string {
  return components.map((c) => `${COMPONENT_SHORT[c.key]} ${c.weight}${withPercent ? "%" : ""}`).join(" · ");
}

export function pkr(n: number): string {
  return "PKR " + n.toLocaleString("en-US");
}

/** Compact PKR, e.g. 165000 → "165k". */
export function pkrShort(n: number): string {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dateParts(iso: string): { day: string; mon: string; year: string } {
  const [y, m, d] = iso.split("-").map(Number);
  return { day: String(d), mon: MONTHS[m - 1], year: String(y) };
}

export function formatDate(iso: string, withYear = false): string {
  const p = dateParts(iso);
  return withYear ? `${p.day} ${p.mon} ${p.year}` : `${p.day} ${p.mon}`;
}

/** Days from the prototype's "today" to a date (UTC, whole days). */
export function daysUntil(iso: string, today = DEMO_TODAY): number {
  const a = Date.parse(today + "T00:00:00Z");
  const b = Date.parse(iso + "T00:00:00Z");
  return Math.round((b - a) / 86_400_000);
}

export function relativeDays(iso: string): string {
  const d = daysUntil(iso);
  if (d < 0) return "Closed";
  if (d === 0) return "Today";
  if (d === 1) return "Tomorrow";
  return `In ${d} days`;
}

/** Signed margin with a typographic minus: +0.84 / −0.55. */
export function signed(n: number, decimals = 2): string {
  return (n >= 0 ? "+" : "−") + Math.abs(n).toFixed(decimals);
}
