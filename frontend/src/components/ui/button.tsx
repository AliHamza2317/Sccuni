import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_22px_rgb(0_126_103/0.28)] hover:bg-brand-700 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_12px_30px_rgb(0_126_103/0.36)]",
  dark: "bg-ink-900 text-white hover:bg-ink-800 shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_8px_22px_rgb(0_26_58/0.22)]",
  light: "bg-white text-ink-900 border border-ink-200/90 shadow-xs hover:border-ink-300 hover:shadow-soft",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  ondark: "bg-white/[0.08] text-white border border-white/15 hover:bg-white/[0.14] backdrop-blur",
  danger: "bg-white text-danger border border-[#f3c4c9] hover:bg-danger-bg",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm rounded-full gap-1.5",
  md: "h-11 px-5.5 text-[15px] rounded-full gap-2",
  lg: "h-14 px-8 text-base rounded-full gap-2.5",
  icon: "h-11 w-11 rounded-full",
  "icon-sm": "h-9 w-9 rounded-full",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

const base =
  "inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-[background,box-shadow,border-color,color,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none";

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children?: ReactNode };

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: Common & ComponentProps<typeof Link>) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
