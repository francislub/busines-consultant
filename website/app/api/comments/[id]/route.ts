import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const updateCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required").optional(),
  approved: z.boolean().optional(),
})

// GET a specific comment
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const comment = await prisma.comment.findUnique({
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
        article: {
          select: {
            id: true,
            title: true,
          },
        },
        story: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    return NextResponse.json(comment)
  } catch (error) {
    console.error("Error fetching comment:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// PATCH (update) a comment
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    // Only allow admin or the comment author to update
    if (session.user.role !== "ADMIN" && comment.authorId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { content, approved } = updateCommentSchema.parse(body)

    // Update comment
    const updatedComment = await prisma.comment.update({
      where: {
        id: params.id,
      },
      data: {
        ...(content && { content }),
        ...(approved !== undefined && { approved }),
      },
    })

    return NextResponse.json(updatedComment)
  } catch (error) {
    console.error("Error updating comment:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// DELETE a comment
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 })
    }

    // Only allow admin or the comment author to delete
    if (session.user.role !== "ADMIN" && comment.authorId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Delete comment
    await prisma.comment.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

