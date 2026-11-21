import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/format";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Premium page header for inner pages: soft emerald/blue light, a fine grid that fades out,
 * and large display type. Light by default; `dark` matches the navy hero routes.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  aside,
  children,
  dark = false,
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
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      data-header-theme={dark ? "dark" : undefined}
      className={cn(
        "relative isolate overflow-hidden border-b",
        dark ? "border-white/[0.06] bg-ink-950 text-white" : "border-ink-200/70 bg-white",
        className,
      )}
    >
      {dark ? (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_85%_-10%,rgb(0_152_124/0.28),transparent_65%),radial-gradient(45%_80%_at_5%_-10%,rgb(44_91_216/0.16),transparent_60%)]" />
          <div aria-hidden className="bg-lines-dark mask-radial-right absolute inset-0 -z-10" />
          <div aria-hidden className="bg-noise absolute inset-0 -z-10 opacity-[0.18] mix-blend-soft-light" />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_88%_-10%,rgb(0_152_124/0.12),transparent_65%),radial-gradient(45%_80%_at_6%_-20%,rgb(44_91_216/0.07),transparent_60%)]" />
          <div aria-hidden className="bg-lines-light mask-radial-right absolute inset-0 -z-10" />
        </>
      )}

      <div className="mx-auto max-w-[1240px] px-5 pt-[112px] pb-10 sm:px-7 lg:pt-[128px] lg:pb-12">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className={cn("mb-7 flex flex-wrap items-center gap-2 text-[13px]", dark ? "text-ink-400" : "text-ink-500")}>
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden className={dark ? "text-ink-600" : "text-ink-300"}>/</span>}
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
                "text-[clamp(2.3rem,4.6vw,3.75rem)] leading-[1.03] font-extrabold tracking-[-0.045em]",
                dark ? "text-gradient-light" : "text-gradient-ink",
              )}
            >
              {title}
            </h1>
            {description ? (
              <p className={cn("max-w-2xl text-[clamp(1.02rem,1.3vw,1.15rem)] leading-relaxed", dark ? "text-ink-300" : "text-ink-500")}>{description}</p>
            ) : null}
          </div>
          {aside ? <div className="w-full flex-[1_1_340px] lg:max-w-[420px]">{aside}</div> : null}
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
