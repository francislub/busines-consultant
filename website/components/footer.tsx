"use client"

import { useState } from "react"
import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ArrowUp,
  Globe,
  Award,
  CheckCircle,
} from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ElementType
  label: string
}) => (
  <Link
    href={href}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 text-white transition-colors duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </Link>
)

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-zinc-400 hover:text-white transition-colors duration-200 py-1.5 block">
    {children}
  </Link>
)

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-1 after:bg-red-600 after:-mb-2">
    {children}
  </h3>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [email, setEmail] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter",
    })
    setEmail("")
  }

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Show back to top button when scrolled down
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    })
  }

  return (
    <footer className="bg-black text-white relative">
      {/* Pre-footer banner */}
      <div className="bg-red-600 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6" />
            <span className="font-semibold">Award-winning consulting services since 2010</span>
          </div>
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-red-600"
            asChild
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo and tagline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Logo variant="horizontal" size="md" darkMode={true} className="py-2" />
              </Link>
            </div>
            <p className="text-lg font-medium">
              Mancha Development Company is dedicated to empowering businesses with strategic consulting solutions to
              enhance profitability and operational efficiency.
            </p>
            <p className="text-zinc-400">Helping businesses achieve sustainable growth and success.</p>

            <div className="flex flex-col space-y-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
              >
                Schedule a Free Consultation
              </Link>

              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">ISO 9001 Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-2">
            <FooterHeading>Quick Links</FooterHeading>

            {isMobile ? (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="services" className="border-zinc-800">
                  <AccordionTrigger className="text-white hover:text-white py-2">Services</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pt-2">
                      <FooterLink href="/services/business-consulting">Business Consulting</FooterLink>
                      <FooterLink href="/services/strategic-planning">Strategic Planning</FooterLink>
                      <FooterLink href="/services/market-research">Market Research</FooterLink>
                      <FooterLink href="/services/financial-analysis">Financial Analysis</FooterLink>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="company" className="border-zinc-800">
                  <AccordionTrigger className="text-white hover:text-white py-2">Company</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pt-2">
                      <FooterLink href="/about">About Us</FooterLink>
                      <FooterLink href="/team">Our Team</FooterLink>
                      <FooterLink href="/careers">Careers</FooterLink>
                      <FooterLink href="/testimonials">Testimonials</FooterLink>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="resources" className="border-zinc-800">
                  <AccordionTrigger className="text-white hover:text-white py-2">Resources</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pt-2">
                      <FooterLink href="/blog">Blog</FooterLink>
                      <FooterLink href="/case-studies">Case Studies</FooterLink>
                      <FooterLink href="/webinars">Webinars</FooterLink>
                      <FooterLink href="/faq">FAQ</FooterLink>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h4 className="font-semibold text-white mb-3">Services</h4>
                  <div className="flex flex-col space-y-1">
                    <FooterLink href="/business-coaches">Business Consulting</FooterLink>
                    <FooterLink href="/success-stories">Success Stories</FooterLink>
                    <FooterLink href="/articles">Articles</FooterLink>
                    <FooterLink href="/resources">Resources</FooterLink>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Company</h4>
                  <div className="flex flex-col space-y-1">
                    <FooterLink href="/whatwedo">About Us</FooterLink>
                    <FooterLink href="/team">Our Team</FooterLink>
                    <FooterLink href="/careers">Careers</FooterLink>
                    <FooterLink href="/references">References</FooterLink>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <FooterHeading>Contact Us</FooterHeading>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <address className="not-italic text-zinc-400 leading-relaxed">
                  400 Interstate North Pkwy,
                  <br />
                  Dar Es Salaam
                </address>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="mailto:info@xxxxxxxxxxxxxx.com" className="text-zinc-400 hover:text-white transition-colors">
                  info@xxxxxxxxxxxxxx.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="tel:+14045665855" className="text-zinc-400 hover:text-white transition-colors">
                  (404) 566-5855
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div className="text-zinc-400">
                  <p className="font-medium text-white">Working Hours</p>
                  <p>Monday - Friday: 9AM - 6PM</p>
                  <p>Saturday: 10AM - 2PM</p>
                </div>
              </div>
            </div>

            {/* Map preview */}
            <div className="relative h-40 w-full rounded-lg overflow-hidden">
              {/* <Image
                src="/images/map.webp?height=10&width=10"
                alt="Office location map"
                fill
                className="object-cover"
              /> */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="bg-white text-black px-3 py-1.5 rounded text-sm font-medium hover:bg-red-600 hover:text-white transition-colors"
                >
                  View on Google Maps
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Newsletter and Social */}
          <motion.div variants={itemVariants} className="space-y-6">
            <FooterHeading>Stay Connected</FooterHeading>

            <div className="space-y-4">
              <p className="text-zinc-400">Subscribe to our newsletter for the latest updates and insights.</p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500"
                  />
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  By subscribing, you agree to our{" "}
                  <Link href="/privacy-policy" className="text-zinc-400 hover:text-white underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>

              <div className="space-y-3">
                <h4 className="font-semibold">Follow Us</h4>
                <div className="flex space-x-3">
                  <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
                  <SocialLink href="https://facebook.com" icon={Facebook} label="Facebook" />
                  <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
                  <SocialLink href="https://youtube.com" icon={Youtube} label="YouTube" />
                  <SocialLink href="https://instagram.com" icon={Instagram} label="Instagram" />
                </div>
              </div>

              {/* Language selector */}
              <div className="pt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 w-full justify-between"
                    >
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        <span>English</span>
                      </div>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700 text-white">
                    <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">English</DropdownMenuItem>
                    {/* <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">Français</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">Español</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">Deutsch</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Certifications and awards */}
        <motion.div
          className="mt-16 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4">Certifications & Recognitions</h3>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="bg-zinc-900 p-3 rounded-lg flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">Best Consulting Firm 2025</span>
            </div>
            <div className="bg-zinc-900 p-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">ISO 9001 Certified</span>
            </div>
            <div className="bg-zinc-900 p-3 rounded-lg flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Top 100 Companies</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <Link href="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-zinc-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-zinc-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-zinc-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
          <p className="text-zinc-400">© {currentYear} Mancha Development Company. All Rights Reserved.</p>
        </motion.div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <motion.button
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-red-700 transition-colors"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -3 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  )
}

