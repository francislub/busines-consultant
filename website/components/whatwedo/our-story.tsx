'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  
  const paragraphs = [
    "Mancha company was founded by Adam in 2014 with the idea of helping local electrical contractors be more successful. Based in Atlanta, Adam had been working for over 20 years in the commercial and industrial construction world and saw a gap in the marketplace.",
    "While there are plenty of general business consultants, most do not have direct knowledge or experience in the Construction industry and therefore don't understand or know how to solve the challenges many of these businesses face every day. As an experienced business owner and successful contractor, he believed he could provide the answers they were looking for by starting a construction consulting firm."
  ]
  
  const highlightText = "By 2019, the majority of our clients were located outside of Georgia and Ascent became one of the top construction management consulting firms in the US. Currently, no other firm offers the expertise, depth and variety of consulting services specifically for construction companies."
  
  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                Our Story
              </motion.h2>
            </div>
            
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
              
              {/* <motion.p 
                className="text-xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {highlightText}
              </motion.p> */}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-4"
              >
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  Meet Adam <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              <div className="relative rounded-full overflow-hidden border-4 border-red-500/20 w-[400px] h-[400px] mx-auto">
                <Image 
                  src="/images/ceo.jpg"
                  alt="Adam Cooper" 
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-8 border-red-500/30"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border-8 border-red-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
