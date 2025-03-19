"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/data-table"
import { commentColumns } from "./columns"

interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: string
  storyId: string | null
  articleId: string | null
  author: {
    name: string
    email: string
  }
  story?: {
    title: string
    slug: string
  }
  article?: {
    title: string
    id: string
  }
}

export default function CommentsPage() {
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [isViewing, setIsViewing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentComment, setCurrentComment] = useState<Comment | null>(null)
  const [formData, setFormData] = useState({
    content: "",
  })

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/admin/comments")
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("Failed to fetch comments:", error)
        toast({
          title: "Error",
          description: "Failed to fetch comments",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [toast])

  // Event listeners for data table actions
  useEffect(() => {
    const handleViewComment = (event: CustomEvent) => {
      setCurrentComment(event.detail)
      setIsViewing(true)
    }

    const handleEditComment = (event: CustomEvent) => {
      const comment = event.detail
      setCurrentComment(comment)
      setFormData({
        content: comment.content,
      })
      setIsEditing(true)
    }

    const handleDeleteComment = (event: CustomEvent) => {
      setCurrentComment(event.detail)
      setIsDeleting(true)
    }

    document.addEventListener("view-comment", handleViewComment as EventListener)
    document.addEventListener("edit-comment", handleEditComment as EventListener)
    document.addEventListener("delete-comment", handleDeleteComment as EventListener)

    return () => {
      document.removeEventListener("view-comment", handleViewComment as EventListener)
      document.removeEventListener("edit-comment", handleEditComment as EventListener)
      document.removeEventListener("delete-comment", handleDeleteComment as EventListener)
    }
  }, [])

  // Filter comments based on search query and source
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comment.story?.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comment.article?.title || "").toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSource =
      sourceFilter === "all" ||
      (sourceFilter === "story" && comment.storyId) ||
      (sourceFilter === "article" && comment.articleId)

    return matchesSearch && matchesSource
  })

  // Update comment
  const handleUpdate = async () => {
    if (!currentComment) return

    try {
      const response = await fetch(`/api/admin/comments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentComment.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update comment")
      }

      const updatedComment = await response.json()
      setComments(comments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)))
      setCurrentComment(null)
      setFormData({
        content: "",
      })
      setIsEditing(false)

      toast({
        title: "Success",
        description: "Comment updated successfully",
      })
    } catch (error) {
      console.error("Failed to update comment:", error)
      toast({
        title: "Error",
        description: "Failed to update comment",
        variant: "destructive",
      })
    }
  }

  // Delete comment
  const handleDelete = async () => {
    if (!currentComment) return

    try {
      const response = await fetch(`/api/admin/comments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentComment.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }

      setComments(comments.filter((comment) => comment.id !== currentComment.id))
      setCurrentComment(null)
      setIsDeleting(false)

      toast({
        title: "Success",
        description: "Comment deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete comment:", error)
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      })
    }
  }

  // Get source counts
  const sourceCounts = comments.reduce(
    (acc, comment) => {
      if (comment.storyId) acc.story = (acc.story || 0) + 1
      if (comment.articleId) acc.article = (acc.article || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Comments</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">All Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comments.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Story Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sourceCounts.story || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Article Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{sourceCounts.article || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search comments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="story">Stories</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={commentColumns}
        data={filteredComments}
        searchKey="content"
        searchPlaceholder="Filter comments..."
      />

      {/* View Comment Dialog */}
      <Dialog open={isViewing} onOpenChange={setIsViewing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comment Details</DialogTitle>
          </DialogHeader>
          {currentComment && (
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Author</h3>
                <p className="text-base font-medium">{currentComment.author.name}</p>
                <p className="text-sm text-muted-foreground">{currentComment.author.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Source</h3>
                {currentComment.storyId ? (
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Story</Badge>
                    <span>{currentComment.story?.title}</span>
                  </div>
                ) : currentComment.articleId ? (
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Article</Badge>
                    <span>{currentComment.article?.title}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Unknown source</span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Comment</h3>
                <div className="rounded-md border p-4 whitespace-pre-wrap">{currentComment.content}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span>Created: </span>
                  <span>{format(new Date(currentComment.createdAt), "PPP p")}</span>
                </div>
                <div>
                  <span>Last Updated: </span>
                  <span>{format(new Date(currentComment.updatedAt), "PPP p")}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentComment(currentComment)
                    setFormData({
                      content: currentComment.content,
                    })
                    setIsViewing(false)
                    setIsEditing(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsViewing(false)
                    setIsDeleting(true)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Comment Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>Make changes to the comment</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Comment Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

