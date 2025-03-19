"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  MessageSquare,
  BookOpen,
  BarChart4,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard",
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
      href: "/admin/team",
      active: pathname === "/admin/team",
    },
    {
      label: "Contacts",
      icon: FileText,
      href: "/admin/contacts",
      active: pathname === "/admin/contacts",
    },
    {
      label: "Stories",
      icon: BookOpen,
      href: "/admin/stories",
      active: pathname === "/admin/stories",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Comments",
      icon: MessageSquare,
      href: "/admin/comments",
      active: pathname === "/admin/comments",
    },
    {
      label: "Analytics",
      icon: BarChart4,
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div
      className={cn(
        "h-full bg-black text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-6">
        {!collapsed && <h1 className="text-2xl font-bold">Admin</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-800"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-6">
        <nav className="space-y-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                route.active ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <route.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={cn(
            "flex items-center w-full px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
            collapsed ? "justify-center" : "",
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

