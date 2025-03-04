"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Client {
  id: number
  name: string
  logo: string
  slug: string
  background: string
}

export default function SuccessStories() {
  const clients: Client[] = [
    {
      id: 1,
      name: "Adler Industrial",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stories.PNG-PxTSuHO4WTnEJKRulX9nxNNK5AeP2L.png",
      slug: "adler-industrial",
      background: "bg-gradient-to-br from-blue-900/40 to-black",
    },
    {
      id: 2,
      name: "Deck Remodelers",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stories.PNG-PxTSuHO4WTnEJKRulX9nxNNK5AeP2L.png",
      slug: "deck-remodelers",
      background: "bg-gradient-to-br from-amber-900/40 to-black",
    },
    {
      id: 3,
      name: "Northwind",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stories.PNG-PxTSuHO4WTnEJKRulX9nxNNK5AeP2L.png",
      slug: "northwind",
      background: "bg-gradient-to-br from-cyan-900/40 to-black",
    },
    {
      id: 4,
      name: "Victory Building Team",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stories.PNG-PxTSuHO4WTnEJKRulX9nxNNK5AeP2L.png",
      slug: "victory-building-team",
      background: "bg-gradient-to-br from-red-900/40 to-black",
    },
  ]

  const [activeClient, setActiveClient] = useState<number | null>(null)

  return (
    <section className="w-full bg-black py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-16 h-1 bg-red-600 mb-6"></div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Recent Success Stories
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {clients.map((client) => (
            <div
              key={client.id}
              className={`relative aspect-square ${client.background} flex items-center justify-center p-8 overflow-hidden`}
              onMouseEnter={() => setActiveClient(client.id)}
              onMouseLeave={() => setActiveClient(null)}
            >
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="object-contain max-w-[80%] max-h-[80%] transition-all duration-300 filter brightness-100"
                />
              </div>

              <AnimatePresence>
                {activeClient === client.id && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/success-stories/${client.slug}`}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-colors flex items-center space-x-2"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/success-stories"
            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-8 rounded-full transition-colors"
          >
            View All Success Stories
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

