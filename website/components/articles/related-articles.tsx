"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { format } from "date-fns"

interface Article {
  id: string
  title: string
  slug: string
  image: string
  category: string
  createdAt: string
}

interface RelatedArticlesProps {
  currentArticleId: string
  category: string
}

export default function RelatedArticles({ currentArticleId, category }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedArticles() {
      try {
        const response = await fetch(`/api/articles?category=${category}&exclude=${currentArticleId}&limit=3`)
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Error fetching related articles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedArticles()
  }, [currentArticleId, category])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="rounded-lg bg-gray-200 h-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Related Articles</h2>

      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link href={`/articles/${article.slug}`} className="group block">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>

            <h3 className="font-medium group-hover:text-red-600 transition-colors duration-300">{article.title}</h3>

            <div className="flex items-center mt-2 text-sm text-gray-500">
              <span>{article.category}</span>
              <span className="mx-2">•</span>
              <span>{format(new Date(article.createdAt), "MMMM dd, yyyy")}</span>
            </div>
          </Link>
        </motion.div>
      ))}

      <Link href="/articles" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
        View All Articles
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  )
}

