'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src="/images/one.webp"
        alt="Business overlooking a city"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-center px-4"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-red-500 mx-auto mb-6"
          />
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Who We Are
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-red-500 mx-auto mt-6"
          />
        </motion.div>
      </div>
      
      {/* Animated overlay for parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.7]) 
        }}
      />
    </motion.div>
  )
}
