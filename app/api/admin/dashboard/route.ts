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

    // Generate chart data
    const chartData = generateChartData(timeRange)

    // Generate pie data
    const pieData = [
      { name: "Articles", value: articlesCount, color: "#8884d8" },
      { name: "Stories", value: storiesCount, color: "#82ca9d" },
      { name: "Comments", value: commentsCount, color: "#ffc658" },
    ]

    // Generate top content
    const topContent = await generateTopContent()

    // Generate recent activity
    const recentActivity = await generateRecentActivity()

    return NextResponse.json({
      stats: {
        users: usersCount,
        articles: articlesCount,
        stories: storiesCount,
        comments: commentsCount,
        contacts: contactsCount,
        inquiries: inquiriesCount,
        consultations: consultationsCount,
      },
      chartData,
      pieData,
      topContent,
      recentActivity,
    })
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}

// Helper function to generate chart data
function generateChartData(timeRange: string) {
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

// Helper function to generate top content
async function generateTopContent() {
  // In a real app, you would query the database for the most viewed/engaged content
  // For demo purposes, we'll create mock data

  // Try to get some real titles from the database
  const articles = await prisma.article.findMany({
    take: 3,
    select: { id: true, title: true },
  })

  const stories = await prisma.story.findMany({
    take: 2,
    select: { id: true, title: true },
  })

  const content = []

  // Add real articles
  for (const article of articles) {
    content.push({
      id: article.id,
      title: article.title,
      type: "article",
      views: Math.floor(Math.random() * 1000) + 100,
      engagement: Math.floor(Math.random() * 30) + 60,
    })
  }

  // Add real stories
  for (const story of stories) {
    content.push({
      id: story.id,
      title: story.title,
      type: "story",
      views: Math.floor(Math.random() * 1000) + 100,
      engagement: Math.floor(Math.random() * 30) + 60,
    })
  }

  // If we don't have enough real content, add some mock data
  const mockTitles = [
    "How to Optimize Your Business Operations",
    "The Future of ERP Software",
    "Implementing Procore: A Case Study",
    "Marketing Strategies for Construction Companies",
    "Effective Bonus Programs for Employee Retention",
  ]

  while (content.length < 5) {
    const index = content.length
    content.push({
      id: `content_${index}`,
      title: mockTitles[index % mockTitles.length],
      type: index % 2 === 0 ? "article" : "story",
      views: Math.floor(Math.random() * 1000) + 100,
      engagement: Math.floor(Math.random() * 30) + 60,
    })
  }

  return content
}

// Helper function to generate recent activity
async function generateRecentActivity() {
  // In a real app, you would query the database for recent activities
  // For demo purposes, we'll create mock data with some real data mixed in

  const activity = []

  // Try to get some real comments
  const comments = await prisma.comment.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true } },
      story: { select: { title: true } },
      article: { select: { title: true } },
    },
  })

  // Add real comments to activity
  for (const comment of comments) {
    activity.push({
      id: comment.id,
      type: "comment",
      title: `Comment on "${comment.story?.title || comment.article?.title || "content"}" by ${comment.author.name}`,
      date: comment.createdAt.toISOString(),
      status: "COMPLETED",
    })
  }

  // Try to get some real contacts
  const contacts = await prisma.contact.findMany({
    take: 2,
    orderBy: { createdAt: "desc" },
  })

  // Add real contacts to activity
  for (const contact of contacts) {
    activity.push({
      id: contact.id,
      type: "contact",
      title: `Contact from ${contact.firstName} ${contact.lastName}`,
      date: contact.createdAt.toISOString(),
      status: contact.status,
    })
  }

  // Add some mock activities to fill out the list
  const mockActivities = [
    { type: "article", title: "New article published", status: "COMPLETED" },
    { type: "story", title: "Story updated", status: "IN_PROGRESS" },
    { type: "consultation", title: "Consultation request", status: "PENDING" },
  ]

  while (activity.length < 10) {
    const index = activity.length % mockActivities.length
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 7))

    activity.push({
      id: `activity_${activity.length}`,
      ...mockActivities[index],
      date: date.toISOString(),
    })
  }

  return activity
}

