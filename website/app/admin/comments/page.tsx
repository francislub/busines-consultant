"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Pencil, Trash2, Search, ChevronLeft, ChevronRight, MoreHorizontal, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AdminLayout from "@/components/admin-layout"
import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Mock data for comments
const mockComments = Array.from({ length: 15 }).map((_, i) => ({
  id: `comment-${i + 1}`,
  content: `This is comment ${i + 1}. It provides feedback or a question about the content.`,
  author: {
    id: `user-${i % 5 + 1}`,
    name: `User ${i % 5 + 1}`,
    email: `user${i % 5 + 1}@example.com`,
  },
  story: i % 2 === 0 ? {
    id: `story-${i % 5 + 1}`,
    title: `Success Story ${i % 5 + 1}`,
  } : null,
  article: i % 2 === 1 ? {
    id: `article-${i % 5 + 1}`,
    title: `Article ${i % 5 + 1}`,
  } : null,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
}))

export default function CommentsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [comments, setComments] = useState(mockComments)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentComment, setCurrentComment] = useState<any>(null)
  const [formData, setFormData] = useState({
    content: "",
  })

  useEffect(() => {
    // Check authentication and role
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/client/dashboard")
      return
    }

    // Fetch comments
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/admin/comments")
        if (response.ok) {
          const data = await response.json()
          setComments(data)
        } else {
          // If API fails, use mock data
          setComments(mockComments)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch comments:", error)
        setComments(mockComments)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchComments()
    }
  }, [status, session, router])

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comment.story?.title && comment.story.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comment.article?.title && comment.article.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleEditComment = async () => {
    try {
      if (!formData.content) {
        toast.error("Please fill the comment content")
        return
      }

      const response = await fetch(`/api/admin/comments/${currentComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedComment = await response.json()
        const updatedComments = comments.map((comment) =>
          comment.id === currentComment.id ? { ...comment, ...updatedComment } : comment,
        )
        setComments(updatedComments)
        setIsEditDialogOpen(false)
        setCurrentComment(null)
        setFormData({ content: "" })
        toast.success("Comment updated successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to update comment")
      }
    } catch (error) {
      console.error("Failed to update comment:", error)
      toast.error("An error occurred while updating the comment")
    }
  }

  const handleDeleteComment = async () => {
    try {
      const response = await fetch(`/api/admin/comments/${currentComment.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const updatedComments = comments.filter((comment) => comment.id !== currentComment.id)
        setComments(updatedComments)
        setIsDeleteDialogOpen(false)
        setCurrentComment(null)
        toast.success("Comment deleted successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to delete comment")
      }
    } catch (error) {
      console.error("Failed to delete comment:", error)
      toast.error("An error occurred while deleting the comment")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Comments</h2>
        </div>

        <div className="flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search comments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>On</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No comments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                    <TableCell>{comment.author.name}</TableCell>
                    <TableCell>
                      {comment.story ? (
                        <Badge variant="outline" className="bg-blue-50">Story: {comment.story.title}</Badge>
                      ) : comment.article ? (
                        <Badge variant="outline" className="bg-green-50">Article: {comment.article.title}</Badge>
                      ) : (
                        <Badge variant="outline">Unknown</Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(comment.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentComment(comment)
                              setFormData({
                                content: comment.content,
                              })
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setCurrentComment(comment)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>Make changes to the comment content.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleEditComment}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteComment}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
