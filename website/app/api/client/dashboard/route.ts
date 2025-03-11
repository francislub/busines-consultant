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

    const userId = session.user.id

    // Get counts
    const [pendingInquiries, unreadMessages, upcomingConsultations] = await Promise.all([
      // Count pending inquiries for this user
      prisma.inquiry.count({
        where: {
          userId: userId,
          status: "PENDING",
        },
      }),

      // Count unread messages for this user
      prisma.message.count({
        where: {
          senderId: userId,
          isRead: false,
        },
      }),

      // Count upcoming consultations for this user
      prisma.consultation.count({
        where: {
          clientId: userId,
          date: {
            gte: new Date(),
          },
        },
      }),
    ])

    // Get recent inquiries
    const recentInquiries = await prisma.inquiry.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })

    // Get upcoming consultations
    const consultations = await prisma.consultation.findMany({
      where: {
        clientId: userId,
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
      take: 5,
    })

    // Get recent messages
    const recentMessages = await prisma.message.findMany({
      where: {
        senderId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })

    return NextResponse.json({
      inquiries: pendingInquiries,
      messages: unreadMessages,
      consultations: upcomingConsultations,
      recentInquiries,
      upcomingConsultations: consultations,
      recentMessages,
    })
  } catch (error) {
    console.error("Error fetching client dashboard data:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

