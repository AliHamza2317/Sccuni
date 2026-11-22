import "@fontsource/sacramento/latin-400.css";
import { ArrowLeft, Calculator, Search, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/account/auth-form";
import signInBackground from "@/components/account/sign-in-bg.webp";
import { Logo } from "@/components/site/logo";

export const metadata: Metadata = {
  title: "Sign in or create an account",
  robots: { index: false },
};

const FEATURES = [
  { icon: Search, line1: "Search", line2: "Universities", href: "/programs" },
  { icon: Calculator, line1: "Calculate", line2: "Merit", href: "/merit-calculator" },
  { icon: Star, line1: "Find Your", line2: "Best Fit", href: "/best-fit" },
];

/**
 * Sign in / create account.
 * Background: the founder's campus artwork (sign-in-bg.webp; the logo and tagline baked into the
 * original were removed so the real ones can be live text). A dark, curved panel on the left keeps
 * the white headline readable; the form sits on a glass card on the right.
 */
export default function SignInPage() {
  return (
    <main id="main" data-header-theme="dark" className="relative isolate min-h-dvh overflow-hidden bg-[#021f1b] text-white">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Served as-is (134 KB WebP): no optimizer delay on first visit and no second compression. */}
        <Image src={signInBackground} alt="" fill preload unoptimized placeholder="blur" className="object-cover object-[28%_50%] lg:object-left" />
        {/* Dark curved panel with a soft emerald edge (fades out at the bottom so the cap and books stay bright) */}
        <div className="absolute top-1/2 left-[-34%] hidden h-[175%] w-[82%] -translate-y-1/2 rounded-[50%] bg-[#02201b]/[0.82] shadow-[inset_-3px_0_0_rgb(45_186_152/0.55),50px_0_90px_-30px_rgb(45_186_152/0.45)] [mask-image:linear-gradient(180deg,#000_0%,#000_44%,transparent_64%)] lg:block" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(2_26_22/0.40)_0%,transparent_45%),linear-gradient(180deg,transparent_55%,rgb(2_26_22/0.25)_100%)] lg:block" />
        {/* Phones and tablets: an even wash so the text and card stay readable over the photo */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(2_26_22/0.80)_0%,rgb(2_26_22/0.55)_45%,rgb(2_26_22/0.85)_100%)] lg:hidden" />
      </div>

      <header className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 pt-6 sm:px-10 lg:pt-10">
        <Logo onDark preload imageClassName="h-10 w-auto sm:h-12" />
        <Link
          href="/"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#02201b]/40 px-4 text-[14.5px] font-medium text-white ring-1 ring-white/20 backdrop-blur-xl transition hover:bg-[#02201b]/60"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          <span className="hidden sm:inline">Back to home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </header>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 pt-8 pb-14 sm:px-10 lg:min-h-[calc(100dvh-120px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16 lg:pt-4 lg:pb-12">
        {/* Left: message */}
        <div className="max-w-[600px] lg:-mt-10">
          <h2 className="text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white">
            Your admission plan,
            <br />
            <span className="text-brand-400">saved</span> in one place.
          </h2>
          <p className="mt-5 max-w-[470px] text-[clamp(1.02rem,1.4vw,1.3rem)] leading-relaxed text-white/90">
            Explore universities, compare programs and find your best fit in Pakistan.
          </p>

          <ul className="mt-10 hidden w-fit items-stretch rounded-[26px] bg-[#02201b]/55 p-2 ring-1 ring-white/15 backdrop-blur-xl sm:flex">
            {FEATURES.map(({ icon: Icon, line1, line2, href }, i) => (
              <li key={href} className={i > 0 ? "border-l border-white/15" : undefined}>
                <Link href={href} className="flex h-full items-center gap-3.5 rounded-[20px] px-5 py-3 transition hover:bg-white/[0.07]">
                  <Icon className="size-7 shrink-0 text-brand-300" strokeWidth={1.75} aria-hidden />
                  <span className="text-[14.5px] leading-tight text-white">
                    {line1}
                    <br />
                    {line2}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Tagline in script, with an emerald swash underneath */}
          <div aria-hidden className="mt-14 hidden w-fit -rotate-[5deg] pl-48 lg:block">
            <p className="text-[46px] leading-none text-white/95" style={{ fontFamily: "Sacramento, cursive" }}>
              Build a brighter future
            </p>
            <svg viewBox="0 0 300 30" className="mt-1 ml-6 h-[22px] w-[270px]" fill="none">
              <defs>
                <linearGradient id="swash" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgb(45 186 152)" stopOpacity="0.15" />
                  <stop offset="45%" stopColor="rgb(45 186 152)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="rgb(127 217 194)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M4 26 C 70 10, 170 4, 296 8" stroke="url(#swash)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="sr-only">Build a brighter future.</p>
        </div>

        {/* Right: glass card with the form */}
        <div className="w-full justify-self-center lg:justify-self-end">
          <div className="animate-rise relative rounded-[36px] bg-white/[0.93] p-6 text-ink-900 shadow-[0_40px_100px_-20px_rgb(0_10_8/0.6)] ring-1 ring-white/70 backdrop-blur-2xl sm:p-10">
            <AuthForm />
          </div>
        </div>
      </div>
    </main>
  );
}
