"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { PlusCircle, Pencil, Trash2, Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
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
  DialogTrigger,
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
import Image from "next/image"
import { toast } from "sonner"
import ImageInput from '@/components/ImageInput';

// Mock data for articles
const mockArticles = Array.from({ length: 10 }).map((_, i) => ({
  id: `article-${i + 1}`,
  title: `Article ${i + 1}`,
  description: `This is a description for article ${i + 1}. It provides valuable information for our clients.`,
  image: `/placeholder.svg?height=400&width=600`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
}))

export default function ArticlesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [articles, setArticles] = useState(mockArticles)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
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

    // Fetch articles
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/admin/articles")
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        } else {
          // If API fails, use mock data
          setArticles(mockArticles)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch articles:", error)
        setArticles(mockArticles)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchArticles()
    }
  }, [status, session, router])

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateArticle = async () => {
    try {
      if (!formData.title || !formData.description ) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newArticle = await response.json()
        setArticles([newArticle, ...articles])
        setIsCreateDialogOpen(false)
        setFormData({ title: "", description: "", image: "" })
        toast.success("Article created successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to create article")
      }
    } catch (error) {
      console.error("Failed to create article:", error)
      toast.error("An error occurred while creating the article")
    }
  }

  const handleEditArticle = async () => {
    try {
      if (!formData.title || !formData.description) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch(`/api/admin/articles/${currentArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedArticle = await response.json()
        const updatedArticles = articles.map((article) =>
          article.id === currentArticle.id ? updatedArticle : article,
        )
        setArticles(updatedArticles)
        setIsEditDialogOpen(false)
        setCurrentArticle(null)
        setFormData({ title: "", description: "", image: "" })
        toast.success("Article updated successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to update article")
      }
    } catch (error) {
      console.error("Failed to update article:", error)
      toast.error("An error occurred while updating the article")
    }
  }

  const handleDeleteArticle = async () => {
    try {
      const response = await fetch(`/api/admin/articles/${currentArticle.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const updatedArticles = articles.filter((article) => article.id !== currentArticle.id)
        setArticles(updatedArticles)
        setIsDeleteDialogOpen(false)
        setCurrentArticle(null)
        toast.success("Article deleted successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to delete article")
      }
    } catch (error) {
      console.error("Failed to delete article:", error)
      toast.error("An error occurred while deleting the article")
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
          <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Article
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[calc(120vh-100px)] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Article</DialogTitle>
                <DialogDescription>Add a new article to share with your clients.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter article title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter article description"
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="TeamImageUploader" label="Profile Image"/>
                
                  {/* <Label>Image</Label>
                  <UploadImage
                    endpoint="imageUploader"
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url || "" })}
                  /> */}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateArticle}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
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
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No articles found. Create your first article!
                  </TableCell>
                </TableRow>
              ) : (
                filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="relative h-10 w-16 overflow-hidden rounded">
                        <Image
                          src={article.image || "/placeholder.svg?height=40&width=64"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {article.description.length > 60 ? `${article.description.substring(0, 60)}...` : article.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(article.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(article.updatedAt), "MMM d, yyyy")}
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
                              setCurrentArticle(article)
                              setFormData({
                                title: article.title,
                                description: article.description,
                                image: article.image,
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
                              setCurrentArticle(article)
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
        <DialogContent className="sm:max-w-[600px] h-[calc(120vh-100px)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>Make changes to the article.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
            <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="TeamImageUploader" label="Profile Image"/>
                
              {/* <Label>Image</Label>
              <UploadImage
                endpoint="imageUploader"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url || "" })}
              /> */}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleEditArticle}>
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
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteArticle}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
