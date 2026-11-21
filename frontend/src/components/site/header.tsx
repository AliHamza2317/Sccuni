"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { Logo } from "./logo";

export const NAV = [
  { href: "/programs", label: "Programs" },
  { href: "/merit-calculator", label: "Merit calculator" },
  { href: "/best-fit", label: "Best Fit" },
  { href: "/admissions-calendar", label: "Calendar" },
  { href: "/scholarships", label: "Scholarships" },
];

/**
 * Colours come from CSS, not JavaScript: light by default, and `on-dark:` when the page's top
 * section is marked data-header-theme="dark" (see globals.css). So the header is right on the
 * first paint. The URL is only used to highlight the active link; with Cache Components that read
 * sits inside <Suspense>, and the fallback is the same header without a highlighted link.
 */
export function SiteHeader() {
  return (
    <Suspense fallback={<HeaderView pathname={null} />}>
      <HeaderWithPath />
    </Suspense>
  );
}

function HeaderWithPath() {
  return <HeaderView pathname={usePathname()} />;
}

const isActive = (pathname: string | null, href: string) => pathname !== null && (pathname === href || pathname.startsWith(href + "/"));

/**
 * Premium header.
 * - At the top of the page it is transparent and sits on the page's first section (no gap, no bar).
 * - Once you scroll, it becomes a floating glass capsule.
 */
function HeaderView({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const floating = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const logoSize = cn("w-auto transition-[height] duration-500", floating ? "h-8 sm:h-9" : "h-9 sm:h-10");

  return (
    <header className="pointer-events-none sticky top-0 z-50 -mb-[72px] flex h-[72px] items-center justify-center">
      <div
        className={cn(
          "pointer-events-auto relative mx-auto flex items-center gap-4 transition-[max-width,width,height,padding,background-color,box-shadow,border-radius] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          floating
            ? "h-[58px] w-[calc(100%-20px)] max-w-[1180px] rounded-full bg-white/80 pr-2 pl-4 shadow-[0_14px_36px_rgb(0_26_58/0.10)] ring-1 ring-ink-900/[0.07] backdrop-blur-xl backdrop-saturate-150 sm:pl-5 on-dark:bg-ink-950/[0.92] on-dark:shadow-[0_14px_44px_rgb(0_8_20/0.45),inset_0_1px_0_rgb(255_255_255/0.06)] on-dark:ring-white/10"
            : "h-[72px] w-full max-w-[1240px] rounded-none px-5 sm:px-7",
        )}
      >
        {/* Both logo versions are in the page; CSS shows the one that suits the background. */}
        <Logo preload className="on-dark:hidden" imageClassName={logoSize} />
        <Logo onDark preload className="hidden on-dark:inline-flex" imageClassName={logoSize} />

        <nav aria-label="Main" className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[14.5px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-200",
                  active
                    ? "bg-ink-900/[0.05] text-ink-900 on-dark:bg-white/[0.1] on-dark:text-white"
                    : "text-ink-500 hover:text-ink-900 on-dark:text-white/70 on-dark:hover:text-white",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <Link
            href="/sign-in"
            className="hidden h-10 items-center rounded-full px-4 text-[14.5px] font-medium text-ink-600 transition-colors hover:text-ink-900 sm:inline-flex on-dark:text-white/80 on-dark:hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/best-fit"
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-ink-950 pr-3.5 pl-4.5 text-[14.5px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_6px_18px_rgb(0_26_58/0.22)] transition-[background-color,box-shadow] hover:bg-ink-800 sm:inline-flex on-dark:bg-white on-dark:text-ink-950 on-dark:shadow-[0_6px_20px_rgb(0_0_0/0.25)] on-dark:hover:bg-brand-50"
          >
            Find my best fit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-white text-ink-900 ring-1 ring-ink-200 transition-colors hover:bg-ink-50 lg:hidden on-dark:bg-white/[0.08] on-dark:text-white on-dark:ring-white/15 on-dark:hover:bg-white/[0.14]"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="animate-rise absolute top-[calc(100%+10px)] right-0 left-0 overflow-hidden rounded-3xl bg-white/[0.97] p-2 shadow-[0_24px_60px_rgb(0_26_58/0.16)] ring-1 ring-ink-900/[0.07] backdrop-blur-xl lg:hidden on-dark:bg-ink-950/[0.97] on-dark:shadow-[0_24px_60px_rgb(0_8_20/0.55)] on-dark:ring-white/10"
          >
            {NAV.concat([{ href: "/sign-in", label: "Sign in" }]).map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-12 items-center rounded-2xl px-4 text-[15.5px] font-medium transition-colors",
                    active
                      ? "bg-ink-900/[0.05] text-ink-900 on-dark:bg-white/[0.08] on-dark:text-white"
                      : "text-ink-700 hover:bg-ink-50 on-dark:text-white/80 on-dark:hover:bg-white/[0.06] on-dark:hover:text-white",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
            <Link
              href="/best-fit"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-2xl bg-ink-950 text-[15.5px] font-semibold text-white on-dark:bg-white on-dark:text-ink-950"
            >
              Find my best fit <ArrowRight className="size-4" aria-hidden />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
