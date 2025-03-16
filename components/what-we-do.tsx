import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link from Next.js

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
      title: "Entrepreneurial Skills",
      description: "Streamline your operations and boost performance",
      image: "/images/one.webp",
      content: {
        title: "Business Skills Development",
        description:
          "Our experts will guide you in refining your entrepreneurial skills, streamlining your business operations, and optimizing your team's performance. We focus on empowering entrepreneurs to scale efficiently.",
        buttonText: "Learn More",
        buttonLink: "/service/operations",
      },
    },
    {
      id: 2,
      title: "Business Management",
      description: "Scale your business strategically",
      image: "/images/three.jpg",
      content: {
        title: "Strategic Business Management",
        description:
          "Our consulting services help you create and implement growth strategies tailored to your unique business objectives. We help you make informed decisions and capitalize on emerging market opportunities to grow your business efficiently.",
        buttonText: "Learn More",
        buttonLink: "/service/growth",
      },
    },
    {
      id: 3,
      title: "Monitoring and Evaluation®",
      description:
        "Maximize your investments with expert evaluations, audits, and strategic guidance.",
      image: "/images/one.webp",
      content: {
        title: "Performance Monitoring & Evaluation",
        description:
          "We offer comprehensive monitoring and evaluation services to assess your business processes, ensuring optimal performance. Our services include evaluations, audits, and custom-tailored support strategies.",
        buttonText: "Learn More",
        buttonLink: "/service/procore",
      },
    },
    {
      id: 4,
      title: "Trainer Development",
      description: "Expert support when you need it",
      image: "/images/three.jpg",
      content: {
        title: "Professional Trainer Development",
        description:
          "Gain access to experienced trainers who will mentor and develop your team, ensuring the transfer of critical skills for growth. We also offer part-time or project-based professionals to support business initiatives.",
        buttonText: "Learn More",
        buttonLink: "/service/fractional",
      },
    },
  ];

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
                <Link href={service.content?.buttonLink || "#"}> {/* Added optional chaining */}
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

                      {/* Button with Link */}
                      <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white w-full">
                        {service.content.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                </Link>
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
