// app/admin/dashboard/contacts/page.tsx
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
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, RefreshCw, Filter } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { toast } from "sonner"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  website?: string
  city: string
  state: string
  message: string
  status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED"
  createdAt: string
}

interface PaginationData {
  total: number
  pages: number
  page: number
  limit: number
}

export default function ContactsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
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

    // Fetch contacts
    if (status === "authenticated") {
      fetchContacts()
    }
  }, [status, session, router, pagination.page, statusFilter])

  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      let url = `/api/contacts?page=${pagination.page}&limit=${pagination.limit}`
      if (statusFilter) {
        url += `&status=${statusFilter}`
      }

      const response = await fetch(url)
      const data = await response.json()

      setContacts(data.contacts)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
      toast.error("Failed to load contacts")
    } finally {
      setIsLoading(false)
    }
  }

  // const handleStatusChange = async (contactId: string, newStatus: "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED") => {
  //   try {
  //     const response = await fetch(`/api/contacts/${contactId}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status: newStatus }),
  //     })

  //     if (!response.ok) {
  //       throw new Error("Failed to update status")
  //     }

  //     setContacts(
  //       contacts.map((contact) => (contact.id === contactId ? { ...contact, status: newStatus } : contact)),
  //     )

  //     toast.success("Contact status updated successfully")
  //   } catch (error) {
  //     console.error("Error updating contact status:", error)
  //     toast.error("Failed to update contact status")
  //   }
  // }

  const handleDeleteContact = async () => {
    if (!selectedContact) return

    try {
      const response = await fetch(`/api/contacts/${selectedContact.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete contact")
      }

      // Remove the contact from the local state
      setContacts(contacts.filter((contact) => contact.id !== selectedContact.id))
      setIsDeleteDialogOpen(false)
      setSelectedContact(null)
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.error("Error deleting contact:", error)
      toast.error("Failed to delete contact")
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <Badge className="bg-blue-500">New</Badge>
      case "IN_PROGRESS":
        return <Badge className="bg-yellow-500">In Progress</Badge>
      case "COMPLETED":
        return <Badge className="bg-green-500">Completed</Badge>
      case "ARCHIVED":
        return <Badge className="bg-gray-500">Archived</Badge>
      default:
        return <Badge>{status}</Badge>
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
          <h2 className="text-3xl font-bold tracking-tight">Contact Submissions</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1" onClick={fetchContacts}>
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
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span>{statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("NEW")}>New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("IN_PROGRESS")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("COMPLETED")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("ARCHIVED")}>Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No contacts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      {contact.firstName} {contact.lastName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{contact.company}</TableCell>
                    <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {contact.city}, {contact.state}
                    </TableCell>
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(contact.createdAt), "PPP")}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setIsViewDialogOpen(true)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedContact(contact)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" size="sm" onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })} disabled={pagination.page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button variant="outline" size="sm" onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} disabled={pagination.page === pagination.pages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              {/* Add contact details here */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contact?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContact}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
