"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

type Category =
  | "ALL"
  | "OPERATIONAL ASSESSMENT"
  | "OPERATIONAL DESIGN"
  | "MARKETING"
  | "INCENTIVE PROGRAMS"
  | "PROCORE"
  | "FRACTIONAL SERVICES"

type Client = {
  id: string
  name: string
  logo: string
  category: Category
  href: string
}

const clients: Client[] = [
  {
    id: "1",
    name: "Edge Electric",
    logo: "/placeholder.svg?height=200&width=300",
    category: "OPERATIONAL ASSESSMENT",
    href: "/clients/edge-electric",
  },
  {
    id: "2",
    name: "Cornerstone Contracting",
    logo: "/placeholder.svg?height=200&width=300",
    category: "OPERATIONAL DESIGN",
    href: "/clients/cornerstone",
  },
  {
    id: "3",
    name: "Nima Construction",
    logo: "/placeholder.svg?height=200&width=300",
    category: "MARKETING",
    href: "/clients/nima",
  },
  {
    id: "4",
    name: "Waldrop Construction",
    logo: "/placeholder.svg?height=200&width=300",
    category: "PROCORE",
    href: "/clients/waldrop",
  },
  {
    id: "5",
    name: "Apex Pools",
    logo: "/placeholder.svg?height=200&width=300",
    category: "INCENTIVE PROGRAMS",
    href: "/clients/apex",
  },
  {
    id: "6",
    name: "EM Holt Building Services",
    logo: "/placeholder.svg?height=200&width=300",
    category: "FRACTIONAL SERVICES",
    href: "/clients/em-holt",
  },
  {
    id: "7",
    name: "Wright Brothers",
    logo: "/placeholder.svg?height=200&width=300",
    category: "OPERATIONAL ASSESSMENT",
    href: "/clients/wright-brothers",
  },
  {
    id: "8",
    name: "Stryker Electric",
    logo: "/placeholder.svg?height=200&width=300",
    category: "MARKETING",
    href: "/clients/stryker",
  },
]

const categories: Category[] = [
  "ALL",
  "OPERATIONAL ASSESSMENT",
  "OPERATIONAL DESIGN",
  "MARKETING",
  "INCENTIVE PROGRAMS",
  "PROCORE",
  "FRACTIONAL SERVICES",
]

export default function ClientReferences() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL")
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)

  const filteredClients =
    selectedCategory === "ALL" ? clients : clients.filter((client) => client.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.PNG-o4oMtPGhQVdKAMYKmFgWmHsd7ABfRX.png"
            alt="Client References Background"
            fill
            className="object-cover opacity-60 mix-blend-multiply"
            priority
          />
        </div>

        {/* Animated Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white z-20 text-center px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
        >
          Client References
        </motion.h1>
      </motion.div>

      {/* Main Content Section */}
      <div className="bg-black min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            What Our Clients Say About Us
          </motion.h2>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-transparent text-white border border-white/20 hover:border-red-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Clients Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredClient(client.id)}
                  onHoverEnd={() => setHoveredClient(null)}
                >
                  <Link
                    href={client.href}
                    className="block relative aspect-video bg-white/5 rounded-lg overflow-hidden group"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-110"
                    />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      animate={{ y: hoveredClient === client.id ? 0 : 20 }}
                    >
                      <h3 className="text-lg font-semibold">{client.name}</h3>
                      <p className="text-sm text-white/80">{client.category}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-white">No clients found</h3>
              <p className="text-white/60 mt-2">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

