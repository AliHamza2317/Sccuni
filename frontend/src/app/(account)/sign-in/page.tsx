import { Bell, Calculator, Lock, Target } from "lucide-react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/account/auth-form";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Sign in or create an account",
  robots: { index: false },
};

const perks = [
  { icon: Calculator, title: "Save calculations", text: "Keep a snapshot of every aggregate, with the formula it used." },
  { icon: Bell, title: "Get deadline reminders", text: "Email reminders before applications, tests and merit lists." },
  { icon: Target, title: "Your best-fit list", text: "Safe, Target and Reach programs that update as you add marks." },
];

export default function SignInPage() {
  return (
    <main id="main" className="flex min-h-[calc(100vh-36px)] flex-wrap">
      <section className="relative isolate flex flex-[1_1_440px] flex-col justify-between gap-12 overflow-hidden bg-ink-900 p-8 text-white sm:p-12">
        <div aria-hidden className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden className="animate-aurora absolute -top-56 -right-48 -z-10 size-[560px] rounded-full bg-brand-500/30 blur-[110px]" />
        <Logo onDark />
        <div className="max-w-md space-y-8">
          <h2 className="text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
            Your admission plan, <span className="text-brand-400">saved in one place.</span>
          </h2>
          <ul className="space-y-5">
            {perks.map((p) => (
              <li key={p.title} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-400"><p.icon className="size-5" aria-hidden /></span>
                <span><b className="block">{p.title}</b><span className="text-sm text-ink-300">{p.text}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <p className="flex max-w-md items-start gap-2.5 text-sm text-ink-300">
          <Lock className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden />
          We never sell your data. A university sees your details only when you choose to contact it.
        </p>
      </section>
      <section className="flex flex-[1_1_480px] items-center justify-center bg-white px-6 py-12">
        <AuthForm />
      </section>
    </main>
  );
}
