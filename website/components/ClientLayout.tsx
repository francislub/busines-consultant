"use client";

import { usePathname } from "next/navigation";
import MainHeader from "@/components/header";
import Footer from "@/components/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = ["/register", "/login","/client/dashboard","/client/dashboard/inquiries","/client/dashboard/consultations","/client/dashboard/messages"].includes(pathname);

  return (
    <>
      {!hideLayout && <MainHeader />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
