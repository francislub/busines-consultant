import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const team = await prisma.team.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(team)
  } catch (error) {
    console.error("Failed to fetch team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, title, description, image, linkedin, email, slug } = body

    if (!name || !title || !description || !slug) {
      return NextResponse.json({ error: "Name, title, description, and slug are required" }, { status: 400 })
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

    const newTeamMember = await prisma.team.create({
      data: {
        name,
        title,
        description,
        image,
        linkedin,
        email,
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
      },
    })

    return NextResponse.json(newTeamMember)
  } catch (error) {
    console.error("Failed to create team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, title, description, image, linkedin, email, slug } = body

    if (!id || !name || !title || !description || !slug) {
      return NextResponse.json({ error: "ID, name, title, description, and slug are required" }, { status: 400 })
    }

    const updatedTeamMember = await prisma.team.update({
      where: { id },
      data: {
        name,
        title,
        description,
        image,
        linkedin,
        email,
        slug,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(updatedTeamMember)
  } catch (error) {
    console.error("Failed to update team member:", error)
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Team member ID is required" }, { status: 400 })
    }

    await prisma.team.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete team member:", error)
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}

