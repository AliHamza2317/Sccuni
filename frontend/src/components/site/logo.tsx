import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

/** The Sccuni logo. `onDark` swaps to the white-and-green version for navy backgrounds. */
export function Logo({
  onDark = false,
  className,
  imageClassName,
  href = "/",
  preload = false,
}: {
  onDark?: boolean;
  className?: string;
  /** Overrides the default image height (h-10 / sm:h-11). */
  imageClassName?: string;
  href?: string;
  /** Preload the image in <head> (Next.js 16 replacement for `priority`). */
  preload?: boolean;
}) {
  return (
    <Link href={href} aria-label="Sccuni — home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={onDark ? "/brand/sccuni-logo-white.png" : "/brand/sccuni-logo.png"}
        alt="Sccuni"
        // Display size (the file is 1200×409). A small intrinsic size keeps the generated images small and fast.
        width={176}
        height={60}
        preload={preload}
        className={imageClassName ?? "h-10 w-auto sm:h-11"}
      />
    </Link>
  );
}

export function LogoMark({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Image
      src={onDark ? "/brand/sccuni-mark-white.png" : "/brand/sccuni-mark.png"}
      alt=""
      width={70}
      height={64}
      className={cn("h-8 w-auto", className)}
    />
  );
}
