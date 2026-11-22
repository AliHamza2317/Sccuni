"use client";

import { ArrowRight, CirclePlus, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Switch } from "@/components/ui/controls";
import { cn } from "@/lib/format";

/** Google's "G" mark, as shown on standard "Continue with Google" buttons. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

/** Apple logo, as shown on standard "Continue with Apple" buttons. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M16.37 12.7c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.54 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.29-.88-2.31-3.49zM14.2 6.23c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21z" />
    </svg>
  );
}

/** A labelled, pill-shaped input with a leading icon and an optional trailing control. */
function Field({
  id,
  label,
  icon,
  trailing,
  aside,
  className,
  ...input
}: { id: string; label: string; icon: ReactNode; trailing?: ReactNode; aside?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <label htmlFor={id} className="text-[16px] font-semibold text-ink-900">{label}</label>
        {aside}
      </div>
      <div className="group relative">
        <span className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-ink-600 transition-colors group-focus-within:text-brand-700">{icon}</span>
        <input
          id={id}
          className={cn(
            "h-[56px] w-full rounded-full bg-[rgb(246_249_248)] pr-5 pl-[60px] text-[16px] text-ink-900 ring-1 ring-ink-200/90 transition outline-none placeholder:text-ink-400 hover:ring-ink-300 focus:bg-white focus:ring-2 focus:ring-brand-600/60 focus:shadow-[0_0_0_6px_rgb(0_152_124/0.10)]",
            trailing && "pr-14",
            className,
          )}
          {...input}
        />
        {trailing ? <span className="absolute inset-y-0 right-2 flex items-center">{trailing}</span> : null}
      </div>
    </div>
  );
}

/** 0–4, from length and character variety. A hint only; the server enforces the real rules. */
function passwordScore(pw: string) {
  if (pw.length < 8) return 0;
  let s = 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 14) s++;
  return Math.min(s, 4);
}
const STRENGTH = [
  { label: "Too short — use at least 8 characters", bar: "bg-danger" },
  { label: "Weak", bar: "bg-reach" },
  { label: "Fair", bar: "bg-gold-500" },
  { label: "Good", bar: "bg-brand-500" },
  { label: "Strong", bar: "bg-brand-700" },
];

const MODES = [
  { id: "signin" as const, label: "Sign in", icon: UserRound },
  { id: "signup" as const, label: "Create account", icon: CirclePlus },
];

/** The sign-in / create-account form, for the glass card on the sign-in page. */
export function AuthForm({ initialMode = "signin" }: { initialMode?: "signin" | "signup" }) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [show, setShow] = useState(false);
  const [minor, setMinor] = useState(false);
  const [password, setPassword] = useState("");
  const signup = mode === "signup";
  const score = passwordScore(password);

  return (
    <div>
      {/* Mode switch: a dark-green pill slides under the active option */}
      <div role="group" aria-label="Account" className="relative mx-auto grid max-w-[416px] grid-cols-2 rounded-full bg-white/90 p-1.5 shadow-[0_2px_10px_rgb(4_40_38/0.06)] ring-1 ring-ink-200/80">
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-linear-to-br from-[#0c5a4f] via-[#08463f] to-[#063530] shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_10px_22px_rgb(6_53_48/0.38)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            signup && "translate-x-full",
          )}
        />
        {MODES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={cn(
              "relative z-10 flex h-12 items-center justify-center gap-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors duration-300 sm:h-[52px] sm:gap-3 sm:text-[16px]",
              mode === id ? "text-white" : "text-ink-800 hover:text-ink-950",
            )}
          >
            <Icon className={cn("size-4 shrink-0 transition-colors sm:size-5", mode === id ? "text-[#3fd3b2]" : "text-[#0c5a4f]")} strokeWidth={2} aria-hidden />
            {label}
          </button>
        ))}
      </div>

      {/* Everything below re-enters gently when the mode changes */}
      <div key={mode} className="animate-swap">
        <div className="mt-9 space-y-3 text-center">
          <h1 className="text-[1.9rem] leading-[1.15] font-bold tracking-[-0.03em] text-[#0b2230] sm:text-[2.6rem]">
            {signup ? "Create your account" : "Welcome back"} <span aria-hidden>{signup ? "✨" : "👋"}</span>
          </h1>
          <p className="text-[16px] leading-relaxed text-ink-600 sm:text-[18px]">
            {signup ? "Join free — save your marks once and use them for every program" : "Sign in to continue your journey with Sccuni"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>
          {signup && (
            <Field id="name" label="Full name" autoComplete="name" placeholder="As on your CNIC or B-Form" icon={<UserRound className="size-5" aria-hidden />} />
          )}
          <Field id="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" icon={<Mail className="size-5" aria-hidden />} />
          <div className="space-y-2.5">
            <Field
              id="password"
              label="Password"
              type={show ? "text" : "password"}
              autoComplete={signup ? "new-password" : "current-password"}
              placeholder={signup ? "At least 8 characters" : "Your password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={signup ? "password-strength" : undefined}
              icon={<Lock className="size-5" aria-hidden />}
              aside={!signup ? <a href="#" className="text-[13.5px] font-semibold text-brand-700 hover:underline">Forgot password?</a> : undefined}
              trailing={
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="grid size-10 place-items-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900"
                >
                  {show ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
                </button>
              }
            />
            {signup && password.length > 0 && (
              <div id="password-strength" aria-live="polite" className="flex items-center gap-3 px-2">
                <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden>
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className={cn("h-1 rounded-full transition-colors duration-300", i <= score ? STRENGTH[score].bar : "bg-ink-200")} />
                  ))}
                </div>
                <span className="shrink-0 text-[12.5px] font-medium text-ink-600">{STRENGTH[score].label}</span>
              </div>
            )}
          </div>

          {signup ? (
            <div className="space-y-4 px-1 pt-1">
              <Switch checked={minor} onChange={setMinor}>
                <span className="text-[16px] font-semibold text-ink-900">I am under 18</span>
              </Switch>
              {minor && (
                <div className="animate-swap space-y-3 rounded-3xl bg-ink-50/80 p-4 ring-1 ring-ink-200/70">
                  <p className="text-[13.5px] leading-relaxed text-ink-600">A parent or guardian will approve your account before you can save personal details.</p>
                  <Field id="guardian" label="Parent or guardian’s email" type="email" placeholder="guardian@example.com" icon={<Mail className="size-5" aria-hidden />} />
                </div>
              )}
              <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink-700">
                <input type="checkbox" required className="mt-0.5 size-[18px] shrink-0 accent-brand-600" />
                <span>
                  I agree to the <a href="#" className="font-semibold text-brand-700 hover:underline">Terms of Use</a> and{" "}
                  <a href="#" className="font-semibold text-brand-700 hover:underline">Privacy Policy</a>.
                </span>
              </label>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center gap-3 px-1 pt-1 text-[14px] text-ink-700">
              <input type="checkbox" defaultChecked className="size-[18px] shrink-0 accent-brand-600" />Keep me signed in on this device
            </label>
          )}

          <button
            type="submit"
            className="group flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#063530] via-[#0a4c44] to-[#11806a] text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_14px_34px_rgb(10_90_78/0.42)] transition hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_18px_40px_rgb(10_90_78/0.52)]"
          >
            {signup ? "Create account" : "Sign in"}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
        </form>

        <div className="mt-7 flex items-center gap-4 text-[15px] text-ink-600 before:h-px before:flex-1 before:bg-ink-200 after:h-px after:flex-1 after:bg-ink-200">or continue with</div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button type="button" className="flex h-[52px] items-center justify-center gap-3 rounded-full bg-white text-[15px] font-semibold text-ink-900 shadow-[0_2px_8px_rgb(4_40_38/0.05)] ring-1 ring-ink-200 transition hover:-translate-y-px hover:shadow-soft">
            <GoogleMark />
            Continue with Google
          </button>
          <button type="button" className="flex h-[52px] items-center justify-center gap-3 rounded-full bg-white text-[15px] font-semibold text-ink-900 shadow-[0_2px_8px_rgb(4_40_38/0.05)] ring-1 ring-ink-200 transition hover:-translate-y-px hover:shadow-soft">
            <AppleMark />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
