"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import CommentForm from "@/components/articles/comment-form"
import CommentList from "@/components/articles/comment-list"
import RelatedArticles from "@/components/articles/related-articles"
import { formatDate } from "@/lib/utils"

interface Article {
  id: string
  title: string
  content: string
  image: string
  category: string
  author: {
    name: string
    image: string
  }
  createdAt: string
}

export default function ArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/admin/articles/${id}`)
        const data = await response.json()
        setArticle(data)
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchArticle()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold uppercase tracking-wider py-1 px-3 rounded">
                  {article.category}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={article.author.image || "/placeholder.svg"}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{article.author.name}</h3>
                  <p className="text-sm text-gray-500">{formatDate(article.createdAt)}</p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-8">{article.title}</h1>

              <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: article.content }} />

              <hr className="my-12" />

              <CommentForm articleId={article.id} />
              <CommentList articleId={article.id} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RelatedArticles currentArticleId={article.id} category={article.category} />
          </div>
        </div>
      </div>
    </div>
  )
}

