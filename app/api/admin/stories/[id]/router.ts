import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { slugify } from "@/lib/utils"

const storySchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  image: z.string().url("Invalid image URL").optional(),
  category: z.string().min(1, "Category is required").optional(),
})

// Type for formatted story response
interface StoryResponse {
  id: string
  title: string
  description: string
  image: string | null
  category: string
  slug: string
  author: { id: string; name: string; email: string }
  comments: Array<{
    id: string
    content: string
    createdAt: string
    author: { id: string; name: string }
  }>
  createdAt: string
  updatedAt: string
}

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

    // Transform the data to match the frontend format
    const formattedStory: StoryResponse = {
      id: story.id,
      title: story.title,
      description: story.description,
      image: story.image,
      category: story.category.replace(/_/g, " "),
      slug: story.slug,
      author: story.author,
      comments: story.comments,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    }

    return NextResponse.json(formattedStory)
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
    const { title, description, image, category } = storySchema.parse(body)

    // Check if story exists
    const existingStory = await prisma.story.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingStory) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: Record<string, string | undefined> = {}

    if (title) {
      updateData.title = title

      // Generate a new slug if title changes
      const newSlug = slugify(title)

      // Check if the new slug already exists (and it's not the current story)
      if (newSlug !== existingStory.slug) {
        const slugExists = await prisma.story.findUnique({
          where: {
            slug: newSlug,
          },
        })

        if (slugExists) {
          return NextResponse.json({ message: "A story with this title already exists" }, { status: 409 })
        }

        updateData.slug = newSlug
      }
    }

    if (description) {
      updateData.description = description
    }

    if (image) {
      updateData.image = image
    }

    if (category) {
      updateData.category = category.toUpperCase().replace(/\s+/g, "_")
    }

    // Update story
    const updatedStory = await prisma.story.update({
      where: {
        id: params.id,
      },
      data: updateData,
    })

    // Transform the data to match the frontend format
    const formattedStory: StoryResponse = {
      id: updatedStory.id,
      title: updatedStory.title,
      description: updatedStory.description,
      image: updatedStory.image,
      category: updatedStory.category.replace(/_/g, " "),
      slug: updatedStory.slug,
      createdAt: updatedStory.createdAt,
      updatedAt: updatedStory.updatedAt,
    }

    return NextResponse.json(formattedStory)
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
