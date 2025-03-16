"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroBanner() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/three.jpg"
        alt="Career opportunities"
        fill
        className="object-cover brightness-50"
        priority
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-red-500 mx-auto"
            />

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Careers
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-red-500 mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Animated particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"
      />
    </div>
  )
}

