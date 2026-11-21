import type { ReactNode } from "react";
import { cn } from "@/lib/format";

/** Small pill label that sits above headings. */
export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-2 rounded-full border px-3 text-[12.5px] font-semibold tracking-[0.01em]",
        dark ? "border-white/10 bg-white/[0.04] text-ink-200" : "border-ink-200/80 bg-white/70 text-ink-600 shadow-xs backdrop-blur",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dark ? "bg-brand-400 shadow-[0_0_10px_rgb(45_186_152/0.9)]" : "bg-brand-500")} aria-hidden />
      {children}
    </span>
  );
}

/** Consistent section heading: eyebrow, title, optional description and action. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={cn("flex flex-wrap items-end gap-6", center ? "justify-center text-center" : "justify-between", className)}>
      <div className={cn("space-y-4", center ? "mx-auto max-w-2xl" : "max-w-2xl")}>
        {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn(
            "text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.06] font-extrabold tracking-[-0.04em]",
            dark ? "text-gradient-light" : "text-gradient-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn("text-[clamp(1rem,1.25vw,1.12rem)] leading-relaxed", dark ? "text-ink-300" : "text-ink-500")}>{description}</p>
        ) : null}
      </div>
      {action ? <div className={cn("shrink-0", center && "w-full")}>{action}</div> : null}
    </div>
  );
}
