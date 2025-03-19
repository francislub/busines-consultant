"use client"

import type React from "react"

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
import { Search, Loader2, Mail, Phone, Building, MapPin } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/data-table"
import { contactColumns } from "./columns"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  website: string | null
  city: string
  state: string
  message: string
  status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED"
  createdAt: string
  updatedAt: string
}

export default function ContactsPage() {
  const { toast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isViewing, setIsViewing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentContact, setCurrentContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    city: "",
    state: "",
    message: "",
    status: "NEW" as "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED",
  })

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/admin/contacts")
        const data = await response.json()
        setContacts(data)
      } catch (error) {
        console.error("Failed to fetch contacts:", error)
        toast({
          title: "Error",
          description: "Failed to fetch contacts",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()
  }, [toast])

  // Filter contacts based on search query and status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || contact.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Update contact status
  const handleUpdateStatus = async (id: string, status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED") => {
    try {
      const response = await fetch(`/api/admin/contacts`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update contact status")
      }

      const updatedContact = await response.json()
      setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))

      toast({
        title: "Success",
        description: "Contact status updated successfully",
      })
    } catch (error) {
      console.error("Failed to update contact status:", error)
      toast({
        title: "Error",
        description: "Failed to update contact status",
        variant: "destructive",
      })
    }
  }

  // Update contact
  const handleUpdate = async () => {
    if (!currentContact) return

    try {
      const response = await fetch(`/api/admin/contacts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentContact.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update contact")
      }

      const updatedContact = await response.json()
      setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
      setCurrentContact(null)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        city: "",
        state: "",
        message: "",
        status: "NEW",
      })
      setIsEditing(false)

      toast({
        title: "Success",
        description: "Contact updated successfully",
      })
    } catch (error) {
      console.error("Failed to update contact:", error)
      toast({
        title: "Error",
        description: "Failed to update contact",
        variant: "destructive",
      })
    }
  }

  // Delete contact
  const handleDelete = async () => {
    if (!currentContact) return

    try {
      const response = await fetch(`/api/admin/contacts`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentContact.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete contact")
      }

      setContacts(contacts.filter((contact) => contact.id !== currentContact.id))
      setCurrentContact(null)
      setIsDeleting(false)

      toast({
        title: "Success",
        description: "Contact deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete contact:", error)
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      })
    }
  }

  // Get status counts
  const statusCounts = contacts.reduce(
    (acc, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1
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
        <h1 className="text-3xl font-bold">Contacts</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-6">
        <Card className="bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">All Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statusCounts.NEW || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {statusCounts.IN_PROGRESS || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{statusCounts.COMPLETED || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={contactColumns}
        data={filteredContacts}
        searchKey="email"
        searchPlaceholder="Filter contacts..."
      />

      {/* View Contact Dialog */}
      <Dialog open={isViewing} onOpenChange={setIsViewing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>Contact information submitted through the website</DialogDescription>
          </DialogHeader>
          {currentContact && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                  <p className="text-base">
                    {currentContact.firstName} {currentContact.lastName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <Badge
                    variant={
                      currentContact.status === "NEW"
                        ? "default"
                        : currentContact.status === "IN_PROGRESS"
                          ? "secondary"
                          : currentContact.status === "COMPLETED"
                            ? "success"
                            : "outline"
                    }
                  >
                    {currentContact.status.replace(/_/g, " ")}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`mailto:${currentContact.email}`} className="text-primary hover:underline">
                    {currentContact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`tel:${currentContact.phone}`} className="hover:underline">
                    {currentContact.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{currentContact.company}</span>
                </div>
                {currentContact.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a
                      href={currentContact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {currentContact.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {currentContact.city}, {currentContact.state}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Message</h3>
                <div className="rounded-md border p-4 whitespace-pre-wrap">{currentContact.message}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <span>Created: </span>
                  <span>{format(new Date(currentContact.createdAt), "PPP p")}</span>
                </div>
                <div>
                  <span>Last Updated: </span>
                  <span>{format(new Date(currentContact.updatedAt), "PPP p")}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Select
                  defaultValue={currentContact.status}
                  onValueChange={(value) =>
                    handleUpdateStatus(currentContact.id, value as "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentContact(currentContact)
                      setFormData({
                        firstName: currentContact.firstName,
                        lastName: currentContact.lastName,
                        email: currentContact.email,
                        phone: currentContact.phone,
                        company: currentContact.company,
                        website: currentContact.website || "",
                        city: currentContact.city,
                        state: currentContact.state,
                        message: currentContact.message,
                        status: currentContact.status,
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>Make changes to the contact information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED",
                  })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Delete Contact Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone.
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

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

