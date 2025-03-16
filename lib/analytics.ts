import prisma from "@/lib/prisma"
import { subMonths, startOfMonth, endOfMonth } from "date-fns"

/**
 * Calculate growth percentage between two values
 */
export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

/**
 * Get content counts for the current month
 */
export async function getCurrentMonthCounts() {
  const currentMonth = new Date()
  const startDate = startOfMonth(currentMonth)

  const [stories, articles, comments, teams] = await Promise.all([
    prisma.story.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    }),
    prisma.article.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    }),
    prisma.comment.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    }),
    prisma.team.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    }),
  ])

  return { stories, articles, comments, teams }
}

/**
 * Get content counts for the previous month
 */
export async function getPreviousMonthCounts() {
  const currentMonth = new Date()
  const previousMonth = subMonths(currentMonth, 1)
  const startDate = startOfMonth(previousMonth)
  const endDate = endOfMonth(previousMonth)

  const [stories, articles, comments, teams] = await Promise.all([
    prisma.story.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
    prisma.article.count({
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
    prisma.team.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
  ])

  return { stories, articles, comments, teams }
}

/**
 * Get monthly data for the past N months
 */
export async function getMonthlyData(months = 7) {
  const result = []

  for (let i = months - 1; i >= 0; i--) {
    const date = subMonths(new Date(), i)
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)

    // In a real app, you would query your analytics table
    // Here we'll use the content creation dates as a proxy for activity
    const [stories, articles, comments] = await Promise.all([
      prisma.story.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
      prisma.article.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
      prisma.comment.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ])

    // Calculate a "visits" metric based on content and engagement
    // In a real app, this would come from your analytics system
    const baseVisits = stories * 150 + articles * 180 + comments * 20
    const randomFactor = 0.8 + Math.random() * 0.4 // Random factor between 0.8 and 1.2
    const visits = Math.floor(baseVisits * randomFactor)

    result.push({
      month: date.getMonth(),
      name: date.toLocaleString("default", { month: "short" }),
      visits,
      stories,
      articles,
      comments,
    })
  }

  return result
}

