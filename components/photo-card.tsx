"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image, { type StaticImageData } from "next/image"

interface PhotoCardProps {
  src: string | StaticImageData
  alt: string
  title?: string
  description?: string
}

export default function PhotoCard({ src, alt, title, description }: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.4 },
        }}
        className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl"
      >
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover transition-all duration-500" />

        {/* Overlay gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
        />

        {/* Content */}
        <AnimatePresence>
          {(title || description) && isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-4 text-white"
            >
              {title && (
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-bold mb-2"
                >
                  {title}
                </motion.h3>
              )}

              {description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-gray-200"
                >
                  {description}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

