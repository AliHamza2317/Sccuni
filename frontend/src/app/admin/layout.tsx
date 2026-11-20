import type { Metadata } from "next";
import { PrototypeBanner } from "@/components/site/footer";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Sccuni Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrototypeBanner />
      {children}
    </>
  );
}
