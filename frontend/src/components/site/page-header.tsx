import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/format";
import { SilkCorners } from "./silk-backdrop";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Premium, light page header for inner pages: a clean white space for the title, with the hero's
 * silk as soft light accents in the corners only.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  aside,
  children,
  corners = ["tr", "bl"],
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
  /** Which corners carry the silk, so pages can differ a little. */
  corners?: ("tl" | "tr" | "bl" | "br")[];
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b border-ink-200/60 bg-linear-to-b from-white to-paper", className)}>
      <SilkCorners eager corners={corners} />

      <div className="mx-auto max-w-[1240px] px-5 pt-[116px] pb-12 sm:px-7 lg:pt-[136px] lg:pb-16">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[13px] text-ink-600">
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-ink-300">/</span>}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-ink-900">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-ink-900">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
          <div className="max-w-3xl min-w-0 flex-[999_1_480px] space-y-5">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-[clamp(2.4rem,4.8vw,4rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-ink-950">{title}</h1>
            {description ? <p className="max-w-2xl text-[clamp(1.02rem,1.3vw,1.15rem)] leading-relaxed text-ink-600">{description}</p> : null}
          </div>
          {aside ? <div className="w-full flex-[1_1_340px] lg:max-w-[420px]">{aside}</div> : null}
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
