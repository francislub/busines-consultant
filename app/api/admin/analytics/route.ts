import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "week"

    // Get counts from database
    const [usersCount, articlesCount, storiesCount, commentsCount, contactsCount, inquiriesCount, consultationsCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.article.count(),
        prisma.story.count(),
        prisma.comment.count(),
        prisma.contact.count(),
        prisma.inquiry.count(),
        prisma.consultation.count(),
      ])

    // Calculate growth rates (in a real app, you would compare with previous period)
    const userGrowth = Math.floor(Math.random() * 20) - 5 // Random between -5 and 15
    const contentGrowth = Math.floor(Math.random() * 15) // Random between 0 and 15
    const engagementRate = Math.floor(Math.random() * 25) // Random between 0 and 25

    // Generate time series data
    const timeSeriesData = generateTimeSeriesData(timeRange)

    // Generate content distribution data
    const contentDistribution = [
      { name: "Articles", value: articlesCount, color: "#82ca9d" },
      { name: "Stories", value: storiesCount, color: "#ffc658" },
      { name: "Comments", value: commentsCount, color: "#ff8042" },
    ]

    // Generate user activity data
    const userActivity = [
      { name: "Content Creation", value: 35, color: "#8884d8" },
      { name: "Comments", value: 45, color: "#ff8042" },
      { name: "Inquiries", value: 20, color: "#82ca9d" },
    ]

    // Generate top content data
    const topContent = generateTopContent()

    // Generate recent activity data
    const recentActivity = generateRecentActivity()

    return NextResponse.json({
      overview: {
        totalUsers: usersCount,
        totalArticles: articlesCount,
        totalStories: storiesCount,
        totalComments: commentsCount,
        totalContacts: contactsCount,
        totalInquiries: inquiriesCount,
        totalConsultations: consultationsCount,
        userGrowth,
        contentGrowth,
        engagementRate,
      },
      timeSeriesData,
      contentDistribution,
      userActivity,
      topContent,
      recentActivity,
    })
  } catch (error) {
    console.error("Failed to fetch analytics data:", error)
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}

// Helper function to generate time series data
function generateTimeSeriesData(timeRange: string) {
  const data = []
  const periods = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 12
  const periodLabel = timeRange === "week" ? "Day" : timeRange === "month" ? "Day" : "Month"

  for (let i = 1; i <= periods; i++) {
    data.push({
      name: `${periodLabel} ${i}`,
      users: Math.floor(Math.random() * 100) + 50,
      articles: Math.floor(Math.random() * 20) + 5,
      stories: Math.floor(Math.random() * 15) + 3,
      comments: Math.floor(Math.random() * 50) + 10,
    })
  }

  return data
}

// Helper function to generate top content data
function generateTopContent() {
  const content = []
  const titles = [
    "How to Optimize Your Business Operations",
    "The Future of ERP Software",
    "Implementing Procore: A Case Study",
    "Marketing Strategies for Construction Companies",
    "Effective Bonus Programs for Employee Retention",
  ]

  for (let i = 0; i < 5; i++) {
    content.push({
      id: `content_${i}`,
      title: titles[i],
      type: i % 2 === 0 ? "article" : "story",
      views: Math.floor(Math.random() * 1000) + 100,
      engagement: Math.floor(Math.random() * 30) + 60,
    })
  }

  return content
}

// Helper function to generate recent activity data
function generateRecentActivity() {
  const activity = []
  const types = ["article", "story", "comment", "contact", "consultation"]
  const titles = [
    "New article published",
    "Story updated",
    "Comment on 'Business Operations'",
    "New contact form submission",
    "Consultation request",
    "User registration",
    "Article edited",
  ]
  const statuses = ["COMPLETED", "IN_PROGRESS", "PENDING"]

  for (let i = 0; i < 10; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 7))

    activity.push({
      id: `activity_${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      date: date.toISOString(),
      status: Math.random() > 0.3 ? statuses[Math.floor(Math.random() * statuses.length)] : undefined,
    })
  }

  return activity
}

