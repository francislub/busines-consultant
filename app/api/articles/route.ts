import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, image, category, slug } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // In a real app, you'd get the author ID from the session
    // For demo purposes, we'll use the first admin user
    const admin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    })

    if (!admin) {
      return NextResponse.json({ error: "No admin user found" }, { status: 404 })
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        image,
        category: category || "Uncategorized",
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        authorId: admin.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(newArticle)
  } catch (error) {
    console.error("Failed to create article:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, content, image, category, slug } = body

    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 })
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        image,
        category: category || "Uncategorized",
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error("Failed to update article:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 })
    }

    // Delete associated comments first
    await prisma.comment.deleteMany({
      where: { articleId: id },
    })

    // Then delete the article
    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

