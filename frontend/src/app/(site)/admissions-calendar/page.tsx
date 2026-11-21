import { Download } from "lucide-react";
import type { Metadata } from "next";
import { AdmissionCalendar } from "@/components/calendar/admission-calendar";
import { PageHeader } from "@/components/site/page-header";
import { ButtonLink } from "@/components/ui/button";
import { DEMO_TODAY, events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admission calendar",
  description: "Every admission deadline, entry test, merit list and scholarship date for Pakistani universities — verified from official notices.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admission calendar"
        title="Every deadline, in one place"
        description="Applications, entry tests, merit lists and scholarships — verified from official notices. Turn on reminders for the dates you care about."
        actions={<ButtonLink href="/admissions-calendar" variant="dark"><Download className="size-4" aria-hidden />Add to my phone calendar</ButtonLink>}
      />
      <AdmissionCalendar events={events} today={DEMO_TODAY} />
    </>
  );
}
