"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { formatDate } from "@/lib/utils"
// import CommentForm from "@/components/comment-form"
// import CommentList from "@/components/comment-list"

interface SuccessStory {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  author: {
    name: string
  }
  createdAt: string
}

export default function SuccessStoryPage() {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState<SuccessStory | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch(`/api/stories/${params.slug}`)
        if (response.ok) {
          const data = await response.json()
          setStory(data)
        } else {
          router.push("/success-stories")
        }
      } catch (error) {
        console.error("Error fetching story:", error)
        router.push("/success-stories")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchStory()
    }
  }, [params.slug, router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Story not found</h1>
        <button onClick={() => router.back()} className="flex items-center text-red-600 hover:text-red-700">
          <ArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={story.imageUrl || "/placeholder.svg?height=800&width=1200"}
          alt={story.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center text-white hover:text-red-400 mb-4 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" /> Back to Success Stories
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded mb-4"
          >
            {story.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {story.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center text-white/80 gap-4"
          >
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{story.author?.name || "Admin"}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(story.createdAt)}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            {story.description.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Comments Section */}
          {/* <div className="mt-16 pt-8 border-t">
            <CommentForm storyId={story.id} />
            <CommentList storyId={story.id} />
          </div> */}
        </div>
      </div>
    </div>
  )
}

