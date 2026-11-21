import Image from "next/image";
import silkPoster from "@/components/home/silk-poster.webp";
import { cn } from "@/lib/format";

/**
 * The home hero's silk as a still, slowly drifting background (no WebGL), for page headers and
 * feature panels. A shade layer keeps white text on top readable.
 */
export function SilkBackdrop({
  position = "50% 40%",
  shade = "left",
  sizes = "100vw",
  eager = false,
  drift = true,
  className,
  imageClassName,
}: {
  /** CSS object-position: which part of the silk to show. */
  position?: string;
  /** Where the readability shade is strongest. */
  shade?: "left" | "center" | "bottom";
  sizes?: string;
  /** Above-the-fold use: load at once with high priority. */
  eager?: boolean;
  /** Very slow zoom and pan; off under reduced motion. */
  drift?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink-950", className)}>
      <Image
        src={silkPoster}
        alt=""
        fill
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={cn("object-cover", drift && "animate-drift", imageClassName)}
        style={{ objectPosition: position }}
      />
      {shade === "left" && <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_10_26/0.60)_0%,rgb(0_10_26/0.30)_55%,rgb(0_10_26/0.10)_100%)]" />}
      {shade === "center" && <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_45%,rgb(0_10_26/0.62),rgb(0_10_26/0.30)_70%,rgb(0_10_26/0.20))]" />}
      {shade === "bottom" && <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_10_26/0.10)_0%,rgb(0_10_26/0.30)_45%,rgb(0_10_26/0.82)_100%)]" />}
    </div>
  );
}
