"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Service {
  id: number
  title: string
  description: string
  image: string
  content?: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

export default function WhatWeDo() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const services: Service[] = [
    {
      id: 1,
      title: "Operations and Performance",
      description: "Streamline your operations and boost performance",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wedo.PNG-EUDfOtUuuPeG5BSufr7BkdepxWDorw.png",
      content: {
        title: "Operations Excellence",
        description:
          "Our team of experts will help you optimize your operations, implement best practices, and achieve peak performance.",
        buttonText: "Learn More",
        buttonLink: "/services/operations",
      },
    },
    {
      id: 2,
      title: "Growth and Expansion",
      description: "Scale your business strategically",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wedo.PNG-EUDfOtUuuPeG5BSufr7BkdepxWDorw.png",
      content: {
        title: "Strategic Growth",
        description:
          "Develop and execute growth strategies that align with your business objectives and market opportunities.",
        buttonText: "Learn More",
        buttonLink: "/services/growth",
      },
    },
    {
      id: 3,
      title: "Procore®",
      description:
        "Could you benefit from the advice of a Procore expert? Our experts provide a variety of Procore services, including evaluations & audits, implementation & integration services, expanded use, and admin & support services.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wedo.PNG-EUDfOtUuuPeG5BSufr7BkdepxWDorw.png",
      content: {
        title: "Procore® Expertise",
        description: "Get the most out of your Procore investment with our expert consulting services.",
        buttonText: "Learn More",
        buttonLink: "/services/procore",
      },
    },
    {
      id: 4,
      title: "Fractional Services",
      description: "Expert support when you need it",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wedo.PNG-EUDfOtUuuPeG5BSufr7BkdepxWDorw.png",
      content: {
        title: "Flexible Support",
        description:
          "Access experienced professionals on a part-time or project basis to fill critical roles and drive results.",
        buttonText: "Learn More",
        buttonLink: "/services/fractional",
      },
    },
  ]

  return (
    <section className="bg-black py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What We Do
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="relative aspect-[3/4] overflow-hidden rounded-lg group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover filter grayscale"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/80" />
              </div>

              {/* Default Content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                <motion.h3
                  className="text-2xl font-bold text-white mb-4"
                  animate={{ opacity: hoveredService === service.id ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>

                {/* Hover Content */}
                <AnimatePresence>
                  {hoveredService === service.id && service.content && (
                    <motion.div
                      className="absolute inset-0 p-6 flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{service.content.title}</h3>
                        <p className="text-zinc-300 mb-6">{service.content.description}</p>
                      </div>

                      <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white w-full">
                        {service.content.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Icon */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{
                    scale: hoveredService === service.id ? 1.2 : 1,
                    rotate: hoveredService === service.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="w-6 h-6 text-red-500" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

