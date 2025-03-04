import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hospital Management System - Authentication",
  description: "Sign in or sign up to access the hospital management system",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <main className="w-full max-w-md">{children}</main>
        </div>
      </body>
    </html>
  )
}

