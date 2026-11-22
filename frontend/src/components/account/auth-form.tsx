"use client";

import { ArrowRight, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
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

/** A labelled input with a leading icon and an optional trailing control. */
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
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13.5px] font-semibold text-ink-900">{label}</label>
        {aside}
      </div>
      <div className="group relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-400 transition-colors group-focus-within:text-brand-600">{icon}</span>
        <input
          id={id}
          className={cn(
            "h-12 w-full rounded-2xl bg-ink-50/70 pr-4 pl-11 text-[15px] text-ink-900 ring-1 ring-ink-200 transition outline-none placeholder:text-ink-400 hover:ring-ink-300 focus:bg-white focus:ring-2 focus:ring-brand-500/60",
            trailing && "pr-12",
            className,
          )}
          {...input}
        />
        {trailing ? <span className="absolute inset-y-0 right-1.5 flex items-center">{trailing}</span> : null}
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

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [show, setShow] = useState(false);
  const [minor, setMinor] = useState(false);
  const [password, setPassword] = useState("");
  const signup = mode === "signup";
  const score = passwordScore(password);

  return (
    <div className="w-full max-w-[400px]">
      {/* Mode switch */}
      <div role="group" aria-label="Account" className="grid grid-cols-2 rounded-full bg-ink-100/80 p-1 ring-1 ring-ink-200/60">
        {([["signin", "Sign in"], ["signup", "Create account"]] as const).map(([m, label]) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "h-10 rounded-full text-[14px] font-semibold transition-all duration-300",
              mode === m ? "bg-white text-ink-950 shadow-[0_2px_10px_rgb(0_26_58/0.10)] ring-1 ring-ink-900/[0.06]" : "text-ink-500 hover:text-ink-900",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-9 space-y-2">
        <h1 className="text-[clamp(1.9rem,3vw,2.35rem)] leading-[1.1] font-extrabold tracking-[-0.04em] text-ink-950">
          {signup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-[15px] leading-relaxed text-ink-600">
          {signup ? "Free for students. Save your marks once and use them for every program." : "Sign in to see your saved programs, results and reminders."}
        </p>
      </div>

      <button
        type="button"
        className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white text-[15px] font-semibold text-ink-900 shadow-xs ring-1 ring-ink-200 transition hover:shadow-soft hover:ring-ink-300"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <div className="my-7 flex items-center gap-4 text-[12.5px] font-medium tracking-[0.06em] text-ink-500 uppercase before:h-px before:flex-1 before:bg-ink-200 after:h-px after:flex-1 after:bg-ink-200">or with email</div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>
        {signup && (
          <Field id="name" label="Full name" autoComplete="name" placeholder="As on your CNIC or B-Form" icon={<UserRound className="size-[18px]" aria-hidden />} />
        )}
        <Field id="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" icon={<Mail className="size-[18px]" aria-hidden />} />
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
            icon={<Lock className="size-[18px]" aria-hidden />}
            aside={!signup ? <a href="#" className="text-[13px] font-semibold text-brand-700 hover:underline">Forgot password?</a> : undefined}
            trailing={
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="grid size-9 place-items-center rounded-xl text-ink-500 transition hover:bg-ink-100 hover:text-ink-900"
              >
                {show ? <EyeOff className="size-[18px]" aria-hidden /> : <Eye className="size-[18px]" aria-hidden />}
              </button>
            }
          />
          {signup && password.length > 0 && (
            <div id="password-strength" aria-live="polite" className="flex items-center gap-3">
              <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden>
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={cn("h-1.5 rounded-full transition-colors duration-300", i <= score ? STRENGTH[score].bar : "bg-ink-200")} />
                ))}
              </div>
              <span className="shrink-0 text-[12.5px] font-medium text-ink-600">{STRENGTH[score].label}</span>
            </div>
          )}
        </div>

        {signup ? (
          <div className="space-y-4 pt-1">
            <div className="rounded-2xl bg-ink-50/70 px-4 py-3 ring-1 ring-ink-200/70">
              <Switch checked={minor} onChange={setMinor}>
                <span className="text-[14px] font-medium text-ink-800">I am under 18</span>
              </Switch>
              {minor && (
                <div className="animate-rise mt-3 space-y-3 border-t border-ink-200/70 pt-3">
                  <p className="text-[13.5px] leading-relaxed text-ink-600">A parent or guardian will approve your account before you can save personal details.</p>
                  <Field id="guardian" label="Parent or guardian’s email" type="email" placeholder="guardian@example.com" icon={<Mail className="size-[18px]" aria-hidden />} />
                </div>
              )}
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink-600">
              <input type="checkbox" required className="mt-0.5 size-[18px] shrink-0 rounded accent-brand-600" />
              <span>
                I agree to the <a href="#" className="font-semibold text-ink-900 underline-offset-4 hover:underline">Terms of Use</a> and{" "}
                <a href="#" className="font-semibold text-ink-900 underline-offset-4 hover:underline">Privacy Policy</a>.
              </span>
            </label>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 pt-1 text-[13.5px] text-ink-600">
            <input type="checkbox" defaultChecked className="size-[18px] shrink-0 accent-brand-600" />Keep me signed in on this device
          </label>
        )}

        <button
          type="submit"
          className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink-950 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_10px_26px_rgb(0_26_58/0.22)] transition hover:bg-ink-800"
        >
          {signup ? "Create account" : "Sign in"}
          <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-ink-600">
        {signup ? "Already have an account?" : "New to Sccuni?"}{" "}
        <button type="button" onClick={() => setMode(signup ? "signin" : "signup")} className="font-semibold text-brand-700 hover:underline">
          {signup ? "Sign in" : "Create an account"}
        </button>
      </p>
    </div>
  );
}
