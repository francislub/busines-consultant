"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(menu)
    }
  }

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
        { name: "Business Consulting", href: "/services/business-consulting" },
        { name: "Operations Management", href: "/services/operations-management" },
        { name: "Technology Solutions", href: "/services/technology-solutions" },
        { name: "Marketing Services", href: "/services/marketing-services" },
      ],
    },
    {
      name: "Articles",
      href: "#",
      dropdown: [
        { name: "All Articles", href: "/industries/general-contractors" },
        { name: "Find Work", href: "/industries/specialty-contractors" },
        { name: "Win Work", href: "/industries/construction-management" },
        { name: "Perform Work", href: "/industries/construction-management" },
        { name: "Business Operations", href: "/industries/construction-management" },
        { name: "Media & Video", href: "/industries/construction-management" },
        { name: "General", href: "/industries/construction-management" },
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
    <header className="bg-black py-4 px-6 md:px-12 lg:px-20">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="relative h-12 w-48">
          <Image
            src="https://sjc.microlink.io/y_nOOtcpgfwxhoJQ64tlBBnwOwM_l0OTOExsAT_Zcq3Y9kbzbEtU-j-GTyoiPLLblMJsMEDMe6ozOX4hoFS3RA.jpeg"
            alt="Ascent Consulting Logo"
            width={190}
            height={48}
            className="object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  // If item has dropdown, render a button that toggles the dropdown
                  <>
                    <button
                      className="text-white hover:text-red-500 flex items-center space-x-1 py-2"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-10">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-500 hover:text-white"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // If item has no dropdown, render a direct link
                  <Link href={item.href} className="text-white hover:text-red-500 py-2 block">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <Link
            href="/contact"
            className="inline-flex items-center bg-red-600 hover:bg-white hover:text-red-600 text-white font-medium py-3 px-2 rounded-full transition-colors"
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

