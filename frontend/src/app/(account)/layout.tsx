import { PrototypeBanner } from "@/components/site/footer";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrototypeBanner />
      {children}
    </>
  );
}
