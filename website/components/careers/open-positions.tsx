"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Position {
  title: string
  location: string
  type: string
  link: string
}

export default function OpenPositions() {
  const positions: Position[] = [
    {
      title: "Business Consultant",
      location: "Dar Es Salaam, GA",
      type: "Full Time",
      link: "/business-coaches",
    },
    {
      title: "Career Guidance",
      location: "Dar Es Salaam, GA",
      type: "Full Time",
      link: "/careers",
    },
  ]

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-gray-300">
              We have some great opportunities to join a team that promotes collaboration as well as personal and
              professional development.
            </p>
            <p className="text-lg md:text-xl font-semibold">
              We're looking to fill these positions in our <span className="text-red-500">Dar Es Salaam, GA office</span>.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-800 py-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{position.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-gray-400">
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={position.link}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
                      >
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

