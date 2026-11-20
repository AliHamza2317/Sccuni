"use client";

import { Award, Bell, Bookmark, Calculator, CalendarDays, FileText, LayoutGrid, ListChecks, Menu, Settings, ShieldCheck, Target, TrendingUp, Upload, User, Users, Wallet, X, Building2, GraduationCap, Flag, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/format";

const ICONS = { Award, Bookmark, Calculator, CalendarDays, FileText, LayoutGrid, ListChecks, Settings, ShieldCheck, Target, TrendingUp, Upload, User, Users, Wallet, Building2, GraduationCap, Flag, History };
export type IconName = keyof typeof ICONS;

export interface ShellLink {
  href: string;
  label: string;
  icon: IconName;
  badge?: string;
}

/** Sidebar app shell used by the student dashboard (light) and the admin console (dark). */
export function AppShell({ links, dark = false, title, children, footer }: { links: { group?: string; items: ShellLink[] }[]; dark?: boolean; title: string; children: ReactNode; footer?: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav aria-label={title} className="space-y-1">
      {links.map((g, gi) => (
        <div key={gi} className="space-y-1">
          {g.group && <p className={cn("px-3 pt-4 pb-1 text-[11.5px] font-bold tracking-[0.1em] uppercase", dark ? "text-ink-400" : "text-ink-400")}>{g.group}</p>}
          {g.items.map((l) => {
            const active = !l.href.includes("#") && pathname === l.href;
            const Icon = ICONS[l.icon];
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-medium transition-colors",
                  dark
                    ? active ? "bg-brand-500/15 text-white" : "text-ink-300 hover:bg-white/[0.06] hover:text-white"
                    : active ? "bg-ink-900 text-white shadow-[0_8px_20px_rgb(0_26_58/0.2)]" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
                )}
              >
                <Icon className="size-[18px] shrink-0" aria-hidden />
                {l.label}
                {l.badge && <span className="ml-auto rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-ink-900">{l.badge}</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-[calc(100vh-36px)] bg-paper">
      <aside className={cn("hidden w-[264px] shrink-0 flex-col gap-4 border-r p-4 lg:flex", dark ? "border-transparent bg-ink-950" : "border-ink-200 bg-white")}>
        <div className="px-2 pt-2 pb-3"><Logo onDark={dark} /></div>
        {nav}
        <div className="mt-auto">{footer}</div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className={cn("flex items-center justify-between border-b px-5 py-3 lg:hidden", dark ? "border-white/10 bg-ink-950" : "border-ink-200 bg-white")}>
          <Logo onDark={dark} />
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className={cn("grid size-11 place-items-center rounded-xl border", dark ? "border-white/15 text-white" : "border-ink-200")}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && <div className={cn("border-b p-4 lg:hidden", dark ? "border-white/10 bg-ink-950" : "border-ink-200 bg-white")}>{nav}</div>}
        <main id="main" className="mx-auto max-w-[1180px] space-y-6 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

export function UnreadBell() {
  const [read, setRead] = useState(false);
  return (
    <button type="button" onClick={() => setRead(true)} aria-label={read ? "Notifications" : "Notifications — 2 unread"} className="relative grid size-11 place-items-center rounded-xl border border-ink-200 bg-white hover:shadow-xs">
      <Bell className="size-[18px]" aria-hidden />
      {!read && <span className="absolute top-2.5 right-3 size-2 rounded-full bg-reach" aria-hidden />}
    </button>
  );
}
