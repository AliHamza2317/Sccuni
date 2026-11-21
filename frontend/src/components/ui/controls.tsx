"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/format";

/** Segmented control: a small set of mutually exclusive options. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
  className,
}: {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex flex-wrap gap-1 rounded-xl bg-ink-100 p-1", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-[9px] font-semibold transition-all duration-200",
              size === "sm" ? "h-8 px-3 text-[13px]" : "h-9 px-3.5 text-sm",
              on ? "bg-white text-ink-900 shadow-xs" : "text-ink-600 hover:text-ink-900",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Accessible switch built on a native checkbox. */
export function Switch({ checked, onChange, children, className }: { checked: boolean; onChange: (v: boolean) => void; children?: ReactNode; className?: string }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink-700", className)}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="relative h-6 w-10 shrink-0 rounded-full bg-ink-200 transition-colors duration-200 peer-checked:bg-brand-600 peer-focus-visible:outline-3 peer-focus-visible:outline-brand-500/50 after:absolute after:top-[3px] after:left-[3px] after:size-[18px] after:rounded-full after:bg-white after:shadow-xs after:transition-transform after:duration-200 peer-checked:after:translate-x-4"
      />
      {children}
    </label>
  );
}

/** Chip used for filters. */
export function Chip({ active, onClick, children, className, tone = "light" }: { active?: boolean; onClick?: () => void; children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-all duration-200",
        tone === "dark"
          ? active ? "border-white bg-white text-ink-950 shadow-[0_6px_16px_rgb(0_0_0/0.25)]" : "border-white/15 bg-white/[0.06] text-white/85 backdrop-blur hover:border-white/30 hover:bg-white/[0.12] hover:text-white"
          : active ? "border-ink-900 bg-ink-900 text-white shadow-[0_6px_16px_rgb(0_26_58/0.2)]" : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:text-ink-900 hover:shadow-xs",
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * Fades content up when it scrolls into view. Content is visible on the server
 * render (no flash, works without JavaScript); only below-the-fold items animate.
 */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return; // already on screen: leave as is
    // Hide only after mount, so the server render stays visible without JavaScript.
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        state === "hidden" && "translate-y-5 opacity-0",
        state === "shown" && "translate-y-0 opacity-100",
        className,
      )}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
