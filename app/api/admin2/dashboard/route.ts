import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { format, subMonths } from "date-fns"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get counts
    const [usersCount, articlesCount, storiesCount, commentsCount] = await Promise.all([
      prisma.user.count(),
      prisma.article.count(),
      prisma.story.count(),
      prisma.comment.count(),
    ])

    // Get recent activity
    const recentActivity = []

    // Recent articles
    const recentArticles = await prisma.article.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { title: true, createdAt: true },
    })

    recentArticles.forEach((article) => {
      recentActivity.push({
        type: "article",
        title: article.title,
        date: format(article.createdAt, "MMM d, yyyy"),
      })
    })

    // Recent stories
    const recentStories = await prisma.story.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { title: true, createdAt: true },
    })

    recentStories.forEach((story) => {
      recentActivity.push({
        type: "story",
        title: story.title,
        date: format(story.createdAt, "MMM d, yyyy"),
      })
    })

    // Recent comments
    const recentComments = await prisma.comment.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { content: true, createdAt: true },
    })

    recentComments.forEach((comment) => {
      recentActivity.push({
        type: "comment",
        title: comment.content.length > 30 ? `${comment.content.substring(0, 30)}...` : comment.content,
        date: format(comment.createdAt, "MMM d, yyyy"),
      })
    })

    // Sort by date
    recentActivity.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    // Generate chart data for the last 6 months
    const chartData = []

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i)
      const monthName = format(date, "MMM")
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      const [monthArticles, monthStories, monthComments] = await Promise.all([
        prisma.article.count({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
        prisma.story.count({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
        prisma.comment.count({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
      ])

      chartData.push({
        name: monthName,
        articles: monthArticles,
        stories: monthStories,
        comments: monthComments,
      })
    }

    return NextResponse.json({
      stats: {
        users: usersCount,
        articles: articlesCount,
        stories: storiesCount,
        comments: commentsCount,
      },
      recentActivity,
      chartData,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

