import { Download } from "lucide-react";
import type { Metadata } from "next";
import { AdmissionCalendar } from "@/components/calendar/admission-calendar";
import { PageHeader } from "@/components/site/page-header";
import { ButtonLink } from "@/components/ui/button";
import { DEMO_TODAY, events, getProgram, getUniversity } from "@/lib/data";
import type { FieldId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Admission calendar",
  description: "Every admission deadline, entry test, merit list and scholarship date for Pakistani universities — verified from official notices.",
};

/** City and field of each event, from the program or university it links to (none = applies everywhere). */
function eventMeta() {
  const meta: Record<string, { city?: string; field?: FieldId }> = {};
  for (const e of events) {
    const [, kind, slug] = e.href.split("/");
    if (kind === "programs") {
      const p = getProgram(slug);
      meta[e.id] = { city: p?.city, field: p?.field };
    } else if (kind === "universities") {
      meta[e.id] = { city: getUniversity(slug)?.city };
    } else {
      meta[e.id] = {};
    }
  }
  return meta;
}

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        silkPosition="72% 30%"
        eyebrow="Admission calendar"
        title="Every deadline, in one place"
        description="Applications, entry tests, merit lists and scholarships — verified from official notices. Turn on reminders for the dates you care about."
        actions={<ButtonLink href="/admissions-calendar" variant="light"><Download className="size-4" aria-hidden />Add to my phone calendar</ButtonLink>}
      />
      <AdmissionCalendar events={events} today={DEMO_TODAY} meta={eventMeta()} />
    </>
  );
}
