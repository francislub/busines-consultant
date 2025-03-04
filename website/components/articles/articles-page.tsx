"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

type Category = "All" | "Find Work" | "Win Work" | "Perform Work" | "Business Operations" | "General" | "Media / Video"

type Article = {
  id: string
  title: string
  category: Category
  image: string
  slug: string
  type?: "podcast" | "article"
}

const articles: Article[] = [
  {
    id: "1",
    title: "Sales vs. Marketing: Key Differences Every Contractor Should Know",
    category: "Find Work",
    image: "/placeholder.svg?height=400&width=600",
    slug: "sales-vs-marketing",
    type: "podcast",
  },
  {
    id: "2",
    title: "Top 5 Essentials for Construction Marketing",
    category: "Find Work",
    image: "/placeholder.svg?height=400&width=600",
    slug: "construction-marketing-essentials",
  },
  {
    id: "3",
    title: "Digital Advertising Basics for Contractors",
    category: "Find Work",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.PNG-hleowAVfHA1gBMESSLes48yVL7ruyK.png",
    slug: "digital-advertising-basics",
  },
]

const categories: Category[] = [
  "All",
  "Find Work",
  "Win Work",
  "Perform Work",
  "Business Operations",
  "General",
  "Media / Video",
]

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Find Work")
  const [hoveredArticle, setHoveredArticle] = useState<string | null>(null)

  const filteredArticles =
    selectedCategory === "All" ? articles : articles.filter((article) => article.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* Article Categories Dropdown */}
      <div className="bg-red-600">
        <div className="container mx-auto px-4 py-4">
          <button className="text-white font-medium flex items-center gap-2">
            Article Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Page Title */}
        <motion.h1
          className="text-5xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Find Work
        </motion.h1>

        {/* Category Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category ? "bg-red-600 text-white" : "text-white hover:text-red-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredArticle(article.id)}
                onHoverEnd={() => setHoveredArticle(null)}
                className="group"
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    {article.type === "podcast" && (
                      <div className="absolute top-4 left-4 z-20 bg-white px-3 py-1 rounded-full">
                        <Image
                          src="/placeholder.svg?height=30&width=100"
                          alt="Hot Takes Podcast"
                          width={100}
                          height={30}
                          className="h-6 w-auto"
                        />
                      </div>
                    )}

                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <h2 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                      {article.title}
                    </h2>

                    <motion.div
                      className="inline-flex items-center text-white/80 group-hover:text-red-500 transition-colors duration-300"
                      initial={{ x: 0 }}
                      animate={{ x: hoveredArticle === article.id ? 5 : 0 }}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-white">No articles found</h3>
            <p className="text-white/60 mt-2">Try selecting a different category</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

