"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, FileText, Clock, RefreshCw, PlusCircle } from "lucide-react"
import ClientLayout from "@/components/client-layout"
import { useSession } from "next-auth/react"

// Mock data for client dashboard
const mockClientData = {
  inquiries: 3,
  messages: 5,
  consultations: 2,
  recentInquiries: [
    { id: "1", subject: "Business Consulting", status: "PENDING", createdAt: new Date() },
    { id: "2", subject: "Marketing Strategy", status: "IN_PROGRESS", createdAt: new Date(Date.now() - 86400000) },
  ],
  upcomingConsultations: [
    { id: "1", subject: "Initial Consultation", date: new Date(Date.now() + 172800000), status: "CONFIRMED" },
    { id: "2", subject: "Follow-up Meeting", date: new Date(Date.now() + 604800000), status: "REQUESTED" },
  ],
}

export default function ClientDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [clientData, setClientData] = useState(mockClientData)
  const [isLoading, setIsLoading] = useState(true)

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

    // Fetch client data
    const fetchClientData = async () => {
      try {
        // In a real app, you would fetch actual data here
        // const inquiriesRes = await fetch("/api/client/inquiries")
        // const messagesRes = await fetch("/api/client/messages")
        // const consultationsRes = await fetch("/api/client/consultations")

        // const inquiries = await inquiriesRes.json()
        // const messages = await messagesRes.json()
        // const consultations = await consultationsRes.json()

        // setClientData({
        //   inquiries: inquiries.length,
        //   messages: messages.length,
        //   consultations: consultations.length,
        //   recentInquiries: inquiries.slice(0, 5),
        //   upcomingConsultations: consultations
        //     .filter(c => new Date(c.date) > new Date())
        //     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        //     .slice(0, 5),
        // })

        // Using mock data for now
        setClientData(mockClientData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching client data:", error)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchClientData()
    }
  }, [status, session, router])

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
          <h2 className="text-3xl font-bold tracking-tight">Client Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button size="sm" className="h-9 gap-1 bg-red-600 hover:bg-red-700">
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
                      clientData.recentInquiries.map((inquiry, i) => (
                        <div key={inquiry.id} className="flex items-center">
                          <div className="mr-4 rounded-full bg-red-100 p-2">
                            <MessageSquare className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{inquiry.subject}</p>
                            <p className="text-sm text-muted-foreground">Status: {inquiry.status.replace("_", " ")}</p>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground">{i === 0 ? "Today" : "Yesterday"}</div>
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
                            <p className="text-sm text-muted-foreground">Status: {consultation.status}</p>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground">
                            {new Date(consultation.date).toLocaleDateString()}
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
              <CardHeader>
                <CardTitle>Your Inquiries</CardTitle>
                <CardDescription>View and manage your inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Inquiry management interface would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Consultations</CardTitle>
                <CardDescription>Schedule and manage your consultation sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Consultation management interface would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Messages</CardTitle>
                <CardDescription>View and send messages to our team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Messaging interface would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}

