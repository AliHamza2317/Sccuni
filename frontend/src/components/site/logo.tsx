import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

/** The Sccuni logo. `onDark` swaps to the white-and-green version for navy backgrounds. */
export function Logo({ onDark = false, className, href = "/", priority = false }: { onDark?: boolean; className?: string; href?: string; priority?: boolean }) {
  return (
    <Link href={href} aria-label="Sccuni — home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={onDark ? "/brand/sccuni-logo-white.png" : "/brand/sccuni-logo.png"}
        alt="Sccuni"
        width={1200}
        height={409}
        priority={priority}
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}

export function LogoMark({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <Image
      src={onDark ? "/brand/sccuni-mark-white.png" : "/brand/sccuni-mark.png"}
      alt=""
      width={512}
      height={467}
      className={cn("h-8 w-auto", className)}
    />
  );
}
