"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { PlusCircle, Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import ClientLayout from "@/components/client-layout"
import { useSession } from "next-auth/react"
import { ConsultationForm } from "@/components/consultation-form"

// Mock data for consultations
const mockConsultations = Array.from({ length: 5 }).map((_, i) => ({
  id: `consultation-${i + 1}`,
  subject: `Consultation ${i + 1}`,
  description: `This is a description for consultation ${i + 1}. I would like to discuss business strategies.`,
  date: new Date(Date.now() + (i + 1) * 86400000 * 2), // Future dates
  status: i % 4 === 0 ? "REQUESTED" : i % 4 === 1 ? "CONFIRMED" : i % 4 === 2 ? "COMPLETED" : "CANCELLED",
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
}))

export default function ConsultationsPage() {
  const router = useRouter()
  const { data, status } = useSession();
  const [consultations, setConsultations] = useState(mockConsultations)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // Fetch consultations
    const fetchConsultations = async () => {
      try {
        // In a real app, you would fetch actual data here
        // const response = await fetch("/api/client/consultations")
        // const data = await response.json()
        // setConsultations(data)

        // Using mock data for now
        setConsultations(mockConsultations)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch consultations:", error)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchConsultations()
    }
  }, [status, router])

  const filteredConsultations = consultations.filter(
    (consultation) =>
      consultation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateConsultation = async (data: any) => {
    setIsSubmitting(true)
    try {
      // In a real app, you would send data to your API
      // const response = await fetch("/api/client/consultations", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // })
      // const newConsultation = await response.json()

      // Mock creating a new consultation
      const newConsultation = {
        id: `consultation-${consultations.length + 1}`,
        ...data,
        status: "REQUESTED",
        createdAt: new Date(),
      }

      setConsultations([newConsultation, ...consultations])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Failed to create consultation:", error)
    } finally {
      setIsSubmitting(false)
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
          <h2 className="text-3xl font-bold tracking-tight">My Consultations</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule a Consultation</DialogTitle>
                <DialogDescription>Request a consultation with our team at your preferred date and time.</DialogDescription>
              </DialogHeader>
              <ConsultationForm onSubmit={handleCreateConsultation} isSubmitting={isSubmitting} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search consultations..."
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
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsultations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No consultations found. Schedule your first consultation!
                  </TableCell>
                </TableRow>
              ) : (
                filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {consultation.subject}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {consultation.description.length > 60 ? `${consultation.description.substring(0, 60)}...` : consultation.description}
                    </TableCell>
                    <TableCell>
                      {format(new Date(consultation.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          consultation.status === "REQUESTED"
                            ? "bg-yellow-500"
                            : consultation.status === "CONFIRMED"
                            ? "bg-blue-500"
                            : consultation.status === "COMPLETED"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      >
                        {consultation.status}
                      </Badge>
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
