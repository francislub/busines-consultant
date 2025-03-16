"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, RefreshCw, Filter } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { toast } from "sonner"

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
  article?: {
    id: string
    title: string
  } | null
  story?: {
    id: string
    title: string
  } | null
}

interface PaginationData {
  total: number
  pages: number
  page: number
  limit: number
}

export default function CommentsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [contentFilter, setContentFilter] = useState<string | null>(null)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
    if (status === "authenticated") {
      fetchComments()
    }
  }, [status, session, router, pagination.page, contentFilter])

  const fetchComments = async () => {
    setIsLoading(true)
    try {
      let url = `/api/comments?page=${pagination.page}&limit=${pagination.limit}`
      if (contentFilter) {
        url += `&contentType=${contentFilter}`
      }

      const response = await fetch(url)
      const data = await response.json()

      setComments(data.comments)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
      toast.error("Failed to load comments")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteComment = async () => {
    if (!selectedComment) return

    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }

      // Remove the comment from the local state
      setComments(comments.filter((comment) => comment.id !== selectedComment.id))
      setIsDeleteDialogOpen(false)
      setSelectedComment(null)
      toast.success("Comment deleted successfully")
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Failed to delete comment")
    }
  }

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comment.author?.name && comment.author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comment.firstName && comment.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comment.lastName && comment.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comment.email && comment.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1" onClick={fetchComments}>
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span>{contentFilter ? `Type: ${contentFilter}` : "Filter by Type"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setContentFilter(null)}>All Comments</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setContentFilter("article")}>Article Comments</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setContentFilter("story")}>Story Comments</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead className="hidden md:table-cell">On</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No comments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">
                      {comment.author?.name || `${comment.firstName} ${comment.lastName || ""}`}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {comment.content.length > 60 ? `${comment.content.substring(0, 60)}...` : comment.content}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {comment.article ? (
                        <Badge variant="outline">Article: {comment.article.title}</Badge>
                      ) : comment.story ? (
                        <Badge variant="outline">Story: {comment.story.title}</Badge>
                      ) : (
                        "Unknown"
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
                              setSelectedComment(comment)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedComment(comment)
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

        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredComments.length}</span> of{" "}
            <span className="font-medium">{pagination.total}</span> comments
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page >= pagination.pages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* View Comment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Comment Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedComment && format(new Date(selectedComment.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>

          {selectedComment && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Author Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {selectedComment.author?.name || `${selectedComment.firstName} ${selectedComment.lastName || ""}`}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedComment.author?.email || selectedComment.email}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Content Information</h3>
                <div className="mt-2 space-y-2">
                  {selectedComment.article && (
                    <p className="text-sm">
                      <span className="font-medium">Article:</span> {selectedComment.article.title}
                    </p>
                  )}
                  {selectedComment.story && (
                    <p className="text-sm">
                      <span className="font-medium">Story:</span> {selectedComment.story.title}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Comment</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{selectedComment.content}</p>
                </div>
              </div>
            </div>
          )}
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

