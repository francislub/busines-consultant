"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Article {
  id: number
  title: string
  slug: string
  image: string
  category: string
}

export default function LatestArticles() {
  const articles: Article[] = [
    {
      id: 1,
      title: "Sales vs. Marketing: Key Differences Every Contractor Should Know",
      slug: "sales-vs-marketing",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/articleas.PNG-tRK2B0VHbIQ0rcvmXkLERfOd6XqEYf.png",
      category: "Marketing",
    },
    {
      id: 2,
      title: "Rewarding Construction Project Managers – Incentive Packages Part III",
      slug: "rewarding-project-managers",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/articleas.PNG-tRK2B0VHbIQ0rcvmXkLERfOd6XqEYf.png",
      category: "Management",
    },
    {
      id: 3,
      title: "Markup and Margin: The Math Matters",
      slug: "markup-and-margin",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/articleas.PNG-tRK2B0VHbIQ0rcvmXkLERfOd6XqEYf.png",
      category: "Finance",
    },
  ]

  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null)

  return (
    <section className="w-full bg-black py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Latest Articles</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Thought leadership and industry insights from our construction experts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredArticle(article.id)}
              onHoverEnd={() => setHoveredArticle(null)}
            >
              <Link href={`/articles/${article.slug}`} className="block">
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div className="aspect-w-16 aspect-h-9 bg-zinc-800">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={600}
                      height={338}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-2 rounded">
                    {article.category}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 transition-colors group-hover:text-red-500">
                  {article.title}
                </h3>

                <div className="flex items-center">
                  <span className="text-zinc-400 mr-2">Read More</span>
                  <motion.div
                    animate={{
                      x: hoveredArticle === article.id ? 5 : 0,
                      color: hoveredArticle === article.id ? "#e31b23" : "#a1a1aa",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

