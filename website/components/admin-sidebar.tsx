"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, FileText, Users, MessageSquare, Settings, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

export function AdminSidebar() {
  const pathname = usePathname()
  
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Stories",
      icon: BookOpen,
      href: "/admin/stories",
      active: pathname === "/admin/stories",
    },
    {
      label: "Articles",
      icon: FileText,
      href: "/admin/articles",
      active: pathname === "/admin/articles",
    },
    {
      label: "Team",
      icon: Users,
      href: "/admin/teams",
      active: pathname === "/admin/teams",
    },
    {
      label: "Comments",
      icon: MessageSquare,
      href: "/admin/comments",
      active: pathname === "/admin/comments",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-red-600/10 rounded-lg transition",
                route.active ? "text-white bg-red-600" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.active ? "text-white" : "text-zinc-400")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-red-600/10 rounded-lg transition text-zinc-400"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-zinc-400" />
            Logout
          </div>
        </button>
      </div>
    </div>
  )
}
