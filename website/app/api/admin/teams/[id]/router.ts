import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const teamSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  image: z.string().url("Invalid image URL").optional(),
})

// GET a specific team member
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const team = await prisma.team.findUnique({
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
      },
    })

    if (!team) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(team)
  } catch (error) {
    console.error("Error fetching team member:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PUT (update) a team member
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
    const { name, title, description, image } = teamSchema.parse(body)

    // Check if team member exists
    const existingTeam = await prisma.team.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingTeam) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 })
    }

    // Update team member
    const updatedTeam = await prisma.team.update({
      where: {
        id: params.id,
      },
      data: {
        ...(name && { name }),
        ...(title && { title }),
        ...(description && { description }),
        ...(image && { image }),
      },
    })

    return NextResponse.json(updatedTeam)
  } catch (error) {
    console.error("Error updating team member:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE a team member
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Check if team member exists
    const existingTeam = await prisma.team.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingTeam) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 })
    }

    // Delete team member
    await prisma.team.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

```ts file="app/api/admin/comments/route.ts"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const commentSchema = z.object({
  content: z.string().min(1, "Content is required"),
  storyId: z.string().optional(),
  articleId: z.string().optional(),
})

// GET all comments
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }

    const comments = await prisma.comment.findMany({
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
        story: {
          select: {
            id: true,
            title: true,
          },
        },
        article: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST a new comment
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { content, storyId, articleId } = commentSchema.parse(body)

    // Ensure at least one of storyId or articleId is provided
    if (!storyId && !articleId) {
      return NextResponse.json(
        { message: "Either storyId or articleId must be provided" },
        { status: 400 }
      )
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        ...(storyId && {
          story: {
            connect: {
              id: storyId,
            },
          },
        }),
        ...(articleId && {
          article: {
            connect: {
              id: articleId,
            },
          },
        }),
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

