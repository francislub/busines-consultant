"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  content: string
  firstName?: string
  lastName?: string
  email?: string
  createdAt: string
  author?: {
    id: string
    name: string
    email: string
  } | null
}

interface CommentListProps {
  articleId?: string
  storyId?: string
}

export default function CommentList({ articleId, storyId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    async function fetchComments() {
      try {
        let url = `/api/comments?page=${pagination.page}&limit=${pagination.limit}`
        if (articleId) {
          url += `&articleId=${articleId}`
        } else if (storyId) {
          url += `&storyId=${storyId}`
        }

        const response = await fetch(url)
        const data = await response.json()

        setComments(data.comments)
        setPagination(data.pagination)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [articleId, storyId, pagination.page])

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
      <h2 className="text-2xl font-bold">Comments ({pagination.total})</h2>

      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex space-x-4"
        >
          <div className="flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  comment.author?.email
                    ? `https://gravatar.com/avatar/${Buffer.from(comment.author.email).toString("hex")}?d=mp`
                    : undefined
                }
              />
              <AvatarFallback>
                {comment.author?.name
                  ? comment.author.name.charAt(0).toUpperCase()
                  : comment.firstName?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  {comment.author?.name || `${comment.firstName} ${comment.lastName || ""}`}
                </h3>
                <time className="text-sm text-gray-500">{format(new Date(comment.createdAt), "MMMM dd, yyyy")}</time>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {pagination.pages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            disabled={pagination.page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

