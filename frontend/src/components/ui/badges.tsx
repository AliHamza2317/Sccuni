import { BadgeCheck, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import type { AdmissionStatus, Group, Tone } from "@/lib/types";

const tagTones = {
  neutral: "bg-ink-100 text-ink-700",
  brand: "bg-brand-50 text-brand-800",
  gold: "bg-gold-100 text-gold-700",
  blue: "bg-target-bg text-target",
  danger: "bg-danger-bg text-danger",
  ondark: "bg-white/[0.08] text-ink-100",
  outline: "bg-white text-ink-700 border border-ink-200",
} as const;

export function Tag({ tone = "neutral", className, children }: { tone?: keyof typeof tagTones; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex h-[26px] items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 text-[12.5px] font-semibold", tagTones[tone], className)}>
      {children}
    </span>
  );
}

const groupStyles: Record<Group, { label: string; cls: string }> = {
  safe: { label: "Safe", cls: "bg-safe-bg text-safe" },
  target: { label: "Target", cls: "bg-target-bg text-target" },
  reach: { label: "Reach", cls: "bg-reach-bg text-reach" },
  below: { label: "Below", cls: "bg-ink-100 text-ink-600" },
  none: { label: "No data", cls: "bg-ink-100 text-ink-600" },
};

export function GroupPill({ group, size = "md", className }: { group: Group; size?: "sm" | "md"; className?: string }) {
  const g = groupStyles[group];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-extrabold uppercase tracking-[0.06em]", size === "sm" ? "h-6 px-2.5 text-[11px]" : "h-7 px-3 text-xs", g.cls, className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {g.label}
    </span>
  );
}

export function groupLabel(group: Group) {
  return groupStyles[group].label;
}

export function Verified({ children = "Verified", className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-100 bg-brand-50 px-2.5 text-[12.5px] font-semibold text-brand-800", className)}>
      <BadgeCheck className="size-4" aria-hidden />
      {children}
    </span>
  );
}

export function SourceChip({ title, locator, className }: { title: string; locator?: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 py-1.5 pl-1.5 pr-3 text-[13px] text-ink-600", className)}>
      <span className="grid size-6 place-items-center rounded-lg border border-ink-200 bg-white text-brand-700">
        <FileText className="size-3.5" aria-hidden />
      </span>
      <span>
        <b className="font-semibold text-ink-900">{title}</b>
        {locator ? ` · ${locator}` : null}
      </span>
    </span>
  );
}

export function StatusDot({ status, children }: { status: AdmissionStatus; children: ReactNode }) {
  const dot = status === "open" ? "bg-brand-500 shadow-[0_0_0_4px_rgb(0_152_124/0.16)]" : status === "upcoming" ? "bg-gold-500" : "bg-ink-300";
  const text = status === "open" ? "text-brand-800" : status === "upcoming" ? "text-gold-700" : "text-ink-500";
  return (
    <span className={cn("inline-flex items-center gap-2 text-[13px] font-semibold", text)}>
      <span className={cn("size-2 rounded-full", dot)} aria-hidden />
      {children}
    </span>
  );
}

const monoTones: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-800",
  blue: "bg-target-bg text-target",
  gold: "bg-gold-100 text-gold-700",
  rose: "bg-[#fbe4ea] text-[#932042]",
  sky: "bg-[#e1f1fb] text-[#0e5a85]",
  ink: "bg-ink-900 text-white",
};

/** University monogram — used instead of logos until usage permission exists. */
export function Monogram({ text, tone, size = "md", className }: { text: string; tone: Tone; size?: "sm" | "md" | "lg"; className?: string }) {
  const s = size === "lg" ? "size-[76px] rounded-[22px] text-2xl" : size === "sm" ? "size-[38px] rounded-[11px] text-xs" : "size-12 rounded-[14px] text-[15px]";
  return (
    <span className={cn("grid shrink-0 place-items-center font-display font-extrabold tracking-tight", s, monoTones[tone], className)} aria-hidden>
      {text}
    </span>
  );
}

export function DateTile({ iso, tone = "reach", className }: { iso: string; tone?: "reach" | "brand" | "blue" | "gold"; className?: string }) {
  const [, m, d] = iso.split("-").map(Number);
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  const color = { reach: "text-reach", brand: "text-brand-700", blue: "text-target", gold: "text-gold-700" }[tone];
  return (
    <span className={cn("flex h-[62px] w-[58px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[15px] border border-ink-200 bg-white shadow-xs", className)}>
      <small className={cn("text-[11px] font-extrabold uppercase tracking-[0.08em]", color)}>{mon}</small>
      <b className="font-display text-[22px] leading-none font-extrabold tracking-tight text-ink-900">{d}</b>
    </span>
  );
}
