"use client";

import { usePathname } from "next/navigation";
import MainHeader from "@/components/header";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = ["/register", "/login","/client/dashboard","/client/dashboard/inquiries","/client/dashboard/consultations","/client/dashboard/messages","/admin/dashboard","/admin/dashboard/stories","/admin/dashboard/articles","/admin/dashboard/teams","/admin/dashboard/comments","/forgot-password"].includes(pathname);

  return (
    <>
      {!hideLayout && <MainHeader />}
      <main><SessionProvider>{children}</SessionProvider></main>
      {!hideLayout && <Footer />}
    </>
  );
}
