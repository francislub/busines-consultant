"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Palette, Code, BarChart3 } from "lucide-react"
import Link from "next/link"

const ResourceCard = ({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string
  description: string
  icon: React.ElementType
  href: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative bg-zinc-900 rounded-lg overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="p-8 h-full flex flex-col">
        <div className="mb-6">
          <Icon className="text-blue-400 w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 mb-6 flex-grow">{description}</p>
        <div className="mt-auto">
          <Link href={href} className="inline-flex items-center justify-center">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-white"
              animate={{
                backgroundColor: isHovered ? "#e31b23" : "#27272a",
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ResourcesSection() {
  const resources = [
    {
      title: "Who We Are",
      description: "Learn about our company and team of construction experts",
      icon: Palette,
      href: "/about",
    },
    {
      title: "Articles",
      description: "Check out the extensive collection of articles written by our construction experts",
      icon: Code,
      href: "/articles",
    },
    {
      title: "Success Stories",
      description: "Read real-world case studies of our projects",
      icon: BarChart3,
      href: "/success-stories",
    },
  ]

  return (
    <section className="w-full bg-black py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-zinc-400 uppercase tracking-wider font-medium mb-4">ADDITIONAL RESOURCES</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              We create innovative, customized solutions
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              icon={resource.icon}
              href={resource.href}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-8 rounded-full transition-colors"
            >
              Schedule a Free Consultation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

