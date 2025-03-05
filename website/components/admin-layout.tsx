"use client"

import type React from "react"

import Header from "@/components/header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}

