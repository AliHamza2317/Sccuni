import { ArrowLeft, Bell, Lock, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/account/auth-form";
import { HeroBackground } from "@/components/home/hero-background";
import { Logo } from "@/components/site/logo";
import { GroupPill } from "@/components/ui/badges";

export const metadata: Metadata = {
  title: "Sign in or create an account",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <main id="main" className="flex min-h-dvh flex-col bg-white lg:flex-row">
      {/* Brand panel: the home hero's live silk, inset as a rounded card on wide screens */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white lg:m-3 lg:w-[52%] lg:rounded-[32px]">
        <HeroBackground />
        <div className="flex h-full flex-col justify-between gap-10 px-6 pt-6 pb-10 sm:px-10 lg:p-12">
          <Logo onDark preload />

          <div className="max-w-lg space-y-8">
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.04] font-extrabold tracking-[-0.045em]">
              <span className="text-white">Your admission plan,</span>
              <br />
              <span className="text-gradient-emerald">saved in one place.</span>
            </h2>

            {/* What you get, shown as small product previews */}
            <div className="hidden space-y-3 lg:block">
              <div className="w-fit rounded-3xl bg-ink-950/45 p-5 ring-1 ring-white/15 backdrop-blur-xl">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-white"><Target className="size-4 text-brand-300" aria-hidden />Your Best Fit list</p>
                <div className="mt-3 flex gap-2">
                  {([["safe", 5], ["target", 4], ["reach", 3]] as const).map(([g, n]) => (
                    <span key={g} className="flex items-center gap-2 rounded-2xl bg-white/[0.08] py-1.5 pr-3 pl-1.5 ring-1 ring-white/10">
                      <GroupPill group={g} size="sm" />
                      <b className="tabular text-[14px]">{n}</b>
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-10 flex w-fit items-center gap-3 rounded-3xl bg-ink-950/45 py-3.5 pr-5 pl-3.5 ring-1 ring-white/15 backdrop-blur-xl">
                <span className="grid size-10 place-items-center rounded-2xl bg-brand-500/20 text-brand-200 ring-1 ring-brand-300/30"><Bell className="size-[18px]" aria-hidden /></span>
                <span>
                  <span className="block text-[14px] font-semibold text-white">Reminder set</span>
                  <span className="block text-[13px] text-ink-100">Applications close in 6 days</span>
                </span>
              </div>
            </div>
          </div>

          <p className="hidden w-fit max-w-md items-start gap-2.5 rounded-2xl bg-ink-950/45 px-4 py-3 text-[13.5px] leading-relaxed text-ink-100 ring-1 ring-white/10 backdrop-blur-xl lg:flex">
            <Lock className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
            We never sell your data. A university sees your details only when you choose to contact it.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex flex-1 flex-col px-6 pt-6 pb-12 sm:px-10">
        <Link href="/" className="group inline-flex w-fit items-center gap-2 text-[14px] font-medium text-ink-600 transition-colors hover:text-ink-900">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          Back to home
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <AuthForm />
        </div>
        <p className="mx-auto flex max-w-[400px] items-start gap-2 text-[12.5px] leading-relaxed text-ink-500 lg:hidden">
          <Lock className="mt-0.5 size-3.5 shrink-0 text-brand-600" aria-hidden />
          We never sell your data. A university sees your details only when you choose to contact it.
        </p>
      </section>
    </main>
  );
}
