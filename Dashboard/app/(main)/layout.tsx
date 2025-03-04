import "@/app/globals.css"
import { Inter } from "next/font/google"

import { Sidebar } from "@/components/main/sidebar"
import { Topbar } from "@/components/main/topbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hospital Management Dashboard",
  description: "A comprehensive dashboard for managing hospital operations",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}

