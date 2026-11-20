import type { Metadata } from "next";
import { AppShell, type ShellLink } from "@/components/account/app-shell";
import { VerificationQueue } from "@/components/account/verification-queue";

export const metadata: Metadata = { title: "Verification queue" };

const links: { group: string; items: ShellLink[] }[] = [
  { group: "Review", items: [
    { href: "/admin/verification", label: "Verification queue", icon: "ListChecks", badge: "12" },
    { href: "/admin/verification#reports", label: "Reports from users", icon: "Flag", badge: "4" },
    { href: "/admin/verification#health", label: "Data health", icon: "ShieldCheck" },
  ] },
  { group: "Data", items: [
    { href: "/universities/northstar-university", label: "Universities", icon: "Building2" },
    { href: "/programs", label: "Programs & intakes", icon: "GraduationCap" },
    { href: "/merit-calculator", label: "Merit formulas", icon: "Calculator" },
    { href: "/programs/northstar-bs-computer-science#merits", label: "Merit lists", icon: "TrendingUp" },
    { href: "/scholarships", label: "Fees & scholarships", icon: "Wallet" },
    { href: "/admissions-calendar", label: "Admission calendar", icon: "CalendarDays" },
    { href: "/admin/verification#imports", label: "Sources & imports", icon: "Upload" },
  ] },
  { group: "System", items: [
    { href: "/admin/verification#users", label: "Users & roles", icon: "Users" },
    { href: "/admin/verification#audit", label: "Audit log", icon: "History" },
    { href: "/admin/verification#settings", label: "Settings", icon: "Settings" },
  ] },
];

export default function VerificationPage() {
  return (
    <AppShell title="Admin" links={links} dark>
      <VerificationQueue />
    </AppShell>
  );
}
