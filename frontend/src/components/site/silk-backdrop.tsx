import Image from "next/image";
import { cn } from "@/lib/format";
import silkLight from "./silk-light.webp";

type Corner = "tl" | "tr" | "bl" | "br";

const PLACE: Record<Corner, string> = {
  tr: "-top-[45%] -right-[14%]",
  tl: "-top-[45%] -left-[14%]",
  br: "-bottom-[50%] -right-[14%]",
  bl: "-bottom-[50%] -left-[14%]",
};

/** Which part of the silk each corner shows, so the corners don't look identical. */
const FOCUS: Record<Corner, string> = {
  tr: "35% 25%",
  tl: "60% 35%",
  br: "20% 80%",
  bl: "70% 70%",
};

const SIZE = {
  sm: "h-[110%] w-[42%] min-w-[260px]",
  md: "h-[150%] w-[58%] min-w-[320px]",
  lg: "h-[190%] w-[72%] min-w-[380px]",
};

/**
 * Light silk accents in the corners of a section (white, mist blue and mint — the hero's folds in
 * light tones). The middle stays clean for text. Drifts very slowly; still under reduced motion.
 */
export function SilkCorners({
  corners = ["tr", "bl"],
  size = "md",
  drift = true,
  eager = false,
  className,
}: {
  corners?: Corner[];
  size?: keyof typeof SIZE;
  drift?: boolean;
  /** Above-the-fold use: load at once. */
  eager?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {corners.map((c) => (
        <div key={c} className={cn("absolute [mask-image:radial-gradient(closest-side,#000_25%,transparent_100%)]", PLACE[c], SIZE[size])}>
          <Image
            src={silkLight}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 90vw"
            placeholder="blur"
            loading={eager ? "eager" : "lazy"}
            className={cn("object-cover", drift && "animate-drift")}
            style={{ objectPosition: FOCUS[c] }}
          />
        </div>
      ))}
    </div>
  );
}
