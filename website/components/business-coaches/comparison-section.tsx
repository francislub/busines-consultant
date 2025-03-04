"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function ComparisonSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={containerRef} className="space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg md:text-xl">
              We are often asked about the difference between <span className="text-red-500">Consulting</span> and{" "}
              <span className="text-red-500">Business Coaching</span>. These terms are often interchanged, and people
              frequently ask for one when they need the other. As a provider of{" "}
              <span className="text-red-500">Business Consulting</span> services (not coaching), here's how we define
              the two terms.
            </p>
          </motion.div>

          {/* Consulting Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Consulting</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Business consulting refers to the practice of helping organizations improve their performance,
                  primarily through the thorough analysis of existing business problems and development of plans for
                  improvement.
                </p>
                <p>
                  Organizations hire the services of management consultants for a number of reasons, including, for
                  example, to gain external, and presumably more objective advice and recommendations, to gain access to
                  the consultants' specialized expertise, or simply as temporary help during a one-time project, where
                  the hiring of permanent employees is not required.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.PNG-Thg2MrBhzGhgjMvN7GSc0ACFmTzoKH.png"
                alt="Consultant explaining on whiteboard"
                width={600}
                height={400}
                className="rounded-lg"
              />

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-4 border-red-500"
              />
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-300"
          >
            <div>
              <p>
                Because of their exposure to and relationships with numerous organizations, consultancies are often
                knowledgeable of industry 'best practices'. Consultancies often provide organizational change management
                assistance, development of business management skills, technology implementation, strategy development,
                and operational improvement services.
              </p>
            </div>
            <div>
              <p>
                Business consultants generally bring their own proprietary methodologies and frameworks to guide the
                identification of problems, and to serve as the basis for recommendations for more effective or
                efficient ways of performing business tasks.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

