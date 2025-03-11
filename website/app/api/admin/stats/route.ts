import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get counts for the dashboard cards
    const [storiesCount, articlesCount, teamsCount, commentsCount, inquiriesCount, messagesCount, consultationsCount] =
      await Promise.all([
        prisma.story.count(),
        prisma.article.count(),
        prisma.team.count(),
        prisma.comment.count(),
        prisma.inquiry.count(),
        prisma.message.count({
          where: {
            isRead: false,
          },
        }),
        prisma.consultation.count(),
      ])

    // Get monthly visits data (last 7 months)
    const monthlyVisitsData = []
    for (let i = 6; i >= 0; i--) {
      const date = subMonths(new Date(), i)
      const monthStart = startOfMonth(date)
      const monthEnd = endOfMonth(date)
      const monthName = format(date, "MMM")

      // In a real app, you would have a visits or analytics table
      // Here we'll simulate with random data based on real counts
      const baseVisits = storiesCount + articlesCount + commentsCount
      const randomFactor = 0.5 + Math.random()
      const visits = Math.floor((baseVisits * randomFactor * (7 - i)) / 3)

      monthlyVisitsData.push({
        name: monthName,
        visits: visits,
      })
    }

    // Get content performance data
    // In a real app, you would have view and engagement metrics
    // Here we'll calculate based on existing data
    const storyComments = await prisma.comment.count({
      where: {
        storyId: {
          not: null,
        },
      },
    })

    const articleComments = await prisma.comment.count({
      where: {
        articleId: {
          not: null,
        },
      },
    })

    const contentPerformance = [
      {
        name: "Stories",
        views: storiesCount * 150 + Math.floor(Math.random() * 1000),
        engagement: storyComments,
      },
      {
        name: "Articles",
        views: articlesCount * 180 + Math.floor(Math.random() * 1000),
        engagement: articleComments,
      },
      {
        name: "Team",
        views: teamsCount * 120 + Math.floor(Math.random() * 500),
        engagement: Math.floor(teamsCount * 15 + Math.random() * 50),
      },
    ]

    // Get recent activity
    const recentInquiries = await prisma.inquiry.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    const recentComments = await prisma.comment.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        article: {
          select: {
            title: true,
          },
        },
        story: {
          select: {
            title: true,
          },
        },
      },
    })

    const recentConsultations = await prisma.consultation.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
    })

    // Format recent activity for display
    const recentActivity = [
      ...recentInquiries.map((inquiry) => ({
        type: "inquiry",
        title: `New inquiry from ${inquiry.user?.name || "Anonymous"}`,
        description: inquiry.subject,
        time: inquiry.createdAt,
      })),
      ...recentComments.map((comment) => ({
        type: "comment",
        title: `New comment from ${comment.author?.name || comment.firstName || "Anonymous"}`,
        description: comment.article
          ? `On article: ${comment.article.title}`
          : comment.story
            ? `On story: ${comment.story.title}`
            : "On content",
        time: comment.createdAt,
      })),
      ...recentConsultations.map((consultation) => ({
        type: "consultation",
        title: `New consultation request`,
        description: `From ${consultation.client?.name || "Anonymous"} for ${format(new Date(consultation.date), "MMM dd, yyyy")}`,
        time: consultation.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5)

    // Calculate growth percentages (comparing to previous month)
    const previousMonthStories = await prisma.story.count({
      where: {
        createdAt: {
          lt: new Date(new Date().setDate(1)), // First day of current month
        },
      },
    })

    const previousMonthArticles = await prisma.article.count({
      where: {
        createdAt: {
          lt: new Date(new Date().setDate(1)),
        },
      },
    })

    const previousMonthComments = await prisma.comment.count({
      where: {
        createdAt: {
          lt: new Date(new Date().setDate(1)),
        },
      },
    })

    const previousMonthTeams = await prisma.team.count({
      where: {
        createdAt: {
          lt: new Date(new Date().setDate(1)),
        },
      },
    })

    // Calculate growth percentages
    const storiesGrowth =
      previousMonthStories === 0
        ? 100
        : Math.round(((storiesCount - previousMonthStories) / previousMonthStories) * 100)

    const articlesGrowth =
      previousMonthArticles === 0
        ? 100
        : Math.round(((articlesCount - previousMonthArticles) / previousMonthArticles) * 100)

    const teamsGrowth =
      previousMonthTeams === 0 ? 100 : Math.round(((teamsCount - previousMonthTeams) / previousMonthTeams) * 100)

    const commentsGrowth =
      previousMonthComments === 0
        ? 100
        : Math.round(((commentsCount - previousMonthComments) / previousMonthComments) * 100)

    return NextResponse.json({
      stories: storiesCount,
      articles: articlesCount,
      team: teamsCount,
      comments: commentsCount,
      inquiries: inquiriesCount,
      messages: messagesCount,
      consultations: consultationsCount,
      monthlyVisits: monthlyVisitsData,
      contentPerformance,
      recentActivity,
      growth: {
        stories: storiesGrowth,
        articles: articlesGrowth,
        team: teamsGrowth,
        comments: commentsGrowth,
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

