"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Define the types for our data
type Category =
  | "All"
  | "Operational Assessment"
  | "Operations"
  | "Procore"
  | "Software & ERP"
  | "Marketing"
  | "Bonus Programs"

type SuccessStory = {
  id: string
  title: string
  category: Category
  imageUrl: string
  slug: string
}

// Sample data based on the images
const successStories: SuccessStory[] = [
  {
    id: "1",
    title: "Upgrading Victory Building Team's RFP Submission Package with a New RFP Template",
    category: "Marketing",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "victory-building-rfp",
  },
  {
    id: "2",
    title: "GEM Electrical Contracting",
    category: "Marketing",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "gem-electrical",
  },
  {
    id: "3",
    title: "J.R. Electrical Contractors",
    category: "Marketing",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "jr-electrical",
  },
  {
    id: "4",
    title: "The Jon Smith Group",
    category: "Marketing",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "jon-smith-group",
  },
  {
    id: "5",
    title: "Streamlining Operations for ABC Construction",
    category: "Operations",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "abc-construction",
  },
  {
    id: "6",
    title: "Implementing Procore for XYZ Builders",
    category: "Procore",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "xyz-builders",
  },
  {
    id: "7",
    title: "ERP Integration for Global Contractors",
    category: "Software & ERP",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "global-contractors",
  },
  {
    id: "8",
    title: "Performance Bonus Structure for Elite Builders",
    category: "Bonus Programs",
    imageUrl: "/placeholder.svg?height=600&width=800",
    slug: "elite-builders",
  },
]

// All available categories
const categories: Category[] = [
  "All",
  "Operational Assessment",
  "Operations",
  "Procore",
  "Software & ERP",
  "Marketing",
  "Bonus Programs",
]

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [filteredStories, setFilteredStories] = useState<SuccessStory[]>(successStories)
  const [isLoaded, setIsLoaded] = useState(false)

  // Filter stories when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStories(successStories)
    } else {
      setFilteredStories(successStories.filter((story) => story.category === selectedCategory))
    }
  }, [selectedCategory])

  // Set loaded state after initial render for animations
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animation */}
      <motion.div
        className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/s1.PNG-Ne2eR0dSLNTRF2uXZ7caXhjLT9JXpz.png"
            alt="Success Stories Background"
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
          Success Stories
        </motion.h1>
      </motion.div>

      {/* Filter Navigation */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-transparent text-white hover:bg-white/10"
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredStories.map((story) => (
                <motion.div
                  key={story.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg h-[400px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/success-stories/${story.id}`} className="block h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

                    <Image
                      src={story.imageUrl || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 z-20">
                      <motion.span
                        className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded"
                        whileHover={{ scale: 1.05 }}
                      >
                        {story.category}
                      </motion.span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <motion.h3
                        className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {story.title}
                      </motion.h3>

                      <motion.div
                        className="w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: "30%" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state when no stories match the filter */}
          {filteredStories.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-700">No success stories found</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

