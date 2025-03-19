import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
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

    return NextResponse.json(stories)
  } catch (error) {
    console.error("Failed to fetch stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, image, category, slug } = body

    if (!title || !description || !image || !category || !slug) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
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

    // Check if slug is unique
    const existingStory = await prisma.story.findUnique({
      where: { slug },
    })

    if (existingStory) {
      return NextResponse.json({ error: "A story with this slug already exists" }, { status: 400 })
    }

    const newStory = await prisma.story.create({
      data: {
        title,
        description,
        image,
        category,
        slug,
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

    return NextResponse.json(newStory)
  } catch (error) {
    console.error("Failed to create story:", error)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, title, description, image, category, slug } = body

    if (!id || !title || !description || !image || !category || !slug) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if slug is unique (excluding the current story)
    const existingStory = await prisma.story.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    })

    if (existingStory) {
      return NextResponse.json({ error: "Another story with this slug already exists" }, { status: 400 })
    }

    const updatedStory = await prisma.story.update({
      where: { id },
      data: {
        title,
        description,
        image,
        category,
        slug,
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

    return NextResponse.json(updatedStory)
  } catch (error) {
    console.error("Failed to update story:", error)
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Story ID is required" }, { status: 400 })
    }

    // Delete associated comments first
    await prisma.comment.deleteMany({
      where: { storyId: id },
    })

    // Then delete the story
    await prisma.story.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete story:", error)
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 })
  }
}

