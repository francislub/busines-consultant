import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Get counts
    const storiesCount = await prisma.story.count()
    const articlesCount = await prisma.article.count()
    const teamsCount = await prisma.team.count()
    const commentsCount = await prisma.comment.count()
    const inquiriesCount = await prisma.inquiry.count()
    const messagesCount = await prisma.message.count({
      where: {
        isRead: false,
      },
    })
    const consultationsCount = await prisma.consultation.count()

    // Get recent activity
    const recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    const recentConsultations = await prisma.consultation.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Mock data for charts (in a real app, you would calculate this from actual data)
    const monthlyVisits = [
      { name: "Jan", visits: 1200 },
      { name: "Feb", visits: 1900 },
      { name: "Mar", visits: 2400 },
      { name: "Apr", visits: 1800 },
      { name: "May", visits: 2800 },
      { name: "Jun", visits: 3200 },
      { name: "Jul", visits: 2900 },
    ]

    const contentPerformance = [
      { name: "Stories", views: 4500, engagement: 320 },
      { name: "Articles", views: 6200, engagement: 480 },
      { name: "Team", views: 2100, engagement: 190 },
    ]

    return NextResponse.json({
      stories: storiesCount,
      articles: articlesCount,
      team: teamsCount,
      comments: commentsCount,
      inquiries: inquiriesCount,
      messages: messagesCount,
      consultations: consultationsCount,
      recentInquiries,
      recentConsultations,
      monthlyVisits,
      contentPerformance,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

