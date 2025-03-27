"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, BookOpen, FileText, Users, MessageSquare, Settings, LogOut, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

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

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut({ callbackUrl: "/" })
      // Note: The following code won't execute because signOut redirects the user
      // It's included for completeness in case the redirect behavior changes
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out. Please try again.")
      setIsLoggingOut(false)
    }
  }

  return (
    <>
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
                  route.active ? "text-white bg-red-600" : "text-zinc-400",
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
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-red-600/10 rounded-lg transition text-zinc-400 disabled:opacity-50"
          >
            <div className="flex items-center flex-1">
              {isLoggingOut ? (
                <Loader2 className="h-5 w-5 mr-3 text-zinc-400 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5 mr-3 text-zinc-400" />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </div>
          </button>
        </div>
      </div>

      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>You will be redirected to the home page after logging out.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

