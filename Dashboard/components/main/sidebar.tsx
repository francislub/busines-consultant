import { Home, Users, UserIcon as UserMd, FileText, Calendar, Settings } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Dashboard", href: "/sys", icon: Home },
  { name: "Doctors", href: "/doctors", icon: UserMd },
  { name: "Users", href: "/users", icon: Users },
  { name: "Invoices & Receipts", href: "/invoices", icon: FileText },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Profile", href: "/profile", icon: UserMd },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  return (
    <div className="bg-white w-64 h-full shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Hospital Dashboard</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

