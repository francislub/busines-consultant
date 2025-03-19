"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Pencil, Trash2, MoreVertical, Plus, Search, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

interface Article {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: string
  author: {
    name: string
  }
}

export default function ArticlesPage() {
  const { toast } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/admin/articles")
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error("Failed to fetch articles:", error)
        toast({
          title: "Error",
          description: "Failed to fetch articles",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [toast])

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()))

  // Create article
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create article")
      }

      const newArticle = await response.json()
      setArticles([newArticle, ...articles])
      setFormData({ title: "", content: "" })
      setIsCreating(false)

      toast({
        title: "Success",
        description: "Article created successfully",
      })
    } catch (error) {
      console.error("Failed to create article:", error)
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      })
    }
  }

  // Update article
  const handleUpdate = async () => {
    if (!currentArticle) return

    try {
      const response = await fetch(`/api/admin/articles`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentArticle.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update article")
      }

      const updatedArticle = await response.json()
      setArticles(articles.map((article) => (article.id === updatedArticle.id ? updatedArticle : article)))
      setCurrentArticle(null)
      setFormData({ title: "", content: "" })
      setIsEditing(false)

      toast({
        title: "Success",
        description: "Article updated successfully",
      })
    } catch (error) {
      console.error("Failed to update article:", error)
      toast({
        title: "Error",
        description: "Failed to update article",
        variant: "destructive",
      })
    }
  }

  // Delete article
  const handleDelete = async () => {
    if (!currentArticle) return

    try {
      const response = await fetch(`/api/admin/articles`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentArticle.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete article")
      }

      setArticles(articles.filter((article) => article.id !== currentArticle.id))
      setCurrentArticle(null)
      setIsDeleting(false)

      toast({
        title: "Success",
        description: "Article deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete article:", error)
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Article</DialogTitle>
              <DialogDescription>Add a new article to your website</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  rows={10}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No articles found
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author.name}</TableCell>
                  <TableCell>{format(new Date(article.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(article.updatedAt), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentArticle(article)
                            setFormData({
                              title: article.title,
                              content: article.content,
                            })
                            setIsEditing(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentArticle(article)
                            setIsDeleting(true)
                          }}
                          className="text-red-600"
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

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>Make changes to the article</DialogDescription>
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
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                rows={10}
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

      {/* Delete Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
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

