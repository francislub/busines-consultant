"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Users,
  FileText,
  MessageSquare,
  BookOpen,
  PlusCircle,
  RefreshCw,
  Calendar,
  TrendingUp,
  Loader2,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { toast } from "sonner"

// Define types for our stats data
interface StatsData {
  stories: number
  articles: number
  team: number
  comments: number
  inquiries: number
  consultations: number
  messages: number
  monthlyVisits: { name: string; visits: number }[]
  contentPerformance: { name: string; views: number; engagement: number }[]
  recentActivity: {
    type: string
    title: string
    description: string
    time: string
  }[]
  growth: {
    stories: number
    articles: number
    team: number
    comments: number
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Function to fetch stats data
  const fetchStats = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/admin/stats")

      if (!response.ok) {
        throw new Error("Failed to fetch statistics")
      }

      const data = await response.json()
      setStats(data)

      if (isRefreshing) {
        toast.success("Dashboard data refreshed")
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
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

    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/client/dashboard")
      return
    }

    // Fetch statistics when authenticated
    if (status === "authenticated") {
      fetchStats()
    }
  }, [status, session, router])

  // Handle refresh button click
  const handleRefresh = () => {
    fetchStats()
  }

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-red-600" />
          <p className="mt-4 text-gray-500">Loading dashboard data...</p>
        </div>
      </AdminLayout>
    )
  }

  // If stats data is not available
  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-gray-500">No data available</p>
          <Button onClick={handleRefresh} className="mt-4">
            Try Again
          </Button>
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
            <Button
              size="sm"
              className="h-9 gap-1 bg-red-600 hover:bg-red-700"
              onClick={() => router.push("/admin/stories/new")}
            >
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
                  <p className={`text-xs ${stats.growth.stories >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stats.growth.stories >= 0 ? "+" : ""}
                    {stats.growth.stories}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.articles}</div>
                  <p className={`text-xs ${stats.growth.articles >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stats.growth.articles >= 0 ? "+" : ""}
                    {stats.growth.articles}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.team}</div>
                  <p className={`text-xs ${stats.growth.team >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stats.growth.team >= 0 ? "+" : ""}
                    {stats.growth.team}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.comments}</div>
                  <p className={`text-xs ${stats.growth.comments >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stats.growth.comments >= 0 ? "+" : ""}
                    {stats.growth.comments}% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Visits</CardTitle>
                  <CardDescription>Website traffic over the past 7 months</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={stats.monthlyVisits}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} visits`, "Visits"]} />
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
                    {stats.recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-4 rounded-full bg-red-100 p-2">
                          {activity.type === "inquiry" ? (
                            <MessageSquare className="h-4 w-4 text-red-600" />
                          ) : activity.type === "consultation" ? (
                            <Calendar className="h-4 w-4 text-red-600" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">{formatTimeAgo(activity.time)}</div>
                      </div>
                    ))}
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

            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth Trend</CardTitle>
                <CardDescription>Content growth over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={stats.monthlyVisits}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" stroke="#ef4444" activeDot={{ r: 8 }} name="Visits" />
                  </LineChart>
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
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-4 rounded-full bg-gray-100 p-2">
                        {activity.type === "inquiry" ? (
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                        ) : activity.type === "comment" ? (
                          <FileText className="h-4 w-4 text-gray-600" />
                        ) : (
                          <Calendar className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">{formatTimeAgo(activity.time)}</div>
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

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return diffInDays === 1 ? "Yesterday" : `${diffInDays} days ago`
  }

  return format(date, "MMM d, yyyy")
}

