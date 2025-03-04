"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroBanner() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-1Z486PwTgryhw31qNiluUNucGpRq1a.png"
        alt="Business presentation"
        fill
        className="object-cover brightness-50"
        priority
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-red-500 mx-auto mb-8"
            />

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Business Coaches vs. Consultants
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-red-500 mx-auto mt-8"
            />
          </motion.div>
        </div>
      </div>

      {/* Animated overlay elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </div>
  )
}

