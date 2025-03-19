"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, MessageSquare, BookOpen, Mail, Calendar, AlertTriangle } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
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
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface DashboardData {
  stats: {
    users: number
    articles: number
    stories: number
    comments: number
    contacts: number
    inquiries: number
    consultations: number
  }
  recentActivity: {
    id: string
    type: string
    title: string
    date: string
    status?: string
  }[]
  chartData: {
    name: string
    articles: number
    stories: number
    comments: number
    users: number
  }[]
  pieData: {
    name: string
    value: number
    color: string
  }[]
  topContent: {
    id: string
    title: string
    type: string
    views: number
    engagement: number
  }[]
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/dashboard?timeRange=${timeRange}`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [timeRange, toast])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Failed to load dashboard data</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
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
            <div className="text-2xl font-bold">{data.stats.users}</div>
            <p className="text-xs text-muted-foreground">+12% from last {timeRange}</p>
            <Progress className="mt-2" value={72} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.articles}</div>
            <p className="text-xs text-muted-foreground">+8% from last {timeRange}</p>
            <Progress className="mt-2" value={58} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.stories}</div>
            <p className="text-xs text-muted-foreground">+15% from last {timeRange}</p>
            <Progress className="mt-2" value={65} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.comments}</div>
            <p className="text-xs text-muted-foreground">+20% from last {timeRange}</p>
            <Progress className="mt-2" value={80} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Top Content</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
                <CardDescription>Number of articles, stories, and comments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="articles" fill="#8884d8" name="Articles" />
                        <Bar dataKey="stories" fill="#82ca9d" name="Stories" />
                        <Bar dataKey="comments" fill="#ffc658" name="Comments" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

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
                          data={data.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.pieData.map((entry, index) => (
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

          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartData}>
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
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Content growth over the past months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend>
                        <ChartLegendItem name="Articles" color="#8884d8" />
                        <ChartLegendItem name="Stories" color="#82ca9d" />
                        <ChartLegendItem name="Comments" color="#ffc658" />
                      </ChartLegend>
                      <Line type="monotone" dataKey="articles" stroke="#8884d8" name="Articles" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="stories" stroke="#82ca9d" name="Stories" />
                      <Line type="monotone" dataKey="comments" stroke="#ffc658" name="Comments" />
                    </LineChart>
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
                <div className="text-5xl font-bold text-primary">78%</div>
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

        <TabsContent value="content" className="mt-6">
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
                        <p className="text-xs text-muted-foreground">{content.type}</p>
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

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      {activity.type === "article" ? (
                        <FileText className="h-4 w-4 text-primary" />
                      ) : activity.type === "story" ? (
                        <BookOpen className="h-4 w-4 text-primary" />
                      ) : activity.type === "comment" ? (
                        <MessageSquare className="h-4 w-4 text-primary" />
                      ) : activity.type === "contact" ? (
                        <Mail className="h-4 w-4 text-primary" />
                      ) : activity.type === "consultation" ? (
                        <Calendar className="h-4 w-4 text-primary" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    {activity.status && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : activity.status === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-800"
                              : activity.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

