import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { slugify } from "@/lib/utils"

// Define types for StoryResponse to avoid using `any`
interface StoryResponse {
  id: string
  title: string
  description: string
  image: string | null
  category: string
  slug: string
  author: { id: string; name: string; email: string }
  createdAt: string
  updatedAt: string
}

// Define the schema for validating the input data
const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
})

// GET all stories
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const stories = await prisma.story.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // Format the stories into the required shape
    const formattedStories: StoryResponse[] = stories.map((story) => ({
      id: story.id,
      title: story.title,
      description: story.description,
      image: story.image,
      category: story.category.replace(/_/g, " "), // Convert to a readable format
      slug: story.slug,
      author: story.author,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    }))

    return NextResponse.json(formattedStories)
  } catch (error) {
    console.error("Error fetching stories:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// POST a new story
export async function POST(req: Request) {
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

    const validatedImage = image || ""

    // Generate a slug from the title
    const slug = slugify(title)

    // Check if a story with the same slug exists
    const existingStory = await prisma.story.findUnique({
      where: {
        slug,
      },
    })

    if (existingStory) {
      return NextResponse.json({ message: "A story with this title already exists" }, { status: 409 })
    }

    // Format the category to match the format stored in the database (uppercase with underscores)
    const formattedCategory: string = category.toUpperCase().replace(/\s+/g, "_")

    const story = await prisma.story.create({
      data: {
        title,
        description,
        image: validatedImage,
        category: formattedCategory, // Correct type as string
        slug,
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    // Format the newly created story into the required shape
    const formattedStory: StoryResponse = {
      id: story.id,
      title: story.title,
      description: story.description,
      image: story.image,
      category: story.category.replace(/_/g, " "), // Convert to readable format
      slug: story.slug,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    }

    return NextResponse.json(formattedStory, { status: 201 })
  } catch (error) {
    console.error("Error creating story:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
