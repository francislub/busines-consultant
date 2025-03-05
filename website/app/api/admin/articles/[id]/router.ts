import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const articleSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  image: z.string().url("Invalid image URL").optional(),
})

// GET a specific article
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const article = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PUT (update) an article
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, image } = articleSchema.parse(body)

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingArticle) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    // Update article
    const updatedArticle = await prisma.article.update({
      where: {
        id: params.id,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(image && { image }),
      },
    })

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error("Error updating article:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE an article
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingArticle) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    // Delete related comments first
    await prisma.comment.deleteMany({
      where: {
        articleId: params.id,
      },
    })

    // Delete article
    await prisma.article.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

