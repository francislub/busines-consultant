"use client"

import { useState, useEffect } from "react"
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
import { Pencil, Trash2, MoreVertical, Plus, Search, Loader2, User, Eye, MessageSquare, Calendar } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/data-table"
import { articleColumns } from "./columns"
import ImageInput from '@/components/ImageInput';
import Image from "next/image"

interface Article {
  id: string
  title: string
  content: string
  image: string | null
  category: string
  slug: string
  createdAt: string
  updatedAt: string
  authorId: string
  author: {
    name: string
  }
  comments: {
    id: string
    content: string
    author: {
      name: string
    }
  }[]
}

export default function ArticlesPage() {
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState("")
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [view, setView] = useState<"grid" | "table">("grid")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: imageUrl,
    category: "",
    slug: "",
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

  // Event listeners for data table actions
  useEffect(() => {
    const handleViewArticle = (event: CustomEvent) => {
      setCurrentArticle(event.detail)
      setIsViewing(true)
    }

    const handleEditArticle = (event: CustomEvent) => {
      const article = event.detail
      setCurrentArticle(article)
      setFormData({
        title: article.title,
        content: article.content,
        image: article.image || "",
        category: article.category,
        slug: article.slug,
      })
      setIsEditing(true)
    }

    const handleDeleteArticle = (event: CustomEvent) => {
      setCurrentArticle(event.detail)
      setIsDeleting(true)
    }

    document.addEventListener("view-article", handleViewArticle as EventListener)
    document.addEventListener("edit-article", handleEditArticle as EventListener)
    document.addEventListener("delete-article", handleDeleteArticle as EventListener)

    return () => {
      document.removeEventListener("view-article", handleViewArticle as EventListener)
      document.removeEventListener("edit-article", handleEditArticle as EventListener)
      document.removeEventListener("delete-article", handleDeleteArticle as EventListener)
    }
  }, [])

  // Filter articles based on search query and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = [...new Set(articles.map((article) => article.category))].sort()

  // Create article
  const handleCreate = async () => {
    try {
      // Generate slug from title if not provided
      const formDataWithSlug = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      }

      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithSlug),
      })

      if (!response.ok) {
        throw new Error("Failed to create article")
      }

      const newArticle = await response.json()
      setArticles([newArticle, ...articles])
      setFormData({
        title: "",
        content: "",
        image: "",
        category: "",
        slug: "",
      })
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
      setFormData({
        title: "",
        content: "",
        image: imageUrl,
        category: "",
        slug: "",
      })
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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>

        <div className="flex items-center space-x-2">
          <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
            Grid
          </Button>
          <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}>
            Table
          </Button>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
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
                <div className="grid gap-2">
                <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="articleImageUploader" label="Article Image"/>
                  {/* <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  /> */}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Slug (optional)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Generated from title if empty"
                    />
                  </div>
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
      </div>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {categories.length > 0 && (
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  {article.image ? (
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentArticle(article)
                            setIsViewing(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentArticle(article)
                            setFormData({
                              title: article.title,
                              content: article.content,
                              image: article.image || "",
                              category: article.category,
                              slug: article.slug,
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
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-1">{article.title}</h3>
                  <Badge variant="outline" className="mt-2">
                    {article.category}
                  </Badge>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {article.content ? article.content.substring(0, 150) + "..." : "No content"}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{format(new Date(article.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    <span>{article.comments?.length || 0}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      ) : (
        <DataTable
          columns={articleColumns}
          data={filteredArticles}
          searchKey="title"
          searchPlaceholder="Filter articles..."
        />
      )}

      {/* View Article Dialog */}
      <Dialog open={isViewing} onOpenChange={setIsViewing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Article Details</DialogTitle>
          </DialogHeader>
          {currentArticle && (
            <div className="grid gap-6 py-4">
              {currentArticle.image && (
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={currentArticle.image || "/placeholder.svg"}
                    alt={currentArticle.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold">{currentArticle.title}</h2>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge variant="outline">{currentArticle.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    By {currentArticle.author.name} • {format(new Date(currentArticle.createdAt), "PPP")}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Content</h3>
                <div className="rounded-md border p-4 whitespace-pre-wrap">{currentArticle.content}</div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Comments ({currentArticle.comments?.length || 0})
                </h3>
                {currentArticle.comments && currentArticle.comments.length > 0 ? (
                  <div className="space-y-4">
                    {currentArticle.comments.map((comment) => (
                      <div key={comment.id} className="rounded-md border p-4">
                        <div className="flex justify-between">
                          <span className="font-medium">{comment.author.name}</span>
                        </div>
                        <p className="mt-2 text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No comments yet</p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentArticle(currentArticle)
                    setFormData({
                      title: currentArticle.title,
                      content: currentArticle.content,
                      image: currentArticle.image || "",
                      category: currentArticle.category,
                      slug: currentArticle.slug,
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

      {/* Edit Article Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
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
            <div className="grid gap-2">
            <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="articleImageUploader" label="Article Image"/>
              {/* <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              /> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
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

      {/* Delete Article Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentArticle?.title} This action cannot be undone.
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

