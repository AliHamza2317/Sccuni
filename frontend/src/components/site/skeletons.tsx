import { cn } from "@/lib/format";

function Bar({ className }: { className?: string }) {
  return <span className={cn("block animate-pulse rounded-full bg-ink-100", className)} />;
}

/** Placeholder shown while a program or university page streams in. */
export function DetailSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className={cn("border-b", dark ? "border-white/[0.06] bg-ink-950" : "border-ink-200/70 bg-white")}>
        <div className="mx-auto max-w-[1240px] space-y-5 px-5 pt-[120px] pb-12 sm:px-7">
          <Bar className={cn("h-3 w-56", dark && "bg-white/10")} />
          <div className="flex items-center gap-5">
            <span className={cn("size-[76px] animate-pulse rounded-[22px]", dark ? "bg-white/10" : "bg-ink-100")} />
            <div className="flex-1 space-y-3">
              <Bar className={cn("h-9 w-2/3 max-w-[520px]", dark && "bg-white/10")} />
              <Bar className={cn("h-4 w-1/2 max-w-[380px]", dark && "bg-white/10")} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1240px] gap-6 px-5 py-10 sm:px-7 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-4 rounded-[28px] bg-white p-8 ring-1 ring-ink-200/70">
              <Bar className="h-6 w-48" />
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-5/6" />
            </div>
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-[28px] bg-ink-100" />
      </div>
    </div>
  );
}
