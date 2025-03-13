"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { PlusCircle, Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ClientLayout from "@/components/client-layout"
import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Mock data for inquiries
const mockInquiries = Array.from({ length: 8 }).map((_, i) => ({
  id: `inquiry-${i + 1}`,
  subject: `Inquiry ${i + 1}`,
  message: `This is inquiry ${i + 1}. I have a question about your services.`,
  status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "IN_PROGRESS" : "RESOLVED",
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
}))

export default function InquiriesPage() {
  const router = useRouter()
  const { data: _session, status } = useSession();
  const [inquiries, setInquiries] = useState(mockInquiries)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // Fetch inquiries
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/api/client/inquiries")
        if (response.ok) {
          const data = await response.json()
          setInquiries(data)
        } else {
          // If API fails, use mock data
          setInquiries(mockInquiries)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch inquiries:", error)
        setInquiries(mockInquiries)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchInquiries()
    }
  }, [status, router]); // Added router dependency

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateInquiry = async () => {
    try {
      if (!formData.subject || !formData.message) {
        toast.error("Please fill all required fields")
        return
      }

      const response = await fetch("/api/client/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newInquiry = await response.json()
        setInquiries([newInquiry, ...inquiries])
        setIsCreateDialogOpen(false)
        setFormData({ subject: "", message: "" })
        toast.success("Inquiry submitted successfully")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to submit inquiry")
      }
    } catch (error) {
      console.error("Failed to submit inquiry:", error)
      toast.error("An error occurred while submitting the inquiry")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "RESOLVED":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    )
  }

  return (
    <ClientLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Inquiries</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Inquiry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit New Inquiry</DialogTitle>
                <DialogDescription>
                  Submit a new inquiry to our team. We'll get back to you as soon as possible.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter inquiry subject"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message"
                    rows={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreateInquiry}>
                  Submit
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
              placeholder="Search inquiries..."
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
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No inquiries found. Submit your first inquiry!
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {inquiry.message.length > 60 ? `${inquiry.message.substring(0, 60)}...` : inquiry.message}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(inquiry.status)}>
                        {inquiry.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(inquiry.createdAt), "MMM d, yyyy")}
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
                          <DropdownMenuItem onClick={() => {
                            // View details functionality
                            toast.info("Viewing inquiry details")
                          }}>
                            View Details
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
    </ClientLayout>
  )
}
