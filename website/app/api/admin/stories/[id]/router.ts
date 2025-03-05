import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const storySchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  image: z.string().url("Invalid image URL").optional(),
})

// GET a specific story
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const story = await prisma.story.findUnique({
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

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 })
    }

    return NextResponse.json(story)
  } catch (error) {
    console.error("Error fetching story:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PUT (update) a story
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
    const { title, description, image } = storySchema.parse(body)

    // Check if story exists
    const existingStory = await prisma.story.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingStory) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 })
    }

    // Update story
    const updatedStory = await prisma.story.update({
      where: {
        id: params.id,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(image && { image }),
      },
    })

    return NextResponse.json(updatedStory)
  } catch (error) {
    console.error("Error updating story:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE a story
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Check if story exists
    const existingStory = await prisma.story.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingStory) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 })
    }

    // Delete related comments first
    await prisma.comment.deleteMany({
      where: {
        storyId: params.id,
      },
    })

    // Delete story
    await prisma.story.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Story deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting story:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

