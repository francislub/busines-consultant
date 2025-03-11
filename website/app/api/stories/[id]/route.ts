import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET a specific story by slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const story = await prisma.story.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
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
    const formattedStory = {
      id: story.id,
      title: story.title,
      description: story.description,
      category: story.category.replace(/_/g, " ") as any,
      imageUrl: story.image,
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

