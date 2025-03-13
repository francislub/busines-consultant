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
import ImageInput from '@/components/ImageInput';
import Image from "next/image"
import { toast } from "sonner"

// Mock data for team members
const mockTeams = Array.from({ length: 8 }).map((_, i) => ({
  id: `team-${i + 1}`,
  name: `Team Member ${i + 1}`,
  title: `${i % 2 === 0 ? "Senior" : "Junior"} ${
    i % 3 === 0 ? "Consultant" : i % 3 === 1 ? "Developer" : "Designer"
  }`,
  description: `This is a description for team member ${i + 1}. They have expertise in various areas.`,
  image: `/placeholder.svg?height=400&width=400`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
}))

export default function TeamsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [teams, setTeams] = useState(mockTeams)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [formData, setFormData] = useState({
    name: "",
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

    // Fetch team members
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/admin/teams")
        if (response.ok) {
          const data = await response.json()
          setTeams(data)
        } else {
          // If API fails, use mock data
          setTeams(mockTeams)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch team members:", error)
        setTeams(mockTeams)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchTeams()
    }
  }, [status, session, router])

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateTeam = async () => {
    try {
      if (!formData.name || !formData.title || !formData.description) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch("/api/admin/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newTeam = await response.json()
        setTeams([newTeam, ...teams])
        setIsCreateDialogOpen(false)
        setFormData({ name: "", title: "", description: "", image: "" })
        toast.success("Team member created successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to create team member")
      }
    } catch (error) {
      console.error("Failed to create team member:", error)
      toast.error("An error occurred while creating the team member")
    }
  }

  const handleEditTeam = async () => {
    try {
      if (!formData.name || !formData.title || !formData.description) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch(`/api/admin/teams/${currentTeam.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedTeam = await response.json()
        const updatedTeams = teams.map((team) =>
          team.id === currentTeam.id ? updatedTeam : team,
        )
        setTeams(updatedTeams)
        setIsEditDialogOpen(false)
        setCurrentTeam(null)
        setFormData({ name: "", title: "", description: "", image: "" })
        toast.success("Team member updated successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to update team member")
      }
    } catch (error) {
      console.error("Failed to update team member:", error)
      toast.error("An error occurred while updating the team member")
    }
  }

  const handleDeleteTeam = async () => {
    try {
      const response = await fetch(`/api/admin/teams/${currentTeam.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const updatedTeams = teams.filter((team) => team.id !== currentTeam.id)
        setTeams(updatedTeams)
        setIsDeleteDialogOpen(false)
        setCurrentTeam(null)
        toast.success("Team member deleted successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to delete team member")
      }
    } catch (error) {
      console.error("Failed to delete team member:", error)
      toast.error("An error occurred while deleting the team member")
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
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 ">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[calc(120vh-100px)] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Team Member</DialogTitle>
                <DialogDescription>Add a new team member to your organization.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter team member name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter team member title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter team member description"
                    rows={5}
                  />
                </div>
                <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="TeamImageUploader" label="Profile Image"/>
                  
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateTeam}>
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
              placeholder="Search team members..."
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
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No team members found. Add your first team member!
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={team.image || "/placeholder.svg?height=40&width=40"}
                          alt={team.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {team.description.length > 60 ? `${team.description.substring(0, 60)}...` : team.description}
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
                              setCurrentTeam(team)
                              setFormData({
                                name: team.name,
                                title: team.title,
                                description: team.description,
                                image: team.image,
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
                              setCurrentTeam(team)
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
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Make changes to the team member.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
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
              {/* <UploadImage
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
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleEditTeam}>
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
              This action cannot be undone. This will permanently delete the team member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteTeam}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
