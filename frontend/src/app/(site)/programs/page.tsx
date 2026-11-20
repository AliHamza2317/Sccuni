import type { Metadata } from "next";
import { ProgramExplorer } from "@/components/programs/program-explorer";
import { getPrograms, getUniversity, latestClosing } from "@/lib/data";

export const metadata: Metadata = {
  title: "Find your program",
  description: "Search undergraduate programs in Pakistan by field, city, fee and entry test — with verified fees, merit formulas and past closing merits.",
};

export default function ProgramsPage() {
  const items = getPrograms().map((program) => ({
    program,
    university: getUniversity(program.universitySlug)!,
    closing: latestClosing(program),
  }));
  return <ProgramExplorer items={items} />;
}
