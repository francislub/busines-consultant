'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function OurPurpose() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  
  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.PNG-j6DJXFKG8f3qvwjvprDxxa9ZLdtSPg.png" 
                alt="Team members in a meeting" 
                fill
                className="object-cover"
              />
              
              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            
            {/* Small image overlay */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-[-30px] left-[-30px] w-[180px] h-[120px] rounded-lg overflow-hidden border-4 border-red-500/20 shadow-xl"
            >
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.PNG-j6DJXFKG8f3qvwjvprDxxa9ZLdtSPg.png" 
                alt="Team collaboration" 
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-red-500/20 blur-3xl"
            />
          </motion.div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '60px' } : { width: 0 }}
                transition={{ duration: 0.8 }}
                className="h-1 bg-red-500"
              />
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Purpose
              </motion.h2>
            </div>
            
            <div className="space-y-6">
              <motion.p 
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Ascent Consulting's purpose is to improve the performance and profitability of 
                every client's business. By utilizing our comprehensive industry knowledge, 
                real-world experience and team of dedicated professionals, we create 
                innovative, customized solutions to help our clients get to the next level of 
                success.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our just cause is to improve, elevate, and better the construction industry in all 
                areas for the benefit of everyone who chooses to make their career in the 
                construction industry.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-red-500 font-medium cursor-pointer"
                >
                  <span>Learn more about our approach</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
