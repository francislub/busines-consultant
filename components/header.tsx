"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown, X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])
  const menuRef = useRef<HTMLDivElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  // Close mobile menu on window resize (if screen becomes large)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const isDropdownOpen = (name: string) => openDropdowns.includes(name)

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
    <header className="bg-black py-4 px-4 md:px-12 lg:px-20 sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="z-20 relative">
          <Logo variant="horizontal" size="md" darkMode={true} className="py-2" />
        </Link>

        {/* Desktop Navigation */}
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
            href="/contact"
            className="inline-flex items-center bg-red-600 hover:bg-white hover:text-red-600 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
          >
            Free Consultations
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white z-20 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu panel */}
              <motion.div
                ref={menuRef}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-black z-10 lg:hidden overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex flex-col p-6 pt-20">
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <div key={item.name} className="py-1">
                        {item.dropdown ? (
                          // If item has dropdown, render an accordion-style dropdown
                          <div>
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className="flex items-center justify-between w-full text-white hover:text-red-500 py-3 border-b border-gray-800"
                            >
                              <span>{item.name}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  isDropdownOpen(item.name) ? "rotate-180" : "",
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {isDropdownOpen(item.name) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 py-2 space-y-1">
                                    {item.dropdown.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="block py-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          // If item has no dropdown, render a direct link
                          <Link
                            href={item.href}
                            className="block text-white hover:text-red-500 py-3 border-b border-gray-800 transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="mt-8">
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Free Consultations
                    </Link>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex justify-center space-x-6">
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

