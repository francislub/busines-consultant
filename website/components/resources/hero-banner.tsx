"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function HeroBanner() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r1.PNG-bwUmabJOa6pH9UyuiG3kuLkTVibZ87.png"
          alt="Construction site"
          fill
          className="object-cover brightness-50"
          priority
        />
      </motion.div>

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
              Resources
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
    </div>
  )
}

