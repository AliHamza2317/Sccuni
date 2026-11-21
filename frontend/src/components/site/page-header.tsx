import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/format";
import { SilkBackdrop } from "./silk-backdrop";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Premium page header for inner pages.
 * Default "silk": the home hero's navy-and-emerald silk (still, slowly drifting) under large white
 * type, with rounded bottom corners — so every page opens like the home page.
 * "light" is kept for pages that need a quiet header.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  aside,
  children,
  tone = "silk",
  silkPosition,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  /** Optional panel shown to the right of the title on wide screens. */
  aside?: ReactNode;
  children?: ReactNode;
  tone?: "silk" | "light";
  /** Which part of the silk to show (CSS object-position), so pages can differ a little. */
  silkPosition?: string;
  className?: string;
}) {
  const dark = tone === "silk";
  return (
    <section
      data-header-theme={dark ? "dark" : undefined}
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "rounded-b-[28px] bg-ink-950 text-white sm:rounded-b-[40px]" : "border-b border-ink-200/70 bg-white",
        className,
      )}
    >
      {dark ? (
        <SilkBackdrop eager position={silkPosition} />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_88%_-10%,rgb(0_152_124/0.12),transparent_65%),radial-gradient(45%_80%_at_6%_-20%,rgb(44_91_216/0.07),transparent_60%)]" />
          <div aria-hidden className="bg-lines-light mask-radial-right absolute inset-0 -z-10" />
        </>
      )}

      <div className="mx-auto max-w-[1240px] px-5 pt-[116px] pb-12 sm:px-7 lg:pt-[136px] lg:pb-16">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className={cn("mb-7 flex flex-wrap items-center gap-2 text-[13px]", dark ? "text-white/70" : "text-ink-500")}>
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden className={dark ? "text-white/35" : "text-ink-300"}>/</span>}
                {c.href ? (
                  <Link href={c.href} className={cn("transition-colors", dark ? "hover:text-white" : "hover:text-ink-900")}>{c.label}</Link>
                ) : (
                  <span aria-current="page" className={cn("font-semibold", dark ? "text-white" : "text-ink-900")}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
          <div className="max-w-3xl min-w-0 flex-[999_1_480px] space-y-5">
            {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
            <h1
              className={cn(
                "text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.045em]",
                dark ? "text-white" : "text-gradient-ink",
              )}
            >
              {title}
            </h1>
            {description ? (
              <p className={cn("max-w-2xl text-[clamp(1.02rem,1.3vw,1.15rem)] leading-relaxed", dark ? "text-ink-200" : "text-ink-500")}>{description}</p>
            ) : null}
          </div>
          {aside ? <div className="w-full flex-[1_1_340px] lg:max-w-[420px]">{aside}</div> : null}
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
