import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import type { Metadata, Viewport } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sccuni — Know where you’ll get admission, before you apply",
    template: "%s · Sccuni",
  },
  description:
    "Pakistan’s university admission and merit guide: official merit formulas, verified past closing merits, fees, scholarships and deadlines in one place.",
  applicationName: "Sccuni",
  openGraph: {
    type: "website",
    siteName: "Sccuni",
    title: "Sccuni — Know where you’ll get admission",
    description: "Official merit formulas, verified past merits, fees and deadlines for Pakistani universities.",
  },
};

export const viewport: Viewport = {
  themeColor: "#001a3a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
