"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"

const SocialLink = ({
  href,
  icon: Icon,
}: {
  href: string
  icon: React.ElementType
}) => (
  <Link
    href={href}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 text-white transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </Link>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

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

  return (
    <footer className="bg-black text-white">
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
              <div className="relative h-16 w-16">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/footer.PNG-fR6lT9jC7hbJStciUINjVrjxZsUxGI.png"
                  alt="Ascent Consulting Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-lg font-medium">
              Ascent is committed to helping our clients build better construction companies for profitability and
              performance.
            </p>
            <p className="text-zinc-400">We build better construction companies.</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
            >
              Schedule a Free Consultation
            </Link>
          </motion.div>

          {/* Contact Us */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-4">
              <p className="flex items-center space-x-2">
                <span className="text-zinc-400">Email:</span>
                <a href="mailto:info@ascentconsults.com" className="hover:text-red-500 transition-colors">
                  info@ascentconsults.com
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-zinc-400">Phone:</span>
                <a href="tel:+14045665855" className="hover:text-red-500 transition-colors">
                  (404) 566-5855
                </a>
              </p>
            </div>
          </motion.div>

          {/* Our Location */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold">Our Location</h3>
            <address className="not-italic text-zinc-400 leading-relaxed">
              400 Interstate North Pkwy,
              <br />
              Suite 500, Atlanta, GA 30339
            </address>
          </motion.div>

          {/* Follow Us */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-3">
              <SocialLink href="https://linkedin.com" icon={Linkedin} />
              <SocialLink href="https://facebook.com" icon={Facebook} />
              <SocialLink href="https://twitter.com" icon={Twitter} />
              <SocialLink href="https://youtube.com" icon={Youtube} />
              <SocialLink href="https://instagram.com" icon={Instagram} />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/privacy-policy" className="text-zinc-400 hover:text-white mb-4 md:mb-0">
            Privacy Policy
          </Link>
          <p className="text-zinc-400">© {currentYear} Ascent Consulting. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

