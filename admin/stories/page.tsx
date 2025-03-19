"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { PlusCircle, Pencil, Trash2, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminLayout from "@/components/admin-layout"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { toast } from "sonner"
import ImageInput from '@/components/ImageInput';

// Define the categories
const categories = ["Operational Assessment", "Operations", "Procore", "Software & ERP", "Marketing", "Bonus Programs"]

interface Story {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: string
}

export default function StoriesPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
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

    // Fetch stories
    if (status === "authenticated") {
      fetchStories()
    }
  }, [status, session, router, pagination.page])

  const fetchStories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/stories?page=${pagination.page}`)

      if (response.ok) {
        const data = await response.json()
        setStories(data)
      } else {
        toast.error("Failed to fetch stories")
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error)
      toast.error("An error occurred while fetching stories")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateStory = async () => {
    try {
      if (!formData.title || !formData.description || !formData.category) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newStory = await response.json()
        setStories([newStory, ...stories])
        setIsCreateDialogOpen(false)
        setFormData({ title: "", description: "", image: "", category: "" })
        toast.success("Story created successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to create story")
      }
    } catch (error) {
      console.error("Failed to create story:", error)
      toast.error("An error occurred while creating the story")
    }
  }

  const handleEditStory = async () => {
    try {
      if (!currentStory) return
      if (!formData.title || !formData.description || !formData.category) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch(`/api/admin/stories/${currentStory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedStory = await response.json()
        const updatedStories = stories.map((story) => (story.id === currentStory.id ? updatedStory : story))
        setStories(updatedStories)
        setIsEditDialogOpen(false)
        setCurrentStory(null)
        setFormData({ title: "", description: "", image: "", category: "" })
        toast.success("Story updated successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to update story")
      }
    } catch (error) {
      console.error("Failed to update story:", error)
      toast.error("An error occurred while updating the story")
    }
  }

  const handleDeleteStory = async () => {
    try {
      if (!currentStory) return
      const response = await fetch(`/api/admin/stories/${currentStory.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const updatedStories = stories.filter((story) => story.id !== currentStory.id)
        setStories(updatedStories)
        setIsDeleteDialogOpen(false)
        setCurrentStory(null)
        toast.success("Story deleted successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to delete story")
      }
    } catch (error) {
      console.error("Failed to delete story:", error)
      toast.error("An error occurred while deleting the story")
    }
  }

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination({ ...pagination, page: pagination.page - 1 })
    }
  }

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination({ ...pagination, page: pagination.page + 1 })
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
          <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Story
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Success Story</DialogTitle>
                <DialogDescription>Add a new success story to showcase your work.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter story title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter story description"
                    rows={5}
                  />
                </div>
                <div className="grid gap-2">
                <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="TeamImageUploader" label="Profile Image"/>
                
                  {/* <Label htmlFor="image">Image URL *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  /> */}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateStory}>
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
              placeholder="Search stories..."
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
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No stories found. Create your first success story!
                  </TableCell>
                </TableRow>
              ) : (
                filteredStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <div className="relative h-10 w-16 overflow-hidden rounded">
                        <Image
                          src={story.image || "/placeholder.svg?height=40&width=64"}
                          alt={story.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{story.title}</TableCell>
                    <TableCell>{story.category}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {story.description.length > 60 ? `${story.description.substring(0, 60)}...` : story.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(story.createdAt), "MMM d, yyyy")}
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
                              setCurrentStory(story)
                              setFormData({
                                title: story.title,
                                description: story.description,
                                image: story.image,
                                category: story.category,
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
                              setCurrentStory(story)
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
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={pagination.page <= 1}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Success Story</DialogTitle>
            <DialogDescription>Make changes to the success story.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL *</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleEditStory}>
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
              This action cannot be undone. This will permanently delete the success story.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteStory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}

