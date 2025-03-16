"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ValueCardProps {
  title: string
  description: string
  color: string
  delay: number
  isInView: boolean
}

function ValueCard({ title, description, color, delay, isInView }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={`${color} p-6 md:p-8 rounded-lg h-full`}
    >
      <motion.h3
        className="text-xl md:text-2xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export default function CoreValues() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const values = [
    {
      title: "Client Satisfaction",
      description:
        "At Mancha Consulting, our clients' success is at the heart of everything we do. We take the time to truly understand their business goals, providing strategic consulting solutions that lead to measurable, impactful results.",
      color: "bg-red-900/90 text-white",
    },
    {
      title: "Employee Satisfaction",
      description:
        "Our employees are key to our ability to serve our clients. We focus on recognizing their strengths, fostering a supportive work environment, and providing the resources they need to excel. ",
      color: "bg-purple-900/90 text-white",
    },
    {
      title: "Integrity",
      description:
        "As consultants, integrity is the foundation of every relationship we build. We make promises and keep them, ensuring transparency, trust, and accountability in all our interactions. ",
      color: "bg-blue-900/90 text-white",
    },
    {
      title: "Community Participation",
      description:
        "Mancha Consulting is committed to being an active participant in the business community. We provide valuable insights and free resources to help businesses thrive, and we continuously contribute to discussions that push the industry forward.",
      color: "bg-green-900/90 text-white",
    },
  ]
  

  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={containerRef} className="space-y-12">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "60px" } : { width: 0 }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-red-500 mx-auto"
            />

            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                title={value.title}
                description={value.description}
                color={value.color}
                delay={0.3 + index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Animated background elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-red-500 blur-3xl -z-10"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl -z-10"
          />
        </div>
      </div>
    </div>
  )
}

