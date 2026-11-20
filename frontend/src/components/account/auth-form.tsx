"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/controls";

const input = "h-12 w-full rounded-xl border border-ink-300 bg-white px-3.5 text-[15px] outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [show, setShow] = useState(false);
  const [minor, setMinor] = useState(false);
  const signup = mode === "signup";

  return (
    <div className="w-full max-w-[420px] space-y-7">
      <Segmented label="Account" value={mode} onChange={setMode} options={[{ value: "signin", label: "Sign in" }, { value: "signup", label: "Create account" }]} />
      <div className="space-y-2">
        <h1 className="text-[2rem] leading-tight font-extrabold tracking-[-0.03em]">{signup ? "Create your free account" : "Welcome back"}</h1>
        <p className="text-ink-500">{signup ? "Save your marks once and use them for every program." : "Sign in to see your saved programs and reminders."}</p>
      </div>

      <Button variant="light" size="lg" className="w-full">
        <span aria-hidden className="grid size-6 place-items-center rounded-full border border-ink-300 font-display text-xs font-extrabold">G</span>
        Continue with Google
      </Button>
      <div className="flex items-center gap-3 text-[13px] text-ink-500 before:h-px before:flex-1 before:bg-ink-200 after:h-px after:flex-1 after:bg-ink-200">or use your email</div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>
        {signup && (
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-semibold">Full name</label>
            <input id="name" autoComplete="name" placeholder="As on your CNIC or B-Form" className={input} />
          </div>
        )}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" className={input} />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            {!signup && <a href="#" className="text-sm font-semibold text-brand-700 hover:underline">Forgot password?</a>}
          </div>
          <div className="relative">
            <input id="password" type={show ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "At least 8 characters" : "Your password"} className={`${input} pr-12`} />
            <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="absolute top-1.5 right-1.5 grid size-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-100">
              {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
            </button>
          </div>
        </div>

        {signup ? (
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-700">
              <input type="checkbox" checked={minor} onChange={(e) => setMinor(e.target.checked)} className="size-[18px] accent-brand-600" />I am under 18
            </label>
            {minor && (
              <div className="space-y-3 rounded-2xl border border-ink-200 bg-ink-50 p-4">
                <p className="text-sm text-ink-600">We’ll ask a parent or guardian to approve your account before you can save personal details.</p>
                <div className="space-y-1.5">
                  <label htmlFor="guardian" className="text-sm font-semibold">Parent or guardian’s email</label>
                  <input id="guardian" type="email" placeholder="guardian@example.com" className={input} />
                </div>
              </div>
            )}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
              <input type="checkbox" required className="mt-0.5 size-[18px] accent-brand-600" />I agree to the Terms of Use and Privacy Policy.
            </label>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-700">
            <input type="checkbox" defaultChecked className="size-[18px] accent-brand-600" />Keep me signed in on this device
          </label>
        )}
        <Button type="submit" size="lg" className="w-full">{signup ? "Create account" : "Sign in"}</Button>
      </form>
      <p className="text-center text-sm text-ink-500">
        {signup ? "Already have an account?" : "New to Sccuni?"}{" "}
        <button type="button" onClick={() => setMode(signup ? "signin" : "signup")} className="font-semibold text-brand-700 hover:underline">{signup ? "Sign in" : "Create an account"}</button>
      </p>
    </div>
  );
}
