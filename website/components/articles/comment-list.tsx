"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    firstName: string
    lastName?: string
    image?: string
  }
}

interface CommentListProps {
  articleId: string
}

export default function CommentList({ articleId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments?articleId=${articleId}`)
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [articleId])

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (comments.length === 0) {
    return <div className="text-center py-12 text-gray-500">No comments yet. Be the first to comment!</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex space-x-4"
        >
          <div className="flex-shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={comment.author.image || "/placeholder.svg"}
                alt={`${comment.author.firstName}'s avatar`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  {comment.author.firstName} {comment.author.lastName}
                </h3>
                <time className="text-sm text-gray-500">{formatDate(comment.createdAt)}</time>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

