"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, FileText, Clock, RefreshCw, PlusCircle, Loader2 } from "lucide-react"
import ClientLayout from "@/components/client-layout"
import { useSession } from "next-auth/react"
import { format, formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

// Define types for our client data
interface ClientData {
  inquiries: number
  messages: number
  consultations: number
  recentInquiries: {
    id: string
    subject: string
    message: string
    status: string
    createdAt: string
  }[]
  upcomingConsultations: {
    id: string
    subject: string
    description: string
    date: string
    status: string
  }[]
  recentMessages: {
    id: string
    content: string
    isRead: boolean
    createdAt: string
  }[]
}

export default function ClientDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [clientData, setClientData] = useState<ClientData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Function to fetch client data
  const fetchClientData = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/client/dashboard")

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const data = await response.json()
      setClientData(data)

      if (isRefreshing) {
        toast.success("Dashboard data refreshed")
      }
    } catch (error) {
      console.error("Error fetching client data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    // Check authentication and role
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard")
      return
    }

    // Fetch client data when authenticated
    if (status === "authenticated") {
      fetchClientData()
    }
  }, [status, session, router])

  // Handle refresh button click
  const handleRefresh = () => {
    fetchClientData()
  }

  // Handle new inquiry button click
  const handleNewInquiry = () => {
    router.push("/client/dashboard/inquiries/new")
  }

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <ClientLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-red-600" />
          <p className="mt-4 text-gray-500">Loading dashboard data...</p>
        </div>
      </ClientLayout>
    )
  }

  // If client data is not available
  if (!clientData) {
    return (
      <ClientLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-gray-500">No data available</p>
          <Button onClick={handleRefresh} className="mt-4">
            Try Again
          </Button>
        </div>
      </ClientLayout>
    )
  }

  return (
    <ClientLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Client Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Refreshing...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </>
              )}
            </Button>
            <Button size="sm" className="h-9 gap-1 bg-red-600 hover:bg-red-700" onClick={handleNewInquiry}>
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">New Request</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clientData.inquiries}</div>
                  <p className="text-xs text-muted-foreground">
                    {clientData.inquiries > 0 ? "Awaiting response" : "No pending inquiries"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clientData.messages}</div>
                  <p className="text-xs text-muted-foreground">
                    {clientData.messages > 0 ? "New messages to read" : "No unread messages"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Consultations</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clientData.consultations}</div>
                  <p className="text-xs text-muted-foreground">
                    {clientData.consultations > 0 ? "Scheduled consultations" : "No upcoming consultations"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>Your most recent inquiries and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {clientData.recentInquiries.length > 0 ? (
                      clientData.recentInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center">
                          <div className="mr-4 rounded-full bg-red-100 p-2">
                            <MessageSquare className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{inquiry.subject}</p>
                            <p className="text-sm text-muted-foreground">Status: {formatStatus(inquiry.status)}</p>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground">
                            {formatTimeAgo(inquiry.createdAt)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No recent inquiries</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Consultations</CardTitle>
                  <CardDescription>Your scheduled consultation sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {clientData.upcomingConsultations.length > 0 ? (
                      clientData.upcomingConsultations.map((consultation) => (
                        <div key={consultation.id} className="flex items-center">
                          <div className="mr-4 rounded-full bg-red-100 p-2">
                            <Clock className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{consultation.subject}</p>
                            <p className="text-sm text-muted-foreground">Status: {formatStatus(consultation.status)}</p>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground">
                            {format(new Date(consultation.date), "MMM d, yyyy")}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No upcoming consultations</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Inquiries</CardTitle>
                  <CardDescription>View and manage your inquiries</CardDescription>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={handleNewInquiry}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Inquiry
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientData.recentInquiries.length > 0 ? (
                    clientData.recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{inquiry.subject}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(inquiry.status)}`}>
                            {formatStatus(inquiry.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{inquiry.message}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{format(new Date(inquiry.createdAt), "MMMM d, yyyy")}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/client/dashboard/inquiries/${inquiry.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven&apos;t submitted any inquiries yet</p>
                      <Button className="bg-red-600 hover:bg-red-700" onClick={handleNewInquiry}>
                        Submit Your First Inquiry
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Consultations</CardTitle>
                  <CardDescription>Schedule and manage your consultation sessions</CardDescription>
                </div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => router.push("/client/dashboard/consultations/schedule")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientData.upcomingConsultations.length > 0 ? (
                    clientData.upcomingConsultations.map((consultation) => (
                      <div key={consultation.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{consultation.subject}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(consultation.status)}`}>
                            {formatStatus(consultation.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{consultation.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {format(new Date(consultation.date), "MMMM d, yyyy 'at' h:mm a")}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/client/dashboard/consultations/${consultation.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You don&apos;t have any upcoming consultations</p>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => router.push("/client/dashboard/consultations/schedule")}
                      >
                        Schedule Your First Consultation
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Messages</CardTitle>
                  <CardDescription>View and send messages to our team</CardDescription>
                </div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => router.push("/client/dashboard/messages/new")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientData.recentMessages.length > 0 ? (
                    clientData.recentMessages.map((message) => (
                      <div key={message.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium line-clamp-1">{message.content.substring(0, 50)}...</h3>
                          {!message.isRead && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">New</span>
                          )}
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{formatTimeAgo(message.createdAt)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/client/dashboard/messages/${message.id}`)}
                          >
                            View Message
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You don&apos;t have any messages</p>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => router.push("/client/dashboard/messages/new")}
                      >
                        Send Your First Message
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}

// Helper function to format status strings
function formatStatus(status: string): string {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800"
    case "RESOLVED":
    case "COMPLETED":
      return "bg-green-100 text-green-800"
    case "CANCELLED":
      return "bg-red-100 text-red-800"
    case "REQUESTED":
      return "bg-purple-100 text-purple-800"
    case "CONFIRMED":
      return "bg-teal-100 text-teal-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    console.error("Date parsing error:", error); 
    return "Invalid date"
  }
}

