"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/format";
import { Logo } from "./logo";

export const NAV = [
  { href: "/programs", label: "Programs" },
  { href: "/merit-calculator", label: "Merit calculator" },
  { href: "/best-fit", label: "Best Fit" },
  { href: "/admissions-calendar", label: "Calendar" },
  { href: "/scholarships", label: "Scholarships" },
];

/** Routes whose top section is navy, so the header sits on it in its dark style. */
function isDarkRoute(path: string) {
  return path === "/" || path.startsWith("/best-fit") || path.startsWith("/universities/");
}

/**
 * The header reads the URL to pick its style and the active link. With Cache Components,
 * reading the URL must sit inside <Suspense>; the fallback is the same header with no active link.
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

function HeaderView({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = pathname !== null && isDarkRoute(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background,border-color,box-shadow] duration-300",
        // Dark routes: solid navy, so the light page behind never tints it grey.
        dark ? "border-white/[0.06] bg-ink-950" : "border-ink-200/60 bg-white/75 backdrop-blur-xl backdrop-saturate-150",
        scrolled && (dark ? "shadow-[0_12px_32px_rgb(0_8_20/0.45)]" : "bg-white/90 shadow-[0_8px_24px_rgb(0_26_58/0.05)]"),
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-6 px-5 sm:px-7">
        <Logo onDark={dark} priority />

        <nav
          aria-label="Main"
          className={cn(
            "mx-auto hidden items-center gap-0.5 rounded-full border p-1 lg:flex",
            dark ? "border-white/[0.08] bg-white/[0.03]" : "border-ink-200/70 bg-ink-50/70",
          )}
        >
          {NAV.map((n) => {
            const active = pathname !== null && (pathname === n.href || pathname.startsWith(n.href + "/"));
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-[14.5px] font-medium whitespace-nowrap transition-colors duration-200",
                  dark
                    ? active ? "bg-white/[0.1] text-white" : "text-ink-300 hover:text-white"
                    : active ? "bg-white text-ink-900 shadow-xs" : "text-ink-500 hover:text-ink-900",
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
            className={cn(
              "hidden h-10 items-center rounded-full px-4 text-[14.5px] font-medium transition-colors sm:inline-flex",
              dark ? "text-ink-200 hover:text-white" : "text-ink-600 hover:text-ink-900",
            )}
          >
            Sign in
          </Link>
          <ButtonLink href="/best-fit" size="sm" className="hidden h-10 rounded-full px-4.5 sm:inline-flex">
            Find my best fit <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid size-11 place-items-center rounded-full border lg:hidden",
              dark ? "border-white/15 bg-white/[0.06] text-white" : "border-ink-200 bg-white text-ink-900",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className={cn("border-t px-5 pb-5 lg:hidden", dark ? "border-white/10" : "border-ink-200")}>
          {NAV.concat([{ href: "/sign-in", label: "Sign in" }]).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={cn("flex h-12 items-center border-b text-[15px] font-semibold", dark ? "border-white/[0.08] text-white" : "border-ink-100 text-ink-900")}
            >
              {n.label}
            </Link>
          ))}
          <ButtonLink href="/best-fit" onClick={() => setOpen(false)} className="mt-4 w-full rounded-full">
            Find my best fit
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
