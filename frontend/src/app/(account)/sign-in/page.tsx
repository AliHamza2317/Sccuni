import { ArrowLeft, BadgeCheck, Lock, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/account/auth-form";
import { HeroBackground } from "@/components/home/hero-background";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Sign in or create an account",
  robots: { index: false },
};

const TRUST = [
  { icon: Sparkles, text: "Free for students" },
  { icon: BadgeCheck, text: "Official sources only" },
  { icon: Lock, text: "We never sell your data" },
];

/**
 * The home hero's live green silk fills the page; the form sits on a floating white card with a
 * second glass layer behind it.
 */
export default function SignInPage() {
  return (
    <main id="main" data-header-theme="dark" className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-ink-950 text-white">
      <HeroBackground />

      <header className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-7">
        <Logo onDark preload imageClassName="h-9 w-auto sm:h-10" />
        <Link
          href="/"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink-950/35 px-4 text-[14px] font-medium text-white ring-1 ring-white/15 backdrop-blur-xl transition hover:bg-ink-950/55"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          <span className="hidden sm:inline">Back to home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-14">
        <div className="relative w-full max-w-[460px]">
          {/* Second glass layer, peeking out below the card */}
          <div aria-hidden className="absolute inset-x-6 -bottom-4 top-6 rounded-[36px] bg-white/15 ring-1 ring-white/25 backdrop-blur-xl" />
          <div className="animate-rise relative rounded-[32px] bg-white/[0.97] p-6 text-ink-900 shadow-[0_40px_100px_-20px_rgb(0_10_26/0.6),0_0_0_1px_rgb(255_255_255/0.6)] backdrop-blur-xl sm:p-9">
            {/* A thin mint light along the card's top edge */}
            <span aria-hidden className="absolute inset-x-12 -top-px h-px bg-linear-to-r from-transparent via-brand-300 to-transparent" />
            <AuthForm />
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-2.5">
          {TRUST.map(({ icon: Icon, text }) => (
            <li key={text} className="inline-flex h-9 items-center gap-2 rounded-full bg-ink-950/35 px-3.5 text-[13px] font-medium text-white ring-1 ring-white/15 backdrop-blur-xl">
              <Icon className="size-4 text-brand-200" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="px-5 pb-6 text-center text-[12.5px] text-white">A university sees your details only when you choose to contact it.</p>
    </main>
  );
}
