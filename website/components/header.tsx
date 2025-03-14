"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Logo } from "@/components/ui/logo"

export default function Header() {
  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Who We Are",
      href: "#",
      dropdown: [
        { name: "About Us", href: "/whatwedo" },
        { name: "Coaches Vs Consultants", href: "/business-coaches" },
        { name: "Careers", href: "/careers" },
        { name: "Resources", href: "/resources" },
        { name: "Clients", href: "/clients" },
      ],
    },
    {
      name: "What We Do",
      href: "/services",
      dropdown: [
        { name: "Business Consulting", href: "/service/growth" },
        { name: "Operations Management", href: "/service/operations" },
        { name: "Professional Trainings", href: "/service/fractional" },
        { name: "Monitoring & Evaluation", href: "/service/procore" },
      ],
    },
    {
      name: "Articles",
      href: "#",
      dropdown: [
        { name: "All Articles", href: "/articles" },
        { name: "Find Work", href: "/articles" },
        { name: "Win Work", href: "/articles" },
        { name: "Perform Work", href: "/articles" },
        { name: "Business Operations", href: "/articles" },
        { name: "Media & Video", href: "/articles" },
        { name: "General", href: "/articles" },
      ],
    },
    {
      name: "Success Stories",
      href: "/success-stories",
      dropdown: null,
    },
    {
      name: "References",
      href: "/references",
      dropdown: null,
    },
    {
      name: "Contact",
      href: "/contact",
      dropdown: null,
    },
  ]

  return (
    <header className="bg-black py-4 md:px-12 lg:px-20 sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
          <Logo variant="horizontal" size="md" darkMode={true} className="py-2" />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  // If item has dropdown, render a button with hover dropdown
                  <>
                    <Link
                      href={item.href}
                      className="text-white hover:text-red-500 flex items-center space-x-1 py-2 group"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    <div className="absolute left-0 mt-0 w-56 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                      <div className="pt-2">
                        <motion.div
                          className="bg-white shadow-lg rounded-md py-2 z-10 overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </>
                ) : (
                  // If item has no dropdown, render a direct link
                  <Link
                    href={item.href}
                    className="text-white hover:text-red-500 py-2 block transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <Link
            href="/register"
            className="inline-flex items-center bg-red-600 hover:bg-white hover:text-red-600 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
          >
            Free Consultations
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

