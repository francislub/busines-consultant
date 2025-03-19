import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET all articles
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error("GET articles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create article
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("POST article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT update article
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, title, content } = await request.json()

    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 })
    }

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error("PUT article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE article
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Delete article
    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

