"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, FileText, MessageSquare, BookOpen, PlusCircle, RefreshCw, Calendar, TrendingUp } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { useSession } from "next-auth/react"

// Mock data for statistics
const mockStats = {
  stories: 24,
  articles: 36,
  team: 8,
  comments: 128,
  inquiries: 42,
  consultations: 18,
  messages: 64,
  monthlyVisits: [
    { name: "Jan", visits: 1200 },
    { name: "Feb", visits: 1900 },
    { name: "Mar", visits: 2400 },
    { name: "Apr", visits: 1800 },
    { name: "May", visits: 2800 },
    { name: "Jun", visits: 3200 },
    { name: "Jul", visits: 2900 },
  ],
  contentPerformance: [
    { name: "Stories", views: 4500, engagement: 320 },
    { name: "Articles", views: 6200, engagement: 480 },
    { name: "Team", views: 2100, engagement: 190 },
  ],
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [stats, setStats] = useState(mockStats)
  const [isLoading, setIsLoading] = useState(true)

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

    // Fetch real statistics
    const fetchStats = async () => {
      try {
        // In a real app, you would fetch actual data here
        // const response = await fetch("/api/admin/stats")
        // const data = await response.json()
        // setStats(data)

        // Using mock data for now
        setStats(mockStats)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
        setIsLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchStats()
    }
  }, [status, session, router])

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
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button size="sm" className="h-9 gap-1 bg-red-600 hover:bg-red-700">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.stories}</div>
                  <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.articles}</div>
                  <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 15)}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.team}</div>
                  <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 5)}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.comments}</div>
                  <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20)}% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Visits</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={stats.monthlyVisits}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    You have {stats.inquiries} new inquiries and {stats.messages} unread messages.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-red-100 p-2">
                        <MessageSquare className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">New inquiry from John Doe</p>
                        <p className="text-sm text-muted-foreground">Regarding business consulting services</p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">Just now</div>
                    </div>

                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-red-100 p-2">
                        <Calendar className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">New consultation request</p>
                        <p className="text-sm text-muted-foreground">From Sarah Johnson for next week</p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">2 hours ago</div>
                    </div>

                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-red-100 p-2">
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Traffic spike detected</p>
                        <p className="text-sm text-muted-foreground">+43% visitors on "Business Consulting" article</p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">5 hours ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Views and engagement metrics for your content</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={stats.contentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#ef4444" name="Views" />
                    <Bar dataKey="engagement" fill="#3b82f6" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and updates on your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Activity items would be mapped from real data */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-gray-100 p-2">
                        {i % 3 === 0 ? (
                          <FileText className="h-4 w-4 text-gray-600" />
                        ) : i % 3 === 1 ? (
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                        ) : (
                          <Users className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i % 3 === 0
                            ? "New article published"
                            : i % 3 === 1
                              ? "New comment received"
                              : "Team member updated"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i % 3 === 0
                            ? "Digital Marketing Strategies for 2023"
                            : i % 3 === 1
                              ? "Great insights on the business operations article"
                              : "Jane Doe updated their profile"}
                        </p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">
                        {i === 0
                          ? "Just now"
                          : i === 1
                            ? "2 hours ago"
                            : i === 2
                              ? "Yesterday"
                              : i === 3
                                ? "2 days ago"
                                : "Last week"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

