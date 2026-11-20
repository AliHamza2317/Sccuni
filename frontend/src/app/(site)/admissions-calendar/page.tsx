import { Download } from "lucide-react";
import type { Metadata } from "next";
import { AdmissionCalendar } from "@/components/calendar/admission-calendar";
import { ButtonLink } from "@/components/ui/button";
import { DEMO_TODAY, events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admission calendar",
  description: "Every admission deadline, entry test, merit list and scholarship date for Pakistani universities — verified from official notices.",
};

export default function CalendarPage() {
  return (
    <>
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-6 px-5 pt-10 pb-8 sm:px-7">
          <div className="max-w-2xl space-y-3">
            <p className="text-[13px] font-bold tracking-[0.12em] text-brand-700 uppercase">Admission calendar</p>
            <h1 className="text-[clamp(2rem,3.6vw,3rem)] leading-tight font-extrabold tracking-[-0.035em]">Every deadline, in one place</h1>
            <p className="text-lg text-ink-500">Applications, entry tests, merit lists and scholarships — verified from official notices. Turn on reminders for the dates you care about.</p>
          </div>
          <ButtonLink href="/admissions-calendar" variant="dark"><Download className="size-4" aria-hidden />Add to my phone calendar</ButtonLink>
        </div>
      </section>
      <AdmissionCalendar events={events} today={DEMO_TODAY} />
    </>
  );
}
