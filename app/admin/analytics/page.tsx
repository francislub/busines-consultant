"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, Users, FileText, BookOpen, MessageSquare } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { useToast } from "@/components/ui/use-toast"

interface AnalyticsData {
  overview: {
    totalUsers: number
    totalArticles: number
    totalStories: number
    totalComments: number
    totalContacts: number
    totalInquiries: number
    totalConsultations: number
    userGrowth: number
    contentGrowth: number
    engagementRate: number
  }
  timeSeriesData: {
    name: string
    users: number
    articles: number
    stories: number
    comments: number
  }[]
  contentDistribution: {
    name: string
    value: number
    color: string
  }[]
  userActivity: {
    name: string
    value: number
    color: string
  }[]
  topContent: {
    id: string
    title: string
    type: "article" | "story"
    views: number
    engagement: number
  }[]
  recentActivity: {
    id: string
    type: string
    title: string
    date: string
    status?: string
  }[]
}

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/admin/analytics?timeRange=${timeRange}`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Failed to fetch analytics data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch analytics data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange, toast])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex space-x-2">
          <Button variant={timeRange === "week" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("week")}>
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button variant={timeRange === "year" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("year")}>
            Year
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {data.overview.userGrowth >= 0 ? "+" : ""}
              {data.overview.userGrowth}% from last {timeRange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {data.overview.contentGrowth >= 0 ? "+" : ""}
              {data.overview.contentGrowth}% from last {timeRange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalStories}</div>
            <p className="text-xs text-muted-foreground">
              {data.overview.contentGrowth >= 0 ? "+" : ""}
              {data.overview.contentGrowth}% from last {timeRange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {data.overview.engagementRate >= 0 ? "+" : ""}
              {data.overview.engagementRate}% from last {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>User and content growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="articles" stroke="#82ca9d" name="Articles" />
                      <Line type="monotone" dataKey="stories" stroke="#ffc658" name="Stories" />
                      <Line type="monotone" dataKey="comments" stroke="#ff8042" name="Comments" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Breakdown of content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.contentDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.contentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Types of user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.userActivity}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.userActivity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Articles and stories performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="articles" fill="#82ca9d" name="Articles" />
                      <Bar dataKey="stories" fill="#ffc658" name="Stories" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Content with highest engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        {content.type === "article" ? (
                          <FileText className="h-4 w-4 text-primary" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{content.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{content.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{content.views.toLocaleString()} views</p>
                      <p className="text-xs text-muted-foreground">{content.engagement}% engagement</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.timeSeriesData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="users" stroke="#8884d8" fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Users who logged in this {timeRange}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">{Math.round(data.overview.totalUsers * 0.65)}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(((data.overview.totalUsers * 0.65) / data.overview.totalUsers) * 100)}% of total users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Creators</CardTitle>
                <CardDescription>Users who created content</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">{Math.round(data.overview.totalUsers * 0.25)}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(((data.overview.totalUsers * 0.25) / data.overview.totalUsers) * 100)}% of total users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>Users who joined this {timeRange}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">{Math.round(data.overview.totalUsers * 0.15)}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  {Math.round(((data.overview.totalUsers * 0.15) / data.overview.totalUsers) * 100)}% of total users
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Comments and interactions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.timeSeriesData}>
                      <defs>
                        <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ff8042" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="comments"
                        stroke="#ff8042"
                        fillOpacity={1}
                        fill="url(#colorComments)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>Average engagement per content</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">{data.overview.engagementRate}%</div>
                <p className="text-sm text-muted-foreground mt-2">+5% from last {timeRange}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Time on Page</CardTitle>
                <CardDescription>How long users stay on content</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">3:42</div>
                <p className="text-sm text-muted-foreground mt-2">+12% from last {timeRange}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
                <CardDescription>Users who leave after one page</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-primary">24%</div>
                <p className="text-sm text-muted-foreground mt-2">-8% from last {timeRange}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

