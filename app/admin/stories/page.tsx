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
import { Pencil, Trash2, MoreVertical, Plus, Search, Loader2, Image, Eye, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Story {
  id: string
  title: string
  description: string
  image: string
  category: "OPERATIONAL_ASSESSMENT" | "OPERATIONS" | "PROCORE" | "SOFTWARE_ERP" | "MARKETING" | "BONUS_PROGRAMS"
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

export default function StoriesPage() {
  const { toast } = useToast()
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [view, setView] = useState<"grid" | "table">("grid")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "OPERATIONAL_ASSESSMENT" as Story["category"],
    slug: "",
  })

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("/api/admin/stories")
        const data = await response.json()
        setStories(data)
      } catch (error) {
        console.error("Failed to fetch stories:", error)
        toast({
          title: "Error",
          description: "Failed to fetch stories",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [toast])

  // Filter stories based on search query and category
  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || story.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Create story
  const handleCreate = async () => {
    try {
      // Generate slug from title if not provided
      const formDataWithSlug = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      }

      const response = await fetch("/api/admin/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithSlug),
      })

      if (!response.ok) {
        throw new Error("Failed to create story")
      }

      const newStory = await response.json()
      setStories([newStory, ...stories])
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "OPERATIONAL_ASSESSMENT",
        slug: "",
      })
      setIsCreating(false)

      toast({
        title: "Success",
        description: "Story created successfully",
      })
    } catch (error) {
      console.error("Failed to create story:", error)
      toast({
        title: "Error",
        description: "Failed to create story",
        variant: "destructive",
      })
    }
  }

  // Update story
  const handleUpdate = async () => {
    if (!currentStory) return

    try {
      const response = await fetch(`/api/admin/stories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentStory.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update story")
      }

      const updatedStory = await response.json()
      setStories(stories.map((story) => (story.id === updatedStory.id ? updatedStory : story)))
      setCurrentStory(null)
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "OPERATIONAL_ASSESSMENT",
        slug: "",
      })
      setIsEditing(false)

      toast({
        title: "Success",
        description: "Story updated successfully",
      })
    } catch (error) {
      console.error("Failed to update story:", error)
      toast({
        title: "Error",
        description: "Failed to update story",
        variant: "destructive",
      })
    }
  }

  // Delete story
  const handleDelete = async () => {
    if (!currentStory) return

    try {
      const response = await fetch(`/api/admin/stories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentStory.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete story")
      }

      setStories(stories.filter((story) => story.id !== currentStory.id))
      setCurrentStory(null)
      setIsDeleting(false)

      toast({
        title: "Success",
        description: "Story deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete story:", error)
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive",
      })
    }
  }

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
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
        <h1 className="text-3xl font-bold">Stories</h1>

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
                New Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Story</DialogTitle>
                <DialogDescription>Add a new story to your website</DialogDescription>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          category: value as Story["category"],
                        })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OPERATIONAL_ASSESSMENT">Operational Assessment</SelectItem>
                        <SelectItem value="OPERATIONS">Operations</SelectItem>
                        <SelectItem value="PROCORE">Procore</SelectItem>
                        <SelectItem value="SOFTWARE_ERP">Software ERP</SelectItem>
                        <SelectItem value="MARKETING">Marketing</SelectItem>
                        <SelectItem value="BONUS_PROGRAMS">Bonus Programs</SelectItem>
                      </SelectContent>
                    </Select>
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
              placeholder="Search stories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="OPERATIONAL_ASSESSMENT">Operational Assessment</SelectItem>
              <SelectItem value="OPERATIONS">Operations</SelectItem>
              <SelectItem value="PROCORE">Procore</SelectItem>
              <SelectItem value="SOFTWARE_ERP">Software ERP</SelectItem>
              <SelectItem value="MARKETING">Marketing</SelectItem>
              <SelectItem value="BONUS_PROGRAMS">Bonus Programs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No stories found</p>
            </div>
          ) : (
            filteredStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  {story.image ? (
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image className="h-16 w-16 text-muted-foreground" />
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
                            setCurrentStory(story)
                            setIsViewing(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentStory(story)
                            setFormData({
                              title: story.title,
                              description: story.description,
                              image: story.image,
                              category: story.category,
                              slug: story.slug,
                            })
                            setIsEditing(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentStory(story)
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
                  <h3 className="font-semibold line-clamp-1">{story.title}</h3>
                  <Badge variant="outline" className="mt-2">
                    {formatCategory(story.category)}
                  </Badge>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{story.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <span>By {story.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    <span>{story.comments?.length || 0}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No stories found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell className="font-medium">{story.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{formatCategory(story.category)}</Badge>
                    </TableCell>
                    <TableCell>{story.author.name}</TableCell>
                    <TableCell>{story.comments?.length || 0}</TableCell>
                    <TableCell>{format(new Date(story.createdAt), "MMM d, yyyy")}</TableCell>
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
                              setCurrentStory(story)
                              setIsViewing(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentStory(story)
                              setFormData({
                                title: story.title,
                                description: story.description,
                                image: story.image,
                                category: story.category,
                                slug: story.slug,
                              })
                              setIsEditing(true)
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentStory(story)
                              setIsDeleting(true)
                            }}
                            className="text-destructive"
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
      )}

      {/* View Story Dialog */}
      <Dialog open={isViewing} onOpenChange={setIsViewing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Story Details</DialogTitle>
          </DialogHeader>
          {currentStory && (
            <div className="grid gap-6 py-4">
              {currentStory.image && (
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <img
                    src={currentStory.image || "/placeholder.svg"}
                    alt={currentStory.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold">{currentStory.title}</h2>
                <div className="mt-2 flex items-center space-x-2">
                  <Badge variant="outline">{formatCategory(currentStory.category)}</Badge>
                  <span className="text-sm text-muted-foreground">
                    By {currentStory.author.name} • {format(new Date(currentStory.createdAt), "PPP")}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                <div className="rounded-md border p-4 whitespace-pre-wrap">{currentStory.description}</div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Comments ({currentStory.comments?.length || 0})
                </h3>
                {currentStory.comments && currentStory.comments.length > 0 ? (
                  <div className="space-y-4">
                    {currentStory.comments.map((comment) => (
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
                    setCurrentStory(currentStory)
                    setFormData({
                      title: currentStory.title,
                      description: currentStory.description,
                      image: currentStory.image,
                      category: currentStory.category,
                      slug: currentStory.slug,
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

      {/* Edit Story Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Story</DialogTitle>
            <DialogDescription>Make changes to the story</DialogDescription>
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
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value as Story["category"],
                    })
                  }
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPERATIONAL_ASSESSMENT">Operational Assessment</SelectItem>
                    <SelectItem value="OPERATIONS">Operations</SelectItem>
                    <SelectItem value="PROCORE">Procore</SelectItem>
                    <SelectItem value="SOFTWARE_ERP">Software ERP</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="BONUS_PROGRAMS">Bonus Programs</SelectItem>
                  </SelectContent>
                </Select>
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

      {/* Delete Story Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Story</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentStory?.title}"? This action cannot be undone.
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

