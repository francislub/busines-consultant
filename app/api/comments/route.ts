import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const commentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Valid email is required"),
  comment: z.string().min(1, "Comment is required"),
  articleId: z.string().optional(),
  storyId: z.string().optional(),
})

// POST - Create a new comment
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, comment, articleId, storyId } = commentSchema.parse(body)

    // Ensure at least one of articleId or storyId is provided
    if (!articleId && !storyId) {
      return NextResponse.json(
        { message: "Either articleId or storyId must be provided" },
        { status: 400 }
      )
    }

    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    // Create comment data with a more specific type
    const commentData: {
      content: string
      author?: {
        connect: {
          id: string
        }
      }
      firstName?: string
      lastName?: string
      email?: string
      article?: {
        connect: {
          id: string
        }
      }
      story?: {
        connect: {
          id: string
        }
      }
    } = {
      content: comment,
    }
    
    // If user is authenticated, link to their account
    if (session?.user) {
      commentData.author = {
        connect: {
          id: session.user.id,
        },
      }
    } else {
      // For guest comments
      commentData.firstName = firstName
      commentData.lastName = lastName
      commentData.email = email
    }
    
    // Connect to article or story
    if (articleId) {
      commentData.article = {
        connect: {
          id: articleId,
        },
      }
    } else if (storyId) {
      commentData.story = {
        connect: {
          id: storyId,
        },
      }
    }

    // Create the comment
    const newComment = await prisma.comment.create({
      data: commentData,
    })

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// GET - Retrieve comments
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const articleId = searchParams.get("articleId")
    const storyId = searchParams.get("storyId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the where clause based on filters, properly typed
    const where: { articleId?: string, storyId?: string } = {}
    
    if (articleId) {
      where.articleId = articleId
    } else if (storyId) {
      where.storyId = storyId
    }

    // Get comments with pagination
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.comment.count({ where }),
    ])

    return NextResponse.json({
      comments,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
