"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-black text-white py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.PNG-4gjbvWgAzMKxtvbK8DsT2EzrhzZnLb.png"
                alt="Procore Logo"
                width={320}
                height={80}
                className="mb-4"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl font-medium"
            >
              We are your Certified Procore Specialists.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Learn how we help contractors maximize their investment in Procore.
            </h2>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 font-medium"
              >
                <Link href="/services">
                  Our Procore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background gradient effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent"
      />
    </motion.section>
  )
}

