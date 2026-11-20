import Link from "next/link";
import { Logo } from "@/components/site/logo";

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-ink-900 px-6 text-center text-white">
      <div aria-hidden className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-40 -z-10 size-[520px] rounded-full bg-brand-500/25 blur-[110px]" />
      <Logo onDark />
      <p className="font-display text-7xl font-extrabold tracking-tight text-brand-400">404</p>
      <h1 className="text-3xl font-extrabold tracking-tight">We couldn’t find that page</h1>
      <p className="max-w-md text-ink-300">The program or page may have moved, or isn’t verified yet. Try searching from the programs page.</p>
      <div className="flex gap-3">
        <Link href="/" className="inline-flex h-11 items-center rounded-xl bg-brand-600 px-5 font-semibold hover:bg-brand-700">Go home</Link>
        <Link href="/programs" className="inline-flex h-11 items-center rounded-xl border border-white/15 bg-white/[0.08] px-5 font-semibold hover:bg-white/[0.14]">Find a program</Link>
      </div>
    </main>
  );
}
