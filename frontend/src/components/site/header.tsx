"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/format";
import { Logo } from "./logo";

export const NAV = [
  { href: "/programs", label: "Explore programs" },
  { href: "/merit-calculator", label: "Merit calculator" },
  { href: "/best-fit", label: "Best Fit Finder" },
  { href: "/admissions-calendar", label: "Admission calendar" },
  { href: "/scholarships", label: "Scholarships" },
];

/** Routes whose top section is navy, so the header sits on it in its dark style. */
function isDarkRoute(path: string) {
  return path === "/" || path.startsWith("/best-fit") || path.startsWith("/universities/");
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = isDarkRoute(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background,border-color,box-shadow] duration-300",
        dark ? "border-white/[0.08] bg-ink-900/80" : "border-ink-200/70 bg-paper/85",
        scrolled && (dark ? "bg-ink-900/92 shadow-[0_10px_30px_rgb(0_15_36/0.35)]" : "bg-white/90 shadow-[0_8px_24px_rgb(0_26_58/0.06)]"),
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-6 px-5 sm:px-7">
        <Logo onDark={dark} priority />
        <nav aria-label="Main" className="ml-2 hidden flex-1 items-center gap-0.5 lg:flex">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-[10px] px-3 py-2 text-[15px] font-medium whitespace-nowrap transition-colors duration-200",
                  dark
                    ? active ? "bg-white/[0.12] text-white" : "text-ink-300 hover:bg-white/[0.08] hover:text-white"
                    : active ? "bg-white text-ink-900 shadow-xs" : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/sign-in"
            className={cn("hidden h-11 items-center rounded-xl px-4 text-[15px] font-semibold transition-colors sm:inline-flex", dark ? "text-ink-100 hover:bg-white/[0.08]" : "text-ink-700 hover:bg-ink-100")}
          >
            Sign in
          </Link>
          <ButtonLink href="/best-fit" className="hidden sm:inline-flex">Find my best fit</ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn("grid size-11 place-items-center rounded-xl border lg:hidden", dark ? "border-white/15 bg-white/[0.08] text-white" : "border-ink-200 bg-white text-ink-900")}
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
          <ButtonLink href="/best-fit" onClick={() => setOpen(false)} className="mt-4 w-full">Find my best fit</ButtonLink>
        </nav>
      )}
    </header>
  );
}
