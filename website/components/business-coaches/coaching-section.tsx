"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CoachingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={containerRef} className="space-y-16">
          {/* Coaching Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Coaching</h2>
              <p className="text-gray-300">
                A business coach assists and guides a business owner in running a business by helping them clarify the
                vision of their business and how it fits in with their personal goals. Business coaching is a process
                used to take a business from where it is now to where the business owner wants it to be. A coach assists
                the owner in goal planning and keeps them accountable so that they achieve success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300"
            >
              <p>
                After clarifying where a business owner would like to take their business, business coaches help plan
                and prioritize what goals and strategies are needed to help progress the business closer to its goal. A
                business coach will meet with the business owner regularly, either weekly or monthly, to keep them on
                track to the commitments made during the past coaching session.
              </p>
            </motion.div>
          </div>

          {/* Join Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-bold">Interested in Joining our Team?</h3>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Consultation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-block rounded-full bg-red-600 p-4">
              <ArrowRight className="h-6 w-6" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              Book Your FREE Performance
              <br />
              Consultation Now
            </h3>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

