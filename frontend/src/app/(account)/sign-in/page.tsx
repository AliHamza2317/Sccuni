import "@fontsource/sacramento/latin-400.css";
import { ArrowLeft, Calculator, Search, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/account/auth-form";
import signInBackground from "@/components/account/sign-in-bg.webp";

export const metadata: Metadata = {
  title: "Sign in or create an account",
  robots: { index: false },
};

const FEATURES = [
  { icon: Search, line1: "Search", line2: "Universities", href: "/programs" },
  { icon: Calculator, line1: "Calculate", line2: "Merit", href: "/merit-calculator" },
  { icon: Star, line1: "Get Expert", line2: "Guidance", href: "/best-fit" },
];

/**
 * Sign in / create account, built to the founder's mockup.
 * Layers (back to front): the founder's campus artwork; a light mist over the right half (behind the
 * card); a large dark curved panel on the left with a glowing emerald edge; then the content.
 */
export default function SignInPage() {
  return (
    <main id="main" className="relative isolate min-h-dvh overflow-hidden bg-[#06262a] text-white xl:bg-[#e9efee]">
      {/* ── Background ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Served as-is (134 KB WebP): no optimizer delay on first visit and no second compression.
            Phones and tablets: the photo covers the page. Wide screens (1280 px and up): this copy is blurred and only
            fills the space around the sharp photo below. */}
        <Image src={signInBackground} alt="" fill preload unoptimized placeholder="blur" className="object-cover object-[28%_50%] xl:scale-110 xl:object-left xl:blur-2xl" />

        {/* Wide screens: the sharp photo, 69% of the page width, anchored to the bottom and shifted right
            so the university building is centred at about 41% of the width — between the headline and the
            card, as in the mockup — and the cap and books sit at the lower left.
            Its edges feather into the blurred copy. */}
        <div className="absolute bottom-0 left-[15.6%] hidden aspect-[1672/941] w-[69%] [mask-image:linear-gradient(180deg,transparent_0%,#000_18%)] xl:block">
          <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,#000_12%,#000_86%,transparent_100%)]">
            <Image src={signInBackground} alt="" fill unoptimized loading="eager" className="object-cover" />
          </div>
        </div>

        {/* Wide screens: a light mist on the far right, soft enough that the scene still shows behind the card */}
        <div className="absolute inset-0 hidden xl:block xl:bg-[radial-gradient(36%_80%_at_88%_42%,rgb(241_245_244/0.62)_0%,rgb(236_242_241/0.45)_45%,rgb(236_242_241/0.2)_68%,rgb(236_242_241/0)_86%)]" />

        {/* Wide screens: deep teal shade from the left edge, fading out before the building;
            lighter at the bottom so the cap and books stay bright */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(5_36_40/0.95)_0%,rgb(5_36_40/0.92)_28%,rgb(5_36_40/0.72)_36%,rgb(5_36_40/0.25)_43%,transparent_49%)] [mask-image:linear-gradient(180deg,#000_0%,#000_58%,rgb(0_0_0/0.35)_82%,rgb(0_0_0/0.25)_100%)] xl:block" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(60%_55%_at_0%_0%,rgb(5_36_40/0.7),transparent_70%),radial-gradient(26%_17%_at_30%_31%,rgb(5_36_40/0.62),transparent_100%)] xl:block" />

        {/* Wide screens: the glowing emerald arc. A circle centred below and to the left of the page,
            so its edge enters at the top centre and sweeps down to the right behind the card
            (at 1586×992: through about x=620 at the top and x=965 at mid-height, clear of the headline). */}
        <div
          className="absolute hidden aspect-square w-[176.6vw] rounded-full shadow-[0_0_0_2px_rgb(63_208_176/0.85),0_0_0_18px_rgb(140_230_210/0.22),0_0_0_48px_rgb(140_230_210/0.12),0_0_90px_30px_rgb(63_208_176/0.25),inset_0_0_70px_6px_rgb(63_208_176/0.20)] xl:block"
          style={{ left: "-111vw", top: "calc(100.8% - 88.3vw)" }}
        />

        {/* Phones and tablets: an even dark wash so the text and card stay readable */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_32_34/0.82)_0%,rgb(4_32_34/0.6)_45%,rgb(4_32_34/0.88)_100%)] xl:hidden" />
      </div>

      {/* ── Top bar ── */}
      <header className="relative flex items-center justify-between gap-4 px-5 pt-6 sm:px-10 xl:pt-12 xl:pr-[5.5vw] xl:pl-[6vw]">
        <Link href="/" aria-label="Sccuni — home" className="flex items-center gap-3">
          <Image src="/brand/sccuni-mark-teal.png" alt="" width={66} height={60} preload className="h-11 w-auto sm:h-[60px]" />
          <span className="font-display text-[30px] leading-none font-medium tracking-[-0.01em] text-white sm:text-[36px]">Sccuni</span>
        </Link>
        <Link
          href="/"
          className="group inline-flex h-10 items-center gap-2.5 rounded-full px-4 text-[15px] font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/10 xl:-mt-6 xl:px-2 xl:text-ink-900 xl:ring-0 xl:hover:bg-transparent xl:hover:text-ink-700"
        >
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          <span className="hidden sm:inline">Back to home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </header>

      {/* ── Content ── */}
      <div className="relative grid items-center gap-10 px-5 pt-8 pb-14 sm:px-10 xl:min-h-[calc(100dvh-140px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,562px)] xl:gap-12 xl:pt-0 xl:pr-[8vw] xl:pb-10 xl:pl-[6vw]">
        {/* Left: message */}
        <div className="max-w-[620px] xl:self-start xl:pt-[clamp(24px,9vh,130px)]">
          <h2 className="font-display text-[clamp(2.3rem,3.75vw,3.95rem)] leading-[1.13] font-semibold tracking-[-0.025em] text-white">
            Your admission plan,
            <br />
            <span className="text-[#3fd3b2]">saved</span> in one place.
          </h2>
          <p className="mt-6 max-w-[520px] text-[clamp(1.1rem,1.6vw,1.5rem)] leading-[1.35] font-medium text-white/90">
            Explore universities, compare programs and find your best fit in Pakistan.
          </p>

          <ul className="mt-8 hidden w-fit items-stretch rounded-[30px] bg-[rgb(30_120_108/0.28)] p-2 ring-1 ring-[rgb(63_208_176/0.30)] backdrop-blur-xl sm:flex">
            {FEATURES.map(({ icon: Icon, line1, line2, href }, i) => (
              <li key={href} className={i > 0 ? "border-l border-white/20" : undefined}>
                <Link href={href} className="flex h-full items-center gap-3 rounded-[24px] px-4 py-3 whitespace-nowrap transition hover:bg-white/[0.07] xl:gap-4 xl:px-6 xl:py-3.5">
                  <Icon className="size-6 shrink-0 text-[#3fd3b2] xl:size-[30px]" strokeWidth={1.75} aria-hidden />
                  <span className="text-[14px] leading-[1.25] text-white/90 xl:text-[16px]">
                    {line1}
                    <br />
                    {line2}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Tagline in script, with an emerald swash underneath */}
          <div aria-hidden className="relative mt-[clamp(48px,9vh,110px)] hidden w-fit -rotate-[6deg] pl-[42%] drop-shadow-[0_2px_10px_rgb(0_20_18/0.6)] xl:block">
            <span className="absolute -inset-y-8 right-[-40px] left-[36%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(5_36_40/0.7),rgb(5_36_40/0.35)_60%,transparent)] blur-md" />
            <p className="text-[clamp(32px,2.6vw,42px)] leading-none whitespace-nowrap text-white/90" style={{ fontFamily: "Sacramento, cursive" }}>
              Build a brighter future
            </p>
            <svg viewBox="0 0 300 30" className="mt-1 ml-[110px] h-[20px] w-[200px]" fill="none">
              <defs>
                <linearGradient id="swash" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgb(63 208 176)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="rgb(63 208 176)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path d="M4 26 C 70 10, 170 4, 296 8" stroke="url(#swash)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="sr-only">Build a brighter future.</p>
        </div>

        {/* Right: the card */}
        <div className="w-full max-w-[562px] justify-self-center xl:justify-self-end">
          <div className="animate-rise relative rounded-[40px] bg-[rgb(242_246_245/0.92)] px-6 py-8 text-ink-900 shadow-[0_30px_80px_-20px_rgb(4_40_38/0.30),0_2px_6px_rgb(4_40_38/0.06)] ring-1 ring-white/90 backdrop-blur-2xl sm:px-12 sm:py-10">
            <AuthForm />
          </div>
        </div>
      </div>
    </main>
  );
}
